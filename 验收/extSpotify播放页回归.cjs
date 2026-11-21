'use strict';
const assert = require('node:assert/strict');
const { runUI } = require('./V2回归测试.cjs');

runUI(async ({ evaluate, until, action, click, setting, pause }) => {
  const finish = await evaluate('(' + function () {
    const letter = document.createElement('span');
    letter.textContent = 'ず';
    letter.style.cssText = 'display:inline-block;font-size:60px';
    document.body.append(letter);
    const animation = letter.animate([{ transform: 'translateY(0px)' }, { transform: 'translateY(-.05em)' }], {
      id: 'float-word', duration: 1000, easing: 'ease-out', composite: 'add', fill: 'both',
    });
    const sync = AppleNowPlayingExtView.prototype.syncEffect.bind({ animationEnds: new WeakMap([[animation, 1000]]) });
    const readPosition = () => ({ t: animation.currentTime, y: new DOMMatrix(getComputedStyle(letter).transform).m42 });
    try {
      animation.finish();
      sync(animation, 980, 1, false);
      const earlyEnd = readPosition();
      sync(animation, 1000, 1, false);
      const caughtUp = readPosition();
      sync(animation, 400, 0, true);
      const rewound = readPosition();
      sync(animation, 400, 1, true);
      return { earlyEnd, caughtUp, rewound, resumed: animation.playState };
    } finally {
      animation.cancel();
      letter.remove();
    }
  } + ')()');
  assert.deepEqual(finish.earlyEnd, { t: 1000, y: -3 });
  assert.deepEqual(finish.caughtUp, finish.earlyEnd);
  assert.equal(finish.rewound.t, 400);
  assert.ok(finish.rewound.y > -3 && finish.rewound.y < 0);
  assert.equal(finish.resumed, 'running');

  const root = '.apple-now-playing-lyrics .amll-lyric-player.dom';
  const row = root + ' [data-time="5000"]';
  const original = row + ' .lyric_player_lyricMainLine';
  const effect = 'document.querySelector(' + JSON.stringify(original) + ').getAnimations({subtree:true})';
  const float = effect + '.find(a=>a.id==="float-word")';
  const fade = effect + '.find(a=>a.id.startsWith("fade-word-"))';
  const seek = ms => evaluate('test.position(' + ms / 1000 + ');test.emit()');
  const read = () => evaluate('(()=>{const a=' + float + ';return {t:a.currentTime, state:a.playState,' +
    'y:new DOMMatrix(getComputedStyle(a.effect.target).transform).m42,' +
    'mask:getComputedStyle((' + fade + ').effect.target).webkitMaskPosition};})()');
  await seek(5400);
  await until('!!(' + fade + ')', true);
  await pause(120);
  const start = await read();
  await pause(140);
  assert.deepEqual(await read(), start);
  assert.equal(start.state, 'paused');
  await seek(6800);
  await pause(130);
  const later = await read();
  assert.ok(later.y < start.y && later.mask !== start.mask);
  await seek(5400);
  await pause(130);
  assert.deepEqual(await read(), start);

  await setting('lyricLift', false);
  await until('new DOMMatrix(getComputedStyle((' + float + ').effect.target).transform).m42', 0);
  await seek(6800);
  await pause(100);
  assert.equal((await read()).y, 0);
  assert.equal((await read()).mask, later.mask);
  await setting('lyricLift', true);

  await setting('roman', true);
  await until('document.querySelector(' + JSON.stringify(row) + ')?.querySelector(".anp-roman")?.textContent', 'romaji one');
  await click(row);
  await until('test.calls.filter(x=>x.type==="playing/setPlayingPosition").at(-1)?.payload.duration', 5);
  await action('queue');
  await action('lyrics');
  await until('document.querySelectorAll(' + JSON.stringify(root) + ').length', 1);
  await setting('karaoke', false);
  await until('document.querySelector(' + JSON.stringify(original) + ')?.textContent', '逐字歌词');
  assert.equal(await evaluate(effect + '.filter(a=>a.id==="float-word").length'), 0);
  await setting('karaoke', true);
  await seek(21100);
  await until('document.querySelector(' + JSON.stringify(root + ' [aria-current]') + ')?.dataset.time', '20000');
  console.log('PASS hold lyric lift at its endpoint, pause, seek, rewind, lift switch with active mask, romanization, line click, panel reopening and line-only mode');
}).catch(error => { console.error(error); process.exitCode = 1; });
