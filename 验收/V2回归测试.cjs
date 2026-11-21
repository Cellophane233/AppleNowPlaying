'use strict';
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawn } = require('node:child_process');
const assert = require('node:assert/strict');

function installHost() {
  const subscriptions = new Set(), progressSubscriptions = new Set();
  const calls = [], requests = [], clipboard = [], opened = [];
  const cover = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="#32657c"/><circle cx="90" cy="100" r="70" fill="#846376"/></svg>');
  const makeEntry = (id, resourceId, name, order) => ({
    resourceId, resourceType: 'track', trackId: id, displayOrder: order, localTrack: {},
    text: '测试来源', fromInfo: { sourceData: { name: '测试来源' } },
    track: { id, name, artists: [{ id: 1, name: '歌手 A' }, { id: 2, name: '歌手 B' }], album: { id: 3, name: '测试专辑' } },
  });
  const entries = [makeEntry('101', '101-local', '同歌本地项', 2), makeEntry('101', '101-online', '逐字样本', 0), makeEntry('102', '102-online', '逐字社区样本', 1)];
  const state = { 'async:action': {}, playing: { playingVolume: .49, playingMode: 'playOrder' }, playingList: { curPlayingList: entries } };
  let lastProgress, fallbackPosition = 0, seekIgnored = false, seekDelay = 25;
  const emit = () => subscriptions.forEach(callback => callback());
  function position(value) {
    fallbackPosition = value;
    lastProgress = { current: value, playId: state.playing.playId };
    progressSubscriptions.forEach(callback => callback(lastProgress));
  }
  function song(id, name, options = {}) {
    const entry = entries.find(item => item.trackId === id && item.resourceId.endsWith('online')) || makeEntry(id, id + '-online', name, 0);
    Object.assign(state.playing, {
      resourceTrackId: id, onlineResourceId: id, resourceName: name || entry.track.name,
      resourceType: 'track', resourceCoverUrl: id && !options.coverless ? cover : '',
      curTrack: id ? entry.track : undefined, curPlaying: id ? entry : undefined,
      resourceArtists: entry.track.artists, resourceDuration: id ? options.duration || 120 : 0,
      playId: id ? id + '_abc123' : '', playingState: 1, restoreResource: null, isLoadingFirst: false,
      resourcePlayingQuality: 999,
    });
    if (!options.stale) position(0);
    emit();
  }
  const store = {
    getState: () => state,
    subscribe(callback) { subscriptions.add(callback); return () => subscriptions.delete(callback); },
    dispatch(action) {
      calls.push(action);
      if (action.type === 'playing/setPlayingPosition' && !seekIgnored) {
        const id = state.playing.resourceTrackId;
        setTimeout(() => { if (id === state.playing.resourceTrackId) position(action.payload.duration); }, seekDelay);
      }
      if (action.type === 'playing/setVolume') { state.playing.playingVolume = action.payload.volume; emit(); }
      if (action.type === 'async:action/doAction' && action.payload.actionId === 'play') {
        const entry = action.payload.data.resource;
        song(entry.trackId, entry.track.name);
        state.playing.curPlaying = entry;
        emit();
      }
    },
  };
  const cache = {
    4: { exports: { Os: { openExternal: async url => opened.push(url) } } },
    8: { exports: { a: { app: { _store: store } } } },
    41: { exports: { e: () => ({ tagName: '无损' }) } },
    109: { exports: { b: { getValue: () => fallbackPosition } } },
    148: { exports: { b: () => lastProgress, e: { subscribe(callback) {
      progressSubscriptions.add(callback);
      return { unsubscribe: () => progressSubscriptions.delete(callback) };
    } } } },
  };
  const chunks = [];
  chunks.push = entry => Object.values(entry[1])[0](null, null, { c: cache, m: {} });
  window.webpackJsonp = chunks;
  Object.defineProperty(window, 'localStorage', { value: (() => {
    const values = new Map();
    return {
      getItem: key => values.get(key) ?? null,
      setItem: (key, value) => values.set(key, value),
      removeItem: key => values.delete(key),
    };
  })() });
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async value => { clipboard.push(value); } } });
  window.open = value => opened.push(value);
  window.loadedPlugins = {};
  window.APP_CONF = { domain: 'https://music.163.com' };
  let config, unload;
  window.plugin = { onLoad: callback => callback(), onConfig: callback => { config = callback; }, onUnload: callback => { unload = callback; } };
  const lrc = { code: 200, lrc: { lyric: '[00:05.00]第一行\n[00:12.00]第二行\n[00:16.00]\n[00:30.00]第三行' }, tlyric: { lyric: '[00:05.00]翻译一' }, romalrc: { lyric: '[00:05.00]romaji one' } };
  const yrc = { code: 200, lrc: { lyric: '[00:05.00]逐字歌词\n[00:20.00]再唱一句' },
    yrc: { lyric: '[5000,6000](5000,3000,0)逐字(8000,3000,0)歌词\n[20000,3000](20000,3000,0)再唱一句' },
    tlyric: { lyric: '[00:05.00]翻译一' }, romalrc: { lyric: '[00:05.00]romaji one' } };
  const ttml = '<tt xmlns="http://www.w3.org/ns/ttml" xmlns:ttm="http://www.w3.org/ns/ttml#metadata"><head><metadata><ttm:agent xml:id="v1" type="person"/><ttm:agent xml:id="v2" type="person"/></metadata></head><body><div><p begin="5s" end="11s" ttm:agent="v1"><span begin="5s" end="8s">主唱</span><span begin="8s" end="11s">第一句</span><span ttm:role="x-translation">译文一</span><span ttm:role="x-roman">romaji one</span><span ttm:role="x-bg" begin="7s" end="13s"><span begin="7s" end="13s">和声</span></span></p><p begin="8s" end="15s" ttm:agent="v2"><span begin="8s" end="15s">对唱第二句</span></p><p begin="30s" end="33s"><span begin="30s" end="33s">间奏之后</span></p></div></body></tt>';
  window.fetch = (url, options) => {
    const value = new URL(url);
    const native = value.hostname === 'music.163.com';
    const detail = value.pathname.includes('/detail');
    const id = detail ? JSON.parse(value.searchParams.get('ids'))[0] : native ? value.searchParams.get('id') : value.pathname.split('/').pop().split('.')[0];
    const record = { id, native, detail, aborted: false };
    requests.push(record);
    options.signal.addEventListener('abort', () => { record.aborted = true; }, { once: true });
    let data;
    if (detail) data = { songs: [{ id: Number(id), alias: ['中文别名'], transNames: ['译名'], artists: state.playing.resourceArtists, album: state.playing.curTrack?.album }] };
    else if (!native) data = id === '102' ? ttml : id === '109' ? ttml.replace('<span ttm:role="x-roman">romaji one</span>','') : null;
    else if (id === '101' || id === '108') data = yrc;
    else if (id === '102' || id === '103') data = lrc;
    else if (id === '109') data = {code:200,lrc:{lyric:'[00:05.00]主唱第一句\n[00:08.00]对唱第二句\n[00:30.00]间奏之后'},romalrc:{lyric:'[00:05.00]native romaji'}};
    else if (id === '104') data = { code: 200, lrc: { lyric: '' } };
    else if (id === '105') data = { code: 200, nolyric: true };
    else if (id === '106') data = null;
    else if (id === '107') data = { code: 200, lrc: { lyric: Array.from({ length: 2000 }, (_, i) =>
      '[' + String(Math.floor(i * 3 / 60)).padStart(2, '0') + ':' + String(i * 3 % 60).padStart(2, '0') + '.00]长歌词第 ' + i + ' 行').join('\n') } };
    if(id === '106') return Promise.reject(new TypeError('network unavailable'));
    return new Promise(resolve => setTimeout(() => resolve(data == null ?
      { ok: false, status: 404 } : { ok: true, status: 200, json: async () => data, text: async () => data }),
      id === '108' ? 500 : !native && id === '102' ? 500 : 15));
  };
  const footer = document.createElement('footer');
  const names = { play: 'tid_playbar_play_btn', previous: 'tid_playbar_prev_btn', next: 'tid_playbar_next_btn',
    favorite: 'tid_redstar_btn', queue: 'tid_playbar_playlist_btn', mode: 'tid_playmode_btn', cover: 'tid_btn_pc_minibar_vinyl' };
  for (const [action, id] of Object.entries(names)) {
    const button = document.createElement('button');
    button.dataset.testid = id;
    button.textContent = action;
    if (action === 'cover') {
      const image = new Image();
      image.src = cover;
      image.style.cssText = 'width:60px;height:60px';
      button.append(image);
    }
    button.addEventListener('click', () => {
      calls.push({ type: 'native-' + action });
      if (action === 'play') state.playing.playingState = state.playing.playingState === 2 ? 1 : 2;
      if (action === 'next') song('102', '逐字社区样本');
      if (action === 'previous') song('101', '逐字样本');
      if (action === 'mode') {
        const modes = ['playOrder', 'playCycle', 'playOneCycle', 'playRandom'];
        state.playing.playingMode = modes[(modes.indexOf(state.playing.playingMode) + 1) % modes.length];
      }
      if (action === 'favorite') button.setAttribute('aria-pressed', String(button.getAttribute('aria-pressed') !== 'true'));
      emit();
    });
    footer.append(button);
  }
  footer.style.cssText = 'position:fixed;bottom:0;left:0';
  document.body.append(footer);
  song('101', '逐字样本');
  window.test = { song, position, state, calls, requests, clipboard, opened, store, entries, cache, emit,
    config: () => config(), unload: () => unload?.(), counts: () => [subscriptions.size, progressSubscriptions.size],
    setSeek(ignore, delay = 25) { seekIgnored = ignore; seekDelay = delay; },
    visibility(hidden) {
      Object.defineProperty(document, 'hidden', { configurable: true, value: hidden });
      document.dispatchEvent(new Event('visibilitychange'));
    },
  };
}

async function run(extraTests, options = {}) {
  const root = path.resolve(__dirname, '..');
  const helpers = ['qq-lyrics-codec.js','qq-lyrics-provider.js','cover-save.js','vendor/extspotify/extspotify.js','ext-lyric-data.js','ext-lyric-view.js'].map(name=>fs.readFileSync(path.join(root,name),'utf8')).join('\n');
  const source = fs.readFileSync(path.join(root, 'playing.js'), 'utf8').replace("/* PLAYING_CSS */ ''", JSON.stringify(['vendor/extspotify/extspotify.css', 'playing.css'].map(name => fs.readFileSync(path.join(root, name), 'utf8')).join('\n')));
  const temp = path.resolve(os.tmpdir());
  const profile = fs.mkdtempSync(path.join(temp, 'apple-now-playing-v2-'));
  const browser = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new', '--user-data-dir=' + profile, '--remote-debugging-pipe', '--no-first-run',
    '--disable-background-networking', ...(options.hardwareGpu ? [] : ['--disable-gpu']), '--disable-extensions', 'about:blank',
  ], { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe', 'pipe', 'pipe'] });
  let input = '', sequence = 0, session, stderr = '';
  const pending = new Map(), errors = [];
  browser.stderr.on('data', chunk => { stderr += chunk.toString(); });
  browser.stdio[4].on('data', chunk => {
    input += chunk.toString();
    for (let end = input.indexOf('\0'); end >= 0; end = input.indexOf('\0')) {
      const message = JSON.parse(input.slice(0, end));
      input = input.slice(end + 1);
      if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
      const entry = pending.get(message.id);
      if (!entry) continue;
      clearTimeout(entry.timer);
      pending.delete(message.id);
      message.error ? entry.reject(Error(JSON.stringify(message.error))) : entry.resolve(message.result);
    }
  });
  const call = (method, params = {}, sessionId = session) => new Promise((resolve, reject) => {
    const id = ++sequence;
    const timer = setTimeout(() => { pending.delete(id); reject(Error(method + ' timeout ' + stderr.slice(-400))); }, 9000);
    pending.set(id, { resolve, reject, timer });
    browser.stdio[3].write(JSON.stringify({ id, method, params, sessionId }) + '\0');
  });
  const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
  const evaluate = async expression => {
    const result = await call('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (result.exceptionDetails) throw Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
    return result.result.value;
  };
  const until = async (expression, expected, timeout = 7000) => {
    const deadline = Date.now() + timeout;
    let actual;
    while (Date.now() < deadline) {
      actual = await evaluate(expression);
      if (JSON.stringify(actual) === JSON.stringify(expected)) return actual;
      await pause(50);
    }
    assert.deepEqual(actual, expected, expression);
  };
  const click = selector => evaluate('document.querySelector(' + JSON.stringify(selector) + ').click()');
  const action = name => click('#apple-now-playing-page [data-action="' + name + '"]');
  const setting = (key, value) => evaluate('(function(){const input=document.querySelector(' + JSON.stringify('[data-preference="' + key + '"]') + ');input.' +
    (typeof value === 'boolean' ? 'checked' : 'value') + '=' + JSON.stringify(value) + ';input.dispatchEvent(new Event(input.type==="range"?"input":"change",{bubbles:true}));})()');
  const sourceLabel = 'test.config().querySelector("div").textContent';
  const elapsed = 'document.querySelector(".apple-now-playing-elapsed").textContent';
  try {
    const target = await call('Target.createTarget', { url: 'about:blank' }, undefined);
    session = (await call('Target.attachToTarget', { targetId: target.targetId, flatten: true }, undefined)).sessionId;
    await call('Runtime.enable');
    await call('Page.enable');
    await call('Emulation.setDeviceMetricsOverride', { width: 1240, height: 900, deviceScaleFactor: 1, mobile: false });
    const tree = await call('Page.getFrameTree');
    await call('Page.setDocumentContent', { frameId: tree.frameTree.frame.id, html: '<!doctype html><html lang="zh-CN"><meta charset="utf-8"><body></body></html>' });
    await evaluate('(' + installHost.toString() + ')()');
    await evaluate(helpers);
    await evaluate('test.qqRequests=[];AppleNowPlayingQQLyrics.fetchLyrics=async(track,signal)=>{test.qqRequests.push({track,signal});return null}');
    const storageValues = {
      'preferences-v2': JSON.stringify({ gradientDim: 18 }),
      'lyric-offsets': JSON.stringify({ 555: -300 }),
      'takeover-vinyl': 'on',
    };
    if (!options.onlyUI) {
      for (const [suffix, value] of Object.entries(storageValues)) {
        await evaluate('localStorage.setItem(' + JSON.stringify('apple-style-now-playing.' + suffix) + ',' +
          JSON.stringify(suffix === 'takeover-vinyl' ? 'off' : value) + ')');
      }
      await evaluate('localStorage.setItem("apple-playing.preferences-v2", ' + JSON.stringify(storageValues['preferences-v2']) + ')');
      await evaluate('localStorage.setItem("apple-style-now-playing.preferences-v2", "{}")');
      await evaluate('localStorage.setItem("apple-playing.takeover-vinyl", "off")');
      await evaluate('localStorage.setItem("apple-now-playing.takeover-vinyl", "on")');
    }
    if (options.preferences) {
      await evaluate('localStorage.setItem("apple-now-playing.preferences-v2",' + JSON.stringify(JSON.stringify(options.preferences)) + ')');
    }
    await evaluate(source);
    if (!options.onlyUI) {
      const links = await evaluate('(' + async function () {
        const original = window.betterncm;
        const link = test.config().querySelector('a');
        const urls = [];
        const start = test.opened.length;
        const click = () => link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        try {
          window.betterncm = { app: { exec: async url => urls.push(url) } };
          const primary = click();
          window.betterncm.app.exec = async () => { throw Error('unavailable'); };
          const fallback = click();
          await Promise.resolve();
          delete window.betterncm.app.exec;
          const native = click();
          return { urls, host: test.opened.slice(start), cancelled: [primary, fallback, native] };
        } finally {
          window.betterncm = original;
        }
      } + ')()');
      const communityUrl = 'https://github.com/amll-dev/amll-ttml-db';
      assert.deepEqual(links, { urls: [communityUrl], host: [communityUrl, communityUrl], cancelled: [false, false, false] });
      for (const [suffix, value] of Object.entries(storageValues)) {
        assert.equal(await evaluate('localStorage.getItem(' + JSON.stringify('apple-now-playing.' + suffix) + ')'), value);
        assert.equal(await evaluate('localStorage.getItem(' + JSON.stringify('apple-playing.' + suffix) + ')'), null);
        assert.equal(await evaluate('localStorage.getItem(' + JSON.stringify('apple-style-now-playing.' + suffix) + ')'), null);
      }
    }
    await click('[data-testid="tid_btn_pc_minibar_vinyl"]');
    await until('document.querySelector("#apple-now-playing-page").hidden', false);
    await until('test.counts()', [1, 1]);
    await until(sourceLabel, '当前曲目歌词来源：网易云 YRC');
    if (options.onlyUI) {
      await extraTests({evaluate,call,until,click,action,setting,pause,errors,browserPid:browser.pid});
      assert.deepEqual(errors, []);
      console.log('PASS focused playback UI checks');
      return;
    }
    await evaluate('test.position(6.5)');
    await until(elapsed, '0:06');
    await until('document.querySelector(".apple-now-playing-line.current .apple-now-playing-word")?.style.getPropertyValue("--lit")', '50%');
    await evaluate('test.position(5.6)');
    await until('document.querySelector(".apple-now-playing-line.current .apple-now-playing-word")?.style.getPropertyValue("--lit")', '20%');
    await action('offset-ahead');
    await until('JSON.parse(localStorage.getItem("apple-now-playing.lyric-offsets"))["101"]', 100);
    await action('lyric');
    await until('test.calls.filter(x=>x.type==="playing/setPlayingPosition").at(-1).payload.duration', 4.9);
    await action('offset-reset');
    await evaluate('test.song("108","暂停定位",{stale:false});test.state.playing.restoreResource={current:0};test.state.playing.playId="";test.setSeek(true)');
    await until(elapsed,'0:00');
    await evaluate('const s=document.querySelector(".apple-now-playing-seek");s.value=50;s.dispatchEvent(new Event("change"))');
    await until(elapsed,'0:50');
    await pause(1500);
    await until(elapsed,'0:00');
    const seekCount=await evaluate('test.calls.filter(x=>x.type==="playing/setPlayingPosition").length');
    await evaluate('test.setSeek(false);test.state.playing.restoreResource=null;test.state.playing.playId="108_abc123";test.state.playing.playingState=2;test.position(0)');
    await until('test.calls.filter(x=>x.type==="playing/setPlayingPosition").length',seekCount+1);
    await pause(350);
    await until('Number(document.querySelector(".apple-now-playing-seek").value)>=50',true);
    await evaluate('test.song("101","逐字样本")');
    await until('document.querySelector(".apple-now-playing-title").textContent','逐字样本');
    await until(sourceLabel,'当前曲目歌词来源：网易云 YRC');
    await until('!!document.querySelector(".apple-now-playing-lyric-roman")', true);
    await action('toggle-karaoke');
    await until('document.querySelectorAll(".apple-now-playing-word").length', 0);
    await action('toggle-karaoke');
    await action('copy-view');
    await until('document.querySelector(".apple-now-playing-copy-view").hidden', false);
    await until('document.querySelector(".apple-now-playing-copy-text").value.includes("romaji one")', true);
    await action('copy-all');
    await until('test.clipboard.length', 1);
    await evaluate('document.querySelector(".apple-now-playing-copy-text").dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:true,cancelable:true}))');
    await until('document.querySelector(".apple-now-playing-copy-view").hidden',true);
    await evaluate('window.savedClipboard=navigator.clipboard;window.savedExec=document.execCommand;Object.defineProperty(navigator,"clipboard",{configurable:true,value:undefined});document.execCommand=()=>false');
    await action('menu');await action('copy-track');
    await until('document.querySelector(".apple-now-playing-copy-view").hidden',false);
    await until('document.activeElement===document.querySelector(".apple-now-playing-copy-text")',true);
    await until('document.querySelector(".apple-now-playing-copy-text").selectionEnd===document.querySelector(".apple-now-playing-copy-text").value.length',true);
    await evaluate('Object.defineProperty(navigator,"clipboard",{configurable:true,value:savedClipboard});document.execCommand=savedExec;delete savedClipboard;delete savedExec');
    await action('copy-view');
    await action('menu');
    await until('document.querySelector(".apple-now-playing-menu").hidden', false);
    await action('settings');
    await setting('alias', 'both');
    await until('document.querySelector(".apple-now-playing-alias").textContent', '中文别名 / 译名');
    assert.equal(await evaluate('document.querySelector("[data-preference=scheme]") === null'), true);
    for (const background of ['blur', 'solid', 'fluid', 'gradient']) {
      await setting('background', background);
      await until('document.querySelector("#apple-now-playing-page").dataset.background', background);
    }
    await setting('coverShadow', true);
    await setting('textShadow', true);
    await setting('textGlow', true);
    await setting('fontSize', '42');
    await until('getComputedStyle(document.querySelector(".apple-now-playing-line:not(.apple-now-playing-interlude)")).fontSize', '42px');
    await setting('alignment', 'upper');
    await setting('scrollbar', false);
    await evaluate('document.querySelector("[data-preference=karaoke]").focus();document.activeElement.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:true,cancelable:true}))');
    await until('document.querySelector(".apple-now-playing-settings-panel").hidden',true);
    await action('queue');
    await until('document.querySelector(".apple-now-playing-queue-row[aria-current=true] .apple-now-playing-queue-song")?.textContent', '逐字样本');
    await until('document.querySelectorAll(".apple-now-playing-queue-row[aria-current=true]").length', 1);
    await click('[data-action="queue-play"][data-resource-id="101-local"]');
    await until('test.state.playing.curPlaying.resourceId', '101-local');
    await action('queue');
    await until('document.querySelector("#apple-now-playing-page").dataset.panel', 'none');
    await action('lyrics');
    await setting('display', 'lyrics');
    await until('document.querySelector("#apple-now-playing-page").dataset.display', 'lyrics');
    await setting('display', 'cover');
    await until('document.querySelector("#apple-now-playing-page").dataset.panel', 'none');
    await setting('display', 'all');
    await setting('fontSize', 'auto');
    await action('next');
    await until(sourceLabel, '当前曲目歌词来源：AMLL TTML');
    await evaluate('document.querySelector(".apple-now-playing-lyrics").dispatchEvent(new WheelEvent("wheel"));document.querySelector(".apple-now-playing-lyrics").scrollTop=300');
    await until('document.querySelector(".apple-now-playing-lyrics").scrollTop>50',true);
    await evaluate('test.position(9)');
    await until('document.querySelectorAll(".apple-now-playing-line.current:not(.apple-now-playing-interlude)").length', 2);
    await until('!!document.querySelector(".apple-now-playing-line.right .apple-now-playing-word")', true);
    await evaluate('test.position(22)');
    await until('!!document.querySelector(".apple-now-playing-interlude.current")', true);
    await evaluate('test.song("109","有原生罗马音的社区歌词")');
    await until('document.querySelector(".apple-now-playing-title").textContent','有原生罗马音的社区歌词');
    await until(sourceLabel,'当前曲目歌词来源：AMLL TTML');
    await until('document.querySelector(".apple-now-playing-lyric-roman")?.textContent','native romaji');
    await evaluate('test.song("103","逐行歌词")');
    await until(sourceLabel, '当前曲目歌词来源：网易云 LRC');
    await evaluate('test.position(13)');
    await until('document.querySelector(".apple-now-playing-line.current:not(.apple-now-playing-interlude)")?.textContent.includes("第二行")', true);
    await evaluate('test.song("108","迟到旧曲");');
    await pause(40);
    await evaluate('test.song("104","无同步歌词")');
    await until('document.querySelector(".apple-now-playing-status").textContent', '暂无同步歌词');
    await pause(550);
    await until('document.querySelectorAll(".apple-now-playing-line").length', 0);
    await evaluate('test.song("105","纯音乐")');
    await until('document.querySelector(".apple-now-playing-status").textContent', '纯音乐');
    await evaluate('test.song("106","失败曲目")');
    await until('document.querySelector(".apple-now-playing-status").textContent', '歌词获取失败');
    await evaluate('test.song("107","长歌词",{duration:10000})');
    await until(sourceLabel, '当前曲目歌词来源：网易云 LRC');
    await until('document.querySelectorAll(".apple-now-playing-line").length < 80', true);
    await evaluate('test.position(3000)');
    await until('document.querySelector(".apple-now-playing-line.current")?.textContent.includes("1000")', true);
    await call('Emulation.setDeviceMetricsOverride', { width: 565, height: 770, deviceScaleFactor: 1, mobile: false });
    await until('getComputedStyle(document.querySelector("#apple-now-playing-page")).gridTemplateColumns.trim().split(" ").length', 1);
    await evaluate('new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))');
    await evaluate('document.querySelector(".apple-now-playing-grip").focus();document.querySelector(".apple-now-playing-lyrics").dispatchEvent(new WheelEvent("wheel",{deltaY:800}));document.querySelector(".apple-now-playing-lyrics").scrollTop+=800');
    await until('document.querySelector("#apple-now-playing-page").classList.contains("controls-hidden")', true);
    await evaluate('document.querySelector("#apple-now-playing-page").dispatchEvent(new PointerEvent("pointermove"))');
    await until('document.querySelector("#apple-now-playing-page").classList.contains("controls-hidden")', false);
    await action('close');
    await until('document.querySelector("#apple-now-playing-page").hidden', true);
    await until('test.counts()', [0, 0]);
    await click('#apple-now-playing-launch');
    await until('test.counts()', [1, 1]);
    await evaluate('test.visibility(true)');
    await until('test.counts()', [0, 0]);
    await until('document.querySelector("#apple-now-playing-page").getAnimations({subtree:true}).length', 0);
    await evaluate('test.visibility(false)');
    await until('test.counts()', [1, 1]);
    await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
    await until('document.querySelector(".apple-now-playing-backdrop.on").getAnimations().length', 0);
    if (extraTests) await extraTests({evaluate,call,until,click,action,setting,pause,errors,browserPid:browser.pid});
    assert.deepEqual(errors, []);
    console.log('PASS V1 and V2 source, offsets, copying, preferences, native action forwarding, overlap/interlude, virtualization and lifecycle');
  } catch (error) {
    const shot=await call('Page.captureScreenshot',{format:'png'}).catch(()=>null);
    if(shot)fs.writeFileSync(path.join(__dirname,'回归失败截图.png'),Buffer.from(shot.data,'base64'));
    console.error('Failure state:',await evaluate('({panel:document.querySelector("#apple-now-playing-page")?.dataset.panel,size:[innerWidth,innerHeight],focus:document.activeElement?.className,active:document.querySelector("#apple-now-playing-page")?.className,scroll:document.querySelector(".apple-now-playing-lyrics")?.scrollTop})').catch(()=>null));
    throw error;
  } finally {
    browser.kill();
    for (const entry of pending.values()) clearTimeout(entry.timer);
    await pause(700);
    if (path.dirname(profile) === temp && path.basename(profile).startsWith('apple-now-playing-v2-')) {
      try { fs.rmSync(profile, { recursive: true, force: true }); } catch (_) {}
    }
  }
}
if (require.main === module) run().catch(error => { console.error(error); process.exitCode = 1; });
module.exports = { run, runUI: (callback, options) => run(callback, { ...options, onlyUI: true }) };
