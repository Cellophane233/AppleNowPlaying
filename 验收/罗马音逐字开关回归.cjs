'use strict';
const assert = require('node:assert/strict');
const { runUI } = require('./V2回归测试.cjs');

const control = 'document.querySelector("[data-preference=romanKaraoke]")';
const storage = 'JSON.parse(localStorage.getItem("apple-now-playing.preferences-v2"))';
const row = 'document.querySelector(".apple-now-playing-amll-host [data-time=\'5000\']")';
const roman = row + '?.querySelector(".anp-roman")';
const timed = '.anp-roman-timed > span';

(async () => {
  let saved;
  await runUI(async ({ evaluate, setting, until, action }) => {
    await action('settings');
    await evaluate('document.querySelector("[data-settings-category=reading]").click()');
    const fields = await evaluate('Array.from(document.querySelectorAll("#apple-now-playing-settings-reading [data-preference]"), e => e.dataset.preference)');
    assert.equal(fields[fields.indexOf('karaoke') + 1], 'romanKaraoke');
    assert.equal(await evaluate(control + '.closest(".apple-now-playing-pref-row").querySelector("label span").textContent'), '开启罗马音逐字');
    assert.equal(await evaluate(control + '.checked'), true);
    assert.equal(await evaluate(control + '.disabled'), true);
    await action('close-settings');

    await setting('roman', true);
    assert.equal(await evaluate(control + '.checked'), true);
    assert.equal(await evaluate(storage + '.romanKaraoke'), true);
    await evaluate('test.position(6.5)');
    await until(roman + '?.textContent', 'romaji one');
    const count = row + '?.querySelectorAll(' + JSON.stringify(timed) + ').length';
    await until(count, 2);
    await evaluate('(() => { const seek=document.querySelector(".apple-now-playing-seek"), r=seek.getBoundingClientRect();' +
      'seek.dispatchEvent(new PointerEvent("pointermove",{clientX:r.left+r.width*6.5/Number(seek.max)})); })()');
    const preview = 'document.querySelector(".apple-now-playing-preview-lyrics")';
    const previewCount = preview + '.querySelectorAll(' + JSON.stringify(timed) + ').length';
    await until(preview + '?.querySelector(".anp-roman")?.textContent', 'romaji one');
    await until(previewCount, 2);
    await until(roman + '.firstElementChild.style.webkitMaskImage.includes("linear-gradient")', true);
    assert.equal(await evaluate(storage + '.romanGrouping'), false);
    assert.equal(await evaluate(row + '.querySelectorAll(".anp-reading-group").length'), 0);
    await setting('karaoke', false);
    await until(count, 2);
    assert.equal(await evaluate(row + '.querySelector(".lyric_player_lyricMainLine").childElementCount'), 0);
    await setting('romanKaraoke', false);
    await until(count, 0);
    await until(previewCount, 0);
    assert.equal(await evaluate(storage + '.romanKaraoke'), false);
    saved = await evaluate(storage);
    assert.equal(saved.romanKaraoke, false);
  }, { preferences: { roman: false, romanGrouping: false } });

  await runUI(async ({ evaluate, setting, until, action }) => {
    assert.equal(await evaluate(control + '.checked'), false, 'restart restores the manual off state');
    await until(roman + '?.classList.contains("anp-roman-timed")', false);
    await action('toggle-roman');
    await until(control + '.checked', false);
    assert.equal(await evaluate(storage + '.romanKaraoke'), false);
    await action('toggle-roman');
    await until(roman + '?.textContent', 'romaji one');
    assert.equal(await evaluate(control + '.checked'), true);
    assert.equal(await evaluate(storage + '.romanKaraoke'), true);
    await until(roman + '.classList.contains("anp-roman-timed")', true);
    await setting('roman', false);
    assert.equal(await evaluate(storage + '.romanKaraoke'), false, 'settings change also persists the off state');
  }, { preferences: saved });
  console.log('PASS default roman karaoke, linked display toggle, manual override, persistence and instant preview');
})().catch(error => { console.error(error); process.exitCode = 1; });
