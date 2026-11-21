(function (root) {
  'use strict';

  // Keep source segments intact. TTML can also contain untimed spaces and
  // punctuation between spans; attach them to a neighbour without adding beats.
  function timedWords(source) {
    const words = [];
    let prefix = '';
    for (const part of source || []) {
      if (!part.text) continue;
      if (!Number.isFinite(part.time) || !(part.duration > 0) || !Number.isFinite(part.duration)) {
        if (words.length) words[words.length - 1].word += part.text;
        else prefix += part.text;
        continue;
      }
      words.push({ word: prefix + part.text, startTime: part.time, endTime: part.time + part.duration });
      prefix = '';
    }
    return words;
  }

  function readingTimeline(vocal) {
    const explicit = timedWords(vocal.romanWords);
    if (explicit.length) return explicit;
    // A line-only transliteration can inherit original or ruby beats only
    // when there is one distinct reading token for each measured beat.
    const tokens = (vocal.roman || '').match(/\S+\s*/g) || [];
    const beats = (vocal.words || []).filter(w => w.duration > 0 && /[\p{L}\p{N}]/u.test(w.text));
    const ruby = beats.flatMap(w => w.ruby?.length ? w.ruby : [{ startTime: w.time, endTime: w.time + w.duration }]);
    const timing = tokens.length === ruby.length ? ruby : beats.map(w => ({ startTime: w.time, endTime: w.time + w.duration }));
    if (!tokens.length || timing.length !== tokens.length || (tokens.length === 1 && !beats.length)) return [];
    return tokens.map((word, i) => ({ word, startTime: timing[i].startTime, endTime: timing[i].endTime }));
  }

  const kanaReadings = new Map();
  for (const [kana, readings] of [
    ['\u3042\u3044\u3046\u3048\u304a', 'a i u e o'], ['\u304b\u304d\u304f\u3051\u3053', 'ka ki ku ke ko'], ['\u304c\u304e\u3050\u3052\u3054', 'ga gi gu ge go'],
    ['\u3055\u3057\u3059\u305b\u305d', 'sa shi su se so'], ['\u3056\u3058\u305a\u305c\u305e', 'za ji zu ze zo'], ['\u305f\u3061\u3064\u3066\u3068', 'ta chi tsu te to'],
    ['\u3060\u3062\u3065\u3067\u3069', 'da ji zu de do'], ['\u306a\u306b\u306c\u306d\u306e', 'na ni nu ne no'], ['\u306f\u3072\u3075\u3078\u307b', 'ha hi fu he ho'],
    ['\u3070\u3073\u3076\u3079\u307c', 'ba bi bu be bo'], ['\u3071\u3074\u3077\u307a\u307d', 'pa pi pu pe po'], ['\u307e\u307f\u3080\u3081\u3082', 'ma mi mu me mo'],
    ['\u3084\u3086\u3088', 'ya yu yo'], ['\u3089\u308a\u308b\u308c\u308d', 'ra ri ru re ro'], ['\u308f\u3092\u3093\u3094', 'wa wo n vu'],
  ]) {
    readings.split(' ').forEach((reading, i) => kanaReadings.set(kana[i], reading));
  }

  function readKana(text) {
    const kana = text.replace(/[\u30a1-\u30f6]/g, char => String.fromCharCode(char.charCodeAt(0) - 0x60));
    let reading = '';
    let geminate = false;
    for (let i = 0; i < kana.length; i++) {
      const char = kana[i];
      if (char === '\u3063' && !geminate) {
        geminate = true;
        continue;
      }
      if (char === '\u30fc' && /[aeiou]$/.test(reading) && !geminate) {
        reading += reading.slice(-1);
        continue;
      }
      let sound = kanaReadings.get(char);
      if (!sound) return '';
      const glide = '\u3083\u3085\u3087'.indexOf(kana[i + 1] || ' ');
      if (glide >= 0 && sound.endsWith('i') && sound.length > 1) {
        const stem = sound.slice(0, -1);
        sound = stem + (/^(sh|ch|j)$/.test(stem) ? '' : 'y') + 'auo'[glide];
        i++;
      }
      if (geminate && !/^[bcdfghjkmprstvz]/.test(sound)) return '';
      reading += (geminate ? (sound.startsWith('ch') ? 't' : sound[0]) : '') + sound;
      geminate = false;
    }
    return geminate ? '' : reading;
  }

  const japaneseWords = typeof Intl.Segmenter === 'function' && Intl.Segmenter.supportedLocalesOf('ja').length
    ? new Intl.Segmenter('ja', { granularity: 'word' }) : null;
  const readingCache = new WeakMap();

  function lexicalReadings(original, tokens, scriptGroups, roman, startTime) {
    if (!japaneseWords) return [];
    const words = [...japaneseWords.segment(original)].filter(part => part.isWordLike);
    if (!words.length || words.some(part => /^[\u3063\u3093\u3083\u3085\u3087\u30fc]+$/u.test(part.segment))) return [];
    const starts = words.map(part => part.index);
    starts[0] = 0;
    starts.push(original.length);

    // Split only within verified phonetic blocks, where the reading boundary can be recovered.
    const offsets = [0];
    let next = 1, romanStart = 0;
    for (let i = 0; i < tokens.length && next < starts.length - 1; i++) {
      const block = tokens[i][0];
      const from = tokens[i].index;
      const reading = scriptGroups[i].roman.toLowerCase();
      while (starts[next] < from + block.length) {
        if (starts[next] < from) return [];
        const head = block.slice(0, starts[next] - from);
        const prefix = /^[a-z0-9]+$/i.test(head) ? head.toLowerCase() : readKana(head);
        if ((head && !prefix) || !reading.startsWith(prefix) || prefix.length >= reading.length) return [];
        offsets.push(romanStart + prefix.length);
        next++;
      }
      romanStart += reading.length;
    }
    if (offsets.length !== starts.length - 1) return [];
    offsets.push(roman.length);
    const groups = [];
    for (let i = 0; i + 1 < starts.length; i++) {
      if (offsets[i + 1] <= offsets[i]) return [];
      groups.push({ text: original.slice(starts[i], starts[i + 1]).trim(),
        roman: roman.slice(offsets[i], offsets[i + 1]), startTime });
    }
    return groups;
  }

  function annotatedReadings(vocal, words) {
    if (!vocal.romanWords?.length || !words.length) return [];
    const groups = [];
    let index = 0;
    for (const caption of timedWords(vocal.romanWords)) {
      const start = index;
      if (words[start]?.startTime !== caption.startTime || !caption.word.trim()) return [];
      let end = caption.startTime;
      while (index < words.length && end < caption.endTime) {
        const word = words[index++];
        if (word.startTime < end || word.endTime > caption.endTime) return [];
        end = word.endTime;
      }
      if (end !== caption.endTime || !Number.isFinite(end)) return [];
      groups.push({ from: start, to: index, roman: caption.word.trim(),
        startTime: caption.startTime, endTime: end });
    }
    return index === words.length ? groups : [];
  }

  // shortcut: match standard kana and unique anchors, expand only with representative source samples.
  function alignedReadings(vocal, words) {
    const original = vocal.content.normalize('NFC');
    const roman = (vocal.roman || '').normalize('NFKC').replace(/[\s.,!?\u3001\u3002\uff01\uff1f\u30fb\u2026]/g, '');
    if (!/[\p{Script=Hiragana}\p{Script=Katakana}]/u.test(original)) return [];
    const explicit = annotatedReadings(vocal, words);
    if (explicit.length) return explicit;
    if (!/^[a-z0-9]+$/i.test(roman)) return [];
    const tokens = [...original.matchAll(/[\p{Script=Hiragana}\p{Script=Katakana}\u30fc]+|[\p{Script=Han}\u3005\u3006]+|[a-z0-9]+/giu)];
    const key = roman.toLowerCase();
    const anchors = tokens.map(([part]) => /^[a-z0-9]+$/i.test(part) ? part.toLowerCase() :
      /[\p{Script=Han}\u3005\u3006]/u.test(part) ? null : readKana(part));
    const groups = [];
    let offset = 0;
    for (let i = 0; i < tokens.length; i++) {
      const anchor = anchors[i];
      const text = original.slice(i === 0 ? 0 : tokens[i].index, tokens[i + 1]?.index).trim();
      if (anchor === "" || !/^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}\p{P}\s\u3005\u3006\u30fc\da-z]+$/iu.test(text)) return [];
      let end;
      if (anchor === null) {
        // Keep supplied kanji readings only when their boundary is pinned by an unambiguous anchor.
        if (i === tokens.length - 1) end = key.length;
        else {
          const next = anchors[i + 1];
          if (!next) return [];
          end = key.indexOf(next, offset + 1);
          if (end < 0 || key.indexOf(next, end + 1) >= 0) return [];
        }
      } else {
        const particle = { '\u306f': 'wa', '\u3078': 'e', '\u3092': 'o' }[tokens[i][0]];
        const reading = key.startsWith(anchor, offset) ? anchor : particle;
        if (!reading || !key.startsWith(reading, offset)) return [];
        end = offset + reading.length;
      }
      if (end <= offset) return [];
      groups.push({ text, roman: roman.slice(offset, end), startTime: vocal.time });
      offset = end;
    }
    if (offset !== key.length) return [];
    const lexical = vocal.romanWords?.length ? [] : lexicalReadings(original, tokens, groups, roman, vocal.time);
    const preferred = timeReadings(lexical, words, original);
    return preferred.length ? preferred : timeReadings(groups, words, original);
  }

  function timeReadings(groups, words, original) {
    if (!groups.length || !words.length) return groups;
    const compact = text => text.normalize('NFC').replace(/\s/g, '');
    const compactOriginal = compact(original);
    if (words.map(word => compact(word.word)).join('') !== compactOriginal ||
        words.some((word, i) => i && word.startTime < words[i - 1].startTime)) return [];

    // Keep a timed source span intact when it crosses a reading boundary.
    const aligned = [];
    let groupEnd = 0, wordEnd = 0, index = 0, start = 0;
    let reading = '';
    for (const group of groups) {
      groupEnd += compact(group.text).length;
      reading += (reading ? ' ' : '') + group.roman;
      while (wordEnd < groupEnd) wordEnd += compact(words[index++].word).length;
      if (wordEnd !== groupEnd) continue;
      if (groupEnd === compactOriginal.length) index = words.length;
      const parts = words.slice(start, index);
      const startTime = parts.find(word => /[\p{L}\p{N}]/u.test(word.word))?.startTime;
      const endTime = parts[parts.length - 1]?.endTime;
      if (startTime === undefined || !Number.isFinite(endTime) || endTime <= startTime) return [];
      aligned.push({ from: start, to: index, roman: reading, startTime, endTime });
      start = index;
      reading = '';
    }
    return aligned.length === 1 && groups.length > 1 ? [] : aligned;
  }

  function resolveReadings(vocal, words) {
    // Each prepared voice belongs to one published lyric revision.
    let cached = readingCache.get(vocal);
    if (!cached) {
      cached = {};
      readingCache.set(vocal, cached);
    }
    const mode = words.length ? 'timed' : 'line';
    if (!cached[mode]) cached[mode] = alignedReadings(vocal, words);
    return cached[mode].map(({ from, to, ...group }) =>
      from === undefined ? group : { ...group, words: words.slice(from, to) });
  }

  function convert(rows, preferences = {}, songEndMs = 0) {
    const lines = [], rowIndices = [];
    let lastLead = -1;
    for (const [index, row] of rows.entries()) {
      if (row.kind === 'interlude') continue; // The component finds its own instrumental gaps.
      const next = rows[index + 1]?.time ?? songEndMs;
      let mainIndex = -1;
      for (const vocal of [row, ...(row.backingLines || [])]) {
        if (!vocal.content) continue;
        const startTime = vocal.time;
        const fallbackEnd = next > startTime ? next : startTime + 4000;
        const containerEnd = vocal === row && row.explicitEnd === false ? row.visualEnd :
          vocal.sourceEnd ?? vocal.vocalEnd ?? vocal.end;
        const endTime = containerEnd > startTime ? containerEnd : fallbackEnd;
        let words = preferences.karaoke === false ? [] : timedWords(vocal.words);
        const hasWordTiming = words.length > 0;
        const grouped = preferences.roman !== false && preferences.romanGrouping === true;
        const groups = grouped ? resolveReadings(vocal, words) : [];
        const reading = preferences.roman !== false && preferences.romanKaraoke === true && !groups.length ? readingTimeline(vocal) : [];
        if (!words.length) words = [{ word: vocal.content, startTime, endTime }];

        // The upstream renderer pairs exactly one adjacent backing line with
        // its lead. Other voices need independent activation to remain visible.
        const previous = lines[lines.length - 1];
        const hasParent = vocal !== row ? mainIndex >= 0 && mainIndex === lines.length - 1 :
          previous && lastLead === lines.length - 1 && startTime >= previous.startTime && startTime < previous.endTime;
        lines.push({
          words, startTime, endTime,
          ...(preferences.karaoke === false ? { staticOriginal: true } : {}),
          ...(hasWordTiming ? { hasWordTiming: true } : {}),
          ...(reading.length ? { romanWords: reading } : {}),
          ...(groups.length ? { readingGroups: groups } : {}),
          translatedLyric: preferences.translation === false ? '' : vocal.translation || '',
          romanLyric: preferences.roman === false ? '' : vocal.roman || '',
          ...(vocal.backing ? { backgroundVocal: true } : {}),
          isBG: Boolean(vocal.backing && hasParent),
          isDuet: vocal.side === 'right',
        });
        if (vocal === row && !vocal.backing) {
          mainIndex = lines.length - 1;
          lastLead = mainIndex;
        }
        rowIndices.push(index);
      }
    }
    return { lines, rowIndices };
  }

  root.AppleNowPlayingExtLyrics = Object.freeze({ convert });
})(typeof window !== 'undefined' ? window : globalThis);
