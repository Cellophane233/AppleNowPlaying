'use strict';
const assert = require('node:assert/strict');
const { runUI } = require('./V2回归测试.cjs');
const { repo } = require('../plugins-list/AppleNowPlaying.json');
const repository = 'https://github.com/' + repo;
const expectedLinks = ['https://github.com/amll-dev/amll-ttml-db', repository, repository + '/issues'];

runUI(async ({ evaluate, action, call, until }) => {
  await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'light' }] });
  await evaluate(`(() => {
    const mount = document.createElement('aside');
    document.body.append(mount);
    test.configMount = mount;
    mount.append(test.config());
  })()`);
  const selector = '.apple-now-playing-settings';
  const root = 'document.querySelector(' + JSON.stringify(selector) + ')';
  const toggle = root + '.querySelector("input[role=switch]")';
  const storage = 'localStorage.getItem("apple-now-playing.takeover-vinyl")';
  assert.equal(await evaluate(root + '.querySelector("h2").textContent'), 'AppleNowPlaying 设置');
  assert.deepEqual(await evaluate('Array.from(' + root + '.querySelectorAll("h3"), h => h.textContent)'), ['播放页', '歌词', '项目']);
  assert.equal(await evaluate(root + '.querySelectorAll(".anp-config-card").length'), 7);
  assert.equal(await evaluate('getComputedStyle(' + toggle + ').backgroundColor'), 'rgb(209, 44, 55)');
  for (const width of [720, 240]) {
    const layout = await evaluate('(' + function (width) {
      test.configMount.style.width = width + 'px';
      const config = test.configMount.firstElementChild;
      const cards = Array.from(config.querySelectorAll('.anp-config-card'));
      return cards.every(card => card.scrollWidth <= card.clientWidth + 1 &&
        getComputedStyle(card).backgroundColor === 'rgb(255, 255, 255)' &&
        (card.classList.contains('anp-source-config') || card.querySelector('svg')));
    } + ')(' + width + ')');
    assert.equal(layout, true);
  }
  await evaluate(toggle + '.click()');
  assert.equal(await evaluate(storage), 'off');
  assert.equal(await evaluate(toggle + '.checked'), false);
  await evaluate(toggle + '.click()');
  assert.equal(await evaluate(storage), 'on');
  await evaluate('test.song("103","歌词来源测试")');
  await until(root + '.querySelector("output").textContent', '网易云 LRC');
  assert.deepEqual(await evaluate('Array.from(' + root + '.querySelectorAll("a"), link => link.href)'), expectedLinks);
  await evaluate(`(function () {
    test.configLinks = [];
    test.configFallback = [];
    window.betterncm = {
      ncm: { openUrl: async url => { test.configLinks.push(url); } },
      app: { exec: async url => { test.configFallback.push(url); } },
    };
    for (const link of ${root}.querySelectorAll('a')) link.click();
  })()`);
  assert.deepEqual(await evaluate('test.configLinks'), expectedLinks);
  assert.deepEqual(await evaluate('test.configFallback'), []);
  await evaluate(`window.betterncm.ncm.openUrl = async () => false;
    ${root}.querySelector('a[href$="/issues"]').click();`);
  await until('test.configFallback.at(-1)', repository + '/issues');
  await evaluate(`window.betterncm.ncm.openUrl = async () => { throw Error('unavailable'); };
    window.betterncm.app.exec = async () => { throw Error('unavailable'); };
    ${root}.querySelector('a[href$="/issues"]').click();`);
  await until('test.opened.at(-1)', repository + '/issues');
  await action('close');
  await until('document.querySelector("#apple-now-playing-page").hidden', true);
  await evaluate(root + '.querySelector("button").click()');
  await until('document.querySelector("#apple-now-playing-page").hidden', false);
  console.log('PASS config card styling at wide and narrow widths, takeover persistence, live source, link, and playback entry');
}).catch(error => { console.error(error); process.exitCode = 1; });
