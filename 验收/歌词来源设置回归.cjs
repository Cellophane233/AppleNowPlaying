'use strict';
const assert = require('node:assert/strict');
const { runUI } = require('./V2回归测试.cjs');

runUI(async ({ evaluate, until }) => {
  await evaluate('(' + function () {
    const files = new Map();
    const state = test.sources = { calls: [] };
    state.cached = id => JSON.parse(files.get('C:\\betterncm\\AppleNowPlaying-data\\lyrics-cache\\' + id + '.json') || 'null');
    window.betterncm = { app: { getDataPath: async () => 'C:/betterncm/', exec: async url => { state.external = url; } }, fs: {
      readFileText: async file => files.get(file), mkdir: async () => {},
      writeFile: async (file, blob) => { files.set(file, await blob.text()); },
    } };
    const prior = window.fetch;
    const ttml = text => `<tt xmlns:t="http://www.w3.org/ns/ttml#metadata"><body><div><p begin="1s" end="3s">` +
      `<span begin="1s" end="3s">${text}</span><span t:role="x-translation">译文</span>` +
      '<span t:role="x-roman"><span begin="1s" end="3s">reading</span></span></p></div></body></tt>';
    window.fetch = (url, options) => {
      const address = new URL(url);
      if (['lyrics.example.test', 'import.example.test', 'syllable.example.test'].includes(address.hostname)) {
        state.calls.push({ provider: 'custom', url: address.href, credentials: options.credentials });
        if (state.failCustom) return Promise.resolve(new Response('', { status: 404 }));
        if (address.hostname === 'syllable.example.test') return Promise.resolve(new Response(
          '[offset:100]\n[5]音(1100,450)节(1550,550)\n[8]回(1000,450)声(1450,350)\n[1]收尾(2400,500)'));
        return Promise.resolve(new Response(address.hostname === 'lyrics.example.test' ? ttml('自定义词') : '[00:01.00]导入源歌词'));
      }
      if (address.href.includes('amll-ttml-db')) {
        state.calls.push({ provider: 'amll' });
        return Promise.resolve(new Response(ttml('社区歌词')));
      }
      return prior(url, options);
    };
    AppleNowPlayingQQLyrics.fetchLyrics = async track => {
      state.calls.push({ provider: 'qq', id: track.id });
      return { format: 'qrc', content: '[1000,2000]QQ(1000,1000)歌词(2000,1000)' };
    };
    test.sourcePanel = test.config();
    document.body.append(test.sourcePanel);
  }.toString() + ')()');

  const panel = 'test.sourcePanel';
  const status = panel + '.querySelector("[data-lyric-source-status]").textContent';
  const label = panel + '.querySelector("output").textContent';
  const order = 'Array.from(' + panel + '.querySelectorAll("[data-lyric-source-order] li > span:first-child"), row=>row.textContent)';
  const stored = 'JSON.parse(localStorage.getItem("apple-now-playing.lyric-sources"))';
  const currentCache = 'test.sources.cached("94110")';
  const refresh = panel + '.querySelector("[data-refresh-lyrics]").click()';
  const song = id => evaluate('test.song(' + JSON.stringify(id) + ',"取词排序试歌");test.position(1.5)');
  const rowText = 'document.querySelector(".apple-now-playing-lyrics [data-time=\\"1000\\"]")?.textContent';

  assert.deepEqual(await evaluate(order), ['1. AMLL TTML', '2. QQ 音乐', '3. 网易云音乐']);
  await song('94110');
  await until(label, 'AMLL TTML');
  await until(currentCache + '?.source', 'AMLL TTML');
  await evaluate(panel + '.querySelector("button[aria-label=\\"上移 QQ 音乐\\"]").click()');
  assert.deepEqual(await evaluate(stored + '.order'), ['qq', 'amll', 'netease']);
  await song('94111');
  await until('test.sources.cached("94111")?.source', 'QQ 音乐 QRC');
  await song('94110');
  await until(currentCache + '?.source', 'QQ 音乐 QRC');
  await until(rowText + '?.includes("QQ歌词")', true);

  const add = panel + '.querySelector("[data-lyric-source-add]")';
  const submit = form => form + '.dispatchEvent(new Event("submit",{bubbles:true,cancelable:true}))';
  assert.equal(await evaluate(add + '.elements.format.value'), 'lrc');
  assert.ok(await evaluate(`(() => {
    test.sourcePanel.style.width = '240px';
    const fits = [...test.sourcePanel.querySelectorAll('.anp-source-config form')].every(form => form.scrollWidth <= form.clientWidth + 1);
    test.sourcePanel.style.width = '';
    return fits;
  })()`));
  await evaluate(add + '.elements.format.value="ttml";' + add + '.elements.sourceName.value="测试镜像";' + add + '.elements.url.value="http://lyrics.example.test/[NCM_ID].ttml";' + submit(add));
  assert.match(await evaluate(status), /HTTPS/);
  assert.equal((await evaluate(stored + '.custom')).length, 0);
  await evaluate(add + '.elements.url.value="https://lyrics.example.test/[NCM_ID].ttml";' + add + '.elements.website.value="javascript:alert(1)";' + submit(add));
  assert.match(await evaluate(status), /歌词源网站/);
  assert.equal((await evaluate(stored + '.custom')).length, 0);
  await evaluate(add + '.elements.website.value="https://lyrics.example.test/about";' + submit(add));
  const manual = await evaluate(stored + '.custom[0]');
  assert.equal(manual.website, 'https://lyrics.example.test/about');
  await evaluate(panel + '.querySelector("a[aria-label=\\"访问 测试镜像 的网站\\"]").click()');
  await until('test.sources.external', 'https://lyrics.example.test/about');
  assert.equal(await evaluate(stored + '.order[0]'), manual.id);
  await evaluate(refresh);
  await until(label, '测试镜像（自定义 TTML）');
  await until(currentCache + '?.source', '自定义 TTML');
  await until(rowText + '?.includes("自定义词")', true);
  assert.ok(await evaluate('test.sources.calls.some(x=>x.url==="https://lyrics.example.test/94110.ttml"&&x.credentials==="omit")'));

  const importer = panel + '.querySelector("[data-lyric-source-import]")';
  const sourceString = ['61ba6770-f02f-11ef-a3ae-5396943709e6', encodeURIComponent('导入镜像'),
    encodeURIComponent('AMLL 歌词源简介'), 'lrc', 'https://import.example.test/[NCM_ID].lrc'].join('|');
  await evaluate(importer + '.elements.sourceString.value=' + JSON.stringify(sourceString) + ';' + submit(importer));
  assert.match((await evaluate(order))[0], /导入镜像（LRC）/);
  assert.equal(await evaluate(stored + '.custom[1].description'), 'AMLL 歌词源简介');
  assert.equal(await evaluate(stored + '.custom[1].website'), '');
  await evaluate(refresh);
  await until(label, '导入镜像（自定义 LRC）');
  await until(currentCache + '?.source', '自定义 LRC');
  await until(rowText + '?.includes("导入源歌词")', true);

  await evaluate(add + '.elements.format.value="lys";' + add + '.elements.url.value="https://syllable.example.test/[SONG_NAME_URI].lys";' + submit(add));
  assert.match((await evaluate(order))[0], /syllable\.example\.test（LYS）/);
  await evaluate(refresh);
  await until(label, 'syllable.example.test（自定义 LYS）');
  assert.ok(await evaluate('test.sources.calls.some(x=>x.url=== "https://syllable.example.test/"+encodeURIComponent("取词排序试歌")+".lys")'));
  await until(currentCache + '?.source', '自定义 LYS');
  const syllables = await evaluate(currentCache + '.rows');
  assert.equal(syllables[0].side, 'right');
  assert.deepEqual(syllables[0].words.map(word => [word.time, word.duration]), [[1000, 450], [1450, 550]]);
  assert.equal(syllables[0].backingLines[0].content, '回声');
  assert.equal(syllables[0].backingLines[0].time, 900);
  assert.equal(syllables[0].backingLines[0].side, 'right');
  await until(rowText + '?.includes("音节")', true);
  await evaluate(panel + '.querySelector("button[aria-label=\\"移除 syllable.example.test\\"]").click()');
  await evaluate(panel + '.querySelector("button[aria-label=\\"移除 导入镜像\\"]").click();test.sources.failCustom=true');
  await song('94111');
  await until('test.sources.cached("94111")?.sourceRevision === ' + stored + '.revision', true);
  await song('94110');
  await until(label, 'QQ 音乐 QRC');
  await until(currentCache + '?.source', 'QQ 音乐 QRC');
  assert.equal(await evaluate(stored + '.custom.length'), 1);
  assert.ok(await evaluate('test.sources.calls.some(x=>x.url==="https://lyrics.example.test/94110.ttml")'));
  console.log('PASS priority, cache re-evaluation, custom URL and website, AMLL import, LYS timing and backing vocals, removal and fallback');
}).catch(error => { console.error(error); process.exitCode = 1; });
