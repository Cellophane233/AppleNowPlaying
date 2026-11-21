'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { run, runUI } = require('./V2回归测试.cjs');
const { version } = require('../manifest.json');

const storage = 'JSON.parse(localStorage.getItem("apple-now-playing.preferences-v2"))';
const obsoleteMotionKeys = ['wordMotion', 'fillStyle', 'longNote'];

run(async ({ evaluate, call, action, setting, until, pause }) => {
  const category = key => evaluate('document.querySelector("[data-settings-category=' + key + ']").click()');
  const field = key => 'document.querySelector("[data-preference=' + key + ']")';
  const row = key => field(key) + '.closest(".apple-now-playing-pref-row")';
  await action('settings');
  assert.deepEqual(await evaluate('[...document.querySelectorAll(".apple-now-playing-settings-nav button")].map(x=>x.textContent)'),
    ['页面外观', '背景效果', '歌词与字体', '歌词动效', '同步与工具', '实验性功能']);
  const drawer = 'document.querySelector(".apple-now-playing-settings-panel")';
  await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
  await action('close-settings');
  await until(drawer + '.hidden', true);
  await action('settings');
  assert.equal(await evaluate(drawer + '.getAnimations().length'), 1);
  const offsets = await evaluate(drawer + `.getAnimations()[0].effect.getKeyframes().map(frame => {
    const matrix = new DOMMatrix(frame.transform);
    return [matrix.m41, matrix.m42];
  })`);
  assert.deepEqual(offsets, [[0, -12], [0, 0]]);
  await action('close-settings');
  await until(drawer + '.hidden', true);
  await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await action('settings');
  assert.equal(await evaluate(drawer + '.getAnimations().length'), 0);
  assert.equal(await evaluate('document.activeElement.dataset.settingsCategory'), 'appearance');
  await call('Emulation.setEmulatedMedia', { features: [] });
  const keys = await evaluate('[...document.querySelectorAll(".apple-now-playing-preferences [data-preference]")].map(x=>x.dataset.preference)');
  assert.equal(keys.length, 36);
  assert.equal(new Set(keys).size, keys.length);
  assert.ok(keys.includes('lyricLift') && keys.includes('karaoke') && keys.includes('scrollStyle') && keys.includes('romanGrouping') && keys.includes('romanKaraoke'));
  assert.ok(obsoleteMotionKeys.every(key => !keys.includes(key)));
  assert.equal(keys.includes('scheme'), false);
  assert.equal(await evaluate('document.querySelector("#apple-now-playing-page").dataset.background'), 'fluid');
  const migrated = await evaluate('JSON.parse(localStorage.getItem("apple-now-playing.preferences-v2"))');
  assert.equal('scheme' in migrated, false);
  assert.equal(migrated.background, 'fluid');
  assert.equal(migrated.blankBlur, undefined);
  assert.equal(migrated.blankDim, undefined);
  assert.equal(migrated.lyricLift, false);
  assert.ok(obsoleteMotionKeys.every(key => !(key in migrated)));
  assert.equal(await evaluate('document.querySelector("[data-action=close-settings]").textContent'), '');
  assert.equal(await evaluate('!!document.querySelector("[data-action=close-settings] svg")'), true);
  const foreground = 'getComputedStyle(document.querySelector("#apple-now-playing-page")).color';
  const ink = await evaluate(foreground);
  assert.ok(ink.match(/\d+/g).slice(0, 3).every(channel => Number(channel) > 230));
  await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'light' }] });
  assert.equal(await evaluate(foreground), ink);
  await call('Emulation.setEmulatedMedia', { features: [] });
  assert.equal(await evaluate('document.querySelectorAll(".apple-now-playing-settings-category:not([hidden])").length'), 1);
  assert.equal(await evaluate('document.querySelectorAll(".apple-now-playing-settings-panel details, .apple-now-playing-settings-panel summary").length'), 0);
  assert.equal(await evaluate('document.querySelector("[data-settings-category=appearance]").getAttribute("aria-selected")'), 'true');
  await category('reading');
  await setting('translation', false);
  assert.equal(await evaluate(row('translationSize') + '.hidden'), true);
  await setting('translation', true);
  assert.equal(await evaluate(row('translationSize') + '.hidden'), false);
  await setting('roman', true);
  assert.equal(await evaluate(row('romanSize') + '.hidden'), false);
  await setting('customFont', true);
  assert.equal(await evaluate(row('fontFamilies') + '.closest("fieldset").querySelector("legend").textContent'), '进阶字体设置');
  assert.equal(await evaluate(row('fontFamilies') + '.getClientRects().length>0'), true);
  await until(row('fontPreset') + '.getClientRects().length>0', true);
  await setting('fontPreset', 'yahei');
  assert.equal(await evaluate('document.querySelector("#apple-now-playing-page").style.fontFamily.includes("Microsoft YaHei")'), true);
  await setting('customFont', false);
  assert.equal(await evaluate(row('fontFamilies') + '.closest("fieldset").hidden'), true);

  await category('motion');
  assert.equal(await evaluate(row('lyricLift') + '.querySelector("label span").textContent'), '歌词上浮');
  assert.equal(await evaluate(field('lyricLift') + '.type'), 'checkbox');
  assert.equal(await evaluate(field('lyricLift') + '.checked'), false);
  await setting('lyricLift', true);
  assert.equal(await evaluate(storage + '.lyricLift'), true);
  await action('close-settings');
  await action('settings');
  assert.equal(await evaluate(field('lyricLift') + '.checked'), true);

  await category('appearance');
  assert.equal(await evaluate(row('coverShadow') + '.getClientRects().length>0'), true);
  assert.equal(await evaluate(row('coverShadow') + '.closest("fieldset").querySelector("legend").textContent'), '阴影与辉光');
  await category('background');
  await setting('background', 'fluid');
  assert.equal(await evaluate(row('fluidQuality') + '.closest("fieldset").hidden'), false);
  assert.equal(await evaluate(row('fluidQuality') + '.getClientRects().length>0'), true);
  assert.equal(await evaluate(row('fluidFps') + '.hidden'), false);
  await setting('background', 'fluid-static');
  assert.equal(await evaluate(row('fluidFps') + '.hidden'), true);
  await setting('background', 'solid');
  assert.equal(await evaluate(row('fluidQuality') + '.closest("fieldset").hidden'), true);
  assert.equal(await evaluate(field('audioReactive') + '.disabled'), true);
  await setting('background', 'gradient');
  assert.equal(await evaluate(field('audioReactive') + '.disabled'), true);
  assert.equal(await evaluate('document.querySelector(".apple-now-playing-audio-status").hidden'), false);

  await category('tools');
  assert.equal(await evaluate('document.querySelector("#apple-now-playing-settings-tools fieldset legend").textContent'), '仅当前歌曲');
  assert.equal(await evaluate(row('globalOffset') + '.getClientRects().length>0'), true);
  await action('offset-ahead');
  assert.equal(await evaluate('JSON.parse(localStorage.getItem("apple-now-playing.lyric-offsets"))["101"]'), 100);
  await action('offset-reset');
  await action('close-settings');
  await action('settings');
  assert.equal(await evaluate('document.querySelector("[data-settings-category=appearance]").getAttribute("aria-selected")'), 'true');
  await category('tools');
  await evaluate('document.querySelector("[data-settings-category=tools]").dispatchEvent(new KeyboardEvent("keydown",{key:"Home",bubbles:true,cancelable:true}))');
  assert.equal(await evaluate('document.activeElement.dataset.settingsCategory'), 'appearance');

  await evaluate('(' + function () {
    const old = window.fetch;
    window.fetch = (url, options) => /[?&]id=963(?:&|$)/.test(String(url)) ? Promise.resolve({
      ok: true, json: async () => ({ code: 200, lrc: { lyric: '[00:05.00]（独立和声）' } }),
    }) : String(url).includes('/962.ttml') ? Promise.resolve({
      ok: true,
      text: async () => '<tt xmlns="http://www.w3.org/ns/ttml" xmlns:ttm="http://www.w3.org/ns/ttml#metadata">' +
        '<head><metadata><ttm:agent xml:id="v1" type="person"/><ttm:agent xml:id="v2" type="person"/></metadata></head>' +
        '<body><div><p begin="5s" end="9s" ttm:agent="v1"><span begin="5s" end="9s">主歌词</span>' +
        '<span ttm:role="x-bg"><span begin="6s" end="8s">和声歌词</span></span></p>' +
        '<p begin="5s" end="9s" ttm:agent="v2"><span begin="5s" end="9s">对唱主歌词</span><span ttm:role="x-bg"><span begin="6s" end="8s">对唱背景</span></span></p></div></body></tt>',
    }) : old(url, options);
    test.song('962', '和声字号样本');
  } + ')()');
  await until('test.config().querySelector("div").textContent', '当前曲目歌词来源：AMLL TTML');
  await evaluate('test.position(6.5)');
  await setting('fontSize', '42');
  const vocalSizes = `[...document.querySelectorAll(".apple-now-playing-lyrics .lyric_player_lyricMainLine")]
    .map(node => getComputedStyle(node).fontSize)`;
  await until(vocalSizes, ['42px', '24px', '36px', '24px']);
  await setting('backgroundVocalSize', 23);
  await until(vocalSizes, ['42px', '23px', '36px', '23px']);
  await setting('duetSize', 48);
  assert.ok(!keys.includes('backingSize'));
  await setting('fontSize', '60');
  await until(vocalSizes, ['60px', '23px', '48px', '23px']);
  const saved = await evaluate('JSON.parse(localStorage.getItem("apple-now-playing.preferences-v2"))');
  assert.equal(saved.backgroundVocalSize, 23);
  assert.equal(saved.duetSize, 48);
  for (const key of ['backgroundVocalSize', 'duetSize']) {
    await evaluate(row(key) + '.querySelector("button").click()');
  }
  await until(vocalSizes, ['60px', '24px', '36px', '24px']);
  await evaluate('test.song("963","括号和声样本");test.position(5.4)');
  const standalone = 'document.querySelector(".apple-now-playing-lyrics .anp-background-vocal .lyric_player_lyricMainLine")';
  const standaloneSize = '(node=>node&&getComputedStyle(node).fontSize)(' + standalone + ')';
  await until('!!' + standalone, true);
  await until(standaloneSize, '24px');
  await setting('backgroundVocalSize', 31);
  await setting('fontSize', '24');
  await until(standaloneSize, '31px');
  await setting('fontSize', 'auto');

  for (const [width, height] of [[1605, 1315], [1240, 900], [360, 740], [565, 770], [1120, 380]]) {
    await call('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
    await pause(90);
    if (await evaluate('document.querySelector("[data-action=settings]").getAttribute("aria-expanded")') !== 'true') await action('settings');
    await until(drawer + '.getAnimations().length', 0);
    for (const name of ['appearance', 'background', 'reading', 'motion', 'tools']) {
      await category(name);
      const geometry = await evaluate('(()=>{const p=document.querySelector(".apple-now-playing-settings-panel"),r=p.getBoundingClientRect(),s=p.querySelector(".apple-now-playing-preferences"),n=p.querySelector("nav");s.scrollTop=s.scrollHeight;return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height,overflow:s.scrollWidth-s.clientWidth,navTop:n.getBoundingClientRect().top,orientation:n.getAttribute("aria-orientation"),within:[...n.querySelectorAll("button")].every(b=>b.getBoundingClientRect().right<=r.right),textFits:[...p.querySelectorAll(".apple-now-playing-segmented button")].filter(b=>b.getClientRects().length).every(b=>b.scrollWidth<=b.clientWidth+1)}})()');
      assert.ok(geometry.left >= 0 && geometry.right <= width + 1 && geometry.top >= 0 && geometry.bottom <= height + 1, JSON.stringify(geometry));
      assert.ok(geometry.overflow <= 1 && geometry.within, JSON.stringify(geometry));
      assert.ok(geometry.width > 250 && geometry.width <= 509 && geometry.height > 150 && geometry.height <= 621 && geometry.textFits, JSON.stringify(geometry));
      assert.equal(geometry.orientation, width <= 700 ? 'horizontal' : 'vertical');
      assert.equal(await evaluate('document.querySelector(".apple-now-playing-settings-nav").getBoundingClientRect().top'), geometry.navTop);
    }
    if (width === 1240 || width === 360) {
      await category('appearance');
      await evaluate('document.querySelector(".apple-now-playing-preferences").scrollTop=0');
      const capture = await call('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(__dirname, version + '-分类设置-' + width + '.png'), Buffer.from(capture.data, 'base64'));
    }
  }
  await action('close-settings');
  console.log('PASS compact drawer, text fit, independent background/duet sizes and categorized settings');
}, { onlyUI: true, preferences: {
  scheme: 'light', background: 'none', blankBlur: 18, blankDim: 45, wordMotion: 'none', fillStyle: 'line', longNote: false,
} }).then(async () => {
  for (const [preferences, expected] of [
    [undefined, true],
    [{ scheme: 'light', lyricLift: false }, false],
    [{ wordMotion: 'word' }, true],
    [{ wordMotion: 'character' }, true],
    [{ wordMotion: 'slide' }, true],
    [{ wordMotion: 'word', lyricLift: false }, false],
    [{ wordMotion: 'none', lyricLift: true }, true],
  ]) {
    await runUI(async ({ evaluate }) => {
      assert.equal(await evaluate('document.querySelector("[data-preference=lyricLift]").checked'), expected);
      if (!preferences) {
        const defaults = {
          display: 'all', alias: 'translated', background: 'fluid', fluidQuality: 'balanced',
          fluidFps: '30', fontSize: 'auto', alignment: 'middle', scrollStyle: 'spring',
          coverShadow: true, textShadow: true, textGlow: true, translation: true, roman: true,
          karaoke: true, romanKaraoke: true, originalBold: true, scrollbar: true, preview: true,
          lyricLift: true, lyricFade: true, lyricScale: true, lyricBlur: true,
          audioReactive: false, customFont: false, romanGrouping: false,
          translationSize: '64', romanSize: '64', backgroundVocalSize: '24', duetSize: '36', globalOffset: '0',
        };
        const actual = await evaluate(`Object.fromEntries(${JSON.stringify(Object.keys(defaults))}.map(key => {
          const field = document.querySelector('[data-preference=' + key + ']');
          return [key, field.type === 'checkbox' ? field.checked : field.value];
        }))`);
        assert.deepEqual(actual, defaults);
        assert.equal(await evaluate('document.querySelector(".apple-now-playing-offset-value").textContent'), '0.0 s');
      } else {
        const migrated = await evaluate(storage);
        assert.equal(migrated.lyricLift, expected);
        assert.equal('scheme' in migrated, false);
        assert.ok(obsoleteMotionKeys.every(key => !(key in migrated)));
      }
    }, { preferences });
  }
  console.log('PASS requested defaults and legacy motion migration, with saved preferences taking precedence');
}).catch(error => {
  console.error(error);
  process.exitCode = 1;
});
