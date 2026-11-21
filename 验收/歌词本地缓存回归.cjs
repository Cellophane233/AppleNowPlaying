'use strict';
const assert = require('node:assert/strict');
const { runUI } = require('./V2回归测试.cjs');

runUI(async ({ evaluate, until, pause, action }) => {
  await evaluate('(' + function installCacheHost() {
    const prefix = 'C:\\betterncm\\AppleNowPlaying-data';
    const files = new Map(), dirs = new Set(), calls = [];
    const state = test.lyricCache = { mode: 'qq', calls };
    const file = id => prefix + '\\lyrics-cache\\' + id + '.json';
    state.get = id => {
      try { return JSON.parse(files.get(file(id))); } catch (_) { return null; }
    };
    state.put = (id, value) => files.set(file(id), value);
    state.expire = id => state.put(id, JSON.stringify({ ...state.get(id), savedAt: Date.now() - 7 * 86400000 - 1 }));
    window.betterncm = {
      app: { getDataPath: async () => 'C:/betterncm/' },
      fs: {
        async readFileText(name) {
          if (name === file('94003')) await new Promise(resolve => { state.releaseRead = resolve; });
          if (!files.has(name)) throw Error('missing file');
          return files.get(name);
        },
        async mkdir(name) {
          if (name !== prefix && !dirs.has(prefix)) throw Error('missing parent directory');
          dirs.add(name);
        },
        async writeFile(name, blob) {
          if (!dirs.has(prefix + '\\lyrics-cache') || !name.startsWith(prefix + '\\lyrics-cache\\')) throw Error('incorrect cache path');
          files.set(name, await blob.text());
        },
      },
    };
    const ttml = '<tt xmlns:ttm="http://www.w3.org/ns/ttml#metadata"><body><div>' +
      '<p begin="5s" end="8s" ttm:agent="v2"><span begin="5s" end="6s">逐字</span> ' +
      '<span begin="6s" end="7s">缓存</span><span ttm:role="x-bg" begin="6s" end="7s">' +
      '<span begin="6s" end="7s">背景</span></span></p></div></body></tt>';
    const native = { code: 200, yrc: { lyric: '[5000,2000](5000,1000,0)逐字 (6000,1000,0)缓存' },
      tlyric: { lyric: '[00:05.00]补充译文' }, yromalrc: { lyric: '[5000,2000](5000,1000,0)zhuzi (6000,1000,0)huancun' } };
    const original = window.fetch;
    window.fetch = (url, options) => {
      const u = new URL(url);
      if (u.pathname.includes('/api/song/lyric/')) {
        calls.push(['native', u.searchParams.get('id')]);
        if (state.mode === 'amll') return new Promise(resolve => { state.releaseSidecars = () => resolve(new Response(JSON.stringify(native))); });
        return Promise.reject(Error('offline'));
      }
      if (u.href.includes('amll-ttml-db')) {
        calls.push(['amll', u.pathname.split('/').pop().split('.')[0], options?.cache]);
        if (state.holdRefresh && options?.cache === 'reload') {
          state.holdRefresh = false;
          return new Promise(resolve => { state.releaseRefresh = () => resolve(new Response('', { status: 404 })); });
        }
        if (state.mode === 'amll') return Promise.resolve(new Response(ttml));
        if (state.mode === 'offline') return Promise.reject(Error('offline'));
        return Promise.resolve(new Response('', { status: 404 }));
      }
      return original(url, options);
    };
    AppleNowPlayingQQLyrics.fetchLyrics = async track => {
      calls.push(['qq', track.id]);
      return state.mode === 'qq' ? { format: 'qrc', content: '[5000,2000]' + (state.qqText || 'QQ') + '(5000,1000)缓存(6000,1000)',
        translation: '[00:05.00]QQ译文', romanization: '[00:05.00]qq cache' } : null;
    };
  }.toString() + ')()');

  const label = 'test.config().querySelector("div").textContent';
  const cached = id => 'test.lyricCache.get(' + JSON.stringify(id) + ')';
  const show = async id => {
    const title = '缓存测试' + id;
    await evaluate('test.song(' + JSON.stringify(id) + ',' + JSON.stringify(title) + ');test.position(5.5)');
    await until('document.querySelector(".apple-now-playing-title").textContent', title);
  };
  const networkCalls = id => 'test.lyricCache.calls.filter(call=>call[1]===' + JSON.stringify(id) + ').length';
  const expectSource = source => until(label, '当前曲目歌词来源：' + source);
  const file = cached('94001');
  await show('94001');
  await expectSource('QQ 音乐 QRC');
  await until(file + '?.version', 1);
  const qq = await evaluate(file);
  assert.equal(qq.id, '94001');
  assert.deepEqual(qq.rows[0].words.map(word => [word.time, word.duration]), [[5000, 1000], [6000, 1000]]);
  assert.equal(qq.rows[0].translation, 'QQ译文');

  await show('94002');
  await expectSource('QQ 音乐 QRC');
  await evaluate('test.lyricCache.mode="offline";test.lyricCache.calls.length=0');
  await show('94001');
  await expectSource('QQ 音乐 QRC');
  await until('document.querySelector(".apple-now-playing-lyrics [data-time=\\"5000\\"]")?.textContent.includes("QQ缓存")', true);
  assert.equal(await evaluate(networkCalls('94001')), 0);

  await show('94002');
  await evaluate('test.lyricCache.expire("94001");test.lyricCache.mode="amll"');
  await show('94001');
  await until(file + '?.source', 'AMLL TTML');
  await expectSource('QQ 音乐 QRC');
  await evaluate('test.lyricCache.releaseSidecars()');
  await until(file + '.rows[0].translation', '补充译文');
  const upgraded = await evaluate(file);
  assert.deepEqual(upgraded.rows[0].romanWords.map(word => word.time), [5000, 6000]);
  assert.equal(upgraded.rows[0].backingLines[0].content, '背景');
  assert.equal(upgraded.rows[0].side, 'right');
  assert.deepEqual(upgraded.details.supplements, ['网易云译文', '网易云罗马音']);
  await expectSource('QQ 音乐 QRC');

  await show('94002');
  await evaluate('test.lyricCache.mode="offline";test.lyricCache.calls.length=0');
  await show('94001');
  await expectSource('AMLL TTML');
  assert.equal(await evaluate(networkCalls('94001')), 0);

  await evaluate('test.lyricCache.put("94003", JSON.stringify({...test.lyricCache.get("94001"),id:"94003"}))');
  await show('94003');
  await until('typeof test.lyricCache.releaseRead', 'function');
  await show('94002');
  await expectSource('QQ 音乐 QRC');
  await evaluate('test.lyricCache.releaseRead()');
  await pause(100);
  await expectSource('QQ 音乐 QRC');
  assert.equal(await evaluate(networkCalls('94003')), 0);

  await evaluate('test.lyricCache.expire("94001");test.lyricCache.mode="qq"');
  const stale = await evaluate(file);
  await show('94001');
  await until('test.lyricCache.calls.some(([source,id])=>source==="qq"&&id==="94001")', true);
  await expectSource('AMLL TTML');
  assert.deepEqual(await evaluate(file), stale);

  await show('94002');
  await evaluate('test.lyricCache.mode="offline";test.lyricCache.calls.length=0');
  await show('94001');
  await until(networkCalls('94001'), 5);
  await expectSource('AMLL TTML');
  assert.deepEqual(await evaluate(file), stale);

  await evaluate('test.lyricCache.mode="qq"');
  for (const [id, corrupt] of [['94004', 'broken JSON'], ['94005', JSON.stringify({ ...qq, id: '94005', version: 0 })]]) {
    await evaluate('test.lyricCache.put(' + JSON.stringify(id) + ',' + JSON.stringify(corrupt) + ')');
    await show(id);
    await expectSource('QQ 音乐 QRC');
    await until(cached(id) + '?.version', 1);
    assert.equal(await evaluate(networkCalls(id)), 4);
  }
  console.log('PASS local cache writes, offline hits, stale refresh without UI changes, sidecars, source priority, track switch, corruption and version fallback');

  const manualId = '94007';
  const manualCache = cached(manualId);
  await evaluate(`(() => {
    const prior = test.lyricCache.get('94005');
    const rows = prior.rows.map(row => ({ ...row, words: [], end: undefined }));
    test.lyricCache.put('${manualId}', JSON.stringify({ ...prior, id: '${manualId}', source: '网易云 LRC', rows }));
  })()`);
  await show(manualId);
  await expectSource('网易云 LRC');
  await evaluate('test.configPanel = test.config();document.body.append(test.configPanel);test.lyricCache.qqText="手动刷新"');
  const button = 'test.configPanel.querySelector("[data-refresh-lyrics]")';
  const result = 'test.configPanel.querySelector(".anp-config-result").textContent';
  const playbackButton = 'document.querySelector("#apple-now-playing-settings-tools [data-action=refresh-lyrics]")';
  const playbackResult = 'document.querySelector(".apple-now-playing-lyric-refresh-result").textContent';
  const hint = 'document.querySelector("#apple-now-playing-lyric-refresh-hint")';
  const row = 'document.querySelector(".apple-now-playing-lyrics [data-time=\\"5000\\"]")?.textContent';
  await action('settings');
  await evaluate('document.querySelector("[data-settings-category=tools]").click()');
  assert.equal(await evaluate(playbackButton + '.previousElementSibling.dataset.action'), 'source');
  assert.equal(await evaluate(hint + '.textContent'), '如果歌词未显示逐字动态效果，可以尝试刷新歌曲来源，重新获取支持逐字效果的歌词文件。');
  assert.ok(await evaluate(hint + '.getBoundingClientRect().top >= ' + playbackButton + '.getBoundingClientRect().bottom'));
  await evaluate('test.lyricCache.holdRefresh=true;' + playbackButton + '.click()');
  await until('typeof test.lyricCache.releaseRefresh', 'function');
  assert.equal(await evaluate(playbackButton + '.disabled && ' + button + '.disabled'), true);
  await evaluate('test.lyricCache.releaseRefresh()');
  await until(result, '歌词已刷新');
  assert.equal(await evaluate(playbackResult), '歌词已刷新');
  assert.equal(await evaluate(manualCache + '.rows[0].content'), '手动刷新缓存');
  assert.equal(await evaluate(manualCache + '.source'), 'QQ 音乐 QRC');
  assert.equal(await evaluate('test.configPanel.querySelector("output").textContent'), 'QQ 音乐 QRC');
  assert.ok((await evaluate(row)).includes('手动刷新缓存'));
  assert.ok(await evaluate(`test.lyricCache.calls.some(([source,id,cache])=>source==='amll'&&id==='${manualId}'&&cache==='reload')`));

  const beforeFailure = await evaluate(manualCache);
  await evaluate('test.lyricCache.mode="offline";' + button + '.click()');
  await until(result, '未获取到新歌词，现有歌词已保留');
  assert.equal(await evaluate(playbackResult), '未获取到新歌词，现有歌词已保留');
  assert.deepEqual(await evaluate(manualCache), beforeFailure);
  assert.ok((await evaluate(row)).includes('手动刷新缓存'));

  await evaluate('test.lyricCache.mode="qq";test.lyricCache.qqText="后台新词";test.lyricCache.releaseRefresh=null;test.lyricCache.holdRefresh=true;' + button + '.click()');
  await until('typeof test.lyricCache.releaseRefresh', 'function');
  assert.equal(await evaluate(button + '.disabled'), true);
  await show('94002');
  await evaluate('test.lyricCache.releaseRefresh()');
  await until(button + '.disabled', false);
  assert.deepEqual(await evaluate(manualCache), beforeFailure);
  assert.equal(await evaluate(result), '');
  assert.ok((await evaluate(row)).includes('QQ缓存'));

  await action('close');
  await until('document.querySelector("#apple-now-playing-page").hidden', true);
  await evaluate('test.song("94006","设置页后台刷新");test.position(5.5);' + button + '.click()');
  await until(result, '歌词已刷新');
  assert.equal(await evaluate(cached('94006') + '.rows[0].content'), '后台新词缓存');
  const refreshRequests = await evaluate(networkCalls('94006'));
  await evaluate('test.configPanel.querySelector("button").click()');
  await until(row + '?.includes("后台新词缓存")', true);
  assert.equal(await evaluate(networkCalls('94006')), refreshRequests);
  console.log('PASS both refresh entries, shared state, help placement, LRC-to-QRC update, offline fallback and track switching');
}).catch(error => { console.error(error); process.exitCode = 1; });
