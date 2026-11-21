'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {runUI}=require('./V2回归测试.cjs');
runUI(async({evaluate,call,until,click,action,pause})=>{
 assert.equal(await evaluate('document.querySelectorAll(".apple-now-playing-lyric-tools").length'),0);
 assert.deepEqual(await evaluate('[...document.querySelectorAll(".apple-now-playing-lyric-actions button")].map(x=>x.dataset.action)'),['toggle-translation','toggle-karaoke','toggle-roman']);
 assert.equal(await evaluate('document.querySelector(".apple-now-playing-tabs").lastElementChild.dataset.action'),'lyrics');
 assert.ok(await evaluate('document.querySelector(".apple-now-playing-settings-panel").contains(document.querySelector(".apple-now-playing-offset"))'));
 assert.equal(await evaluate('!!document.querySelector(".apple-now-playing-settings-panel [data-action=copy-view]")'),false);
 assert.ok(await evaluate('!!document.querySelector(".apple-now-playing-settings-panel [data-action=source]")'));
 assert.equal(await evaluate('document.querySelector("#apple-now-playing-icon-karaoke-half rect").getAttribute("width")'),'12');
 assert.equal(await evaluate('document.querySelector("[data-action=toggle-roman] text").textContent'),'a');
 const romanButton='document.querySelector("[data-action=toggle-roman]")';
 await until(romanButton+'.title','无逐字罗马音');
 assert.equal(await evaluate('getComputedStyle('+romanButton+').opacity'),'0.35');
 assert.equal(await evaluate(romanButton+'.disabled'),false);
 assert.equal(await evaluate('document.querySelector("[data-action=toggle-translation]").getAttribute("aria-pressed")'),'true');
 await action('toggle-translation');assert.equal(await evaluate('document.querySelector("[data-preference=translation]").checked'),false);
 await action('toggle-translation');
 const romanVisible='!!document.querySelector(".apple-now-playing-lyrics .anp-roman:not(:empty)")';
 await until(romanVisible,true);await action('toggle-roman');await until(romanVisible,false);
 await action('toggle-roman');await until(romanVisible,true);
 await action('toggle-karaoke');assert.equal(await evaluate('document.querySelector("[data-preference=karaoke]").checked'),false);await action('toggle-karaoke');
 await action('settings');await until('document.querySelector(".apple-now-playing-settings-panel").hidden',false);
 await click('[data-settings-category=tools]');
 await click('.apple-now-playing-settings-panel [data-action=offset-ahead]');assert.ok(await evaluate('document.querySelector(".apple-now-playing-offset-value").textContent.includes("0.1")'));
 await click('.apple-now-playing-settings-panel [data-action=offset-reset]');
 const menu='.apple-now-playing-row-menu';
 const openMenu=selector=>evaluate('document.querySelector('+JSON.stringify(selector)+').dispatchEvent(new MouseEvent("contextmenu",{bubbles:true,cancelable:true,clientX:780,clientY:450}))');
 const menuActions='Array.from(document.querySelectorAll(".apple-now-playing-row-menu button"),x=>x.dataset.action)';
 await openMenu('.apple-now-playing-lyrics [data-time="5000"]');
 await until(menuActions,['copy-line','copy-original','copy-translation','copy-roman','copy-view']);
 await click(menu+' [data-action=copy-original]');
 await until('test.clipboard.at(-1)','逐字歌词');
 await openMenu('.apple-now-playing-lyrics');
 await until(menuActions,['copy-view']);
 await until('document.querySelector(".apple-now-playing-row-menu [data-action=copy-view]").textContent','复制歌词');
 await click(menu+' [data-action=copy-view]');
 await until('document.querySelector(".apple-now-playing-settings-panel").hidden',true);
 assert.equal(await evaluate('document.querySelector(".apple-now-playing-copy-view").hidden'),false);
 assert.equal(await evaluate('document.activeElement===document.querySelector(".apple-now-playing-copy-text")'),true);
 await action('copy-all');
 assert.ok(await evaluate('test.clipboard.at(-1).includes("逐字歌词")&&test.clipboard.at(-1).includes("再唱一句")'));
 await click('.apple-now-playing-copy-view [data-action=copy-view]');
 assert.equal(await evaluate('document.activeElement===document.querySelector(".apple-now-playing-lyrics")'),true);
 await action('settings');await click('[data-settings-category=tools]');await click('.apple-now-playing-settings-panel [data-action=source]');
 await until('document.querySelector(".apple-now-playing-settings-panel").hidden',true);
 assert.equal(await evaluate('document.querySelector(".apple-now-playing-source-panel").hidden'),false);
 await action('close-source');
 assert.equal(await evaluate('document.activeElement===document.querySelector(".apple-now-playing-settings-button")'),true);
 for(const [width,height]of[[1240,900],[565,770],[1120,380]]){
  await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});await pause(120);
  const rects=await evaluate('[...document.querySelectorAll(".apple-now-playing-tabs button")].map(x=>{const r=x.getBoundingClientRect();return{left:r.left,right:r.right,top:r.top,bottom:r.bottom,w:r.width,h:r.height}})');
  assert.equal(rects.length,4);for(const r of rects)assert.ok(r.left>=0&&r.right<=width+1&&r.top>=0&&r.bottom<=height+1);
  assert.ok(rects.every(r=>r.w===rects[0].w&&r.h===rects[0].h));
 }
 await call('Emulation.setDeviceMetricsOverride',{width:1240,height:900,deviceScaleFactor:1,mobile:false});
 const s=await call('Page.captureScreenshot',{format:'png'});fs.writeFileSync(path.join(__dirname,'0.5.4-图标布局-模拟宿主.png'),Buffer.from(s.data,'base64'));
 await evaluate('('+function(){
   const originalFetch=window.fetch;
   window.fetch=(url,...args)=>{
     const request=new URL(url);
     if(request.pathname.includes('/lyric/')&&request.searchParams.get('id')==='94107'){
       return Promise.resolve(new Response(JSON.stringify({code:200,
         yrc:{lyric:'[5000,2000](5000,1000,0)い(6000,1000,0)ま'},
         yromalrc:{lyric:'[5000,2000](5000,1000,0)i (6000,1000,0)ma'}})));
     }
     return originalFetch(url,...args);
   };
   test.song('94107','原生逐字罗马音');
 }.toString()+')()');
 await until(romanButton+'.title','显示罗马音');
 await until(romanButton+'.disabled',false);
 assert.equal(await evaluate('getComputedStyle('+romanButton+').opacity'),'1');
 await evaluate('test.song("101","逐字样本")');
 await until(romanButton+'.title','无逐字罗马音');
 assert.equal(await evaluate('getComputedStyle('+romanButton+').opacity'),'0.35');
 await evaluate('test.song("104","无同步歌词")');
 await until('[...document.querySelectorAll(".apple-now-playing-lyric-actions button")].every(x=>x.disabled)',true);
 await openMenu('.apple-now-playing-lyrics');
 assert.equal(await evaluate('document.querySelector(".apple-now-playing-row-menu").hidden'),true);
 console.log('PASS lyric toolbar geometry, line-only roman dimming and title, copy menu, offset and source focus');
}).catch(e=>{console.error(e);process.exitCode=1});
