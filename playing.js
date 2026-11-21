(() => {
  'use strict';

  const icons = {
    music: '<path d="M9 18V5l12-2v13M9 18c0 3-6 4-6 1s6-4 6-1Zm12-2c0 3-6 4-6 1s6-4 6-1Z"/>',
    play: '<path fill="currentColor" stroke="none" d="M4 3.9c0-1.6 1.7-2.5 3-1.7l14 8.1c1.3.8 1.3 2.6 0 3.4l-14 8.1c-1.3.8-3-.1-3-1.7z"/>',
    pause: '<rect fill="currentColor" stroke="none" x="5" y="2.5" width="5" height="19" rx="1.5"/><rect fill="currentColor" stroke="none" x="14" y="2.5" width="5" height="19" rx="1.5"/>',
    next: '<path fill="currentColor" stroke="none" d="M2 6.1c0-1 1.1-1.7 2-1.1l8 5v-4c0-1 1.1-1.7 2-1.1l9 5.9c.8.5.8 1.7 0 2.2l-9 5.9c-.9.6-2-.1-2-1.1v-4l-8 5C3.1 19.6 2 19 2 18Z"/>',
    shuffle: '<path d="M3 6h2.5c4.8 0 6.2 12 11 12H21m-3-3 3 3-3 3M3 18h2.5c4.8 0 6.2-12 11-12H21m-3-3 3 3-3 3"/>',
    repeat: '<path d="M3.5 10V8a3 3 0 0 1 3-3H20m-3-3 3 3-3 3m3.5 6v2a3 3 0 0 1-3 3H4m3-3-3 3 3 3"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
    order: '<path d="M4 6h16M4 12h16M4 18h10m3-3 3 3-3 3"/>',
    more: '<path stroke-width="3.4" d="M4 12h.01m7.99 0h.01m7.99 0h.01"/>',
    volume: '<path d="M3 9h4l5-4v14l-5-4H3zM15 9c1.6 1.6 1.6 4.4 0 6m2.5-8.5c3 3 3 8 0 11"/>',
    quiet: '<path d="M3 9h4l5-4v14l-5-4H3zM15 9c1.6 1.6 1.6 4.4 0 6"/>',
    lyrics: '<path d="M8 19h-.5A4.5 4.5 0 0 1 3 14.5v-6A4.5 4.5 0 0 1 7.5 4h9A4.5 4.5 0 0 1 21 8.5v6a4.5 4.5 0 0 1-4.5 4.5H13l-5 3z"/><path d="M8 9h2v2c0 1.4-.7 2.2-1.5 2.7M14 9h2v2c0 1.4-.7 2.2-1.5 2.7"/>',
    queue: '<path d="M8 5h13M8 12h13M8 19h13M3 5h.01M3 12h.01M3 19h.01"/>',
    settings: '<path d="M9.5 3h5l.6 2.2 1.4.8 2.2-.6 2.5 4.3-1.6 1.6v1.4l1.6 1.6-2.5 4.3-2.2-.6-1.4.8-.6 2.2h-5l-.6-2.2-1.4-.8-2.2.6-2.5-4.3 1.6-1.6v-1.4L2.8 9.7l2.5-4.3 2.2.6 1.4-.8z"/><circle cx="12" cy="12" r="3.2"/>',
    translate: '<defs><mask id="apple-now-playing-icon-translate-cut" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="white" stroke="none"/><text x="16" y="17.4" text-anchor="middle" font-family="Microsoft YaHei, sans-serif" font-size="10" font-weight="700" fill="black" stroke="none">文</text></mask></defs><path d="M13.5 4H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h1v3l3-3h4.5a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"/><text x="8.8" y="12.3" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="9" font-weight="700" fill="currentColor" stroke="none">A</text><path d="M12 8h8a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-1v3l-3-3h-4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z" fill="currentColor" stroke="none" mask="url(#apple-now-playing-icon-translate-cut)"/>',
    karaoke: '<defs><clipPath id="apple-now-playing-icon-karaoke-half"><rect width="12" height="24"/></clipPath></defs><path fill="currentColor" stroke="none" opacity=".36" fill-rule="evenodd" d="M4.2 20 10.3 4h3.4l6.1 16h-3.5l-1.2-3.6H8.9L7.7 20H4.2Zm5.7-6.5h4.2L12 7.1l-2.1 6.4Z"/><path fill="currentColor" stroke="none" fill-rule="evenodd" clip-path="url(#apple-now-playing-icon-karaoke-half)" d="M4.2 20 10.3 4h3.4l6.1 16h-3.5l-1.2-3.6H8.9L7.7 20H4.2Zm5.7-6.5h4.2L12 7.1l-2.1 6.4Z"/>',
    roman: '<text x="12" y="19.5" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="600" fill="currentColor" stroke="none">a</text>',
    screen: '<path d="M14 3h7v7m0-7-7 7m-4 11H3v-7m0 7 7-7"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
  };

  function icon(name) {
    const previous = name === 'previous';
    return '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' +
      (previous ? '<g transform="translate(24 0) scale(-1 1)">' + icons.next + '</g>' : icons[name]) + '</svg>';
  }

  function button(action, label, symbol, className = '') {
    return '<button type="button" class="apple-now-playing-icon ' + className + '" data-action="' + action +
      '" aria-label="' + label + '" title="' + label + '">' + icon(symbol) + '</button>';
  }

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const text = (element, value) => { if (element.textContent !== value) element.textContent = value; };
  const artists = (items) => Array.isArray(items)
    ? items.map(item => typeof item === 'string' ? item : item?.name).filter(Boolean).join(' / ')
    : typeof items === 'string' ? items : '';
  const number = (value) => value == null || value === '' || !Number.isFinite(Number(value)) ? undefined : Number(value);
  const lyricSpringSettings = Object.freeze({ duration: 560, dampingRatio: .83 });
  const panelSpringSettings = Object.freeze({ duration: 520, dampingRatio: .78 });
  const lyricPanelFadeSettings = Object.freeze({ outDuration: 200, inDuration: 180, slideInDelay: 90 });
  const pageTransitionSettings = Object.freeze({
    open: { duration: 360, background: [0, 360, .98], cover: 320, meta: [110, 235, 8], controls: [130, 290, 10], panel: [155, 345, 12] },
    close: { duration: 380, detach: 80, lead: .08, travel: .45, slideEase: 'cubic-bezier(.35,.12,.35,1)' },
    fade: 120, reduced: 100, easing: 'cubic-bezier(.2,.7,.2,1)',
  });

  const storagePrefix = 'apple-now-playing.';
  const preferencesKey = storagePrefix + 'preferences-v2';
  const offsetsKey = storagePrefix + 'lyric-offsets';
  const takeoverKey = storagePrefix + 'takeover-vinyl';
  const settingsCategoryKey = storagePrefix + 'settings-category';
  const settingDefinitions = [
    { group: '歌词', key: 'karaoke', label: '开启逐字', value: true },
    { group: '歌词', key: 'translation', label: '显示译文', value: true },
    { group: '歌词', key: 'roman', label: '显示罗马音', value: false },
    { group: '歌词', key: 'romanKaraoke', label: '开启罗马音逐字', value: false },
    { group: '歌词', key: 'romanGrouping', label: '罗马音分词', value: false },
    { group: '歌词', key: 'preview', label: '进度条歌词预览', value: true },
    { group: '歌词', key: 'originalBold', label: '原文歌词加粗', value: true },
    { group: '歌词', key: 'lyricFade', label: '歌词渐隐', value: true },
    { group: '歌词', key: 'lyricScale', label: '歌词缩放', value: true },
    { group: '歌词', key: 'lyricBlur', label: '歌词模糊', value: true },
    { group: '歌词', key: 'fontSize', label: '原文字号', value: 'auto',
      options: [['auto', '随窗口调整'], ...[24, 28, 32, 36, 42, 48, 54, 60].map(size => [String(size), size + ' px'])] },
    { group: '歌词', key: 'translationSize', label: '译文相对字号', value: 62, min: 40, max: 100, step: 2 },
    { group: '歌词', key: 'romanSize', label: '罗马音相对字号', value: 52, min: 40, max: 100, step: 2 },
    { group: '歌词', key: 'backgroundVocalSize', label: '背景歌词大小', value: 28, min: 12, max: 72, step: 1, unit: 'px' },
    { group: '歌词', key: 'duetSize', label: '对唱歌词大小', value: 36, min: 12, max: 72, step: 1, unit: 'px' },
    { group: '歌词', key: 'alignment', label: '当前行位置', value: 'middle',
      options: [['upper', '靠上'], ['middle', '居中']] },
    { group: '歌词', key: 'scrollbar', label: '手动滚动时显示歌词滚动条', value: true },
    { group: '歌词', key: 'lyricLift', label: '歌词上浮', value: true },
    { group: '歌词', key: 'scrollStyle', label: '滚动方式', value: 'normal',
      options: [['normal', 'extSpotify 原版'], ['spring', '轻微回弹'], ['stagger', '逐行错开']] },
    { group: '歌词', key: 'globalOffset', label: '全局歌词偏移', value: 0, min: -10000, max: 10000, step: 100, unit: 'ms' },
    { group: '外观', key: 'display', label: '显示内容', value: 'all',
      options: [['all', '全部'], ['lyrics', '仅歌词'], ['cover', '仅封面']] },
    { group: '外观', key: 'alias', label: '别名与译名', value: 'hidden',
      options: [['hidden', '隐藏'], ['alias', '别名优先'], ['translated', '译名优先'], ['both', '同时显示']] },
    { group: '外观', key: 'background', label: '背景', value: 'fluid',
      options: [['gradient', '渐变'], ['blur', '模糊封面'], ['solid', '纯色'], ['fluid', '流体'], ['fluid-static', '静态流体']] },
    { group: '外观', key: 'motion', label: '背景缓慢漂移', value: true, when: 'gradient' },
    { group: '外观', key: 'gradientDim', label: '渐变暗化', value: 0, min: 0, max: 60, step: 2, when: 'gradient' },
    { group: '外观', key: 'blur', label: '封面模糊', value: 60, min: 10, max: 100, step: 2, when: 'blur' },
    { group: '外观', key: 'blurDim', label: '模糊背景暗化', value: 30, min: 0, max: 60, step: 2, when: 'blur' },
    { group: '外观', key: 'coverShadow', label: '封面阴影', value: false },
    { group: '外观', key: 'textShadow', label: '文字阴影', value: false },
    { group: '外观', key: 'textGlow', label: '文字辉光', value: false },
    { group: '外观', key: 'fluidQuality', label: '流体画质', value: 'balanced', when: ['fluid', 'fluid-static'],
      options: [['low', '性能'], ['balanced', '均衡'], ['high', '精细']] },
    { group: '外观', key: 'fluidFps', label: '流体帧率', value: '30', when: 'fluid',
      options: [['5', '5 FPS'], ['10', '10 FPS'], ['30', '30 FPS'], ['60', '60 FPS'], ['screen', '跟随屏幕']] },
    { group: '外观', key: 'audioReactive', label: '跟随鼓点震动', value: false },
    { group: '字体', key: 'customFont', label: '使用自定义字体', value: false },
    { group: '字体', key: 'fontPreset', label: '字体预设', value: 'system',
      options: [['system', '默认'], ['misans', 'MiSans'], ['source-sans', '思源黑体'], ['source-serif', '思源宋体'],
        ['pingfang', '苹方'], ['yahei', '微软雅黑'], ['jhenghei', '微软正黑'], ['custom', '自定义顺序']] },
    { group: '字体', key: 'fontFamilies', label: '字体回退顺序', value: '', kind: 'text' },
  ];

  function storedValue(key) {
    const suffix = key.slice(storagePrefix.length);
    let value = null;
    try {
      value = localStorage.getItem(key);
      // Only migration reads historical storage namespaces.
      for (const prefix of ['apple-playing.', 'apple-style-now-playing.']) {
        const oldKey = prefix + suffix;
        const oldValue = localStorage.getItem(oldKey);
        if (oldValue === null) continue;
        if (value === null) {
          value = oldValue;
          localStorage.setItem(key, value);
        }
        localStorage.removeItem(oldKey);
      }
    } catch (error) {
      console.warn('[AppleNowPlaying] 旧版偏好迁移失败', error);
    }
    return value;
  }

  function storedObject(key) {
    try {
      const value = JSON.parse(storedValue(key) || '{}');
      return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
    } catch (_) {
      return {};
    }
  }

  function settingValue(definition, value) {
    if (definition.kind === 'text') return typeof value === 'string' ? value.replace(/[\u0000-\u001f]/g, ' ').slice(0, 512).trim() : definition.value;
    if (definition.options) return definition.options.some(([key]) => key === value) ? value : definition.value;
    if (typeof definition.value === 'boolean') return typeof value === 'boolean' ? value : definition.value;
    return clamp(number(value) ?? definition.value, definition.min, definition.max);
  }

  const savedPreferences = storedObject(preferencesKey);
  const hasLegacyLyricMotion = ['wordMotion', 'fillStyle', 'longNote'].some(key => key in savedPreferences);
  if (typeof savedPreferences.lyricLift !== 'boolean') {
    if (savedPreferences.wordMotion === 'none') savedPreferences.lyricLift = false;
    if (['word', 'character', 'slide'].includes(savedPreferences.wordMotion)) savedPreferences.lyricLift = true;
  }
  const preferences = Object.fromEntries(settingDefinitions.map(definition =>
    [definition.key, settingValue(definition, savedPreferences[definition.key])]));
  const songOffsets = storedObject(offsetsKey);
  if (hasLegacyLyricMotion || 'scheme' in savedPreferences || savedPreferences.background === 'none' ||
      'backingSize' in savedPreferences || 'blankBlur' in savedPreferences || 'blankDim' in savedPreferences) {
    saveObject(preferencesKey, preferences);
  }

  function saveObject(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn('[AppleNowPlaying] 偏好保存失败', error);
      return false;
    }
  }

  // Both lyrics and queue use measured row heights. DOM stays bounded while
  // their complete source data and stable scroll anchors remain available.
  class AppleNowPlayingViewportList {
    constructor(scroller, content, createRow, estimate) {
      this.scroller = scroller;
      if (!scroller.hasAttribute('tabindex')) scroller.tabIndex = -1;
      this.content = content;
      this.createRow = createRow;
      this.estimate = estimate;
      this.items = [];
      this.keys = [];
      this.indices = new Map();
      this.heights = new Map();
      this.nodes = new Map();
      this.range = '';
      this.tops = [0];
      this.padding = 0;
      this.bottomPadding = 0;
      this.pinned = [];
    }

    connect(signal) {
      this.disconnect();
      this.observer = new ResizeObserver(entries => {
        const anchor = this.capture();
        let changed = false;
        for (const entry of entries) {
          const index = Number(entry.target.dataset.rowIndex);
          if (this.nodes.get(index) !== entry.target) continue;
          const height = entry.target.offsetHeight;
          const key = this.keys[index];
          if (key && height > 0 && Math.abs((this.heights.get(key) || 0) - height) > 1) {
            this.heights.set(key, height);
            changed = true;
          }
        }
        if (changed) {
          this.layout();
          this.restore(anchor);
          if (this.scrollMotion) {
            const { index, align } = this.scrollMotion;
            this.scrollTo(index, align, true);
          }
          this.render();
          this.afterMeasure?.();
        }
      });
      for (const node of this.nodes.values()) this.observer.observe(node);
      this.scroller.addEventListener('scroll', () => this.render(), { passive: true, signal });
      this.render();
    }

    disconnect() {
      this.stopScroll();
      this.observer?.disconnect();
      this.observer = undefined;
    }

    set(items, keyOf, resetHeights = false) {
      const focused = [...this.nodes].find(([, node]) => node.contains(document.activeElement));
      const focusKey = focused ? this.keys[focused[0]] : undefined;
      if (resetHeights) this.heights.clear();
      for (const node of this.nodes.values()) this.observer?.unobserve(node);
      this.nodes.clear();
      this.content.replaceChildren();
      this.stopScroll();
      this.items = items;
      this.keys = items.map(keyOf);
      this.indices = new Map(this.keys.map((key, index) => [key, index]));
      for (const key of this.heights.keys()) if (!this.indices.has(key)) this.heights.delete(key);
      const focusIndex = this.indices.get(focusKey);
      this.pinned = focusIndex === undefined ? [] : [focusIndex];
      this.layout();
      this.render();
      if (focusIndex !== undefined) {
        const node = this.nodes.get(focusIndex);
        (node?.querySelector('button') || node)?.focus({ preventScroll: true });
      } else if (focused) {
        this.scroller.focus({ preventScroll: true });
      }
    }

    layout() {
      this.range = '';
      this.tops = [this.padding];
      for (let index = 0; index < this.items.length; index++) {
        this.tops.push(this.tops[index] + (this.heights.get(this.keys[index]) || this.estimate(this.items[index])));
      }
      this.content.style.height = (this.tops[this.items.length] + this.bottomPadding) + 'px';
      for (const [index, node] of this.nodes) node.style.top = this.tops[index] + 'px';
    }

    indexAt(top) {
      let low = 0, high = this.items.length;
      while (low < high) {
        const mid = (low + high) >> 1;
        if (this.tops[mid + 1] < top) low = mid + 1;
        else high = mid;
      }
      return Math.min(low, Math.max(0, this.items.length - 1));
    }

    capture() {
      const index = this.indexAt(this.scroller.scrollTop);
      return { key: this.keys[index], offset: this.scroller.scrollTop - this.tops[index] };
    }

    restore(anchor) {
      const index = this.indices.get(anchor?.key);
      if (index !== undefined) this.scroller.scrollTop = Math.max(0, this.tops[index] + anchor.offset);
    }

    render() {
      if (!this.items.length) return;
      const top = this.scroller.scrollTop;
      const height = this.height || this.scroller.clientHeight || 600;
      const start = this.indexAt(Math.max(0, top - height));
      const end = this.indexAt(top + height * 2);
      const range = [start, end, ...this.pinned].join(',');
      if (range === this.range) return;
      this.range = range;
      const wanted = new Set(this.pinned);
      for (let index = start; index <= end; index++) wanted.add(index);
      for (const [index, node] of this.nodes) {
        if (!wanted.has(index) && !node.contains(document.activeElement)) {
          this.observer?.unobserve(node);
          node.remove();
          this.nodes.delete(index);
        }
      }
      for (const index of [...wanted].sort((a, b) => a - b)) {
        if (index < 0 || index >= this.items.length || this.nodes.has(index)) continue;
        const node = this.createRow(this.items[index], index);
        node.dataset.rowIndex = index;
        node.style.top = this.tops[index] + 'px';
        this.nodes.set(index, node);
        const next = [...this.content.children].find(child => Number(child.dataset.rowIndex) > index);
        this.content.insertBefore(node, next || null);
        this.observer?.observe(node);
      }
    }

    stopScroll() {
      if (!this.scrollMotion) return;
      this.scrollMotion.animation?.cancel();
      if (this.scrollMotion.column) this.content.style.removeProperty('transform');
      for (const node of this.nodes.values()) node.style.removeProperty('transform');
      this.scrollMotion = undefined;
    }

    scrollTo(index, align, smooth) {
      if (index < 0 || index >= this.items.length) return;
      this.pinned = [...new Set([...this.pinned, index])].slice(-12);
      const from = this.scroller.scrollTop;
      const target = this.targetTop(index, align);
      const mode = this.scrollMode?.();
      if (!mode || !smooth || reducedMotion.matches || Math.abs(target - from) > this.scroller.clientHeight) {
        this.stopScroll();
        this.scroller.scrollTop = target;
        this.render();
        return;
      }
      // Commit the new layout once. Carry each row's onscreen displacement
      // and velocity across handoffs, including a second line before settling.
      const previous = this.scrollMotion;
      this.scroller.scrollTop = target;
      const delta = this.scroller.scrollTop - from;
      if (Math.abs(delta) < .5) return;
      this.render();
      if (mode === 'normal') {
        const offset = (previous?.column?.offset || 0) + delta;
        const frequency = 10.5;
        const direction = -Math.sign(offset);
        const velocity = direction * clamp(direction * (previous?.column?.velocity || 0), 0, frequency * Math.abs(offset));
        this.stopScroll();
        this.content.style.transform = 'translateY(' + offset.toFixed(2) + 'px)';
        this.scrollMotion = { column: { offset, velocity }, last: performance.now(), index, align, frequency };
        return;
      }
      if (mode === 'spring') {
        const carried = previous ? new DOMMatrix(getComputedStyle(this.content).transform).m42 : 0;
        const velocity = springVelocity(previous);
        this.stopScroll();
        const { duration, dampingRatio } = lyricSpringSettings;
        const positions = springPositions(carried + delta, velocity, duration, dampingRatio);
        const animation = this.content.animate(positions.map(y => ({ transform: 'translate3d(0,' + y + 'px,0)' })), {
          duration, fill: 'backwards',
        });
        const motion = this.scrollMotion = { animation, positions, duration, index, align };
        animation.finished.then(() => {
          if (this.scrollMotion === motion) this.stopScroll();
        }, () => {});
        return;
      }
      const now = performance.now();
      const direction = Math.sign(delta);
      const first = this.indexAt(direction > 0 ? from : from + this.scroller.clientHeight);
      const gap = Math.abs(this.items[index].time - (this.items[index - direction]?.time ?? 0));
      const slow = clamp((gap - 700) / 2400, 0, 1);
      const frequency = Math.sqrt(172 - 66 * slow);
      const rows = new Map();
      for (const [i, node] of this.nodes) {
        const old = previous?.rows.get(i);
        const offset = (old?.offset || 0) + delta;
        const velocity = old?.velocity || 0;
        const delay = Math.min(5, Math.max(0, (i - first) * direction)) * 36;
        rows.set(i, { offset, velocity, delay });
        node.style.transform = 'translateY(' + offset.toFixed(2) + 'px)';
      }
      this.scrollMotion = { rows, last: now, index, align, frequency, damping: .87 };
    }

    targetTop(index, align) {
      const height = this.heights.get(this.keys[index]) || this.estimate(this.items[index]);
      return Math.max(0, this.tops[index] + height / 2 - this.scroller.clientHeight * align);
    }

    step(time) {
      const motion = this.scrollMotion;
      if (!motion || motion.animation) return;
      const elapsed = Math.max(0, time - motion.last);
      motion.last = Math.max(time, motion.last);
      if (motion.column) {
        const { column, frequency } = motion;
        const dt = elapsed / 1000;
        // Advance the actual position and velocity, including retargets mid-flight.
        const slope = column.velocity + frequency * column.offset;
        const envelope = Math.exp(-frequency * dt);
        column.offset = envelope * (column.offset + slope * dt);
        column.velocity = envelope * (column.velocity - frequency * slope * dt);
        if (Math.abs(column.offset) < .12 && Math.abs(column.velocity) < 2) this.stopScroll();
        else this.content.style.transform = 'translateY(' + column.offset.toFixed(2) + 'px)';
        return;
      }
      const decay = motion.frequency * motion.damping;
      const angular = motion.frequency * Math.sqrt(1 - motion.damping ** 2);
      for (const [index, row] of motion.rows) {
        const node = this.nodes.get(index);
        if (!node) { motion.rows.delete(index); continue; }
        const dt = Math.max(0, elapsed - row.delay) / 1000;
        row.delay = Math.max(0, row.delay - elapsed);
        if (!dt) continue;
        const start = row.offset;
        const envelope = Math.exp(-decay * dt);
        const sineTerm = (row.velocity + decay * start) / angular;
        const angle = angular * dt, cosine = Math.cos(angle), sine = Math.sin(angle);
        row.offset = envelope * (start * cosine + sineTerm * sine);
        row.velocity = -decay * row.offset + envelope * angular * (sineTerm * cosine - start * sine);
        if (Math.abs(row.offset) < .12 && Math.abs(row.velocity) < 2) {
          node.style.removeProperty('transform');
          motion.rows.delete(index);
        } else node.style.transform = 'translateY(' + row.offset.toFixed(2) + 'px)';
      }
      if (!motion.rows.size) this.scrollMotion = undefined;
    }
  }

  // A small Canvas2D surface is scaled by the compositor. Sampling the cover
  // once keeps fluid frames independent from image loading and color analysis.
  class AppleNowPlayingFluidBackground {
    constructor(canvas) {
      this.canvas = canvas;
      this.context = canvas.getContext('2d', { alpha: false });
      this.cover = document.createElement('canvas');
      this.cover.width = this.cover.height = 48;
      this.coverContext = this.cover.getContext('2d');
      this.stamps = [];
      this.nextFrame = 0;
      this.phase = 0;
      this.lastFrame = 0;
      this.dirty = true;
      this.colors = ['#484848', '#585858', '#383838'];
    }

    setCover(image, colors) {
      this.colors = colors || ['#484848', '#585858', '#383838'];
      // Select actual local colors instead of averaging each full column.
      // Broad light, dark and chromatic regions give the flow its depth.
      let palette = this.colors;
      if (image && this.coverContext) {
        try {
          this.coverContext.drawImage(image, 0, 0, 48, 48);
          const pixels = this.coverContext.getImageData(0, 0, 48, 48).data;
          const tiles = [];
          for (let y = 0; y < 48; y += 8) for (let x = 0; x < 48; x += 8) {
            const rgb = [0, 0, 0];
            for (let dy = 0; dy < 8; dy++) for (let dx = 0; dx < 8; dx++) {
              const k = 4 * ((y + dy) * 48 + x + dx);
              for (let c = 0; c < 3; c++) rgb[c] += pixels[k + c] / 64;
            }
            tiles.push(rgb);
          }
          const luma = rgb => .2126 * rgb[0] + .7152 * rgb[1] + .0722 * rgb[2];
          tiles.sort((a, b) => luma(a) - luma(b));
          const chosen = [tiles[4], tiles[28]];
          while (chosen.length < 5) {
            const distance = rgb => Math.min(...chosen.map(p => rgb.reduce((sum, ch, c) => sum + (ch - p[c]) ** 2, 0)));
            chosen.push(tiles.reduce((best, rgb) => distance(rgb) > distance(best) ? rgb : best));
          }
          palette = chosen.map(rgb => {
            const brightness = luma(rgb);
            const gain = Math.min(.93, 138 / Math.max(1, brightness));
            return 'rgb(' + rgb.map(ch => Math.round(clamp(7 + (brightness + 1.12 * (ch - brightness)) * gain, 0, 255))).join(',') + ')';
          });
        } catch (_) { /* Reading some local cover origins is restricted. */ }
      }
      this.stamps = palette.map(color => {
        const tile = document.createElement('canvas');
        tile.width = tile.height = 144;
        const ctx = tile.getContext('2d');
        const gradient = ctx.createRadialGradient(72, 72, 0, 72, 72, 72);
        gradient.addColorStop(0, color);
        gradient.addColorStop(.32, color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 144, 144);
        return tile;
      });
      this.dirty = true;
    }

    invalidate() {
      this.dirty = true;
      this.lastFrame = 0;
    }

    stop() {
      this.lastFrame = this.nextFrame = 0;
      this.canvas.width = this.canvas.height = 0;
      this.stamps.length = 0;
      this.dirty = true;
    }

    draw(time, level) {
      if (!this.context) return;
      const fluid = ['fluid', 'fluid-static'].includes(preferences.background);
      if (this.canvas.hidden !== !fluid) this.canvas.hidden = !fluid;
      if (!fluid || !activity || document.hidden) return;
      const moving = preferences.background === 'fluid' && !reducedMotion.matches;
      const fps = preferences.fluidFps === 'screen' ? 0 : Number(preferences.fluidFps);
      if (!this.dirty && (!moving || (fps && time + .5 < this.nextFrame))) return;
      const interval = fps ? 1000 / fps : 0;
      this.nextFrame = interval && this.nextFrame > time - interval ? this.nextFrame + interval : time + interval;
      const edge = { low: 288, balanced: 448, high: 640 }[preferences.fluidQuality];
      const ratio = innerWidth / Math.max(1, innerHeight);
      const width = ratio >= 1 ? edge : Math.round(edge * ratio);
      const height = ratio >= 1 ? Math.round(edge / ratio) : edge;
      if (this.canvas.width !== width || this.canvas.height !== height) {
        this.canvas.width = width;
        this.canvas.height = height;
      }
      if (moving && this.lastFrame) this.phase += Math.min(500, time - this.lastFrame) / 1000;
      this.lastFrame = time;
      this.dirty = false;
      const ctx = this.context;
      const phase = this.phase;
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = this.colors[2];
      ctx.fillRect(0, 0, width, height);
      const extent = Math.max(width, height);
      this.stamps.forEach((tile, i) => {
        const phaseX = phase * (.12 + i * .014) + i * 2.40;
        const phaseY = phase * (.105 + i * .01) + i * 1.67;
        const x = width * (.5 + .46 * Math.cos(phaseX));
        const y = height * (.5 + .44 * Math.sin(phaseY));
        const radius = extent * (.62 + .10 * Math.sin(phaseY + .7) + .07 * level);
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(.50 * Math.sin(phaseX * .66 + i));
        ctx.scale(1.30, .78 + .12 * Math.sin(phaseY));
        ctx.drawImage(tile, -radius, -radius, 2 * radius, 2 * radius);
        ctx.restore();
      });
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    }
  }

  const vinylSelector =  'footer [data-testid="tid_btn_pc_minibar_vinyl"], footer .miniVinylWrapper';
  const controls = {
    play: 'tid_playbar_play_btn', previous: 'tid_playbar_prev_btn', next: 'tid_playbar_next_btn',
    favorite: 'tid_redstar_btn', queue: 'tid_playbar_playlist_btn', mode: 'tid_playmode_btn',
  };
  const modes = {
    playOrder: ['顺序播放', 'order'], playCycle: ['列表循环', 'repeat'],
    playOneCycle: ['单曲循环', 'repeat'], playRandom: ['随机播放', 'shuffle'],
    playAi: ['心动模式', 'heart'], playFm: ['私人漫游', 'repeat'],
  };

  function makeHost() {
    let runtime, root, store, watchedStore, storeOff;
    let progressStream, progressSubscription, latestProgress, progressReceipt = 0;
    let changeListener, progressListener;
    let seekSequence = 0;

    function modules() {
      if (!runtime) {
        const chunks = window.webpackJsonp;
        if (!Array.isArray(chunks) || chunks.push === Array.prototype.push) return;
        // Capture the current runtime to read the initialized 3.1.41 player modules.
        const key = 'apple-now-playing-host';
        const entry = [[], { [key]: (_module, _exports, require) => { runtime = require; } }, [[key]]];
        try {
          chunks.push(entry);
        } catch (error) {
          console.warn('[AppleNowPlaying] 无法获取宿主播放模块', error);
        } finally {
          if (runtime?.c) delete runtime.c[key];
          if (runtime?.m) delete runtime.m[key];
          const index = chunks.indexOf(entry);
          if (index >= 0) chunks.splice(index, 1);
        }
      }
      return runtime?.c;
    }

    function findStore() {
      const currentRoot = document.getElementById('root');
      if (root !== currentRoot) {
        store = null;
        root = currentRoot;
      }
      // The host DVA helper exposes the same Redux store as the React provider.
      const hostStore = modules()?.[8]?.exports?.a?.app?._store;
      if (typeof hostStore?.getState === 'function') return hostStore;
      if (store || !root) return store;
      const container = Object.keys(root).find(key => key.startsWith('__reactContainer'));
      const fibers = [root._reactRootContainer?._internalRoot?.current || root[container]];
      for (let index = 0; index < fibers.length && index < 120; index++) {
        const fiber = fibers[index];
        if (!fiber) continue;
        const candidate = fiber.memoizedProps?.store || fiber.memoizedState?.element?.props?.store;
        if (typeof candidate?.getState === 'function') return store = candidate;
        fibers.push(fiber.child, fiber.sibling);
      }
    }

    const footers = document.getElementsByTagName('footer');
    function footerElement(selector) {
      for (const footer of footers) {
        const target = footer.querySelector(selector);
        if (target) return target;
      }
    }

    function control(name) {
      if (name === 'cover') return footerElement('[data-testid="tid_btn_pc_minibar_vinyl"], .miniVinylWrapper');
      const target = footerElement('[data-testid="' + controls[name] + '"]');
      return target?.querySelector('button') || target;
    }

    function available(target) {
      return !!target && !target.disabled && target.getAttribute('aria-disabled') !== 'true';
    }

    function bridge() {
      if (typeof legacyNativeCmder !== 'undefined' && typeof legacyNativeCmder._envAdapter?.callAdapter === 'function') {
        return legacyNativeCmder._envAdapter.callAdapter.bind(legacyNativeCmder._envAdapter);
      }
      if (typeof channel !== 'undefined' && typeof channel.call === 'function') return channel.call.bind(channel);
    }

    function getTrack(playing) {
      return playing.curTrack || playing.curPlaying?.track || playing.curVoice || {};
    }

    function getId(playing) {
      return String(playing.resourceTrackId || getTrack(playing).id || '');
    }

    function syncSubscriptions(currentStore, stream) {
      if (!changeListener) return;
      if (currentStore !== watchedStore) {
        storeOff?.();
        watchedStore = currentStore;
        latestProgress = undefined;
        storeOff = currentStore?.subscribe?.(changeListener);
      }
      if (stream === progressStream) return;
      progressSubscription?.unsubscribe();
      progressStream = stream;
      latestProgress = undefined;
      // Use the host's shared progress observable without replacing native callbacks.
      progressSubscription = stream?.subscribe?.(event => {
        if (number(event?.current) === undefined) return;
        const id = watchedStore?.getState()?.playing?.playId;
        if (!id || String(id) !== String(event.playId)) return;
        latestProgress = event;
        progressListener?.(event, ++progressReceipt);
      });
    }

    function read() {
      const currentStore = findStore();
      const cache = modules();
      const audio = cache?.[148]?.exports;
      syncSubscriptions(currentStore, audio?.e);
      const state = currentStore?.getState();
      const playing = state?.playing || {};
      const track = getTrack(playing);
      const id = getId(playing);
      const hostPlayId = String(playing.playId || '');
      const sessionTrack = hostPlayId.split('_')[0];
      const playId = [id, String(track.id || ''), String(playing.onlineResourceId || '')].includes(sessionTrack) ? hostPlayId : '';
      const restoredPosition = number(playing.restoreResource?.current);
      const lastAudioProgress = typeof audio?.b === 'function' ? audio.b() : undefined;
      const audioProgress = [latestProgress, lastAudioProgress].find(event => playId && String(event?.playId) === playId);
      const nativePosition = number(audioProgress?.current);
      const playButton = control('play');
      const favorite = control('favorite');
      const modeButton = control('mode');
      const modeIcon = playing.playingMode === 'playAi' ? modeButton?.querySelector('svg') : undefined;
      const favoriteIcon = favorite?.querySelector('[role=img], svg');
      const playLabel = [playButton?.getAttribute('aria-label'), playButton?.querySelector('[role=img], svg')?.getAttribute('aria-label')].join(' ');
      const likeLabel = [favorite?.getAttribute('aria-label'), favoriteIcon?.getAttribute('aria-label'),
        favoriteIcon?.getAttribute('title'), favoriteIcon?.querySelector('title')?.textContent].join(' ');
      const slider = footerElement('.slider-default input[type=range], .slider-default [role=slider]');
      const sliderMax = number(slider?.max || slider?.getAttribute('aria-valuemax'));
      const sliderValue = sliderMax > 0 ? number(slider?.value ?? slider?.getAttribute('aria-valuenow')) : undefined;
      const duration = id ? Math.max(0, number(playing.resourceDuration) || sliderMax || 0) : 0;
      const sample = number(cache?.[109]?.exports?.b?.getValue?.()) ?? sliderValue;
      const isPlaying = !!id && (typeof playing.playingState === 'number' ? playing.playingState === 2 :
        playButton?.classList.contains('play-pause-btn') || /pause|暂停/i.test(playLabel));
      // While paused the restore record may be the only authoritative position.
      // Once the active player reports its own progress, use that timeline.
      const usingRestore = restoredPosition !== undefined && !(isPlaying && nativePosition !== undefined);
      const position = clamp(usingRestore ? restoredPosition : nativePosition ?? sample ?? 0, 0, duration);
      const cover = playing.resourceCoverUrl || track.album?.picUrl || track.al?.picUrl || '';
      const hasDispatch = !!cache?.[8]?.exports?.a?.app && typeof currentStore?.dispatch === 'function';
      const canBridge = typeof bridge() === 'function';
      const songId = String(playing.onlineResourceId || track.id || id);
      const isSong = !!playing.curTrack && !/voice/i.test(playing.resourceType || '');
      const queueEditable = isSong && hasDispatch && !!state?.playingList && !['playFm', 'playAi'].includes(playing.playingMode);
      const player = cache?.[4]?.exports?.AudioPlayer;
      const audioAvailable = typeof cache?.[148]?.exports?.a?.subscribe === 'function' &&
        typeof player?.subscribeAudioData === 'function' && typeof player?.setAudioDataEnableState === 'function';
      const quality = id && number(playing.resourcePlayingQuality) !== undefined ? cache?.[41]?.exports?.e?.(playing.resourcePlayingQuality) : undefined;
      const currentEntry = playing.curPlaying || {};
      return {
        id, playId, duration, position,
        audioReceipt: !usingRestore && audioProgress && audioProgress === latestProgress ? progressReceipt : 0,
        hasAudioStream: !!playId && typeof audio?.e?.subscribe === 'function' && !usingRestore,
        songId: isSong && /^\d+$/.test(songId) ? songId : '',
        track, artistItems: playing.resourceArtists || track.artists || track.ar || [],
        albumItem: track.album || track.al || {},
        aliases: track.alias || [], translatedNames: track.transNames || track.tns || [],
        quality: quality?.tagName || quality?.label || '',
        queueSource: currentEntry.text || currentEntry.fromInfo?.sourceData?.name || '',
        queueSourceHref: currentEntry.href || '',
        confirmedPosition: restoredPosition !== undefined || nativePosition !== undefined,
        resourceId: String(playing.curPlaying?.resourceId || ''),
        name: id ? playing.resourceName || track.name || '' : '',
        artist: id ? artists(playing.resourceArtists || track.artists || track.ar) || playing.resourceRadioName || '' : '',
        album: id ? track.album?.name || track.al?.name || '' : '',
        cover: id && typeof cover === 'string' ? cover.replace(/^http:/i, 'https:') : '',
        speed: clamp(number(playing.playingSpeedTrack) || 1, .1, 4),
        playing: isPlaying,
        loading: !!id && !usingRestore && playing.isLoadingFirst === true,
        restored: usingRestore || !playId,
        volume: clamp(number(playing.playingVolume) ?? 0, 0, 1),
        liked: favorite?.getAttribute('aria-pressed') === 'true' || favorite?.classList.contains('loved') ||
          /取消(?:喜欢|收藏)|已(?:喜欢|收藏)|liked|unlike/i.test(likeLabel),
        mode: playing.playingMode || '', modeIcon, modeIconMarkup: modeIcon?.outerHTML,
        queue: Array.isArray(state?.playingList?.curPlayingList) ? state.playingList.curPlayingList : [],
        can: {
          play: available(playButton), previous: available(control('previous')), next: available(control('next')),
          favorite: !!id && available(favorite), mode: available(modeButton),
          queue: available(control('queue')), cover: available(control('cover')),
          seek: !!id && duration > 0 && (hasDispatch || canBridge), volume: hasDispatch || canBridge,
          navigate: hasDispatch && !replacementEnabled(), metadataNav: hasDispatch && !!state?.['async:action'],
          addPlaylist: !!id && isSong && hasDispatch && !!state?.['async:action'] &&
            typeof cache?.[31]?.exports?.default?.openModal === 'function' && typeof cache?.[31]?.exports?.default?.closeModel === 'function',
          queuePlay: hasDispatch && !!state?.['async:action'],
          external: typeof cache?.[4]?.exports?.Os?.openExternal === 'function' || canBridge,
          queueEdit: queueEditable, queueNext: queueEditable && ['playOrder', 'playCycle'].includes(playing.playingMode),
          audioAnalysis: audioAvailable,
        },
      };
    }

    function send(action, payload) {
      const helper = modules()?.[8]?.exports?.a;
      const currentStore = findStore();
      if (!helper?.app || typeof currentStore?.dispatch !== 'function') return false;
      currentStore.dispatch({ type: 'playing/' + action, payload });
      return true;
    }

    function orderedQueue() {
      const list = findStore()?.getState()?.playingList?.curPlayingList;
      return Array.isArray(list) ? list.map((entry, index) => ({ entry, index })).filter(item => item.entry)
        .sort((a, b) => (number(a.entry.displayOrder) ?? a.index) - (number(b.entry.displayOrder) ?? b.index))
        .map(item => item.entry) : [];
    }

    function queueRevision() {
      return orderedQueue().map(entry => entry.resourceId + '|' + (entry.resourceType || 'track')).join('\n');
    }

    function queueMatch(list, id, type) {
      const matches = list.filter(entry => String(entry.resourceId) === id && String(entry.resourceType || 'track') === type);
      return matches.length === 1 ? matches[0] : undefined;
    }

    function dispatchAction(actionId, data, eventType) {
      const currentStore = findStore();
      if (!modules()?.[8]?.exports?.a?.app || typeof currentStore?.dispatch !== 'function') return false;
      currentStore.dispatch({ type: 'async:action/doAction', payload: { actionId, data, eventType } });
      return true;
    }

    function invoke(name, operation) {
      try {
        return operation();
      } catch (error) {
        console.warn('[AppleNowPlaying] 网易云操作失败：' + name, error);
        return false;
      }
    }

    return {
      read,
      trackId: () => getId(findStore()?.getState()?.playing || {}),
      coverEntry: () => control('cover'),
      replacePage(enabled, onOpen) {
        // Verified native module 29/62: every vinyl helper enters this state stream.
        const native = modules()?.[29]?.exports;
        const stream = native?.d, states = native?.a;
        if (typeof stream?.next !== 'function' || typeof stream?.getValue !== 'function' ||
            states?.opening !== 'opening' || states?.closed !== 'closed') return;
        const original = stream.next;
        const descriptor = Object.getOwnPropertyDescriptor(stream, 'next');
        let installed = true;
        function release() {
          if (!installed) return;
          installed = false;
          release.active = false;
          if (stream.next === redirect) {
            if (descriptor) Object.defineProperty(stream, 'next', descriptor);
            else delete stream.next;
          }
          document.body.classList.remove('apple-now-playing-replace-native');
        }
        function redirect(value) {
          if (!installed || !enabled()) { release(); return original.call(this, value); }
          if (value === states.opening || value === states.opened) {
            if (onOpen()) return;
            // If mounting fails, preserve the host's usable fallback.
            release();
          }
          return original.call(this, value);
        }
        try { stream.next = redirect; } catch (_) { return; }
        release.active = true;
        document.body.classList.add('apple-now-playing-replace-native');
        if (stream.getValue() !== states.closed) {
          original.call(stream, states.closed);
          queueMicrotask(() => { if (installed && enabled()) onOpen(); });
        }
        return release;
      },
      watch(callback, onProgress) {
        changeListener = callback;
        progressListener = onProgress;
        return () => {
          changeListener = progressListener = undefined;
          storeOff?.();
          progressSubscription?.unsubscribe();
          watchedStore = storeOff = progressStream = progressSubscription = latestProgress = undefined;
        };
      },
      click(name) {
        return invoke(name, () => {
          const target = control(name);
          if (!available(target)) return false;
          if (name === 'cover') {
            target.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, shiftKey: true, view: window }));
          } else {
            target.click();
          }
          return true;
        });
      },
      seek(id, seconds) {
        return invoke('seek', () => {
          const playing = findStore()?.getState()?.playing || {};
          if (!id || getId(playing) !== id) return false;
          if (send('setPlayingPosition', { duration: seconds })) return true;
          const call = bridge();
          if (!call) return false;
          call('audioplayer.seek', () => {}, [playing.playId || id, id + '|seek|' + ++seekSequence, seconds]);
          return true;
        });
      },
      canFetchPublicQQLyrics() {
        return typeof modules()?.[4]?.exports?.Network?.fetch === 'function';
      },
      fetchPublicQQLyrics(value, signal) {
        if (signal?.aborted) return Promise.reject(new Error('Cancelled'));
        const url = new URL(value);
        const allowed = url.hostname === 'c.y.qq.com' &&
          ['/soso/fcgi-bin/client_search_cp', '/lyric/fcgi-bin/fcg_query_lyric_new.fcg'].includes(url.pathname) ||
          url.hostname === 'u.y.qq.com' && url.pathname === '/cgi-bin/musicu.fcg';
        if (url.protocol !== 'https:' || url.username || url.password || url.port || !allowed) return Promise.reject(new Error('Unsupported lyric endpoint'));
        const network = modules()?.[4]?.exports?.Network;
        if (typeof network?.fetch !== 'function') return Promise.reject(new Error('Native lyric HTTP is unavailable'));
        // Host-owned read-only HTTP avoids executing remote JSONP under the
        // renderer's CSP. Provider code validates and parses the returned JSON.
        return network.fetch({ url: url.href, method: 'GET', headers: { Referer: 'https://y.qq.com/' },
          retryCount: 0, isDecrypt: false, isXeapi: false, shouldIncludeHeaders: false });
      },
      async fonts() {
        try {
          const api = modules()?.[4]?.exports?.Os;
          if (typeof api?.getSystemFonts !== 'function') return [];
          const result = await api.getSystemFonts();
          return Array.isArray(result) ? [...new Set(result.filter(name => typeof name === 'string' && name.trim()))].sort((a, b) => a.localeCompare(b)) : [];
        } catch (_) {
          return [];
        }
      },
      watchAudio(onData, onStatus) {
        const stream = modules()?.[148]?.exports?.a;
        const player = modules()?.[4]?.exports?.AudioPlayer;
        if (typeof stream?.subscribe !== 'function' || typeof player?.subscribeAudioData !== 'function' ||
            typeof player?.setAudioDataEnableState !== 'function') {
          onStatus('当前宿主没有可用分析通道，背景保持常规');
          return () => {};
        }
        const original = player.subscribeAudioData;
        const descriptor = Object.getOwnPropertyDescriptor(player, 'subscribeAudioData');
        let owned = false, subscription, failed = false;
        function release(handoff = false) {
          if (!owned) return;
          owned = false;
          if (player.subscribeAudioData === handoffSubscription) {
            if (descriptor) Object.defineProperty(player, 'subscribeAudioData', descriptor);
            else delete player.subscribeAudioData;
          }
          try { subscription?.unsubscribe(); } catch (_) {}
          if (!handoff) {
            try { Promise.resolve(player.setAudioDataEnableState(false)).catch(() => {}); } catch (_) {}
          }
        }
        function handoffSubscription(...args) {
          // This native channel accepts one callback. Give it back before a
          // host effect registers, rather than replacing or blocking that effect.
          release(true);
          onStatus('宿主正在使用分析通道，背景保持常规');
          return original.apply(this, args);
        }
        try {
          subscription = stream.subscribe({
            next: packets => { if (owned) onData(packets); },
            error: () => {
              failed = true;
              release();
              onStatus('当前分析通道不可用，背景保持常规');
            },
          });
          if (failed || subscription.closed) return () => {};
          owned = true;
          player.subscribeAudioData = handoffSubscription;
          Promise.resolve(player.setAudioDataEnableState(true)).catch(() => {
            if (!owned) return;
            release();
            onStatus('当前无法启用宿主分析，背景保持常规');
          });
          onStatus('正在等待宿主分析数据');
        } catch (_) {
          release();
          onStatus('当前分析通道不可用，背景保持常规');
        }
        return () => release();
      },
      queueRevision,
      mutateQueue(action, id, type, targetId, targetType, revision, after = false) {
        return invoke('queueEdit', () => {
          const latest = read();
          if (!latest.can.queueEdit) return false;
          const list = orderedQueue();
          const entry = queueMatch(list, id, type);
          if (!entry || !['track', 'localTrack', 'downloadTrack'].includes(type)) return false;
          const index = list.indexOf(entry);
          if (action === 'remove') {
            return dispatchAction('removeFromPlayingList', {
              resource: entry, resourceType: 'track', from: { scene: 'playingList' },
            }, 'click');
          }
          let boundary;
          if (action === 'up') boundary = index - 1;
          if (action === 'down') boundary = index + 2;
          if (action === 'next') {
            if (!latest.can.queueNext) return false;
            const current = list.findIndex(item => String(item.resourceId) === latest.resourceId);
            if (current < 0 || current === index || index === current + 1) return false;
            boundary = current + 1;
          }
          if (action === 'drop') {
            if (revision !== queueRevision()) return false;
            const target = queueMatch(list, targetId, targetType);
            if (!target || target === entry) return false;
            boundary = list.indexOf(target) + (after ? 1 : 0);
          }
          if (!Number.isInteger(boundary) || boundary < 0 || boundary > list.length || boundary === index || boundary === index + 1) return false;
          // The native sort model owns ordering and randomOrder. Its normal
          // next/previous path resolves the current resource from the new list.
          findStore().dispatch({
            type: 'playingList/sortPlayingList',
            payload: { trackList: [entry], options: { offset: boundary } },
          });
          return true;
        });
      },
      openExternal(url) {
        return invoke('external', () => {
          if (!/^https?:\/\//.test(url || '')) return false;
          const api = modules()?.[4]?.exports?.Os;
          if (typeof api?.openExternal === 'function') {
            Promise.resolve(api.openExternal(url)).catch(error => console.warn('[AppleNowPlaying] 无法打开外部链接', error));
            return true;
          }
          const call = bridge();
          if (!call) return false;
          call('os.navigateExternal', () => {}, [url]);
          return true;
        });
      },
      navigate(id, kind, resource) {
        return invoke('navigate', () => {
          const playing = findStore()?.getState()?.playing;
          if (!playing || getId(playing) !== id) return false;
          if (kind === 'song') return send('openVinylPage', {});
          if (!resource?.id || !['artist', 'album'].includes(kind)) return false;
          return dispatchAction('link', { resource, resourceType: kind });
        });
      },
      playlistOverlay(container, callbacks) {
        const service = modules()?.[31]?.exports?.default;
        const toast = modules()?.[3]?.exports?.L;
        if (typeof service?.openModal !== 'function' || typeof service?.closeModel !== 'function') return;
        const original = service.openModal;
        const descriptor = Object.getOwnPropertyDescriptor(service, 'openModal');
        const originalToast = toast?.create;
        const toastDescriptor = toast && Object.getOwnPropertyDescriptor(toast, 'create');
        const dialogs = new Set(), movedToasts = new Map();
        let active = true, seenFavourite = false;
        function moveToast() {
          const id = toast?.getWrapperId?.();
          const node = id && document.getElementById(id);
          if (!node || node.parentNode === container) return;
          const pointer = getComputedStyle(node).pointerEvents;
          movedToasts.set(node, { parent: node.parentNode, next: node.nextSibling,
            pointer: node.style.getPropertyValue('pointer-events'), priority: node.style.getPropertyPriority('pointer-events'), appliedPointer: pointer });
          node.style.setProperty('pointer-events', pointer);
          container.append(node);
          callbacks.toast();
        }
        function createToast(...args) {
          const value = originalToast.apply(this, args);
          if (active) moveToast();
          return value;
        }
        function openModal(request, ...args) {
          const owned = request?.comName === 'FavouriteModal' ||
            (seenFavourite && request?.comName === 'CreatePlaylistModal');
          if (!active || !owned) return original.call(this, request, ...args);
          if (request.comName === 'FavouriteModal') seenFavourite = true;
          const token = { name: request.comName };
          const afterClose = request.modalProps?.afterClose;
          dialogs.add(token);
          callbacks.open(token);
          const routed = { ...request, modalProps: { ...request.modalProps,
            getPopupContainer: () => container,
            afterClose(...values) {
              try { afterClose?.apply(this, values); }
              finally {
                if (dialogs.delete(token) && active) callbacks.close(token);
              }
            },
          } };
          try { return original.call(this, routed, ...args); }
          catch (error) {
            if (dialogs.delete(token) && active) callbacks.close(token);
            throw error;
          }
        }
        try {
          service.openModal = openModal;
          if (typeof originalToast === 'function') toast.create = createToast;
        } catch (_) {
          if (service.openModal === openModal) {
            if (descriptor) Object.defineProperty(service, 'openModal', descriptor);
            else delete service.openModal;
          }
          return;
        }
        return {
          release(cancel = false) {
            if (!active) return;
            active = false;
            if (service.openModal === openModal) {
              if (descriptor) Object.defineProperty(service, 'openModal', descriptor);
              else delete service.openModal;
            }
            if (toast?.create === createToast) {
              if (toastDescriptor) Object.defineProperty(toast, 'create', toastDescriptor);
              else delete toast.create;
            }
            if (cancel) {
              for (const name of new Set([...dialogs].map(token => token.name))) {
                try { service.closeModel({ mode: 'comModal', comName: name, isForce: true }); } catch (_) {}
              }
            }
            dialogs.clear();
            for (const [node, position] of movedToasts) {
              if (node.style.getPropertyValue('pointer-events') === position.appliedPointer) {
                if (position.pointer) node.style.setProperty('pointer-events', position.pointer, position.priority);
                else node.style.removeProperty('pointer-events');
              }
              if (!node.isConnected || node.parentNode !== container || !position.parent?.isConnected) continue;
              position.parent.insertBefore(node, position.next?.parentNode === position.parent ? position.next : null);
            }
            movedToasts.clear();
          },
        };
      },
      addToPlaylist(id) {
        return invoke('playlist', () => {
          const playing = findStore()?.getState()?.playing;
          if (!playing || getId(playing) !== id || !playing.curTrack || /voice/i.test(playing.resourceType || '')) return false;
          return dispatchAction('favorite', {
            resource: playing.curTrack, resourceType: 'track', from: { scene: 'vinyl' },
          });
        });
      },
      playQueue(resourceId, resourceType) {
        return invoke('queuePlay', () => {
          const state = findStore()?.getState();
          const matches = (state?.playingList?.curPlayingList || []).filter(item =>
            String(item.resourceId) === resourceId && String(item.resourceType || 'track') === resourceType);
          if (matches.length !== 1) return false;
          return dispatchAction('play', {
            resource: matches[0], resourceType: 'track', from: { scene: 'playingList' },
          }, 'dbClick');
        });
      },
      volume(value) {
        return invoke('volume', () => {
          value = clamp(value, 0, 1);
          if (send('setVolume', { volume: value })) return true;
          const call = bridge();
          if (!call) return false;
          call('audioplayer.setVolume', () => {}, ['', '', value]);
          return true;
        });
      },
    };
  }

  function parseLrc(raw, includeEmpty = false) {
    const lines = new Map();
    const offset = Number(raw?.match(/\[offset:([+-]?\d+)\]/i)?.[1]) || 0;
    for (const line of (raw || '').split(/\r?\n/)) {
      const tags = [...line.matchAll(/\[(\d+):(\d{1,2})(?:[.:](\d{1,3}))?\]/g)];
      if (!tags.length) continue;
      const content = line.slice(tags[tags.length - 1].index + tags[tags.length - 1][0].length).trim();
      if (!content && !includeEmpty) continue;
      for (const [, min, sec, fraction] of tags) {
        const time = Math.max(0, +min * 60000 + +sec * 1000 + Number((fraction || '').padEnd(3, '0')) - offset);
        lines.set(time, content);
      }
    }
    return lines;
  }

  function nearestText(entries, time) {
    if (entries.has(time)) return entries.get(time);
    let closest = '', distance = 550;
    for (const [stamp, value] of entries) {
      if (Math.abs(stamp - time) < distance) {
        closest = value;
        distance = Math.abs(stamp - time);
      }
    }
    return closest;
  }

  function parseYrcWords(raw) {
    const synced = new Map();
    for (const line of (raw || '').split(/\r?\n/)) {
      const start = line.match(/^\[(\d+),(\d+)\]/);
      if (!start) continue;
      const words = [...line.matchAll(/\((\d+),(\d+),-?\d+\)(.*?)(?=\(\d+,\d+,-?\d+\)|$)/g)]
        .map(([, time, duration, word]) => ({ time: +time, duration: +duration, text: word }));
      const content = words.map(word => word.text).join('').trim();
      if (content && words.some(word => word.duration > 0 && word.text.trim())) {
        synced.set(+start[1], { content, words, end: +start[1] + +start[2] });
      }
    }
    return synced;
  }

  function parseNativeLyrics(payload, preferWords) {
    const original = parseLrc(payload.lrc?.lyric, true);
    const translated = parseLrc(payload.tlyric?.lyric);
    const wordTranslations = parseLrc(payload.ytlrc?.lyric);
    const roman = parseLrc(payload.romalrc?.lyric);
    const wordRoman = parseLrc(payload.yromalrc?.lyric);
    const synced = parseYrcWords(payload.yrc?.lyric);
    const timedRoman = parseYrcWords(payload.yromalrc?.lyric);
    const originalCount = [...original.values()].filter(Boolean).length;
    const usingYrc = preferWords && synced.size > 0 && synced.size >= originalCount * .7;
    if (!usingYrc && !originalCount) return [];
    return [...(usingYrc ? synced : original).entries()].sort(([a], [b]) => a - b).map(([time, row]) => {
      let content = typeof row === 'string' ? row : row.content;
      const words = row.words || [];
      const reading = usingYrc && nearestText(timedRoman, time);
      const backing = content.match(/^(?:\((.+)\)|（(.+)）)$/);
      let translation = (usingYrc && nearestText(wordTranslations, time)) || nearestText(translated, time) || '';
      if (backing) {
        content = (backing[1] || backing[2]).trim();
        const first = words.find(word => word.text.trim());
        const last = [...words].reverse().find(word => word.text.trim());
        if (first) first.text = first.text.replace(/^\s*[（(]\s*/, '');
        if (last) last.text = last.text.replace(/\s*[）)]\s*$/, '');
        translation = translation.replace(/^\s*[（(](.+)[）)]\s*$/, '$1');
      }
      return {
        time, end: row.end, content, words, translation,
        romanWords: reading?.words,
        roman: reading?.content || (usingYrc && nearestText(wordRoman, time)) || nearestText(roman, time) || '',
        side: backing ? 'right' : 'left', backing: !!backing, backingLines: [],
      };
    });
  }

  const metadataNamespace = 'http://www.w3.org/ns/ttml#metadata';
  const xmlNamespace = 'http://www.w3.org/XML/1998/namespace';
  const roleOf = (element) => element.getAttributeNS(metadataNamespace, 'role');
  const byTag = (element, name) => [...element.getElementsByTagNameNS('*', name)];

  function ttmlTime(value) {
    if (!value) return NaN;
    if (/^\d+(?:\.\d+)?ms$/.test(value)) return parseFloat(value);
    if (/^\d+(?:\.\d+)?s?$/.test(value)) return parseFloat(value) * 1000;
    if (!/^(?:\d+:){1,2}\d{1,2}(?:\.\d+)?$/.test(value)) return NaN;
    return value.split(':').reduce((seconds, part) => seconds * 60 + Number(part), 0) * 1000;
  }

  function preferredTtmlText(entries) {
    const present = entries.filter(entry => entry.content);
    return present.find(entry => /^zh(?:-|$)/i.test(entry.lang || '')) || present[0];
  }

  const ttmlRubyRole = element => element.getAttributeNS('http://www.w3.org/ns/ttml#styling', 'ruby');

  function readRubyWord(container, fallbackTiming) {
    const children = Array.from(container.children);
    const base = children.find(element => ttmlRubyRole(element) === 'base');
    if (!base) return;
    const text = base.textContent.replace(/\s+/g, ' ');
    const ruby = [];
    for (const part of byTag(container, 'span')) {
      if (ttmlRubyRole(part) !== 'text') continue;
      const word = part.textContent.trim();
      const startTime = ttmlTime(part.getAttribute('begin'));
      const endTime = ttmlTime(part.getAttribute('end'));
      if (word && endTime > startTime) ruby.push({ word, startTime, endTime });
    }
    if (!ruby.length) return { ...fallbackTiming, text };
    const time = Math.min(...ruby.map(part => part.startTime));
    return { text, time, duration: Math.max(...ruby.map(part => part.endTime)) - time, ruby };
  }

  function readTtmlText(container, explicitTiming = false) {
    const words = [];
    let content = '';
    let previousTiming;
    function read(node, timing) {
      if (node.nodeType === Node.TEXT_NODE) {
        const raw = node.nodeValue;
        const value = raw.trim() ? raw.replace(/\s+/g, ' ') : raw.includes('\n') ? '' : raw;
        content += value;
        if (value) {
          if (explicitTiming && words.length && timing === previousTiming) words[words.length - 1].text += value;
          else words.push({ ...(timing || {}), text: value });
          previousTiming = timing;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE && !roleOf(node)) {
        const time = ttmlTime(node.getAttribute('begin'));
        const end = ttmlTime(node.getAttribute('end'));
        let interval = end > time ? { time, duration: end - time } : timing;
        if (!explicitTiming && ttmlRubyRole(node) === 'container') {
          const word = readRubyWord(node, interval);
          if (word) {
            content += word.text;
            words.push(word);
            return;
          }
        }
        if (explicitTiming && (node.hasAttribute('begin') || node.hasAttribute('end') || node.hasAttribute('dur'))) {
          const duration = node.hasAttribute('end') ? end - time : ttmlTime(node.getAttribute('dur'));
          interval = Number.isFinite(time) && Number.isFinite(duration) && duration > 0 ? { time, duration } : undefined;
        }
        node.childNodes.forEach(child => read(child, interval));
      }
    }
    container.childNodes.forEach(child => read(child));
    return { content: content.trim(), words: words.some(word => word.duration > 0) ? words : [] };
  }

  function readTtmlRomanization(container) {
    const { content, words } = readTtmlText(container, true);
    // The enclosing romanization element can time a whole line. Only its
    // explicitly timed descendants can provide the finer-grained time axis.
    if (!words.length) return { content };
    let previousStart = -Infinity;
    for (const word of words) {
      if (!word.text.trim()) continue;
      if (!(word.duration > 0) || word.time < previousStart) return { content };
      previousStart = word.time;
    }
    return { content, words: words.map(({ time = 0, duration = 0, text }) => ({ time, duration, text })) };
  }

  function parseTtml(raw) {
    const xml = new DOMParser().parseFromString(raw, 'application/xml');
    if (xml.getElementsByTagName('parsererror').length || xml.documentElement?.localName !== 'tt') return [];
    const head = byTag(xml, 'head')[0];
    const body = byTag(xml, 'body')[0];
    if (!body) return [];
    const sidecars = new Map();
    for (const type of ['translation', 'transliteration']) {
      const read = type === 'transliteration' ? readTtmlRomanization : element => ({ content: readTtmlText(element).content });
      for (const group of head ? byTag(head, type) : []) {
        for (const row of byTag(group, 'text')) {
          const key = row.getAttribute('for');
          if (!key) continue;
          if (!sidecars.has(key)) sidecars.set(key, []);
          sidecars.get(key).push({
            type,
            lang: group.getAttributeNS(xmlNamespace, 'lang'),
            text: read(row),
            backing: byTag(row, 'span').filter(span => roleOf(span) === 'x-bg').map(read),
          });
        }
      }
    }
    function sideText(line, role, extra, type, backingIndex) {
      const isRoman = role === 'x-roman';
      const inline = [...line.children].filter(span => roleOf(span) === role).map(span => ({
        lang: span.getAttributeNS(xmlNamespace, 'lang'),
        ...(isRoman ? readTtmlRomanization(span) : { content: span.textContent.trim() }),
      }));
      const sidecar = extra.filter(entry => entry.type === type).map(entry => ({
        lang: entry.lang, ...(backingIndex === undefined ? entry.text : entry.backing[backingIndex]),
      }));
      const entries = [...inline, ...sidecar];
      const selected = preferredTtmlText(entries);
      if (isRoman && selected && !selected.words) {
        const lang = (selected.lang || '').toLowerCase();
        return entries.find(entry => {
          const entryLang = (entry.lang || '').toLowerCase();
          return entry.words && entry.content === selected.content && (!lang || !entryLang || entryLang === lang);
        }) || selected;
      }
      return selected;
    }
    function supplementalText(line, extra, backingIndex) {
      const translation = sideText(line, 'x-translation', extra, 'translation', backingIndex);
      const roman = sideText(line, 'x-roman', extra, 'transliteration', backingIndex);
      return { translation: translation?.content || '', roman: roman?.content || '', romanWords: roman?.words };
    }
    function vocal(element, fallbackStart, fallbackEnd) {
      const result = readTtmlText(element);
      const timed = result.words.filter(word => word.duration > 0 && Number.isFinite(word.time));
      const start = ttmlTime(element.getAttribute('begin'));
      const end = ttmlTime(element.getAttribute('end'));
      return {
        ...result,
        time: Number.isFinite(start) ? start : timed[0]?.time ?? fallbackStart,
        end: Number.isFinite(end) ? end : timed.length ? Math.max(...timed.map(word => word.time + word.duration)) : fallbackEnd,
      };
    }
    const agents = head ? byTag(head, 'agent').filter(agent => agent.getAttribute('type') === 'person') : [];
    const firstAgent = agents[0]?.getAttributeNS(xmlNamespace, 'id') || 'v1';
    const lines = [];
    for (const line of byTag(body, 'p')) {
      const time = ttmlTime(line.getAttribute('begin'));
      if (!Number.isFinite(time)) continue;
      const agent = line.getAttributeNS(metadataNamespace, 'agent') || line.parentElement?.getAttributeNS(metadataNamespace, 'agent');
      const side = agent && agent !== firstAgent && agent !== 'v1000' ? 'right' : 'left';
      const key = [...line.attributes].find(attribute => attribute.localName === 'key')?.value;
      const extra = sidecars.get(key) || [];
      const main = vocal(line, time, undefined);
      const backingLines = [...line.children].filter(span => roleOf(span) === 'x-bg').map((span, index) => ({
        ...vocal(span, time, main.end),
        ...supplementalText(span, extra, index),
        side, backing: true,
      })).filter(row => row.content);
      if (main.content || backingLines.length) {
        lines.push({
          ...main, time, side, agent, backing: false, backingLines,
          ...supplementalText(line, extra),
        });
      }
    }
    return lines.sort((a, b) => a.time - b.time);
  }

  function mergeLyricSidecars(rows, native) {
    const normalized = value => (value || '').replace(/[\s，。！？、,.!?（）()「」…〜~]/g, '');
    const candidates = new Map();
    for (const line of native) {
      const key = normalized(line.content);
      if (!key) continue;
      if (!candidates.has(key)) candidates.set(key, []);
      candidates.get(key).push(line);
    }
    function merge(line) {
      const matches = candidates.get(normalized(line.content)) || [];
      let closest, distance = 1000;
      for (const candidate of matches) {
        const delta = Math.abs(candidate.time - line.time);
        if (delta <= distance) {
          closest = candidate;
          distance = delta;
        }
      }
      const compatibleReading = closest?.romanWords?.length &&
        (!line.roman || normalized(line.roman).toLowerCase() === normalized(closest.roman).toLowerCase());
      const romanWords = line.romanWords?.length ? line.romanWords : compatibleReading ?
        closest.romanWords.map(w => ({ ...w, time: w.time + line.time - closest.time })) : undefined;
      return {
        ...line, romanWords, translation: line.translation || closest?.translation || '',
        roman: line.roman || closest?.roman || '',
      };
    }
    return rows.map(line => ({ ...merge(line), backingLines: (line.backingLines || []).map(merge) }));
  }

  function prepareLyrics(rows, duration) {
    const result = [];
    let lastEnd = 0, explicitEnd = true;
    const addInterlude = (start, end) => {
      if (explicitEnd && end - start >= 7000) {
        result.push({ kind: 'interlude', time: start, end, key: 'gap-' + start, words: [], backingLines: [] });
      }
    };
    rows.forEach((row, index) => {
      if (!row.content && !row.backingLines?.length) {
        lastEnd = Math.max(lastEnd, row.time);
        explicitEnd = true;
        return;
      }
      if (row.time >= lastEnd) addInterlude(lastEnd, row.time);
      // QRC/TTML containers can last until the next sentence although their
      // timed singing has already ended. Use real word tails for gap detection.
      const withVocalTiming = vocal => {
        const timed = vocal.words.filter(word => word.duration > 0);
        return {
          ...vocal,
          vocalStart: timed.length ? Math.min(...timed.map(word => word.time)) : vocal.time,
          vocalEnd: timed.length ? Math.max(...timed.map(word => word.time + word.duration)) : vocal.end ?? vocal.time,
        };
      };
      const backingLines = (row.backingLines || []).map(withVocalTiming);
      const main = withVocalTiming(row);
      const end = Math.max(main.vocalEnd, ...backingLines.map(vocal => vocal.vocalEnd));
      const audibleStart = Math.min(main.vocalStart, ...backingLines.map(vocal => vocal.vocalStart));
      result.push({ ...main, backingLines, sourceEnd: row.end, kind: 'line', key: 'line-' + row.time + '-' + index, end, audibleStart,
        explicitEnd: Number.isFinite(row.end) || row.words.some(word => word.duration > 0) });
      lastEnd = Math.max(lastEnd, end);
      explicitEnd = Number.isFinite(row.end) || row.words.some(word => word.duration > 0);
    });
    if (result.length) addInterlude(lastEnd, duration * 1000);
    return result.sort((a, b) => a.time - b.time);
  }

  async function requestLyrics(url, parent, timeout, read) {
    const controller = new AbortController();
    const cancel = () => controller.abort();
    parent.signal.addEventListener('abort', cancel, { once: true });
    if (parent.signal.aborted) cancel();
    const timer = setTimeout(cancel, timeout);
    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) return { missing: response.status === 404 };
      return { data: await read(response) };
    } catch (_) {
      return {};
    } finally {
      clearTimeout(timer);
      parent.signal.removeEventListener('abort', cancel);
    }
  }

  const host = makeHost();
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let takeover = storedValue(takeoverKey) !== 'off';
  let lyricSource = '打开播放页后加载';
  let settingsSource;
  let page, launcher, view, snapshot, pageStyle, entryObserver, replacementOff;
  const lifetime = new AbortController();
  let activity, frame, unwatchHost, lyricResize;
  let dirty = true, sampleAt = 0;
  let backdropIndex = 0, paletteImage, coverKey;
  let lyrics = [], lyricRequest, lyricTrackId, restartLyrics = false;
  let lyricFocus = -1, browseUntil = 0;
  let tab = 'lyrics';
  let queueReference, queueCurrent;
  let clock, displayed = 0, pendingSeek, deferredSeek, seekAlignment;
  let drag, dragEndTimer, pendingVolume, volumeGesture, volumeQueued, volumeTimer;
  let volumeSentAt = -Infinity;
  let ignoreFallbackPosition;
  let focusBeforeOpen;
  let lyricView, queueView, rawLyrics = [];
  let queueRows = [], metadataSignature = '';
  let details, detailRequest, detailTrackId;
  let previewPosition, copyMode = false, copyAnchor, rowMenuIndex = -1;
  let previewView, previewRow, previewOptions;
  let popupFocus, toastTimer, pageTransition, closing = false, nativeDialog, coverSaveRequest;
  let settingsOpen = false, settingsAnimation;
  let panelPositions = {}, controlsHidden = false, panelSlide, panelFade;
  let fluidRenderer, audioOff, audioTrack, audioStatus = '音频律动已关闭';
  let audioTarget = 0, audioPulse = 0, audioStamp = 0, audioVisualAt = 0;
  let lowPass = 0, lowEnvelope = 0;
  let lyricDetails = { contributors: [], metadata: [], supplements: [] };
  let fontRequest = 0, fontsLoaded = false, queueMenuTarget, queueDrag, dropdown;
  let dropdownSequence = 0;
  const narrowWindow = matchMedia('(max-width: 800px), (max-height: 400px)');

  function mount() {
    const style = document.createElement('style');
    style.textContent = /* PLAYING_CSS */ '';
    pageStyle = style;
    document.head.append(style);
    launcher = document.createElement('button');
    launcher.id = 'apple-now-playing-launch';
    launcher.type = 'button';
    launcher.title = '打开沉浸播放页（Ctrl+Shift+M）';
    launcher.setAttribute('aria-label', launcher.title);
    launcher.innerHTML = icon('music');
    launcher.addEventListener('click', () => open());
    document.body.append(launcher);
    updateLauncher();
    entryObserver = new MutationObserver(records => {
      if (!records.some(({ target }) => !page?.contains(target))) return;
      const flight = pageTransition?.flight;
      if (flight && host.coverEntry()?.querySelector('img') !== flight.thumbnail) settlePageTransition();
      updateLauncher();
    });
    entryObserver.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('click', handleVinyl, { capture: true, signal: lifetime.signal });
    window.addEventListener('pagehide', dispose, { once: true, signal: lifetime.signal });

    page = document.createElement('section');
    page.id = 'apple-now-playing-page';
    page.hidden = true;
    page.tabIndex = -1;
    page.setAttribute('role', 'dialog');
    page.setAttribute('aria-modal', 'true');
    page.setAttribute('aria-label', '沉浸播放页');
    page.innerHTML = `
      <div class="apple-now-playing-page-background" aria-hidden="true"><div class="apple-now-playing-backgrounds"><div class="apple-now-playing-backdrop on"></div><div class="apple-now-playing-backdrop"></div><canvas class="apple-now-playing-fluid" hidden></canvas></div></div>
      <div class="apple-now-playing-drag-bar" aria-hidden="true"></div>
      <button type="button" class="apple-now-playing-grip" data-action="close" aria-label="收起播放页" title="收起播放页（Esc）"></button>
      <div class="apple-now-playing-window-tools">
        ${button('settings', '播放页设置', 'settings', 'apple-now-playing-settings-button')}
        ${button('screen', '切换全屏', 'screen', 'apple-now-playing-screen')}
      </div>
      <div class="apple-now-playing-left">
        <div class="apple-now-playing-cover-slot"><div class="apple-now-playing-cover">${icon('music')}<img alt="" hidden></div></div>
        <div class="apple-now-playing-controls">
          <div class="apple-now-playing-meta">
            <div class="apple-now-playing-track"><button type="button" class="apple-now-playing-title" data-action="detail-song"></button><div class="apple-now-playing-alias" hidden></div><div class="apple-now-playing-sub"></div></div>
            ${button('favorite', '喜欢', 'heart', 'apple-now-playing-favorite')}
            ${button('menu', '更多', 'more')}

          </div>
          <div class="apple-now-playing-timeline">
            <input class="apple-now-playing-seek" type="range" min="0" max="1" value="0" step=".01" aria-label="播放进度">
            <div class="apple-now-playing-times">
              <span class="apple-now-playing-elapsed">0:00</span>
              <span class="apple-now-playing-loading" role="status" hidden>正在加载音频…</span>
              <span class="apple-now-playing-quality" aria-label="当前音质" hidden></span>
              <span class="apple-now-playing-remaining">-0:00</span>
            </div>
          </div>
          <div class="apple-now-playing-play-area">
          <div class="apple-now-playing-transport">
            ${button('mode', '播放模式', 'order', 'apple-now-playing-mode')}
            ${button('previous', '上一首', 'previous', 'apple-now-playing-skip')}
            ${button('play', '播放', 'play', 'apple-now-playing-play')}
            ${button('next', '下一首', 'next', 'apple-now-playing-skip')}
            ${button('queue', '播放队列', 'queue', 'apple-now-playing-queue-toggle')}
          </div>
          </div>
          <div class="apple-now-playing-volume">${icon('quiet')}
            <div class="apple-now-playing-volume-control">
              <input class="apple-now-playing-volume-input" type="range" min="0" max="1" value=".5" step=".01" aria-label="音量">
              <div class="apple-now-playing-volume-track" aria-hidden="true"><span class="apple-now-playing-volume-fill"></span></div>
            </div>
            ${icon('volume')}
          </div>
        </div>
      </div>
      <div class="apple-now-playing-right">
        <div class="apple-now-playing-panel-content">
        <div class="apple-now-playing-lyrics" tabindex="-1"><div class="apple-now-playing-amll-host" id="apple-now-playing-lyric-host"></div><div class="apple-now-playing-browse-rail" role="scrollbar" aria-label="浏览歌词" aria-orientation="vertical" aria-controls="apple-now-playing-lyric-host" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="-1"><i></i></div></div>
        <div class="apple-now-playing-status" role="status"></div>
        <div class="apple-now-playing-queue" aria-label="播放队列" tabindex="0" hidden>
          <div class="apple-now-playing-queue-header">
            <h2>播放队列</h2>
            <button type="button" data-action="host-queue">在网易云管理</button>
          </div>
          <div class="apple-now-playing-queue-source"></div>
          <div class="apple-now-playing-queue-scroll" tabindex="0" aria-label="队列歌曲">
            <div class="apple-now-playing-queue-list" role="list"></div>
          </div>
        </div>
        <div class="apple-now-playing-copy-view" hidden>
          <div class="apple-now-playing-copy-tools">
            <button type="button" data-action="copy-all">复制全部</button>
            <button type="button" data-action="select-all">全选</button>
            <button type="button" data-action="copy-view">返回歌词</button>
          </div>
          <textarea class="apple-now-playing-copy-text" readonly aria-label="可复制的歌词"></textarea>
        </div>
        </div>
      </div>
      <div class="apple-now-playing-menu" aria-label="当前曲目操作" hidden></div>
      <div class="apple-now-playing-row-menu" aria-label="歌词复制" hidden></div>
      <aside id="apple-now-playing-settings" class="apple-now-playing-settings-panel" role="dialog" aria-modal="true" aria-label="播放页设置" hidden>
        <div class="apple-now-playing-settings-header"><h2>播放页设置</h2>${button('close-settings', '关闭播放页设置', 'close', 'apple-now-playing-settings-close')}</div>
        <div class="apple-now-playing-settings-body">
        <nav class="apple-now-playing-settings-nav" role="tablist" aria-label="设置分类" aria-orientation="vertical"></nav>
        <div class="apple-now-playing-preferences">
          <fieldset class="apple-now-playing-lyric-settings">
            <legend>仅当前歌曲</legend>
            <p class="apple-now-playing-setting-help">每次调整 0.1 秒，按当前歌曲保存。</p>
            <div class="apple-now-playing-pref-row">
              <span class="apple-now-playing-pref-caption">当前歌曲偏移</span>
              <div class="apple-now-playing-offset" aria-label="当前歌曲歌词偏移">
                <button type="button" data-action="offset-ahead" aria-label="歌词提前 100 毫秒">提前</button>
                <output class="apple-now-playing-offset-value" aria-live="polite">0.0 s</output>
                <button type="button" data-action="offset-behind" aria-label="歌词延后 100 毫秒">延后</button>
                <button type="button" data-action="offset-reset" aria-label="重置当前歌曲歌词偏移">重置</button>
              </div>
            </div>
          </fieldset>
            <div class="apple-now-playing-settings-actions">
              <button type="button" data-action="source">歌词来源</button>
            </div>
        </div>
        </div>
      </aside>
      <aside class="apple-now-playing-source-panel" role="dialog" aria-modal="true" aria-label="歌词来源详情" hidden>
        <div class="apple-now-playing-settings-header"><h2>歌词来源</h2><button type="button" data-action="close-source" aria-label="关闭歌词来源">完成</button></div>
        <div class="apple-now-playing-source-content"></div>
      </aside>
      <div class="apple-now-playing-queue-menu" aria-label="队列操作" hidden></div>
      <div class="apple-now-playing-preview" id="apple-now-playing-progress-preview" role="tooltip" hidden>
        <div class="apple-now-playing-preview-time"></div>
        <div class="apple-now-playing-preview-lyrics"></div>
        <div class="apple-now-playing-preview-status"></div>
      </div>
      <div class="apple-now-playing-toast" role="status" hidden></div>
      <div class="apple-now-playing-tabs">
        <div class="apple-now-playing-lyric-actions" role="group" aria-label="歌词显示">
          ${button('toggle-translation', '显示译文', 'translate')}
          ${button('toggle-karaoke', '显示逐字歌词', 'karaoke')}
          ${button('toggle-roman', '显示罗马音', 'roman')}
        </div>
        ${button('lyrics', '歌词', 'lyrics')}
      </div>`;
    document.body.append(page);

    const q = (name) => page.querySelector('.apple-now-playing-' + name);
    view = {
      backdrop: [...page.querySelectorAll('.apple-now-playing-backdrop')], cover: q('cover').querySelector('img'),
      pageBackground: q('page-background'), coverBox: q('cover'), meta: q('meta'), grip: q('grip'),
      pageControls: ['timeline', 'play-area', 'volume', 'window-tools', 'tabs'].map(q),
      left: q('left'), right: q('right'), panel: q('panel-content'), lyricsToggle: page.querySelector('[data-action="lyrics"]'),
      title: q('title'), alias: q('alias'), sub: q('sub'), quality: q('quality'), menu: q('menu'), seek: q('seek'), elapsed: q('elapsed'),
      remaining: q('remaining'), loading: q('loading'), play: q('play'), mode: q('mode'),
      favorite: q('favorite'), volume: q('volume-input'), volumeGroup: q('volume'), lyrics: q('lyrics'),
      lyricHost: q('amll-host'), browseBar: q('browse-rail'), status: q('status'), queue: q('queue'), queueList: q('queue-list'),
      queueScroll: q('queue-scroll'), queueSource: q('queue-source'), tools: q('lyric-actions'),
      offset: q('offset-value'), preview: q('preview'), copy: q('copy-view'), copyText: q('copy-text'),
      settings: q('settings-panel'), settingsToggle: q('settings-button'), preferences: q('preferences'), rowMenu: q('row-menu'), toast: q('toast'),
      fluid: q('fluid'), sourcePanel: q('source-panel'), sourceContent: q('source-content'), queueMenu: q('queue-menu'),
    };
    fluidRenderer = new AppleNowPlayingFluidBackground(view.fluid);
    lyricView = new window.AppleNowPlayingExtView(view.lyricHost, (_, node) => {
      if (closing || !snapshot?.can.seek) return;
      seek((Number(node.dataset.time) - currentOffset()) / 1000);
    }, (node, x, y) => showRowMenu(Number(node.dataset.index), x, y));
    queueView = new AppleNowPlayingViewportList(view.queueScroll, view.queueList, createQueueRow, item => item.kind === 'heading' ? 34 : 58);
    view.hostButtons = new Map(['play', 'previous', 'next', 'mode', 'favorite'].map(action =>
      [action, page.querySelector('[data-action="' + action + '"]')]));
    buildSettings();
    buildFontChooser();
    buildAudioStatus();
    view.settingsToggle.setAttribute('aria-controls', view.settings.id);
    view.settingsToggle.setAttribute('aria-expanded', 'false');
    applyPreferences();
    for (const layer of view.backdrop) {
      layer.addEventListener('transitionend', event => {
        if (event.propertyName === 'opacity') layer.classList.remove('apple-now-playing-fading');
      });
    }
    page.addEventListener('click', handleClick);
    page.addEventListener('pointermove', () => setControlsHidden(false), { passive: true });
    page.addEventListener('focusin', event => {
      if (panelFade?.outgoing && view.right.contains(event.target)) {
        view.lyricsToggle.focus({ preventScroll: true });
        return;
      }
      if (event.target.closest('.apple-now-playing-left, .apple-now-playing-settings-panel, .apple-now-playing-menu')) setControlsHidden(false);
    });
    view.lyrics.addEventListener('contextmenu', event => {
      if (event.defaultPrevented || !rawLyrics.length || event.target.closest('[data-action="lyric"]')) return;
      event.preventDefault();
      showRowMenu(-1, event.clientX, event.clientY);
    });
    view.lyrics.addEventListener('focusin', event => {
      const node = event.target.closest('[data-action="lyric"]');
      if (node) lyricFocus = Number(node.dataset.index);
    });
    view.queueList.addEventListener('contextmenu', event => {
      const button = event.target.closest('.apple-now-playing-queue-row');
      if (!button) return;
      event.preventDefault();
      showQueueMenu(button.dataset.resourceId, button.dataset.resourceType, event.clientX, event.clientY);
    });
    view.queueList.addEventListener('keydown', event => {
      if (event.key !== 'ContextMenu' && !(event.shiftKey && event.key === 'F10')) return;
      const button = event.target.closest('.apple-now-playing-queue-row');
      if (!button) return;
      event.preventDefault();
      event.stopPropagation();
      const rect = button.getBoundingClientRect();
      showQueueMenu(button.dataset.resourceId, button.dataset.resourceType, rect.left + 30, rect.top + 20);
    });
    view.queueList.addEventListener('dragstart', event => {
      const button = event.target.closest('.apple-now-playing-queue-row');
      if (!button?.draggable) return;
      queueDrag = { id: button.dataset.resourceId, type: button.dataset.resourceType, revision: host.queueRevision() };
      event.dataTransfer.setData('text/plain', queueDrag.id);
      event.dataTransfer.effectAllowed = 'move';
    });
    view.queueList.addEventListener('dragover', event => {
      const target = event.target.closest('.apple-now-playing-queue-row');
      if (queueDrag && target) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        for (const item of view.queueList.querySelectorAll('.drag-before, .drag-after')) item.classList.remove('drag-before', 'drag-after');
        const rect = target.getBoundingClientRect();
        target.parentElement.classList.add(event.clientY > rect.top + rect.height / 2 ? 'drag-after' : 'drag-before');
      }
    });
    view.queueList.addEventListener('drop', event => {
      const button = event.target.closest('.apple-now-playing-queue-row');
      if (!queueDrag || !button) return;
      event.preventDefault();
      const source = queueDrag;
      queueDrag = undefined;
      const rect = button.getBoundingClientRect();
      if (!host.mutateQueue('drop', source.id, source.type, button.dataset.resourceId, button.dataset.resourceType, source.revision, event.clientY > rect.top + rect.height / 2)) {
        notify('队列已变化，请重新操作或在网易云管理');
      }
      dirty = true;
    });
    view.queueList.addEventListener('dragend', () => {
      queueDrag = undefined;
      for (const item of view.queueList.querySelectorAll('.drag-before, .drag-after')) item.classList.remove('drag-before', 'drag-after');
    });
    bindPanelBrowsing(view.queueScroll);
    bindPanelBrowsing(view.lyrics);
    view.seek.addEventListener('pointermove', event => showPreview(event.clientX));
    view.seek.addEventListener('pointerleave', hidePreview);
    view.seek.addEventListener('blur', hidePreview);
    const dragBrowseRail = event => {
      if (event.type === 'pointermove' && !view.browseBar.hasPointerCapture(event.pointerId)) return;
      if (event.type === 'pointerdown') {
        if (event.button !== 0) return;
        view.browseBar.setPointerCapture(event.pointerId);
      }
      const rect = view.browseBar.getBoundingClientRect();
      const p = lyricView.player;
      const [min, max] = p.scrollBoundary;
      p.setBrowseOffset(min + clamp((event.clientY - rect.top) / rect.height, 0, 1) * (max - min));
      browseLyrics();
      event.preventDefault();
    };
    view.browseBar.addEventListener('pointerdown', dragBrowseRail);
    view.browseBar.addEventListener('pointermove', dragBrowseRail);
    view.lyrics.addEventListener('keydown', handleLyricKeys);
    view.seek.addEventListener('pointerdown', event => {
      if (!activity || event.button !== 0 || !snapshot?.can.seek) return;
      clearTimeout(dragEndTimer);
      pendingSeek = deferredSeek = seekAlignment = undefined;
      drag = { id: snapshot.id, pointer: event.pointerId, target: view.seek.valueAsNumber, changed: false };
    });
    view.seek.addEventListener('input', () => {
      const target = view.seek.valueAsNumber;
      if (drag) {
        if (drag.id !== snapshot?.id || drag.cancelled) return;
        drag.target = target;
        drag.changed = true;
      }
      renderTime(target, performance.now());
    });
    view.seek.addEventListener('change', () => {
      if (drag) {
        finishDrag();
      } else {
        seek(view.seek.valueAsNumber);
      }
    });
    view.volume.addEventListener('pointerdown', event => {
      if (activity && event.button === 0 && snapshot?.can.volume) {
        volumeGesture = { pointer: event.pointerId };
        view.volumeGroup.classList.add('is-adjusting');
      }
    });
    view.volume.addEventListener('input', () => {
      if (!activity) return;
      // Paint the native range and capsule before doing any host work.
      fillRange(view.volume);
      queueVolume(view.volume.valueAsNumber);
    });
    view.volume.addEventListener('change', finishVolumeGesture);
    view.volume.addEventListener('lostpointercapture', () => {
      if (volumeGesture) finishVolumeGesture();
    });
    window.addEventListener('blur', () => {
      if (volumeGesture) finishVolumeGesture();
    }, { signal: lifetime.signal });
    window.addEventListener('keydown', handleKeyboard, { capture: true, signal: lifetime.signal });
    document.addEventListener('fullscreenchange', syncFullScreen, { signal: lifetime.signal });
    document.addEventListener('visibilitychange', () => {
      if (page.hidden) return;
      if (document.hidden) {
        if (closing) finishClose();
        else {
          cancelPageTransition();
          stopActivity();
        }
      } else {
        startActivity();
      }
    }, { signal: lifetime.signal });
    reducedMotion.addEventListener('change', () => {
      settlePageTransition();
      if (settingsAnimation && reducedMotion.matches) setSettingsVisible(settingsOpen, true);
      cancelPanelSlide();
      cancelPanelFade();
      applyPreferences();
      syncAudioAnalysis();
    }, { signal: lifetime.signal });
  }

  function closeDropdown(returnFocus = false) {
    const previous = dropdown;
    if (!previous) return;
    dropdown = undefined;
    previous.scope.abort();
    previous.list.remove();
    previous.trigger.setAttribute('aria-expanded', 'false');
    if (returnFocus && previous.trigger.isConnected && !page.hidden) previous.trigger.focus({ preventScroll: true });
  }

  function dropdownActive(index) {
    if (!dropdown) return;
    const items = dropdown.items;
    dropdown.index = clamp(index, 0, items.length - 1);
    items.forEach((item, i) => item.classList.toggle('apple-now-playing-option-active', i === dropdown.index));
    const active = items[dropdown.index];
    if (active) {
      dropdown.list.setAttribute('aria-activedescendant', active.id);
      active.scrollIntoView({ block: 'nearest' });
    }
  }

  function handleDropdownKeyboard(event) {
    if (!dropdown) return false;
    if (event.key === 'Tab') { closeDropdown(true); return false; }
    const delta = event.key === 'ArrowDown' ? 1 : event.key === 'ArrowUp' ? -1 : 0;
    if (event.key === 'Escape') closeDropdown(true);
    else if (delta) dropdownActive((dropdown.index + delta + dropdown.items.length) % dropdown.items.length);
    else if (event.key === 'Home' || event.key === 'End') dropdownActive(event.key === 'Home' ? 0 : dropdown.items.length - 1);
    else if (event.key === 'Enter' || event.key === ' ') dropdown.items[dropdown.index]?.click();
    else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      const prefix = event.key.toLocaleLowerCase();
      const start = dropdown.index + 1;
      for (let offset = 0; offset < dropdown.items.length; offset++) {
        const index = (start + offset) % dropdown.items.length;
        if (dropdown.items[index].textContent.trim().toLocaleLowerCase().startsWith(prefix)) { dropdownActive(index); break; }
      }
    } else return false;
    event.preventDefault();
    event.stopImmediatePropagation();
    return true;
  }

  function createDropdown(select, label) {
    select.hidden = true;
    select.tabIndex = -1;
    select.setAttribute('aria-hidden', 'true');
    const element = document.createElement('span');
    element.className = 'apple-now-playing-dropdown';
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'apple-now-playing-dropdown-trigger';
    trigger.setAttribute('aria-label', label);
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');
    const caption = document.createElement('span');
    caption.className = 'apple-now-playing-dropdown-caption';
    trigger.append(caption);
    element.append(trigger);
    const sync = () => {
      caption.textContent = select.options[select.selectedIndex]?.textContent || select.options[0]?.textContent || '请选择';
      trigger.disabled = select.disabled || !select.options.length;
      trigger.title = caption.textContent;
    };
    select.addEventListener('change', sync);
    function open() {
      if (trigger.disabled) return;
      if (dropdown?.trigger === trigger) { closeDropdown(true); return; }
      closeDropdown();
      const list = document.createElement('div');
      list.className = 'apple-now-playing-dropdown-list';
      list.id = 'apple-now-playing-dropdown-' + (++dropdownSequence);
      list.tabIndex = -1;
      list.setAttribute('role', 'listbox');
      list.setAttribute('aria-label', label);
      trigger.setAttribute('aria-controls', list.id);
      trigger.setAttribute('aria-expanded', 'true');
      const scope = new AbortController();
      const options = [...select.options];
      const items = options.map((option, index) => {
        const item = document.createElement('button');
        item.type = 'button';
        item.tabIndex = -1;
        item.className = 'apple-now-playing-dropdown-option';
        item.id = list.id + '-' + index;
        item.setAttribute('role', 'option');
        item.setAttribute('aria-selected', String(option.selected));
        item.disabled = option.disabled;
        item.textContent = option.textContent;
        item.addEventListener('pointermove', () => { if (!item.disabled && dropdown?.list === list) dropdownActive(index); });
        item.addEventListener('click', event => {
          event.preventDefault();
          event.stopPropagation();
          if (item.disabled) return;
          select.value = option.value;
          select.dispatchEvent(new Event('change', { bubbles: true }));
          sync();
          closeDropdown(true);
        });
        list.append(item);
        return item;
      });
      page.append(list);
      dropdown = { select, trigger, list, scope, items, index: Math.max(0, select.selectedIndex) };
      const rect = trigger.getBoundingClientRect();
      const below = innerHeight - rect.bottom - 18, above = rect.top - 18;
      const upward = below < Math.min(220, list.scrollHeight) && above > below;
      list.style.width = Math.min(Math.max(180, rect.width), innerWidth - 24) + 'px';
      list.style.maxHeight = Math.max(60, Math.min(320, upward ? above : below)) + 'px';
      list.style.left = clamp(rect.right - parseFloat(list.style.width), 12, innerWidth - parseFloat(list.style.width) - 12) + 'px';
      list.style.top = (upward ? Math.max(12, rect.top - list.offsetHeight - 6) : rect.bottom + 6) + 'px';
      list.focus({ preventScroll: true });
      dropdownActive(dropdown.index);
      document.addEventListener('pointerdown', event => {
        if (!list.contains(event.target) && !trigger.contains(event.target)) closeDropdown();
      }, { capture: true, signal: scope.signal });
      window.addEventListener('resize', () => closeDropdown(), { signal: scope.signal });
      window.addEventListener('scroll', event => { if (!list.contains(event.target)) closeDropdown(); }, { capture: true, signal: scope.signal });
      list.addEventListener('click', event => event.stopPropagation());
    }
    trigger.addEventListener('click', event => { event.preventDefault(); event.stopPropagation(); open(); });
    trigger.addEventListener('keydown', event => {
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      event.stopPropagation();
      open();
      if (dropdown) dropdownActive(event.key === 'Home' ? 0 : event.key === 'End' ? dropdown.items.length - 1 : dropdown.index);
    });
    sync();
    return { element, trigger, sync };
  }

  function buildSettings() {
    view.prefFields = new Map();
    view.settingsCategories = new Map();
    view.settingsGroups = new Map();
    const categories = [
      { id: 'appearance', label: '页面外观', groups: [
        { keys: ['display', 'alias'] },
        { id: 'shadows', label: '阴影与辉光', keys: ['coverShadow', 'textShadow', 'textGlow'] },
      ] },
      { id: 'background', label: '背景效果', groups: [
        { keys: ['background', 'motion', 'gradientDim', 'blur', 'blurDim', 'audioReactive'] },
        { id: 'fluid', label: '画质与性能', keys: ['fluidQuality', 'fluidFps'] },
      ] },
      { id: 'reading', label: '歌词与字体', groups: [
        { keys: ['translation', 'roman', 'karaoke', 'romanKaraoke'] },
        { label: '字号与排版', keys: ['fontSize', 'alignment', 'translationSize', 'romanSize', 'backgroundVocalSize', 'duetSize', 'originalBold'] },
        { label: '浏览与预览', keys: ['scrollbar', 'preview'] },
        { label: '字体', keys: ['customFont', 'fontPreset'] },
        { id: 'fonts', label: '进阶字体设置', keys: ['fontFamilies'] },
      ] },
      { id: 'motion', label: '歌词动效', groups: [
        { keys: ['lyricLift', 'scrollStyle'] },
        { label: '歌词效果', keys: ['lyricFade', 'lyricScale', 'lyricBlur'] },
      ] },
      { id: 'tools', label: '同步与工具', groups: [
        { id: 'global', label: '所有歌曲的偏移', keys: ['globalOffset'] },
      ] },
      { id: 'experimental', label: '实验性功能',
        description: '抢先体验仍在开发和测试中的新功能。这些功能可能尚不稳定，并可能在后续版本中调整或移除。',
        groups: [{ keys: ['romanGrouping'] }] },
    ];
    const tools = view.preferences.querySelector('.apple-now-playing-lyric-settings');
    tools.classList.add('apple-now-playing-settings-card');
    const actions = view.preferences.querySelector('.apple-now-playing-settings-actions');
    const navigation = view.settings.querySelector('.apple-now-playing-settings-nav');
    const labels = {
      alias: '歌曲别名与译名',
      scrollStyle: '歌词滚动方式', alignment: '当前歌词位置', lyricFade: '歌词渐隐',
      lyricScale: '歌词缩放', lyricBlur: '歌词模糊', background: '背景类型',
      globalOffset: '所有歌曲的歌词偏移', translationSize: '译文大小', romanSize: '罗马音大小',
    };
    const shortNames = {
      display: { all: '封面与歌词' },
      fluidQuality: { low: '性能', balanced: '均衡', high: '精细' },
    };
    for (const category of categories) {
      const tab = document.createElement('button');
      tab.type = 'button';
      tab.id = 'apple-now-playing-settings-tab-' + category.id;
      tab.dataset.settingsCategory = category.id;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', 'apple-now-playing-settings-' + category.id);
      tab.textContent = category.label;
      tab.addEventListener('click', () => selectSettingsCategory(category.id));
      navigation.append(tab);
      const panel = document.createElement('section');
      panel.className = 'apple-now-playing-settings-category';
      panel.id = 'apple-now-playing-settings-' + category.id;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tab.id);
      panel.hidden = true;
      view.preferences.append(panel);
      view.settingsCategories.set(category.id, { tab, panel, scrollTop: 0 });
      if (category.description) {
        const description = document.createElement('p');
        description.id = panel.id + '-description';
        description.className = 'apple-now-playing-setting-help';
        description.textContent = category.description;
        panel.setAttribute('aria-describedby', description.id);
        panel.append(description);
      }
      if (category.id === 'tools') panel.append(tools);
      if (category.id === 'motion') {
        view.settingsMotionNotice = document.createElement('p');
        view.settingsMotionNotice.className = 'apple-now-playing-setting-help';
        panel.append(view.settingsMotionNotice);
      }
      for (const group of category.groups) {
        const fieldset = document.createElement('fieldset');
        fieldset.className = 'apple-now-playing-settings-card';
        if (group.label) {
          const legend = document.createElement('legend');
          legend.textContent = group.label;
          fieldset.append(legend);
        }
        panel.append(fieldset);
        if (group.id) view.settingsGroups.set(group.id, fieldset);
        for (const key of group.keys) {
          const definition = settingDefinitions.find(item => item.key === key);
          if (!definition) continue;
          const row = document.createElement('div');
          row.className = 'apple-now-playing-pref-row';
          const label = document.createElement('label');
          const caption = document.createElement('span');
          caption.textContent = labels[key] || definition.label;
          let input, segments, picker;
          if (definition.options) {
            input = document.createElement('select');
            for (const [value, name] of definition.options) input.add(new Option(name, value));
            if (definition.options.length <= 3 && key !== 'scrollStyle') {
              input.hidden = true;
              input.tabIndex = -1;
              input.setAttribute('aria-hidden', 'true');
              const segmented = document.createElement('div');
              segmented.className = 'apple-now-playing-segmented';
              segmented.setAttribute('role', 'radiogroup');
              segmented.setAttribute('aria-label', definition.label);
              segments = definition.options.map(([value, name]) => {
                const segment = document.createElement('button');
                segment.type = 'button';
                segment.setAttribute('role', 'radio');
                segment.setAttribute('aria-label', name);
                segment.dataset.option = value;
                segment.textContent = shortNames[definition.key]?.[value] || name;
                segment.title = name;
                segment.addEventListener('click', () => {
                  input.value = value;
                  input.dispatchEvent(new Event('change', { bubbles: true }));
                });
                segmented.append(segment);
                return segment;
              });
              segmented.addEventListener('keydown', event => {
                const index = segments.indexOf(event.target);
                if (index < 0) return;
                const delta = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 :
                  ['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 0;
                if (!delta && !['Home', 'End'].includes(event.key)) return;
                event.preventDefault();
                event.stopPropagation();
                const next = event.key === 'Home' ? 0 : event.key === 'End' ? segments.length - 1 :
                  (index + delta + segments.length) % segments.length;
                segments[next].click();
                segments[next].focus({ preventScroll: true });
              });
              row.classList.add('apple-now-playing-pref-segmented');
              row.append(segmented);
            } else {
              picker = createDropdown(input, definition.label);
            }
          } else {
            input = document.createElement('input');
            input.type = definition.kind === 'text' ? 'text' : typeof definition.value === 'boolean' ? 'checkbox' : 'range';
            if (definition.kind === 'text') input.maxLength = 512;
            if (input.type === 'range') {
              input.min = definition.min;
              input.max = definition.max;
              input.step = definition.step;
            }
          }
          input.dataset.preference = definition.key;
          input.setAttribute('aria-label', definition.label);
          if (input.type === 'checkbox') input.setAttribute('role', 'switch');
          const output = document.createElement('output');
          output.className = 'apple-now-playing-pref-value';
          const update = () => setPreference(definition.key, input.type === 'checkbox' ? input.checked :
            input.type === 'range' ? input.valueAsNumber : input.value);
          input.addEventListener(input.type === 'range' ? 'input' : 'change', update);
          label.append(caption, input);
          if (picker) label.append(picker.element);
          row.prepend(label);
          let reset;
          if (input.type === 'range') {
            row.classList.add('apple-now-playing-pref-range');
            row.append(output);
            reset = document.createElement('button');
            reset.type = 'button';
            reset.textContent = '重置';
            reset.setAttribute('aria-label', '重置' + definition.label);
            reset.addEventListener('click', () => setPreference(definition.key, definition.value));
            row.append(reset);
          }
          fieldset.append(row);
          if (definition.kind === 'text') row.classList.add('apple-now-playing-pref-text');
          view.prefFields.set(definition.key, { row, input, output, segments, picker, reset });
        }
        if (group.id === 'global') {
          const hint = document.createElement('p');
          hint.className = 'apple-now-playing-setting-help';
          hint.textContent = '总偏移等于当前歌曲偏移加上所有歌曲偏移。';
          fieldset.append(hint);
        }
      }
      if (category.id === 'tools') {
        const title = document.createElement('h4');
        title.textContent = '歌词工具';
        panel.append(title, actions);
      }
    }
    navigation.addEventListener('keydown', event => {
      const tab = event.target.closest('[data-settings-category]');
      if (!tab) return;
      const tabs = [...navigation.querySelectorAll('button')];
      const index = tabs.indexOf(tab);
      const direction = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 :
        ['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 0;
      if (!direction && !['Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      event.stopPropagation();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 :
        (index + direction + tabs.length) % tabs.length;
      tabs[next].click();
      tabs[next].focus({ preventScroll: true });
    });
    const updateOrientation = () => navigation.setAttribute('aria-orientation', innerWidth <= 700 ? 'horizontal' : 'vertical');
    updateOrientation();
    window.addEventListener('resize', updateOrientation, { signal: lifetime.signal });
    let savedCategory;
    try { savedCategory = storedValue(settingsCategoryKey); } catch (_) {}
    selectSettingsCategory(view.settingsCategories.has(savedCategory) ? savedCategory : 'reading', false);
  }

  function selectSettingsCategory(id, persist = true) {
    if (!view.settingsCategories.has(id)) return;
    closeDropdown();
    const previous = view.settingsCategories.get(view.settingsCategory);
    if (previous) previous.scrollTop = view.preferences.scrollTop;
    view.settingsCategory = id;
    for (const [key, category] of view.settingsCategories) {
      const selected = key === id;
      category.panel.hidden = !selected;
      category.tab.setAttribute('aria-selected', String(selected));
      category.tab.tabIndex = selected ? 0 : -1;
    }
    view.preferences.scrollTop = view.settingsCategories.get(id).scrollTop;
    if (persist) {
      try { localStorage.setItem(settingsCategoryKey, id); } catch (_) {}
    }
    if (id === 'reading' && settingsOpen && view.fontPicker && preferences.customFont && !fontsLoaded) loadFonts();
  }

  function buildFontChooser() {
    const fieldset = view.prefFields.get('fontFamilies').row.parentElement;
    const chooser = document.createElement('div');
    chooser.className = 'apple-now-playing-font-chooser';
    view.fontChooser = chooser;
    view.fontPicker = document.createElement('select');
    view.fontPicker.setAttribute('aria-label', '本机字体');
    view.fontPicker.add(new Option('读取本机字体后选择', ''));
    menuButton(chooser, 'load-fonts', '读取本机字体');
    view.fontDropdown = createDropdown(view.fontPicker, '本机字体');
    chooser.append(view.fontPicker, view.fontDropdown.element);
    menuButton(chooser, 'add-font', '添加到回退末尾');
    view.fontStatus = document.createElement('div');
    view.fontStatus.className = 'apple-now-playing-font-status';
    view.fontStatus.setAttribute('role', 'status');
    view.fontStatus.textContent = '按从左到右的顺序回退，缺少字符时使用后续字体。';
    chooser.append(view.fontStatus);
    fieldset.append(chooser);
  }

  function applyFontFamilies() {
    const families = preferences.fontFamilies.split(/[,，]/).map(name => name.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    if (preferences.customFont && families.length) {
      page.style.fontFamily = [...new Set(families)].map(name => JSON.stringify(name)).join(',') + ',"Segoe UI","Microsoft YaHei UI",sans-serif';
    } else {
      page.style.removeProperty('font-family');
    }
  }

  async function loadFonts() {
    if (!activity) return;
    const generation = ++fontRequest;
    text(view.fontStatus, '正在读取本机字体…');
    const names = await host.fonts();
    if (!activity || generation !== fontRequest) return;
    if (dropdown?.select === view.fontPicker) closeDropdown(true);
    view.fontPicker.replaceChildren();
    view.fontPicker.add(new Option('选择字体', ''));
    for (const name of names) view.fontPicker.add(new Option(name, name));
    view.fontDropdown.sync();
    fontsLoaded = names.length > 0;
    text(view.fontStatus, fontsLoaded ? names.length + ' 个本机字体，可加入有序回退列表。' : '当前无法读取字体列表，可输入已安装字体名称或使用预设。');
  }

  function addSelectedFont() {
    const name = view.fontPicker.value;
    if (!name) return;
    const families = preferences.fontFamilies.split(/[,，]/).map(value => value.trim()).filter(Boolean);
    if (!families.includes(name)) families.push(name);
    setPreference('fontFamilies', families.join(', '));
  }

  function buildAudioStatus() {
    view.audioStatus = document.createElement('div');
    view.audioStatus.className = 'apple-now-playing-audio-status';
    view.audioStatus.setAttribute('role', 'status');
    view.prefFields.get('audioReactive').row.insertAdjacentElement('afterend', view.audioStatus);
    text(view.audioStatus, audioStatus);
  }

  function setAudioStatus(value) {
    audioStatus = value;
    if (!view.audioStatus) return;
    const dynamic = ['gradient', 'blur', 'fluid'].includes(preferences.background);
    const unavailable = snapshot && !snapshot.can.audioAnalysis;
    const field = view.prefFields.get('audioReactive');
    field.input.disabled = !dynamic || reducedMotion.matches || !!unavailable;
    field.row.classList.toggle('is-disabled', field.input.disabled);
    view.audioStatus.hidden = dynamic && !reducedMotion.matches && !unavailable && !preferences.audioReactive;
    text(view.audioStatus, !dynamic ? '当前背景保持静态，切换到动态背景可启用音乐律动。' :
      reducedMotion.matches ? '系统已启用减少动态效果，背景保持静态。' :
        unavailable ? '当前网易云版本没有可用的音频分析通道。' : value);
  }

  function stopAudioAnalysis() {
    audioOff?.();
    audioOff = undefined;
    audioTrack = undefined;
    audioTarget = audioPulse = audioStamp = audioVisualAt = 0;
    lowPass = lowEnvelope = 0;
    page.style.setProperty('--apple-now-playing-audio-pulse', '0');
    setAudioStatus('音频律动已关闭');
  }

  function consumeAudioData(packets) {
    // Verified Windows 3.1.41 contract: 48 kHz, stereo, packed signed16 LE PCM.
    // This is host-provided analysis input; the plugin does not decode or play it.
    if (!activity || !Array.isArray(packets)) return;
    for (const packet of packets) {
      if (!Number.isFinite(packet?.pts)) continue;
      const data = packet.data;
      const bytes = data instanceof ArrayBuffer ? new Uint8Array(data) : ArrayBuffer.isView(data) ?
        new Uint8Array(data.buffer, data.byteOffset, data.byteLength) : undefined;
      if (!bytes?.byteLength || bytes.byteLength % 4) continue;
      const samples = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
      let energy = 0, count = 0;
      const alpha = 1 - Math.exp(-2 * Math.PI * 180 / 48000);
      for (let offset = 0; offset < samples.byteLength; offset += 4) {
        const mono = (samples.getInt16(offset, true) + samples.getInt16(offset + 2, true)) / 65536;
        lowPass += alpha * (mono - lowPass);
        energy += lowPass * lowPass;
        count++;
      }
      const bass = Math.sqrt(energy / Math.max(1, count));
      lowEnvelope = lowEnvelope * .9 + bass * .1;
      const beat = Math.max(0, bass - lowEnvelope * 1.1);
      audioTarget = clamp(bass * 5 + beat * 12, 0, 1);
      audioStamp = performance.now();
      setAudioStatus('正在分析网易云音频数据');
    }
  }

  function syncAudioAnalysis() {
    setAudioStatus(audioStatus);
    if (!activity || !preferences.audioReactive) {
      if (audioOff || audioPulse) stopAudioAnalysis();
      return;
    }
    const dynamic = ['gradient', 'blur', 'fluid'].includes(preferences.background);
    if (!dynamic || reducedMotion.matches || !snapshot?.playing || snapshot.loading) {
      if (audioOff || audioPulse) stopAudioAnalysis();
      setAudioStatus(!dynamic || reducedMotion.matches ? '当前背景使用静态显示' : '暂停或加载时保持普通背景');
      return;
    }
    const track = snapshot.playId || snapshot.id;
    if (audioOff && audioTrack === track) return;
    stopAudioAnalysis();
    audioTrack = track;
    audioOff = host.watchAudio(consumeAudioData, setAudioStatus);
  }

  function paintAudioBackground(time) {
    if (!preferences.audioReactive || !audioOff) return;
    const elapsed = audioVisualAt ? Math.min(100, time - audioVisualAt) : 16;
    audioVisualAt = time;
    const fresh = audioStamp && time - audioStamp < 1200;
    const target = fresh ? audioTarget : 0;
    const next = audioPulse + (target - audioPulse) * (1 - Math.exp(-elapsed / 120));
    if (Math.abs(next - audioPulse) > .0005) {
      audioPulse = next;
      page.style.setProperty('--apple-now-playing-audio-pulse', audioPulse.toFixed(3));
    }
    if (!fresh && audioStamp && audioStatus.startsWith('正在分析')) setAudioStatus('分析数据暂不可用，背景保持常规');
  }

  function extractNativeContributors(payload) {
    return [['lyricUser', '歌词'], ['transUser', '译文'], ['yrcUser', '逐字歌词'], ['ytlrcUser', '逐字译文']]
      .filter(([field]) => payload[field]?.nickname)
      .map(([field, role]) => ({
        role, name: String(payload[field].nickname), id: payload[field].userid || payload[field].uid || '',
      }));
  }

  function extractTtmlMetadata(raw) {
    const xml = new DOMParser().parseFromString(raw, 'application/xml');
    if (xml.getElementsByTagName('parsererror').length) return [];
    return byTag(xml, 'meta').map(element => ({
      key: element.getAttribute('key') || element.getAttribute('name') || '',
      value: element.getAttribute('value') || element.textContent.trim(),
    })).filter(item => /author|contribut|github|translat/i.test(item.key) && item.value);
  }

  function showSourceDetails() {
    const origin = settingsOpen ? view.settingsToggle : document.activeElement;
    closePopups();
    popupFocus = origin;
    view.sourcePanel.hidden = false;
    renderSourceDetails();
    view.sourcePanel.querySelector('button').focus();
  }

  function renderSourceDetails() {
    if (!view?.sourcePanel || view.sourcePanel.hidden) return;
    view.sourceContent.replaceChildren();
    const entry = (label, value) => {
      if (!value) return;
      const row = document.createElement('div');
      row.className = 'apple-now-playing-source-entry';
      const title = document.createElement('strong');
      title.textContent = label;
      const content = document.createElement('span');
      content.textContent = value;
      row.append(title, content);
      view.sourceContent.append(row);
    };
    entry('当前来源', lyricSource);
    entry('AMLL 取词节点', lyricDetails.mirror);
    entry('来源地址', lyricDetails.url || '');
    entry('字段补充', (lyricDetails.supplements || []).join('、'));
    entry('总歌词偏移', (currentOffset() / 1000).toFixed(1) + ' s（全局 ' +
      (preferences.globalOffset / 1000).toFixed(1) + ' s，当前曲 ' + (currentSongOffset() / 1000).toFixed(1) + ' s）');
    for (const contributor of lyricDetails.contributors || []) {
      entry('网易云' + contributor.role + '贡献者', contributor.name + (contributor.id ? '（' + contributor.id + '）' : ''));
    }
    for (const item of lyricDetails.metadata || []) {
      entry(/author/i.test(item.key) ? 'TTML 制作 · ' + item.key : item.key, item.value);
    }
    if (!lyricDetails.contributors?.length && !lyricDetails.metadata?.length) entry('贡献者', '当前来源未提供贡献者资料');
  }

  function setPreference(key, value) {
    const definition = settingDefinitions.find(item => item.key === key);
    if (!definition) return;
    preferences[key] = settingValue(definition, value);
    if (key === 'roman' && !preferences.roman) preferences.romanKaraoke = false;
    if (key === 'fontPreset') {
      const presets = {
        misans: ['MiSans', 'MiSans VF'],
        'source-sans': ['思源黑体', 'Source Han Sans SC', 'Noto Sans CJK SC'],
        'source-serif': ['思源宋体', 'Source Han Serif SC', 'Noto Serif CJK SC'],
        pingfang: ['PingFang SC', '苹方-简'],
        yahei: ['Microsoft YaHei UI', '微软雅黑'],
        jhenghei: ['Microsoft JhengHei', '微軟正黑體'],
      };
      if (presets[value]) preferences.fontFamilies = presets[value].join(', ');
      preferences.customFont = value !== 'system';
    }
    if (key === 'fontFamilies') {
      preferences.fontPreset = 'custom';
      preferences.customFont = !!preferences.fontFamilies;
    }
    if (!saveObject(preferencesKey, preferences)) notify('偏好暂时无法保存');
    applyPreferences(key);
    if (key === 'customFont' && preferences.customFont && settingsOpen && !fontsLoaded) loadFonts();
  }

  function applyPreferences(changed) {
    page.dataset.background = preferences.background;
    page.dataset.motion = String(preferences.motion);
    page.dataset.scrollbar = String(preferences.scrollbar);
    if (!preferences.scrollbar) clearLyricScrollIndicator();
    page.dataset.coverShadow = String(preferences.coverShadow);
    page.dataset.textShadow = String(preferences.textShadow);
    page.dataset.textGlow = String(preferences.textGlow);
    page.dataset.audioReactive = String(preferences.audioReactive);
    page.dataset.lyricLift = String(preferences.lyricLift && !reducedMotion.matches);
    page.dataset.originalBold = String(preferences.originalBold);
    page.dataset.lyricFade = String(preferences.lyricFade);
    page.dataset.lyricScale = String(preferences.lyricScale && !reducedMotion.matches);
    page.dataset.lyricBlur = String(preferences.lyricBlur && !reducedMotion.matches);
    view.fluid.hidden = !['fluid', 'fluid-static'].includes(preferences.background);
    applyFontFamilies();
    fluidRenderer.invalidate();
    page.style.setProperty('--apple-now-playing-font-size', preferences.fontSize === 'auto' ? '' : preferences.fontSize + 'px');
    page.style.setProperty('--apple-now-playing-translation-size', preferences.translationSize / 100 + 'em');
    page.style.setProperty('--apple-now-playing-roman-size', preferences.romanSize / 100 + 'em');
    page.style.setProperty('--apple-now-playing-background-vocal-size', preferences.backgroundVocalSize + 'px');
    page.style.setProperty('--apple-now-playing-duet-size', preferences.duetSize + 'px');
    page.style.setProperty('--apple-now-playing-background-blur', preferences.blur + 'px');
    const dim = preferences.background === 'gradient' ? preferences.gradientDim :
      preferences.background === 'blur' ? preferences.blurDim : 0;
    page.style.setProperty('--apple-now-playing-background-dim', dim / 100);
    for (const definition of settingDefinitions) {
      const field = view.prefFields.get(definition.key);
      const key = definition.key;
      const hidden = (!!definition.when && !(Array.isArray(definition.when) ? definition.when : [definition.when]).includes(preferences.background)) ||
        (key === 'translationSize' && !preferences.translation) || (key === 'romanSize' && !preferences.roman) ||
        (['fontPreset', 'fontFamilies'].includes(key) && !preferences.customFont);
      if (hidden && (field.row.contains(document.activeElement) || dropdown?.select === field.input)) {
        closeDropdown();
        view.settingsCategories.get(view.settingsCategory)?.tab.focus({ preventScroll: true });
      }
      field.row.hidden = hidden;
      const disabled = (key === 'lyricLift' && (!preferences.karaoke || reducedMotion.matches)) ||
        (key === 'audioReactive' && (reducedMotion.matches || !['gradient', 'blur', 'fluid'].includes(preferences.background)));
      field.input.disabled = disabled;
      field.row.classList.toggle('is-disabled', disabled);
      if (field.reset) field.reset.disabled = disabled;
      if (field.input.type === 'checkbox') field.input.checked = preferences[definition.key];
      else field.input.value = preferences[definition.key];
      for (const segment of field.segments || []) {
        const selected = segment.dataset.option === String(preferences[definition.key]);
        segment.setAttribute('aria-checked', String(selected));
        segment.tabIndex = selected ? 0 : -1;
        segment.disabled = disabled;
      }
      field.picker?.sync();
      if (dropdown?.select === field.input && field.row.hidden) closeDropdown();
      field.output.textContent = preferences[definition.key] + (definition.unit ? ' ' + definition.unit : definition.key.includes('Size') ? '%' : '');
    }
    view.fontChooser.hidden = !preferences.customFont;
    view.settingsGroups.get('fonts').hidden = !preferences.customFont;
    view.settingsGroups.get('fluid').hidden = !['fluid', 'fluid-static'].includes(preferences.background);
    view.settingsMotionNotice.hidden = preferences.karaoke && !reducedMotion.matches;
    text(view.settingsMotionNotice, !preferences.karaoke ? '开启逐字后可使用歌词上浮。' :
      '系统已启用减少动态效果，歌词字形保持固定。');
    setAudioStatus(audioStatus);
    if (changed === 'display') {
      showTab(preferences.display === 'cover' ? 'none' : 'lyrics');
    } else {
      updateDisplayMode();
    }
    if (!changed || changed === 'background') coverKey = undefined;
    lyricView.configure(preferences, reducedMotion.matches);
    if (['karaoke', 'translation', 'roman', 'romanKaraoke', 'romanGrouping'].includes(changed)) {
      renderLyrics();
      if (previewPosition) showPreview(previewPosition.x);
    } else if (['fontSize', 'translationSize', 'romanSize', 'backgroundVocalSize', 'duetSize', 'originalBold',
        'customFont', 'fontPreset', 'fontFamilies'].includes(changed)) {
      lyricView.player.onResize();
    } else if (changed === 'scrollStyle' || changed === 'alignment') {
      positionLyrics();
    }
    if (changed === 'globalOffset') {
      const now = performance.now();
      syncLyrics(playbackTime(now), now, false);
      if (previewPosition) showPreview(previewPosition.x);
      renderSourceDetails();
    }
    if (changed === 'audioReactive' || changed === 'background') syncAudioAnalysis();
    if (changed === 'alias') metadataSignature = '';
    if (copyMode) updateCopyText();
    updateLyricTools();
    if (!preferences.preview) hidePreview();
    dirty = true;
  }

  function updateDisplayMode() {
    if (preferences.display === 'cover') page.dataset.display = 'cover';
    else page.dataset.display = tab === 'lyrics' && preferences.display === 'lyrics' ? 'lyrics' : 'all';
  }

  function currentSongOffset() {
    return clamp(number(songOffsets[snapshot?.id]) ?? 0, -10000, 10000);
  }

  function currentOffset() {
    return currentSongOffset() + preferences.globalOffset;
  }

  function updateOffset(change) {
    if (!snapshot?.id || !snapshot.can.seek || host.trackId() !== snapshot.id) return;
    const value = change === 0 ? 0 : clamp(currentSongOffset() + change, -10000, 10000);
    if (value === 0) delete songOffsets[snapshot.id];
    else songOffsets[snapshot.id] = value;
    if (!saveObject(offsetsKey, songOffsets)) notify('偏移暂时无法保存');
    updateLyricTools();
    renderSourceDetails();
    const now = performance.now();
    syncLyrics(playbackTime(now), now, false);
    if (previewPosition) showPreview(previewPosition.x);
  }

  function updateLyricTools() {
    if (!view?.tools) return;
    const vocals = rawLyrics.flatMap(row => [row, ...(row.backingLines || [])]);
    const available = {
      karaoke: vocals.some(row => row.words.some(word => word.duration > 0)),
      translation: vocals.some(row => row.translation),
      roman: vocals.some(row => row.roman),
    };
    for (const key of ['karaoke', 'translation', 'roman']) {
      const button = view.tools.querySelector('[data-action="toggle-' + key + '"]');
      button.disabled = !available[key];
      button.setAttribute('aria-pressed', String(preferences[key]));
      view.prefFields.get(key).input.disabled = !available[key];
    }
    const romanKaraoke = view.prefFields.get('romanKaraoke');
    romanKaraoke.input.disabled = !preferences.roman || !available.roman;
    romanKaraoke.row.classList.toggle('is-disabled', romanKaraoke.input.disabled);
    const offset = currentSongOffset();
    text(view.offset, offset ? (offset > 0 ? '提前 ' : '延后 ') + (Math.abs(offset) / 1000).toFixed(1) + ' s' : '0.0 s');
    for (const button of view.settings.querySelectorAll('.apple-now-playing-offset button')) button.disabled = !snapshot?.can.seek;
  }

  function notify(message) {
    if (!activity) return;
    clearTimeout(toastTimer);
    text(view.toast, message);
    view.toast.hidden = false;
    toastTimer = setTimeout(() => { view.toast.hidden = true; }, 2200);
  }

  function endNativePlaylist(cancel = false, returnFocus = true) {
    const session = nativeDialog;
    if (!session) return;
    nativeDialog = undefined;
    session.observer.disconnect();
    clearTimeout(session.timeout);
    clearTimeout(session.finishTimer);
    session.bridge?.release(cancel);
    // Native Portal still owns any children until its own unmount completes.
    // Detach our container intact; never clear a native Portal's child nodes.
    session.layer.remove();
    page.setAttribute('aria-modal', 'true');
    if (returnFocus && !page.hidden && !closing && !document.hidden && session.focus?.isConnected) {
      session.focus.focus({ preventScroll: true });
    }
  }

  function settleNativePlaylist(session) {
    if (nativeDialog !== session) return;
    clearTimeout(session.finishTimer);
    const modal = session.dialogs.size > 0 || !!session.layer.querySelector('.cmd-modal-content');
    const toast = !!session.layer.querySelector('[data-testid="tid_toast_wrapper"]')?.textContent.trim();
    session.layer.dataset.modal = String(modal);
    page.setAttribute('aria-modal', modal ? 'false' : 'true');
    if (!session.pending && !modal && !toast && activity) {
      // A result toast may be created immediately after the modal closes.
      session.finishTimer = setTimeout(() => {
        if (nativeDialog === session) endNativePlaylist(false, true);
      }, 180);
    }
  }

  function observeNativePlaylist(session) {
    session.observer.disconnect();
    session.observer.observe(session.layer, { childList: true, subtree: true });
    if (session.pending) {
      clearTimeout(session.timeout);
      session.timeout = setTimeout(() => {
        if (nativeDialog !== session || !session.pending) return;
        endNativePlaylist(false, true);
        notify('网易云选单暂未打开，请稍后重试');
      }, 8000);
    }
    settleNativePlaylist(session);
  }

  function openNativePlaylist(id) {
    endNativePlaylist(true, false);
    const layer = document.createElement('div');
    layer.className = 'apple-now-playing-host-portal';
    layer.dataset.modal = 'false';
    const bodyStyle = getComputedStyle(document.body);
    for (const name of ['font-family', 'font-size', 'font-weight', 'font-style', 'line-height',
      'color', 'letter-spacing', 'text-align', 'text-transform', 'text-shadow']) {
      layer.style.setProperty(name, bodyStyle.getPropertyValue(name));
    }
    page.append(layer);
    const session = nativeDialog = {
      layer, dialogs: new Set(), pending: true,
      focus: page.querySelector('[data-action="menu"]'),
      observer: new MutationObserver(() => settleNativePlaylist(session)),
    };
    session.bridge = host.playlistOverlay(layer, {
      open(token) {
        if (nativeDialog !== session) return;
        session.pending = false;
        session.dialogs.add(token);
        clearTimeout(session.timeout);
        settleNativePlaylist(session);
      },
      close(token) {
        if (nativeDialog !== session) return;
        session.dialogs.delete(token);
        settleNativePlaylist(session);
      },
      toast() {
        if (nativeDialog === session) settleNativePlaylist(session);
      },
    });
    if (!session.bridge) {
      endNativePlaylist(false, true);
      notify('当前客户端暂不支持在播放页打开网易云选单');
      return;
    }
    observeNativePlaylist(session);
    if (!host.addToPlaylist(id)) {
      endNativePlaylist(true, true);
      notify('暂时无法打开网易云选单');
    }
  }

  function setSettingsVisible(open, immediately = false) {
    if (open === settingsOpen && !immediately) return;
    const panel = view.settings;
    const animate = !immediately && !reducedMotion.matches && !document.hidden && (open || !panel.hidden);
    const shown = { opacity: 1, transform: 'translateY(0px)' };
    const tucked = { opacity: 0, transform: 'translateY(-12px)' };
    let from = open ? tucked : shown;
    if (animate && settingsAnimation) {
      const style = getComputedStyle(panel);
      from = { opacity: style.opacity, transform: style.transform };
    }
    settingsAnimation?.cancel();
    settingsAnimation = undefined;
    settingsOpen = open;
    view.settingsToggle.setAttribute('aria-expanded', String(open));
    if (open) panel.removeAttribute('aria-hidden');
    else panel.setAttribute('aria-hidden', 'true');
    panel.hidden = !open && !animate;
    if (!animate) return;
    const animation = settingsAnimation = panel.animate([from, open ? shown : tucked], {
      duration: open ? 220 : 170, easing: open ? 'cubic-bezier(.22, 1, .36, 1)' : 'ease-in', fill: 'both',
    });
    animation.finished.then(() => {
      if (settingsAnimation !== animation) return;
      panel.hidden = !open;
      settingsAnimation = undefined;
      animation.cancel();
    }, () => {});
  }

  function openSettings() {
    closePopups();
    popupFocus = view.settingsToggle;
    setSettingsVisible(true);
    const category = view.settingsCategories.get(view.settingsCategory);
    view.preferences.scrollTop = category.scrollTop;
    category.tab.focus({ preventScroll: true });
    if (view.settingsCategory === 'reading' && preferences.customFont && !fontsLoaded) loadFonts();
    setControlsHidden(false);
  }

  function closePopups(returnFocus = false) {
    closeDropdown();
    if (settingsOpen) view.settingsCategories.get(view.settingsCategory).scrollTop = view.preferences.scrollTop;
    const hadPopup = settingsOpen || !view.menu.hidden || !view.rowMenu.hidden || !view.sourcePanel.hidden || !view.queueMenu.hidden;
    if ((returnFocus && hadPopup || settingsOpen && view.settings.contains(document.activeElement)) && popupFocus?.isConnected) {
      popupFocus.focus({ preventScroll: true });
    }
    setSettingsVisible(false);
    view.menu.hidden = view.rowMenu.hidden = view.sourcePanel.hidden = view.queueMenu.hidden = true;
    page.querySelector('[data-action="menu"]').setAttribute('aria-expanded', 'false');
    popupFocus = undefined;
  }

  function setControlsHidden(hidden) {
    hidden = !!hidden && narrowWindow.matches && tab !== 'none' && !settingsOpen &&
      view.menu.hidden && !drag && !view.volume.matches(':active') && !page.querySelector('.apple-now-playing-left :focus');
    if (controlsHidden === hidden) return;
    const anchor = tab === 'queue' && queueView.capture();
    controlsHidden = hidden;
    page.classList.toggle('controls-hidden', hidden);
    if (anchor) queueView.restore(anchor);
  }

  let lyricScrollHideTimer;
  function clearLyricScrollIndicator() {
    clearTimeout(lyricScrollHideTimer);
    view?.lyrics.classList.remove('apple-now-playing-user-scrolling');
  }

  function bindPanelBrowsing(scroller) {
    function input(delta) {
      if (!activity) return;
      if (scroller === view.lyrics && delta) {
        browseLyrics();
      }
      if (!narrowWindow.matches) return;
      if (delta > 8 && (scroller === view.lyrics || scroller.scrollTop < scroller.scrollHeight - scroller.clientHeight - 1)) setControlsHidden(true);
      if (delta < -4) setControlsHidden(false);
    }
    scroller.addEventListener('wheel', event => input(event.deltaY), { passive: true });
    let touchY;
    scroller.addEventListener('touchstart', event => { touchY = event.touches[0]?.clientY; }, { passive: true });
    scroller.addEventListener('touchmove', event => {
      const current = event.touches[0]?.clientY;
      if (current !== undefined && touchY !== undefined) input(touchY - current);
      touchY = current;
    }, { passive: true });
    scroller.addEventListener('keydown', event => {
      if (['ArrowDown', 'PageDown', 'End'].includes(event.key)) input(20);
      if (['ArrowUp', 'PageUp', 'Home'].includes(event.key)) input(-20);
    });
  }

  function copyViewText(row) {
    return [row.content, preferences.roman && row.roman, preferences.translation && row.translation].filter(Boolean).join('\n');
  }

  function updateCopyText() {
    view.copyText.value = rawLyrics.flatMap(row => [row, ...(row.backingLines || [])]).map(copyViewText).filter(Boolean).join('\n\n');
  }

  function toggleCopy(force) {
    const copyHadFocus = view.copy.contains(document.activeElement);
    const next = force === undefined ? !copyMode : force;
    if (next === copyMode) return;
    copyMode = next;
    if (copyMode) clearLyricScrollIndicator();
    view.copy.hidden = !copyMode || tab !== 'lyrics';
    view.lyrics.hidden = copyMode || tab !== 'lyrics';
    view.status.hidden = copyMode || tab !== 'lyrics' || lyrics.length > 0;
    if (copyMode) {
      copyAnchor = captureLyricAnchor();
      lyricView.suspend();
      updateCopyText();
      view.copyText.focus();
    } else {
      restoreLyricAnchor(copyAnchor);
      if (browseUntil <= performance.now()) positionLyrics(false);
      if (copyHadFocus && !page.hidden) view.lyrics.focus({ preventScroll: true });
    }
    updateLyricTools();
  }

  async function copyText(value) {
    if (!value) return;
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(value);
      else throw new Error('clipboard unavailable');
      notify('已复制');
    } catch (_) {
      if (!activity) return;
      const previousFocus = document.activeElement;
      const input = document.createElement('textarea');
      input.value = value;
      input.className = 'apple-now-playing-clipboard';
      page.append(input);
      input.select();
      let copied = false;
      try { copied = document.execCommand('copy'); } catch (_) {}
      input.remove();
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
      if (copied) notify('已复制');
      else {
        if (tab !== 'lyrics') showTab('lyrics');
        toggleCopy(true);
        view.copyText.value = value;
        view.copyText.select();
        notify('请选择文本后复制');
      }
    }
  }

  function popupAt(element, x, y) {
    element.hidden = false;
    const rect = element.getBoundingClientRect();
    element.style.left = clamp(x, 8, Math.max(8, innerWidth - rect.width - 8)) + 'px';
    element.style.top = clamp(y, 8, Math.max(8, innerHeight - rect.height - 8)) + 'px';
  }

  function menuButton(parent, action, label, data = {}, disabled = false) {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.action = action;
    button.textContent = label;
    button.disabled = disabled;
    Object.assign(button.dataset, data);
    parent.append(button);
    return button;
  }

  function showRowMenu(index, x, y) {
    if (!rawLyrics.length) return;
    closePopups();
    rowMenuIndex = index;
    const row = lyrics[index];
    view.rowMenu.replaceChildren();
    if (row?.kind === 'line') {
      menuButton(view.rowMenu, 'copy-line', '复制这一行');
      menuButton(view.rowMenu, 'copy-original', '复制原文', {}, !row.content);
      menuButton(view.rowMenu, 'copy-translation', '复制译文', {}, !row.translation);
      menuButton(view.rowMenu, 'copy-roman', '复制罗马音', {}, !row.roman);
    }
    menuButton(view.rowMenu, 'copy-view', '复制歌词');
    popupFocus = document.activeElement;
    popupAt(view.rowMenu, x, y);
    view.rowMenu.querySelector('button').focus();
  }

  function hidePreview() {
    previewPosition = undefined;
    previewView?.dispose();
    previewView = previewRow = previewOptions = undefined;
    view.preview.hidden = true;
    view.seek.removeAttribute('aria-describedby');
  }

  function showPreview(x) {
    if (!activity || !preferences.preview || !snapshot?.duration || drag) return;
    const rect = view.seek.getBoundingClientRect();
    const seconds = clamp((x - rect.left) / rect.width, 0, 1) * snapshot.duration;
    const milliseconds = seconds * 1000 + currentOffset();
    previewPosition = { x, milliseconds };
    const candidate = lyrics[lyricIndexAt(milliseconds)];
    const row = candidate?.kind === 'line' ? candidate : undefined;
    const [time, container, status] = view.preview.children;
    text(time, formatTime(seconds));
    status.hidden = !!row;
    container.hidden = !row;
    view.seek.setAttribute('aria-describedby', view.preview.id);
    view.preview.hidden = false;
    view.preview.style.left = clamp(x, 155, Math.max(155, innerWidth - 155)) + 'px';
    view.preview.style.top = Math.max(60, rect.top - 8) + 'px';
    if (!row) {
      text(status, lyrics.length ? '间奏' : lyricSource);
      return;
    }
    if (!previewView) {
      previewView = new window.AppleNowPlayingExtView(container, () => {}, () => {});
      previewView.player.setEnableSpring(false);
      previewView.player.setAlignAnchor('top');
      previewView.player.setAlignPosition(0);
    }
    previewView.reduced = reducedMotion.matches;
    previewView.lift = preferences.lyricLift && !reducedMotion.matches;
    const options = [preferences.karaoke, preferences.roman, preferences.romanKaraoke, preferences.romanGrouping].join('/');
    if (previewRow !== row || previewOptions !== options) {
      previewRow = row;
      previewOptions = options;
      previewView.set([row], { ...preferences, translation: true }, snapshot.duration * 1000, milliseconds);
      for (const voice of previewView.player.currentLyricLineObjects) {
        const node = voice.getElement();
        node.tabIndex = -1;
        node.removeAttribute('role');
      }
    }
    previewView.tick(milliseconds, performance.now(), 0);
  }

  function setButtonLabel(button, label) {
    if (button.title === label && button.getAttribute('aria-label') === label) return;
    button.title = label;
    button.setAttribute('aria-label', label);
  }

  function syncFullScreen() {
    const button = page.querySelector('[data-action="screen"]');
    const active = document.fullscreenElement === page;
    button.disabled = !document.fullscreenEnabled || (!!document.fullscreenElement && !active);
    button.setAttribute('aria-pressed', String(active));
    setButtonLabel(button, active ? '退出全屏' : '进入全屏');
  }

  function replacementEnabled() {
    return takeover && plugin.enabled !== false && !lifetime.signal.aborted && (!page || page.isConnected);
  }

  function updateLauncher() {
    if (!launcher) return;
    if (replacementEnabled()) {
      if (!replacementOff?.active) replacementOff = host.replacePage(replacementEnabled, () => open());
    } else {
      replacementOff?.();
      replacementOff = undefined;
    }
    const hidden = !page?.hidden || (replacementEnabled() && host.coverEntry());
    if (launcher.hidden !== Boolean(hidden)) launcher.hidden = Boolean(hidden);
  }

  function handleVinyl(event) {
    if (!replacementEnabled() || event.defaultPrevented) return;
    const entry = event.target?.closest?.(vinylSelector);
    if (!entry) return;
    if (open(entry)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  function dispose() {
    if (lifetime.signal.aborted) return;
    lifetime.abort();
    window.AppleNowPlayingQQLyrics?.setNativeFetch?.(null);
    entryObserver?.disconnect();
    endNativePlaylist(true, false);
    replacementOff?.();
    replacementOff = undefined;
    if (activity) stopActivity();
    cancelPageTransition();
    previewView?.dispose();
    lyricView?.dispose();
    page?.remove();
    launcher?.remove();
    pageStyle?.remove();
    window.removeEventListener('keydown', handleKeyboard, true);
    document.removeEventListener('fullscreenchange', syncFullScreen);
  }

  function open(entry = document.activeElement) {
    try {
      if (!page) mount();
      if (!page.hidden) {
        if (!closing) return true;
        closing = false;
        panelSlide?.animation.play();
        panelFade?.animation.play();
        dirty = true;
        playPageTransition(false);
        return true;
      }
      focusBeforeOpen = entry;
      page.hidden = false;
      updateLauncher();
      showTab(preferences.display === 'cover' ? 'none' : 'lyrics');
      page.classList.add('is-opening');
      page.focus({ preventScroll: true });
      startActivity();
      fitCoverToControls();
      playPageTransition(false);
      return true;
    } catch (error) {
      if (page && !page.hidden) close(true);
      console.warn('[AppleNowPlaying] 无法打开播放页', error);
      return false;
    }
  }

  function fitCoverToControls() {
    if (!activity) return;
    const left = page.querySelector('.apple-now-playing-left');
    const style = getComputedStyle(left);
    const controls = page.querySelector('.apple-now-playing-controls').getBoundingClientRect().height;
    const reserved = Math.ceil(controls + (parseFloat(style.rowGap) || 0) +
      (parseFloat(style.paddingTop) || 0) + (parseFloat(style.paddingBottom) || 0) + 2);
    const value = reserved + 'px';
    if (page.style.getPropertyValue('--apple-now-playing-controls-space') !== value) page.style.setProperty('--apple-now-playing-controls-space', value);
  }

  function startActivity() {
    if (activity || document.hidden) return;
    const scope = activity = new AbortController();
    if (host.canFetchPublicQQLyrics()) window.AppleNowPlayingQQLyrics?.setNativeFetch?.((url, signal) => host.fetchPublicQQLyrics(url, signal));
    if (nativeDialog) observeNativePlaylist(nativeDialog);
    const markDirty = () => { dirty = true; };
    unwatchHost = host.watch(markDirty, (event, receipt) => {
      if (!snapshot || snapshot.playId !== String(event.playId) || snapshot.restored || pendingSeek || deferredSeek) {
        markDirty();
        return;
      }
      snapshot.position = clamp(Number(event.current), 0, snapshot.duration);
      snapshot.confirmedPosition = true;
      snapshot.audioReceipt = receipt;
      updateClock(performance.now(), false, true);
    });
    lyricResize = new ResizeObserver(() => {
      if (closing) return;
      fitCoverToControls();
      queueView.render();
    });
    lyricResize.observe(view.lyrics);
    lyricResize.observe(view.queueScroll);
    lyricResize.observe(page.querySelector('.apple-now-playing-controls'));
    const lyricsFontChanged = () => {
      previewView?.player.onResize();
      lyricView.player.onResize();
      if (previewPosition) showPreview(previewPosition.x);
    };
    for (const name of ['loadingdone', 'loadingerror']) document.fonts?.addEventListener(name, lyricsFontChanged);
    scope.signal.addEventListener('abort', () => {
      for (const name of ['loadingdone', 'loadingerror']) document.fonts?.removeEventListener(name, lyricsFontChanged);
    }, { once: true });
    fitCoverToControls();
    queueView.connect(scope.signal);
    window.addEventListener('resize', () => {
      fluidRenderer.invalidate();
      settlePageTransition();
      cancelPanelSlide();
      cancelPanelFade();
      setControlsHidden(false);
    }, { signal: scope.signal });
    window.addEventListener('pointerup', event => {
      if (volumeGesture?.pointer === event.pointerId) finishVolumeGesture();
      if (drag?.pointer !== event.pointerId) return;
      // Chromium dispatches the range's change event on release. Commit here
      // only when no change event completed the gesture.
      dragEndTimer = setTimeout(finishDrag, 0);
    }, { signal: scope.signal });
    window.addEventListener('pointercancel', event => {
      if (volumeGesture?.pointer === event.pointerId) finishVolumeGesture();
      if (drag?.pointer !== event.pointerId) return;
      drag.cancelled = true;
      dragEndTimer = setTimeout(finishDrag, 0);
    }, { signal: scope.signal });
    snapshot = undefined;
    clock = undefined;
    sampleAt = 0;
    dirty = true;
    page.classList.add('is-active');
    tick(performance.now());
  }

  function stopActivity() {
    clearLyricScrollIndicator();
    setSettingsVisible(false, true);
    cancelPanelSlide();
    cancelPanelFade();
    closeDropdown();
    nativeDialog?.observer.disconnect();
    clearTimeout(nativeDialog?.timeout);
    clearTimeout(nativeDialog?.finishTimer);
    flushVolume();
    clearTimeout(volumeTimer);
    volumeTimer = volumeQueued = volumeGesture = undefined;
    view.volumeGroup.classList.remove('is-adjusting');
    activity?.abort();
    activity = undefined;
    unwatchHost?.();
    unwatchHost = undefined;
    lyricResize?.disconnect();
    lyricResize = undefined;
    cancelAnimationFrame(frame);
    stopAudioAnalysis();
    fluidRenderer.stop();
    queueDrag = undefined;
    lyricView.releaseRows();
    browseUntil = 0;
    page.dataset.lyricBrowsing = 'false';
    queueView.disconnect();
    detailRequest?.abort();
    detailRequest = undefined;
    detailTrackId = details?.id;
    clearTimeout(toastTimer);
    view.toast.hidden = true;
    hidePreview();
    clearTimeout(dragEndTimer);
    drag = pendingSeek = deferredSeek = seekAlignment = pendingVolume = undefined;
    if (lyricRequest) {
      restartLyrics = true;
      lyricRequest.abort();
      lyricRequest = undefined;
    }
    coverKey = undefined;
    cancelPalette();
    view.cover.removeAttribute('src');
    view.cover.hidden = true;
    clearSharedArt();
    page.style.removeProperty('--apple-now-playing-cover-image');
    for (const layer of view.backdrop) layer.style.removeProperty('--apple-now-playing-image');
    coverSaveRequest?.abort();
    coverSaveRequest = undefined;
    view.lyrics.scrollTo({ top: view.lyrics.scrollTop, behavior: 'instant' });
    page.classList.remove('is-active');
    for (const layer of view.backdrop) layer.classList.remove('apple-now-playing-fading');
    // Hidden CEF windows can defer CSS updates. Cancel their animation objects
    // immediately instead of waiting for the next visible style calculation.
    for (const animation of page.getAnimations({ subtree: true })) {
      if (!animation.effect?.target?.closest?.('.apple-now-playing-host-portal')) animation.cancel();
    }
    fontRequest++;
    refreshSettingsSource();
  }

  function coverFrame(element, rounded = element, edgeOpacity = 0) {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(rounded);
    const [x, y = x] = style.borderTopLeftRadius.split(' ');
    const percent = (value, size) => value.endsWith('%') ? value : 100 * (parseFloat(value) || 0) / Math.max(1, size) + '%';
    return {
      rect, edgeOpacity, shadow: style.boxShadow,
      radius: percent(x, rounded.offsetWidth) + ' / ' + percent(y, rounded.offsetHeight),
    };
  }

  function sharedCoverEndpoints() {
    if (!snapshot?.cover || snapshot.id !== host.trackId() || page.dataset.display === 'lyrics' ||
        document.fullscreenElement || !view.coverBox.getClientRects().length) return;
    const entry = host.coverEntry();
    const thumbnail = entry?.querySelector('img');
    if (!thumbnail || !(thumbnail.currentSrc || thumbnail.src) || getComputedStyle(thumbnail).visibility !== 'visible') return;
    const small = thumbnail.getBoundingClientRect();
    if (!small.width || !small.height || small.bottom <= 0 || small.right <= 0 || small.top >= innerHeight || small.left >= innerWidth) return;
    const large = coverFrame(view.coverBox, view.coverBox, 1);
    if (!large.rect.width || !large.rect.height) return;
    // Some host builds round the art via its equally sized clipping wrapper.
    const rounded = [thumbnail, thumbnail.parentElement, entry].find(candidate => {
      const rect = candidate.getBoundingClientRect();
      return Math.abs(rect.width - small.width) < 2 && Math.abs(rect.height - small.height) < 2 &&
        parseFloat(getComputedStyle(candidate).borderTopLeftRadius) > 0;
    }) || thumbnail;
    return { thumbnail, small: coverFrame(thumbnail, rounded), large };
  }

  function cancelCoverFlight() {
    const flight = pageTransition?.flight;
    if (!flight) return;
    pageTransition.flight = undefined;
    flight.thumbnail.classList.remove('apple-now-playing-shared-thumbnail');
    flight.node.remove();
    for (const animation of flight.animations) animation.cancel();
    page.classList.remove('cover-moving');
  }

  function cancelPageTransition() {
    const transition = pageTransition;
    if (transition) {
      cancelCoverFlight();
      pageTransition = undefined;
      for (const animation of transition.animations) animation.cancel();
    }
    page?.classList.remove('is-opening', 'is-closing');
  }

  function settlePageTransition() {
    if (closing) finishClose();
    else cancelPageTransition();
  }

  function playCoverFlight(transition, animate, endpoints, from, to, duration, lead = 0) {
    const { thumbnail } = endpoints;
    const node = document.createElement('div');
    const image = new Image();
    const edge = document.createElement('span');
    node.className = 'apple-now-playing-cover-flight';
    node.setAttribute('aria-hidden', 'true');
    edge.className = 'apple-now-playing-cover-flight-edge';
    image.alt = '';
    image.src = thumbnail.currentSrc || thumbnail.src;
    node.append(image, edge);
    Object.assign(node.style, {
      left: to.rect.left + 'px', top: to.rect.top + 'px', width: to.rect.width + 'px', height: to.rect.height + 'px',
    });
    page.append(node);
    page.classList.add('cover-moving');
    thumbnail.classList.add('apple-now-playing-shared-thumbnail');
    const transform = dy => 'translate3d(' + (from.rect.left - to.rect.left) + 'px,' + (from.rect.top - to.rect.top + dy) +
      'px,0) scale(' + from.rect.width / to.rect.width + ',' + from.rect.height / to.rect.height + ')';
    const first = { transform: transform(0), borderRadius: from.radius, boxShadow: from.shadow };
    const frames = [first];
    if (closing) {
      const settings = pageTransitionSettings.close;
      first.easing = settings.slideEase;
      frames.push({ ...first, transform: transform(lead), offset: settings.detach / duration, easing: pageTransitionSettings.easing });
    }
    frames.push({ transform: 'none', borderRadius: to.radius, boxShadow: to.shadow });
    const animation = animate(node, frames, { duration, easing: closing ? 'linear' : pageTransitionSettings.easing });
    const edgeAnimation = animate(edge, [{ opacity: from.edgeOpacity }, { opacity: to.edgeOpacity }], { duration });
    const flight = transition.flight = { node, edge, thumbnail, animations: [animation, edgeAnimation] };
    animation.finished.then(() => {
      if (pageTransition !== transition || transition.flight !== flight) return;
      if (!closing && view.cover.hidden && image.naturalWidth && snapshot?.id === host.trackId()) {
        // Keep the landed art in place if the full-size image is still loading.
        view.coverBox.classList.add('shared-art');
        view.coverBox.style.backgroundImage = 'url(' + JSON.stringify(image.src) + ')';
      }
      // During dismissal the master hands both real covers back together.
      if (!closing) cancelCoverFlight();
    }, () => {});
  }

  function playPageTransition(outgoing) {
    if (document.hidden) {
      cancelPageTransition();
      return;
    }
    const interrupted = pageTransition;
    const previousLayers = new Map();
    for (const element of interrupted?.layers || []) {
      const { opacity, transform } = getComputedStyle(element);
      previousLayers.set(element, { opacity: Number(opacity), transform });
    }
    const flight = interrupted?.flight;
    const previousCover = flight && coverFrame(flight.node, flight.node, Number(getComputedStyle(flight.edge).opacity));
    cancelPageTransition();
    page.classList.toggle('is-opening', !outgoing);
    page.classList.toggle('is-closing', outgoing);
    const fadeOnly = reducedMotion.matches || !!document.fullscreenElement;
    const endpoints = !fadeOnly && sharedCoverEndpoints();
    const simple = fadeOnly || interrupted?.simple || (!outgoing && !endpoints && !interrupted?.slide);
    const transition = pageTransition = { animations: [], layers: new Set(), simple, slide: outgoing && !simple };
    const start = document.timeline.currentTime;
    function animate(element, frames, timing) {
      const animation = element.animate(frames, { fill: 'both', easing: pageTransitionSettings.easing, ...timing });
      if (start !== null) animation.startTime = start;
      transition.animations.push(animation);
      return animation;
    }
    function reveal(element, timing, move) {
      if (!element.getClientRects().length) return;
      const [delay, end, distance] = timing;
      const captured = previousLayers.get(element);
      const from = { opacity: captured?.opacity ?? (interrupted?.slide ? 1 : 0) };
      const to = { opacity: 1 };
      if (move || captured) {
        const rest = getComputedStyle(element).transform;
        from.transform = captured?.transform || (interrupted?.slide || !move ? rest : move(distance));
        to.transform = rest;
      }
      transition.layers.add(element);
      animate(element, [from, to], { delay: captured ? 0 : delay, duration: end - (captured ? 0 : delay) });
    }
    let master;
    if (simple) {
      const opacity = previousLayers.get(page)?.opacity ?? previousLayers.get(view.pageBackground)?.opacity ?? (outgoing ? 1 : 0);
      transition.layers.add(page);
      master = animate(page, [{ opacity }, { opacity: outgoing ? 0 : 1 }], {
        duration: reducedMotion.matches ? pageTransitionSettings.reduced : pageTransitionSettings.fade,
      });
    } else if (outgoing) {
      const settings = pageTransitionSettings.close;
      const lead = Math.round(page.clientHeight * settings.lead);
      const travel = Math.round(page.clientHeight * settings.travel);
      // Move the visual groups in viewport coordinates. The root still blocks
      // clicks and the independent artwork can land on the stationary minibar.
      const groups = [view.pageBackground, view.left, view.right, view.grip,
        ...view.pageControls.filter(element => !view.left.contains(element))];
      for (const element of groups) {
        if (!element.getClientRects().length) continue;
        const captured = previousLayers.get(element);
        const style = getComputedStyle(element);
        const opacity = captured?.opacity ?? Number(style.opacity);
        const base = captured?.transform || style.transform;
        const shifted = dy => 'translateY(' + dy + 'px)' + (base === 'none' ? '' : ' ' + base);
        transition.layers.add(element);
        animate(element, [
          { transform: shifted(0), opacity, easing: settings.slideEase },
          { transform: shifted(lead), opacity, offset: settings.detach / settings.duration, easing: settings.slideEase },
          { transform: shifted(travel), opacity: 0 },
        ], { duration: settings.duration, easing: 'linear' });
      }
      // If a close interrupts the staggered reveal, retain each child's
      // visible state while its parent slides away.
      for (const [element, frame] of previousLayers) {
        if (element !== page && !transition.layers.has(element)) {
          transition.layers.add(element);
          animate(element, [frame, frame], { duration: settings.duration });
        }
      }
      if (endpoints) {
        const from = previousCover && flight.thumbnail === endpoints.thumbnail ? previousCover : endpoints.large;
        playCoverFlight(transition, animate, endpoints, from, endpoints.small, settings.duration, lead);
      }
      master = animate(page, [], { duration: settings.duration });
    } else {
      const settings = pageTransitionSettings.open;
      const translate = pixels => 'translateY(' + pixels + 'px)';
      if (previousLayers.has(view.left)) reveal(view.left, [0, settings.duration]);
      reveal(view.pageBackground, settings.background, scale => 'scale(' + scale + ')');
      reveal(view.meta, settings.meta, translate);
      for (const element of view.pageControls) reveal(element, settings.controls, translate);
      reveal(view.grip, settings.controls);
      if (tab !== 'none') reveal(view.right, settings.panel, translate);
      if (endpoints) {
        const from = previousCover && flight.thumbnail === endpoints.thumbnail ? previousCover : endpoints.small;
        playCoverFlight(transition, animate, endpoints, from, endpoints.large, settings.cover);
      }
      master = animate(page, [], { duration: settings.duration });
    }
    master.finished.then(() => {
      if (pageTransition !== transition) return;
      if (outgoing) finishClose();
      else cancelPageTransition();
    }, () => {});
  }

  function finishClose() {
    cancelPageTransition();
    closing = false;
    if (activity) stopActivity();
    const exiting = document.fullscreenElement === page ? document.exitFullscreen().catch(() => {}) : undefined;
    page.hidden = true;
    updateLauncher();
    const entry = focusBeforeOpen instanceof HTMLElement && focusBeforeOpen.isConnected && focusBeforeOpen.getClientRects().length
      ? focusBeforeOpen : host.coverEntry() || launcher;
    if (entry && !entry.matches('button, input, a[href], [tabindex]')) {
      entry.tabIndex = -1;
      entry.addEventListener('blur', () => entry.removeAttribute('tabindex'), { once: true });
    }
    focusBeforeOpen = undefined;
    const restore = () => { if (page.hidden && !document.hidden && !lifetime.signal.aborted) entry?.focus({ preventScroll: true }); };
    if (exiting) exiting.then(restore);
    else restore();
  }

  function close(immediate = false) {
    if (page.hidden) return;
    endNativePlaylist(true, false);
    if (closing) {
      if (immediate) finishClose();
      return;
    }
    if (tab === 'lyrics') panelPositions.lyrics = { id: snapshot?.id, anchor: captureLyricAnchor() };
    if (tab === 'queue') panelPositions.queue = { id: snapshot?.id, anchor: queueView.capture() };
    closePopups();
    hidePreview();
    closing = true;
    if (immediate || document.hidden) {
      finishClose();
      return;
    }
    panelSlide?.animation.pause();
    panelFade?.animation.pause();
    lyricView.suspend();
    queueView.stopScroll();
    sampleAt = 0;
    playPageTransition(true);
  }

  function handleKeyboard(event) {
    if (nativeDialog?.pending || nativeDialog?.dialogs.size || event.target?.closest?.('.apple-now-playing-host-portal')) return;
    const editing = event.target?.closest?.('textarea:not([readonly]), [contenteditable]:not([contenteditable="false"]), input:not([type="range"]):not([type="checkbox"]):not([type="radio"])');
    const keyM = event.code === 'KeyM' || /^m$/i.test(event.key) || event.keyCode === 77;
    if (event.ctrlKey && event.shiftKey && keyM && !event.repeat && !editing) {
      if (page.hidden || closing) {
        if (!open()) return;
      } else {
        close();
      }
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    if (closing) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    if (page.hidden || editing || !page.contains(event.target)) return;
    if (dropdown && handleDropdownKeyboard(event)) return;
    if (event.key === 'Escape' && !event.repeat) {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (document.fullscreenElement === page) document.exitFullscreen().catch(() => {});
      else if (settingsOpen || !view.menu.hidden || !view.rowMenu.hidden || !view.sourcePanel.hidden || !view.queueMenu.hidden) closePopups(true);
      else if (copyMode) toggleCopy(false);
      else close();
    } else if (event.key === 'Tab') {
      const focusRoot = !view.sourcePanel.hidden ? view.sourcePanel : settingsOpen ? view.settings : page;
      const focusable = [...focusRoot.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]')]
        .filter(element => element.tabIndex >= 0 && element.getClientRects().length &&
          (settingsOpen || !view.settings.contains(element)) &&
          !(panelFade?.outgoing && view.right.contains(element)));
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (document.activeElement === page) {
        event.preventDefault();
        (event.shiftKey ? last : first)?.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
      event.stopPropagation();
    } else if ([' ', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
      // Keep the browser's default activation and range handling inside the page.
      // Lyric navigation handles its keys at the lyric container instead.
      if (!event.target.closest('.apple-now-playing-lyrics, .apple-now-playing-segmented, .apple-now-playing-dropdown-trigger, .apple-now-playing-settings-nav')) event.stopPropagation();
    }
  }

  function cancelPanelSlide() {
    const slide = panelSlide;
    if (!slide) return;
    panelSlide = undefined;
    slide.animation.cancel();
    view.left.classList.remove('is-sliding');
  }

  function springVelocity(motion) {
    if (!motion?.animation) return 0;
    const { animation, positions, duration } = motion;
    const time = Number(animation.currentTime);
    if (time <= 0 || time >= duration) return 0;
    const intervals = positions.length - 1;
    const index = Math.floor(time * intervals / duration);
    return (positions[index + 1] - positions[index]) * intervals / duration;
  }

  function springPositions(distance, velocity, duration, dampingRatio) {
    // Normalize the spring to a settling time of one animation duration.
    // The previous compositor segment supplies the initial velocity on reversal.
    const damping = clamp(dampingRatio, .1, .99);
    const decay = 7.8;
    const frequency = decay * Math.sqrt(1 - damping * damping) / damping;
    const sineWeight = (velocity * duration + decay * distance) / frequency;
    const steps = Math.max(2, Math.ceil(duration / 8));
    return Array.from({ length: steps + 1 }, (_, index) => {
      if (index === steps) return 0;
      const t = index / steps;
      return Math.exp(-decay * t) * (distance * Math.cos(frequency * t) + sineWeight * Math.sin(frequency * t));
    });
  }

  function animatePanelSlide(from, velocity) {
    const distance = from - view.left.getBoundingClientRect().left;
    if (Math.abs(distance) < .25 && Math.abs(velocity) < .01) return false;
    const { duration, dampingRatio } = panelSpringSettings;
    const positions = springPositions(distance, velocity, duration, dampingRatio);
    view.left.classList.add('is-sliding');
    const animation = view.left.animate(positions.map(x => ({ transform: 'translate3d(' + x + 'px, 0, 0)' })), {
      duration, fill: 'backwards',
    });
    const slide = panelSlide = { animation, positions, duration };
    animation.finished.then(() => {
      if (panelSlide === slide) cancelPanelSlide();
    }, () => {});
    return true;
  }

  function cancelPanelFade() {
    const fade = panelFade;
    if (!fade) return;
    panelFade = undefined;
    if (fade.outgoing) {
      view.right.classList.remove('is-fading-out');
      view.right.removeAttribute('aria-hidden');
      for (const property of ['left', 'top', 'width', 'height']) view.right.style.removeProperty(property);
      view.lyrics.hidden = view.copy.hidden = view.status.hidden = true;
    }
    fade.animation.cancel();
  }

  function animatePanel(keyframes, options, outgoing) {
    if (outgoing) {
      const origin = page.getBoundingClientRect();
      Object.assign(view.right.style, {
        left: (outgoing.left - origin.left) + 'px', top: (outgoing.top - origin.top) + 'px',
        width: outgoing.width + 'px', height: outgoing.height + 'px',
      });
      view.right.classList.add('is-fading-out');
      view.right.setAttribute('aria-hidden', 'true');
    }
    const animation = view.panel.animate(keyframes, options);
    const fade = panelFade = { animation, outgoing: !!outgoing };
    animation.finished.then(() => {
      if (panelFade === fade) cancelPanelFade();
    }, () => {});
  }

  function showTab(next) {
    const previous = tab;
    if (!closing && (previous !== next || preferences.display !== 'all')) cancelPageTransition();
    const changedPosition = (previous === 'none') !== (next === 'none');
    const fullLayout = preferences.display === 'all' && page.dataset.display === 'all';
    const animateTab = activity && previous !== next && !closing && !reducedMotion.matches;
    const animatePosition = animateTab && changedPosition && fullLayout && !narrowWindow.matches;
    const fadeOut = animateTab && previous === 'lyrics' && next === 'none';
    const reopening = animateTab && panelFade?.outgoing && next === 'lyrics';
    const opacity = fadeOut || reopening ? Number(getComputedStyle(view.panel).opacity) : 0;
    const bounds = fadeOut && opacity > .01 ? view.right.getBoundingClientRect() : undefined;
    const outgoing = bounds?.width && bounds.height ? bounds : undefined;
    const outgoingCopy = copyMode;
    const returnLyricFocus = outgoing && view.right.contains(document.activeElement);
    const from = animatePosition ? view.left.getBoundingClientRect().left : 0;
    const velocity = animatePosition ? springVelocity(panelSlide) : 0;
    if (changedPosition || !fullLayout) cancelPanelSlide();
    if (previous !== next || panelFade?.outgoing) cancelPanelFade();
    if (snapshot && previous === 'lyrics') panelPositions.lyrics = { id: snapshot.id, anchor: captureLyricAnchor() };
    if (snapshot && previous === 'queue') panelPositions.queue = { id: snapshot.id, anchor: queueView.capture() };
    if (copyMode && next !== 'lyrics') toggleCopy(false);
    if (previous !== next) clearLyricScrollIndicator();
    if (previous === 'lyrics' && next !== 'lyrics') lyricView.suspend();
    tab = next;
    page.dataset.panel = next;
    updateDisplayMode();
    const showLyrics = next === 'lyrics' || !!outgoing;
    const showCopy = outgoing ? outgoingCopy : copyMode;
    view.lyrics.hidden = !showLyrics || showCopy;
    view.copy.hidden = !showLyrics || !showCopy;
    view.queue.hidden = next !== 'queue';
    view.status.hidden = !showLyrics || showCopy || lyrics.length > 0;
    view.lyricsToggle.setAttribute('aria-pressed', String(next === 'lyrics'));
    page.querySelector('[data-action="queue"]').setAttribute('aria-pressed', String(next === 'queue'));
    setControlsHidden(false);
    const sliding = animatePosition && animatePanelSlide(from, velocity);
    if (next === 'queue') {
      renderQueue();
      if (panelPositions.queue?.id === snapshot?.id) queueView.restore(panelPositions.queue.anchor);
      queueView.render();
    } else if (next === 'lyrics') {
      const now = performance.now();
      syncLyrics(playbackTime(now), now, false);
      if (browseUntil > now && panelPositions.lyrics?.id === snapshot?.id) restoreLyricAnchor(panelPositions.lyrics.anchor);
      else positionLyrics(false);
    }
    const { outDuration, inDuration, slideInDelay } = lyricPanelFadeSettings;
    if (outgoing) {
      if (returnLyricFocus) view.lyricsToggle.focus({ preventScroll: true });
      animatePanel([{ opacity }, { opacity: 0 }], { duration: outDuration, fill: 'both', easing: 'ease-out' }, outgoing);
    } else if (animateTab && next !== 'none') {
      if (next === 'lyrics' || sliding) {
        const startOpacity = reopening ? opacity : sliding ? 0 : .3;
        animatePanel([{ opacity: startOpacity }, { opacity: 1 }], {
          delay: sliding && !reopening ? slideInDelay : 0, duration: inDuration, fill: 'backwards', easing: 'ease-out',
        });
      } else {
        animatePanel([{ opacity: .3, transform: 'translateY(7px)' }, { opacity: 1, transform: 'none' }], {
          duration: 160, easing: 'ease-out',
        });
      }
    }
  }

  function handleClick(event) {
    if (closing) return;
    if (event.target.closest('.apple-now-playing-host-portal')) return;
    const target = event.target.closest('button');
    if (!target) {
      if (!event.target.closest('.apple-now-playing-settings-panel, .apple-now-playing-menu, .apple-now-playing-row-menu, .apple-now-playing-source-panel, .apple-now-playing-queue-menu')) closePopups();
      return;
    }
    if (!page.contains(target)) return;
    const trackMenuAction = view.menu.contains(target);
    const action = target.dataset.action;
    const id = snapshot?.id;
    if (target.dataset.trackId && target.dataset.trackId !== host.trackId()) {
      closePopups();
      notify('曲目已切换');
      return;
    }
    if (trackMenuAction) closePopups(true);
    else if (action !== 'menu' && !view.menu.hidden) closePopups();
    switch (action) {
      case 'close': close(); break;
      case 'screen':
        if (document.fullscreenElement === page) document.exitFullscreen().catch(() => {});
        else page.requestFullscreen?.().catch(() => {});
        break;
      case 'play':
      case 'previous':
      case 'next':
      case 'favorite':
      case 'mode':
        host.click(action);
        dirty = true;
        break;
      case 'menu':
        if (!view.menu.hidden) closePopups(true);
        else showTrackMenu();
        break;
      case 'settings':
        if (settingsOpen) closePopups(true);
        else openSettings();
        break;
      case 'close-settings': closePopups(true); break;
      case 'source': showSourceDetails(); break;
      case 'close-source': closePopups(true); break;
      case 'load-fonts': loadFonts(); break;
      case 'add-font': addSelectedFont(); break;
      case 'queue-menu': {
        const rect = target.getBoundingClientRect();
        showQueueMenu(target.dataset.resourceId, target.dataset.resourceType, rect.right - 200, rect.bottom);
        break;
      }
      case 'queue-next':
      case 'queue-remove':
      case 'queue-up':
      case 'queue-down':
        if (queueMenuTarget && !host.mutateQueue(action.slice(6), queueMenuTarget.id, queueMenuTarget.type)) {
          notify('当前操作不可用，请在网易云管理');
        }
        closePopups(true);
        dirty = true;
        break;
      case 'cover':
      case 'host-queue':
        if (host.click(action === 'cover' ? 'cover' : 'queue')) close(true);
        break;
      case 'queue':
      case 'lyrics':
        showTab(tab === action ? 'none' : action);
        break;
      case 'toggle-karaoke':
      case 'toggle-translation':
      case 'toggle-roman': {
        const key = action.slice(7);
        setPreference(key, !preferences[key]);
        break;
      }
      case 'offset-ahead': updateOffset(100); break;
      case 'offset-behind': updateOffset(-100); break;
      case 'offset-reset': updateOffset(0); break;
      case 'copy-view':
        closePopups();
        toggleCopy();
        break;
      case 'copy-all': copyText(view.copyText.value); break;
      case 'select-all': view.copyText.focus(); view.copyText.select(); break;
      case 'copy-line':
      case 'copy-original':
      case 'copy-translation':
      case 'copy-roman': {
        const row = lyrics[rowMenuIndex];
        if (!row) break;
        const vocals = [row, ...(row.backingLines || [])];
        const value = action === 'copy-line' ? vocals.map(copyViewText).join('\n') :
          vocals.map(vocal => vocal[{ 'copy-original': 'content', 'copy-translation': 'translation', 'copy-roman': 'roman' }[action]]).filter(Boolean).join('\n');
        closePopups(true);
        copyText(value);
        break;
      }
      case 'detail-song':
        if (host.navigate(id, 'song')) close(true);
        break;
      case 'detail-artist':
      case 'detail-album':
        if (host.navigate(id, action === 'detail-artist' ? 'artist' : 'album', { id: target.dataset.id })) close(true);
        break;
      case 'add-playlist':
        openNativePlaylist(id);
        break;
      case 'copy-track': copyText(snapshot.name); break;
      case 'copy-alias': copyText(view.alias.textContent); break;
      case 'copy-cover': copyText(snapshot.cover); break;
      case 'save-cover': saveCurrentCover(); break;
      case 'queue-play':
        if (!host.playQueue(target.dataset.resourceId, target.dataset.resourceType)) notify('队列已变化，请在网易云管理');
        dirty = true;
        break;
    }
  }

  async function saveCurrentCover() {
    if (!activity || !snapshot?.cover || !window.AppleNowPlayingCoverSave) return;
    if (coverSaveRequest) { notify('正在保存封面，请稍候'); return; }
    const scope = activity;
    const request = coverSaveRequest = new AbortController();
    const cancel = () => request.abort();
    scope.signal.addEventListener('abort', cancel, { once: true });
    const track = { url: snapshot.cover, name: snapshot.name, id: snapshot.id };
    notify('正在保存封面…');
    try {
      const path = await window.AppleNowPlayingCoverSave.save(track, request.signal);
      if (!request.signal.aborted && activity === scope) notify('封面已保存：' + path);
    } catch (error) {
      if (!request.signal.aborted && activity === scope) notify(error.message || '保存封面失败，请重试');
    } finally {
      scope.signal.removeEventListener('abort', cancel);
      if (coverSaveRequest === request) coverSaveRequest = undefined;
    }
  }

  function finishDrag() {
    clearTimeout(dragEndTimer);
    const gesture = drag;
    drag = undefined;
    if (gesture?.changed && !gesture.cancelled && gesture.id === snapshot?.id) seek(gesture.target);
  }

  function cancelPalette() {
    if (!paletteImage) return;
    paletteImage.onload = paletteImage.onerror = null;
    paletteImage.removeAttribute('src');
    paletteImage = undefined;
  }

  function applyBackdropTheme(colors) {
    const samples = (colors || ['rgb(72,72,72)', 'rgb(88,88,88)', 'rgb(56,56,56)'])
      .map(color => color.match(/\d+/g).slice(0, 3).map(Number));
    const tint = samples[0].map((_, channel) => samples.reduce((sum, rgb) => sum + rgb[channel], 0) / samples.length);
    const mix = (rgb, target, amount) => rgb.map(value => Math.round(value * (1 - amount) + target * amount));
    const color = (rgb, alpha) => alpha === undefined ? 'rgb(' + rgb.join(',') + ')' : 'rgba(' + rgb.join(',') + ',' + alpha + ')';
    // Keep the strongest cover hue rather than washing every secondary color
    // almost to white. Neutral artwork still receives a neutral reading theme.
    const chroma = rgb => Math.max(...rgb) - Math.min(...rgb);
    const swatch = samples.reduce((best, rgb) => chroma(rgb) > chroma(best) ? rgb : best, samples[0]);
    const normalized = swatch.map(value => value / 255);
    const maximum = Math.max(...normalized), minimum = Math.min(...normalized);
    const delta = maximum - minimum, luminosity = (maximum + minimum) / 2;
    const saturation = delta ? delta / (1 - Math.abs(2 * luminosity - 1)) : 0;
    function accentColor() {
      if (delta * 255 < 14 || saturation < .12) return [222, 222, 222];
      let hue = maximum === normalized[0] ? (normalized[1] - normalized[2]) / delta :
        maximum === normalized[1] ? (normalized[2] - normalized[0]) / delta + 2 :
          (normalized[0] - normalized[1]) / delta + 4;
      hue = (hue + 6) % 6;
      const s = clamp(saturation * .9, .48, .78), l = .76;
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs(hue % 2 - 1)), m = l - c / 2;
      const rgb = hue < 1 ? [c, x, 0] : hue < 2 ? [x, c, 0] : hue < 3 ? [0, c, x] :
        hue < 4 ? [0, x, c] : hue < 5 ? [x, 0, c] : [c, 0, x];
      return rgb.map(value => Math.round((value + m) * 255));
    }
    const fg = mix(tint, 255, .96);
    const base = mix(tint, 0, .28);
    let ink = accentColor();
    const luminance = rgb => rgb.map(value => value / 255).reduce((sum, value, index) =>
      sum + (value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4) * [.2126, .7152, .0722][index], 0);
    const backgroundLuminance = luminance(base);
    for (let attempt = 0; attempt < 16; attempt++) {
      const textLuminance = luminance(ink.map((value, index) => value * .86 + base[index] * .14));
      const contrast = (Math.max(textLuminance, backgroundLuminance) + .05) /
        (Math.min(textLuminance, backgroundLuminance) + .05);
      if (contrast >= 4.5) break;
      ink = mix(ink, 255, .06);
    }
    const surface = mix(tint, 0, .70);
    const values = {
      '--apple-now-playing-base': color(base), '--apple-now-playing-fg': color(fg), '--apple-now-playing-accent': color(ink), '--apple-now-playing-muted': color(ink, .86),
      '--apple-now-playing-idle': color(ink, .45), '--apple-now-playing-near': color(ink, .66), '--apple-now-playing-unlit': color(fg, .64),
      '--apple-now-playing-surface': color(surface, .98), '--apple-now-playing-settings-glass': color(surface, .76),
      '--apple-now-playing-inset': color(mix(tint, 0, .86), .30),
      '--apple-now-playing-hover': color(ink, .15), '--apple-now-playing-track': color(ink, .32),
      '--apple-now-playing-selected': color(ink, .96),
      '--apple-now-playing-selected-ink': color(mix(tint, 0, .67)),
      '--apple-now-playing-grip': color(ink, .48), '--apple-now-playing-focus': color(ink, .40),
      '--apple-now-playing-word-halo': color(fg, .35), '--apple-now-playing-meta-halo': color(ink, .20),
    };
    for (const [key, value] of Object.entries(values)) page.style.setProperty(key, value);
    return samples.map(rgb => color(rgb));
  }

  function updateBackdrop(id, url) {
    cancelPalette();
    const next = view.backdrop[1 - backdropIndex];
    const previous = view.backdrop[backdropIndex];
    function apply(colors, image) {
      if (!activity) return;
      const current = host.read();
      if (current.id !== id || current.cover !== url) return;
      const palette = applyBackdropTheme(colors);
      for (const [index, key] of ['--apple-now-playing-a', '--apple-now-playing-b', '--apple-now-playing-c'].entries()) {
        next.style.setProperty(key, palette[index]);
        page.style.setProperty(key, palette[index]);
      }
      fluidRenderer.setCover(image, palette);
      next.classList.toggle('apple-now-playing-cover-glow', Boolean(url && !colors));
      next.style.setProperty('--apple-now-playing-image', url ? 'url(' + JSON.stringify(url) + ')' : 'none');
      next.classList.remove('apple-now-playing-fading');
      next.classList.add('on');
      previous.classList.toggle('apple-now-playing-fading', !reducedMotion.matches);
      previous.classList.remove('on');
      backdropIndex = 1 - backdropIndex;
    }
    if (!url) { apply(); return; }
    const img = paletteImage = new Image();
    img.crossOrigin = 'anonymous';
    img.onerror = () => {
      if (img !== paletteImage) return;
      paletteImage = undefined;
      apply();
    };
    img.onload = () => {
      if (img !== paletteImage) return;
      paletteImage = undefined;
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 12;
      const ctx = canvas.getContext('2d');
      if (!ctx) { apply(); return; }
      try {
        ctx.drawImage(img, 0, 0, 12, 12);
        const pixels = ctx.getImageData(0, 0, 12, 12).data;
        const colors = [];
        for (let column = 0; column < 3; column++) {
          const sums = [0, 0, 0];
          let weight = 0;
          for (let i = 0; i < pixels.length; i += 4) {
            const x = (i / 4) % 12;
            if (Math.floor(x / 4) !== column) continue;
            const rgb = [pixels[i], pixels[i + 1], pixels[i + 2]];
            const saturation = (Math.max(...rgb) - Math.min(...rgb)) / 255;
            const w = .15 + saturation * 3.5;
            weight += w;
            rgb.forEach((value, index) => { sums[index] += value * w; });
          }
          const rgb = sums.map(value => value / weight);
          const middle = (Math.min(...rgb) + Math.max(...rgb)) / 2;
          const saturation = [1.8, .75, 1.22][column];
          const shade = [.87, .9, .67][column];
          const tint = rgb.map((value, i) => {
            const adjusted = middle + (value - middle) * saturation;
            return Math.round(clamp(adjusted * shade + [4, 9, 15][i], 5, 230));
          });
          const brightness = tint[0] * .213 + tint[1] * .715 + tint[2] * .072;
          const scale = Math.min(1, 116 / brightness);
          colors.push('rgb(' + tint.map(channel => Math.round(channel * scale)).join(',') + ')');
        }
        apply(colors, img);
      } catch (_) {
        apply(undefined, img);
      }
    };
    img.src = url;
  }

  function refreshSettingsSource() {
    if (!settingsSource) return;
    const id = activity ? snapshot?.id : host.trackId();
    const shown = id && lyricTrackId === id && !restartLyrics ? lyricSource : '打开播放页后加载';
    text(settingsSource, shown);
  }

  function setLyricSource(value) {
    lyricSource = value;
    refreshSettingsSource();
    renderSourceDetails();
  }

  function setLyricStatus(status) {
    text(view.status, status);
    view.status.hidden = tab !== 'lyrics' || lyrics.length > 0;
  }

  function parseQQLyrics(payload) {
    function qrcRows(raw) {
      const result = [];
      const offset = Number((raw || '').match(/^\[offset:(-?\d+)\]/m)?.[1]) || 0;
      for (const line of String(raw || '').split(/\r?\n/)) {
        const header = line.match(/^\[(\d+),(\d+)\](.*)$/);
        if (!header) continue;
        const words = [], markers = [...header[3].matchAll(/\((\d+),(\d+)\)/g)];
        let from = 0;
        for (const marker of markers) {
          const text = header[3].slice(from, marker.index);
          if (text) words.push({ time: Math.max(0, Number(marker[1]) - offset), duration: Number(marker[2]), text });
          from = marker.index + marker[0].length;
        }
        const trailing = header[3].slice(from);
        if (trailing) words.push({ time: Math.max(0, Number(header[1]) - offset), duration: 0, text: trailing });
        const content = (markers.length ? words.map(w => w.text).join('') : header[3]).trim();
        if (!content || content === '//' || /纯音乐[，,、 ]?请欣赏/.test(content)) continue;
        result.push({ time: Math.max(0, Number(header[1]) - offset), end: Math.max(0, Number(header[1]) + Number(header[2]) - offset),
          content, words, side: 'left', backing: false, backingLines: [] });
      }
      return result.sort((a,b) => a.time - b.time);
    }
    const decodeEntities = value => String(value || '').replace(/&(?:quot|apos|amp|lt|gt);|&#(x[0-9a-f]+|\d+);/gi, (match, number) => {
      if (number) {
        const n = number[0].toLowerCase() === 'x' ? parseInt(number.slice(1), 16) : Number(number);
        return n >= 0 && n <= 0x10ffff ? String.fromCodePoint(n) : match;
      }
      return ({'&quot;':'"', '&apos;':"'", '&amp;':'&', '&lt;':'<', '&gt;':'>'})[match.toLowerCase()] || match;
    });
    function unwrapQrcLine(line) {
      const text = line?.content;
      if (!text || !['(', '（'].includes(text[0])) return;
      const closers = [];
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === '(' || char === '（') closers.push(char === '(' ? ')' : '）');
        else if (char === ')' || char === '）') {
          if (closers.pop() !== char || (!closers.length && i !== text.length - 1)) return;
        }
      }
      const content = text.slice(1, -1).trim();
      if (closers.length || !content) return;
      if (!line.words?.length) return { ...line, content };

      // Select the same text range from the original timed fragments, including internal spaces.
      const raw = line.words.map(word => word.text).join('');
      const start = raw.indexOf(content, raw.indexOf(text[0]) + 1);
      const end = start + content.length;
      let offset = 0;
      const words = [];
      for (const word of line.words) {
        const from = Math.max(0, start - offset);
        const to = Math.min(word.text.length, end - offset);
        if (from < to) words.push({ ...word, text: word.text.slice(from, to) });
        offset += word.text.length;
      }
      return { ...line, content, words };
    }

    function sidecarMap(raw) {
      if (/^\[\d+,\d+\]/m.test(raw || '')) return new Map(qrcRows(raw).map(row => [row.time, row]));
      return new Map([...parseLrc(decodeEntities(raw))].map(([time, content]) => [time, { content }]));
    }
    const rows = payload.format === 'qrc' ? qrcRows(payload.content) :
      [...parseLrc(decodeEntities(payload.content))].filter(([,v]) => v && v !== '//' && !/纯音乐[，,、 ]?请欣赏/.test(v))
        .map(([time,content]) => ({ time, content, words: [], side: 'left', backing: false, backingLines: [] }));
    const translation = sidecarMap(payload.translation), roman = sidecarMap(payload.romanization);
    const near = (map,time) => {
      let best, distance = 31;
      for (const [at,value] of map) if (value.content !== '//' && Math.abs(at-time) < distance) { best=value;distance=Math.abs(at-time); }
      return best;
    };
    return rows.map(row => {
      const backing = payload.format === 'qrc' ? unwrapQrcLine(row) : undefined;
      let match = near(roman, row.time);
      let translated = near(translation, row.time);
      if (backing) {
        row = { ...backing, backing: true, side: 'right' };
        match = unwrapQrcLine(match) || match;
        translated = unwrapQrcLine(translated) || translated;
      }
      const words = match?.words?.filter(word => word.text.trim()) || [];
      const timed = words.length && words.every((word, index) => word.duration > 0 &&
        Number.isSafeInteger(word.time + word.duration) && (!index || word.time >= words[index - 1].time));
      return { ...row, translation: translated?.content || '', roman: match?.content || '',
        romanWords: timed ? match.words : undefined };
    });
  }

  const lyricCacheVersion = 1;
  const lyricCacheMaxAge = 7 * 24 * 60 * 60 * 1000;
  const lyricSourcePriority = ['AMLL TTML', 'QQ 音乐 QRC', 'QQ 音乐 LRC', '网易云 YRC', '网易云 LRC'];
  const lyricCacheWrites = new Map();

  function validLyricCache(entry, id) {
    const validWords = words => Array.isArray(words) && words.every(word => typeof word?.text === 'string' &&
      (word.time === undefined ? word.duration === undefined : Number.isFinite(word.time) && Number.isFinite(word.duration)) &&
      (word.ruby === undefined || Array.isArray(word.ruby) && word.ruby.every(part => typeof part?.word === 'string' &&
        Number.isFinite(part.startTime) && Number.isFinite(part.endTime))));
    const validVocal = vocal => typeof vocal?.content === 'string' && Number.isFinite(vocal.time) &&
      (vocal.end === undefined || Number.isFinite(vocal.end)) && validWords(vocal.words) &&
      (vocal.romanWords === undefined || validWords(vocal.romanWords)) &&
      (vocal.roman === undefined || typeof vocal.roman === 'string') &&
      (vocal.translation === undefined || typeof vocal.translation === 'string');
    const details = entry?.details;
    return entry?.version === lyricCacheVersion && entry.id === id && Number.isFinite(entry.savedAt) &&
      lyricSourcePriority.includes(entry.source) && Array.isArray(entry.rows) &&
      entry.rows.every(row => validVocal(row) && Array.isArray(row.backingLines) && row.backingLines.every(validVocal)) &&
      entry.rows.some(row => row.content || row.backingLines.some(vocal => vocal.content)) &&
      Array.isArray(details?.supplements) && details.supplements.every(item => typeof item === 'string') &&
      Array.isArray(details.metadata) && details.metadata.every(item => typeof item?.key === 'string' && typeof item.value === 'string') &&
      Array.isArray(details.contributors) && details.contributors.every(item => typeof item?.role === 'string' && typeof item.name === 'string');
  }

  function writeLyricCache(fs, directory, file, entry) {
    const write = (lyricCacheWrites.get(file) || Promise.resolve()).then(async () => {
      await fs.mkdir(directory);
      await fs.mkdir(directory + '\\lyrics-cache');
      await fs.writeFile(file, new Blob([JSON.stringify(entry)], { type: 'application/json' }));
    }).catch(error => console.warn('[AppleNowPlaying] 无法保存歌词缓存', error));
    lyricCacheWrites.set(file, write);
    write.then(() => {
      if (lyricCacheWrites.get(file) === write) lyricCacheWrites.delete(file);
    });
  }

  async function loadLyrics(id) {
    const sameTrack = lyricTrackId === id;
    lyricTrackId = id;
    restartLyrics = false;
    lyricRequest?.abort();
    lyricRequest = undefined;
    if (!sameTrack) {
      lyricDetails = { contributors: [], metadata: [], supplements: [] };
      rawLyrics = [];
      lyrics = [];
      lyricView.set([], preferences, 0, 0);
      lyricFocus = -1;
      browseUntil = 0;
      updateLyricTools();
    }
    if (!/^\d+$/.test(id)) {
      const status = id ? '暂无同步歌词' : '暂无正在播放的歌曲';
      setLyricSource(status);
      setLyricStatus(status);
      return;
    }
    if (!lyrics.length) {
      setLyricSource('正在加载');
      setLyricStatus('正在加载歌词…');
    }
    const request = lyricRequest = new AbortController();
    const current = () => activity && lyricRequest === request && !request.signal.aborted &&
      snapshot?.id === id && host.trackId() === id;
    const track = { id, title: snapshot.name, artist: snapshot.artist, album: snapshot.album, durationMs: Math.round(snapshot.duration*1000) };
    const { app, fs } = window.betterncm || {};
    let cacheDirectory, cacheFile, cached;
    function publish(rows, source, details) {
      if (!current()) return;
      if (details) lyricDetails = details;
      const anchor = captureLyricAnchor(), now = performance.now();
      const focusedTime = view.lyrics.contains(document.activeElement) ? lyrics[lyricFocus]?.time : undefined;
      rawLyrics = rows;
      lyrics = prepareLyrics(rows, snapshot?.duration || 0);
      lyricFocus = -1;
      setLyricSource(source);
      renderLyrics();
      if (browseUntil > now) restoreLyricAnchor(anchor);
      if (focusedTime !== undefined) {
        const index = lyrics.findIndex(row => row.kind === 'line' && row.time >= focusedTime);
        if (index >= 0) setLyricFocus(index,true,false);
      }
      syncLyrics(playbackTime(now),now,false);
      if (previewPosition) showPreview(previewPosition.x);
    }
    function accept(rows, source, details) {
      if (!cached) publish(rows, source, details);
      if (!cacheFile || !rows.some(row => row.content || row.backingLines.some(vocal => vocal.content))) return;
      if (cached && lyricSourcePriority.indexOf(source) > lyricSourcePriority.indexOf(cached.source)) return;
      writeLyricCache(fs, cacheDirectory, cacheFile, { version: lyricCacheVersion, id, savedAt: Date.now(), source, details, rows });
    }
    const nativeUrl = new URL('/api/song/lyric/v1',window.APP_CONF?.domain || 'https://music.163.com');
    nativeUrl.search='id='+id+'&lv=0&tv=0&rv=0&kv=0&yv=0&ytv=0&yrv=0&cp=false';
    const amllPath = 'ncm-lyrics/' + id + '.ttml';
    const amllSources = [
      ['GDBA', 'https://amll-ttml-db.gbclstudio.cn/' + amllPath],
      ['作者镜像', 'https://amll-ttml-db.stevexmh.net/ncm/' + id],
      ['GitHub AMLL', 'https://raw.githubusercontent.com/amll-dev/amll-ttml-db/refs/heads/main/' + amllPath],
    ];
    const readNative = () => requestLyrics(nativeUrl, request, 5000, response => response.json());
    const validNative = data => data && typeof data === 'object' && (data.code == null || data.code === 200);
    try {
      if (typeof app?.getDataPath === 'function' && typeof fs?.readFileText === 'function' &&
          typeof fs.mkdir === 'function' && typeof fs.writeFile === 'function') {
        try {
          const base = await app.getDataPath();
          if (!current()) return;
          if (typeof base === 'string' && /^[A-Za-z]:[\\/]/.test(base)) {
            cacheDirectory = base.replace(/[\\/]+$/, '').replace(/\//g, '\\') + '\\AppleNowPlaying-data';
            cacheFile = cacheDirectory + '\\lyrics-cache\\' + id + '.json';
            const writing = lyricCacheWrites.get(cacheFile);
            if (writing) await writing;
            const entry = JSON.parse(await fs.readFileText(cacheFile));
            if (validLyricCache(entry, id)) cached = entry;
          }
        } catch (_) { /* Cache misses and read failures use the normal sources. */ }
      }
      if (!current()) return;
      if (cached) {
        publish(cached.rows, cached.source, cached.details);
        const age = Date.now() - cached.savedAt;
        if (age >= 0 && age < lyricCacheMaxAge) return;
      }
      for (const [mirror, url] of amllSources) {
        const result = await requestLyrics(url, request, 4000, response => response.text());
        if (!current()) return;
        const rows = result.data ? parseTtml(result.data) : [];
        if (!rows.length) continue;
        const details = { url, mirror, metadata: extractTtmlMetadata(result.data), contributors: [], supplements: [] };

        // Native sidecars can fill missing fields without replacing the selected TTML.
        const missing = vocal => !vocal.translation || !vocal.roman || (vocal.roman && !vocal.romanWords?.length);
        const needsSidecars = rows.some(row => missing(row) || row.backingLines.some(missing));
        const deferWrite = needsSidecars && cached?.source === 'AMLL TTML' && cached.details.supplements.length;
        if (!deferWrite) accept(rows, 'AMLL TTML', details);
        if (!needsSidecars) return;
        const { data } = await readNative();
        if (!current() || !validNative(data)) return;
        const merged = mergeLyricSidecars(rows, parseNativeLyrics(data, true));
        const fields = ['translation', 'roman'].filter(field => merged.some((row, i) =>
          (row[field] && !rows[i][field]) || row.backingLines.some((vocal, j) => vocal[field] && !rows[i].backingLines[j]?.[field])));
        if (!fields.includes('roman') && merged.some((row, i) =>
          (row.romanWords?.length && !rows[i].romanWords?.length) ||
          row.backingLines.some((v, j) => v.romanWords?.length && !rows[i].backingLines[j]?.romanWords?.length))) fields.push('roman');
        if (fields.length) accept(merged, 'AMLL TTML', { ...details,
          contributors: fields.includes('translation') ? extractNativeContributors(data).filter(c => c.role.includes('译文')) : [],
          supplements: fields.map(field => '网易云' + (field === 'roman' ? '罗马音' : '译文')),
        });
        else if (deferWrite) accept(rows, 'AMLL TTML', details);
        return;
      }
      const qq=await window.AppleNowPlayingQQLyrics?.fetchLyrics(track,request.signal).catch(error=>{
        console.warn('[AppleNowPlaying] QQ 歌词不可用', error);
        return null;
      });
      if (!current()) return;
      if (qq) {
        const rows=parseQQLyrics(qq);
        if (rows.length) {
          accept(rows,'QQ 音乐 '+(qq.format==='qrc'?'QRC':'LRC'),{
            url:qq.url,contributors:[],supplements:[],
            metadata:[{key:'QQ 匹配歌曲',value:qq.candidate?.title||track.title},
              {key:'QQ 艺人',value:qq.candidate?.artist||track.artist}],
          });
          return;
        }
      }
      const { data, missing } = await readNative();
      if (!current()) return;
      const available = validNative(data);
      const rows = available ? parseNativeLyrics(data, true) : [];
      const pure = available && (data.nolyric === true || /纯音乐[，,、 ]?请欣赏/.test(data.lrc?.lyric || ''));
      const source = rows.some(row => row.words.length) ? '网易云 YRC' : pure ? '纯音乐' :
        rows.length ? '网易云 LRC' : available || missing ? '暂无同步歌词' : '歌词获取失败';
      accept(source === '纯音乐' ? [] : rows, source, { url: nativeUrl.href,
        contributors: available ? extractNativeContributors(data) : [], metadata: [], supplements: [] });
    } catch(error) {
      if (!current()) return;
      if (!lyrics.length) publish([], '歌词获取失败');
      console.warn('[AppleNowPlaying] 无法处理歌词',error);
    } finally {
      if (lyricRequest===request) lyricRequest=undefined;
    }
  }

  function captureLyricAnchor() {
    return lyricView.player.scrollOffset;
  }

  function restoreLyricAnchor(offset) {
    if (!Number.isFinite(offset) || !lyrics.length || browseUntil <= performance.now()) return;
    lyricView.player.setBrowseOffset(offset);
  }

  function renderLyrics() {
    const offset = captureLyricAnchor();
    const ms = Math.max(0, Math.round(playbackTime(performance.now()) * 1000 + currentOffset()));
    lyricView.set(lyrics, preferences, (snapshot?.duration || 0) * 1000, ms);
    restoreLyricAnchor(offset);
    lyricFocus = lyricView.nodes.keys().next().value ?? -1;
    view.status.hidden = copyMode || tab !== 'lyrics' || lyrics.length > 0;
    if (!lyrics.length) setLyricStatus(lyricSource);
    if (copyMode) updateCopyText();
    updateLyricTools();
  }

  function browseLyrics() {
    if (!activity || tab !== 'lyrics' || copyMode) return;
    browseUntil = performance.now() + 5000;
    page.dataset.lyricBrowsing = 'true';
    if (preferences.scrollbar) {
      view.lyrics.classList.add('apple-now-playing-user-scrolling');
      clearTimeout(lyricScrollHideTimer);
      lyricScrollHideTimer = setTimeout(clearLyricScrollIndicator, 750);
    }
  }

  function setLyricFocus(index, focus = false, scroll = true) {
    if (!lyricView.nodes.has(index)) return;
    lyricFocus = index;
    if (focus && scroll) lyricView.reveal(index);
    else lyricView.setFocus(index, focus);
  }

  function handleLyricKeys(event) {
    if (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10')) {
      event.preventDefault();
      event.stopPropagation();
      const node = lyricView.nodes.get(lyricFocus);
      const rect = (node?.isConnected ? node : view.lyrics).getBoundingClientRect();
      showRowMenu(node?.isConnected ? lyricFocus : -1, rect.left + 20, rect.top + 20);
      return;
    }
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      event.target.closest('[data-action="lyric"]')?.click();
      event.stopPropagation();
      return;
    }
    const step = { ArrowDown: 1, ArrowUp: -1, Home: -lyrics.length, End: lyrics.length }[event.key];
    if (!step) return;
    event.preventDefault();
    event.stopPropagation();
    browseLyrics();
    let next = clamp(lyricFocus + step, 0, lyrics.length - 1);
    const direction = event.key === 'End' || event.key === 'ArrowUp' ? -1 : 1;
    while (next >= 0 && next < lyrics.length && !lyricView.nodes.has(next)) next += direction;
    setLyricFocus(next, true);
  }

  function positionLyrics() {
    if (tab === 'lyrics' && activity && !copyMode) lyricView.player.calcLayout(true);
  }

  function lyricIndexAt(milliseconds) {
    let low = 0, high = lyrics.length;
    while (low < high) {
      const mid = (low + high) >> 1;
      if (lyrics[mid].time <= milliseconds) low = mid + 1;
      else high = mid;
    }
    return low - 1;
  }

  function syncLyrics(seconds, time, smooth = true) {
    if (tab !== 'lyrics' || copyMode || !lyrics.length) return;
    if (lyricView.released) renderLyrics();
    if (browseUntil && time >= browseUntil && !lyricView.player.isManualScrolling) {
      browseUntil = 0;
      lyricView.player.resetScroll();
      lyricView.player.calcLayout();
      page.dataset.lyricBrowsing = 'false';
    }
    const rate = clock?.running && !drag && !pendingSeek ? clock.rate : 0;
    lyricView.tick(seconds * 1000 + currentOffset(), time, rate, !smooth);
    const current = lyricView.currentNode;
    if (current && !view.lyrics.contains(document.activeElement)) setLyricFocus(Number(current.dataset.index));
    if (browseUntil && preferences.scrollbar) {
      const p = lyricView.player;
      const [min, max] = p.scrollBoundary;
      if (max > min) {
        const percent = Math.round(clamp((p.scrollOffset - min) / (max - min), 0, 1) * 100);
        if (view.browseBar.getAttribute('aria-valuenow') !== String(percent)) {
          view.browseBar.setAttribute('aria-valuenow', percent);
          view.browseBar.style.setProperty('--scroll-fraction', percent + '%');
        }
      }
    }
  }

  function createQueueRow(item) {
    const wrapper = document.createElement('div');
    if (item.kind === 'heading') {
      wrapper.className = 'apple-now-playing-queue-heading';
      wrapper.textContent = item.label;
      wrapper.setAttribute('role', 'presentation');
      return wrapper;
    }
    wrapper.className = 'apple-now-playing-queue-item';
    wrapper.setAttribute('role', 'listitem');
    wrapper.setAttribute('aria-posinset', String(item.queueIndex + 1));
    wrapper.setAttribute('aria-setsize', String(snapshot.queue.length));
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'apple-now-playing-queue-row';
    button.dataset.action = 'queue-play';
    button.dataset.resourceId = item.resourceId;
    button.dataset.resourceType = item.resourceType;
    button.disabled = !snapshot.can.queuePlay || !item.playable;
    button.draggable = snapshot.can.queueEdit && item.editable;
    if (item.current) button.setAttribute('aria-current', 'true');
    const title = document.createElement('span'), artist = document.createElement('span');
    title.className = 'apple-now-playing-queue-song';
    artist.className = 'apple-now-playing-queue-artist';
    title.textContent = item.name;
    artist.textContent = item.artist;
    button.append(title, artist);
    wrapper.append(button);
    if (snapshot.can.queueEdit && item.editable) {
      const edit = menuButton(wrapper, 'queue-menu', '⋯', { resourceId: item.resourceId, resourceType: item.resourceType });
      edit.className = 'apple-now-playing-queue-edit';
      edit.setAttribute('aria-label', '管理队列项：' + item.name);
    }
    return wrapper;
  }

  function renderQueue() {
    if (!snapshot) return;
    const { queue, id, resourceId, queueSource } = snapshot;
    const current = (resourceId || id) + '|' + queueSource + '|' + snapshot.mode + '|' + snapshot.can.queueEdit;
    if (queue === queueReference && current === queueCurrent) return;
    const anchor = queueView.capture();
    if (!view.queueMenu.hidden) closePopups(view.queueMenu.contains(document.activeElement));
    const sameQueue = queue === queueReference;
    queueReference = queue;
    queueCurrent = current;
    text(view.queueSource, queueSource || '');
    view.queueSource.hidden = !queueSource;
    const ordered = queue.map((item, index) => ({ item, index })).filter(({ item }) => item)
      .sort((a, b) => (number(a.item.displayOrder) ?? a.index) - (number(b.item.displayOrder) ?? b.index));
    const identities = new Map();
    for (const { item } of ordered) {
      const key = item.resourceId + '|' + (item.resourceType || 'track');
      identities.set(key, (identities.get(key) || 0) + 1);
    }
    const currentIndex = ordered.findIndex(({ item }) => resourceId ? String(item.resourceId) === resourceId :
      String(item.trackId || item.track?.id || item.localTrack?.id) === id);
    queueRows = [];
    let previousSource = queueSource;
    ordered.forEach(({ item, index }, queueIndex) => {
      const track = item.track?.name ? item.track : item.localTrack?.origin || item.localTrack || item;
      const source = item.text || item.fromInfo?.sourceData?.name || '';
      if (source && source !== previousSource) {
        queueRows.push({ kind: 'heading', key: 'source-' + index, label: source });
        previousSource = source;
      }
      const identity = String(item.resourceId || '') + '|' + (item.resourceType || 'track');
      queueRows.push({
        kind: 'track', key: identities.get(identity) === 1 ? identity : identity + '|' + index,
        resourceId: String(item.resourceId || ''), resourceType: String(item.resourceType || 'track'),
        playable: !!item.resourceId && identities.get(identity) === 1,
        editable: !!item.resourceId && identities.get(identity) === 1 && ['track', 'localTrack', 'downloadTrack'].includes(item.resourceType || 'track'),
        name: track.name || '未知歌曲', artist: artists(track.artists || track.ar),
        queueIndex, current: queueIndex === currentIndex,
      });
    });
    if (!queueRows.length) queueRows.push({ kind: 'heading', key: 'empty', label: '播放队列为空' });
    queueView.set(queueRows, row => row.key);
    if (sameQueue) queueView.restore(anchor);
    else if (panelPositions.queue?.id === snapshot.id) queueView.restore(panelPositions.queue.anchor);
    else queueView.scrollTo(Math.max(0, queueRows.findIndex(row => row.current)), .35, false);
  }

  function showQueueMenu(id, type, x, y) {
    const rows = queueRows.filter(row => row.kind === 'track');
    const index = rows.findIndex(row => row.resourceId === id && row.resourceType === type);
    if (index < 0) return;
    closePopups();
    queueMenuTarget = { id, type };
    view.queueMenu.replaceChildren();
    const row = rows[index];
    const current = rows.findIndex(item => item.current);
    const editable = snapshot.can.queueEdit && row.editable;
    const next = menuButton(view.queueMenu, 'queue-next', '下一首播放', {}, !editable || !snapshot.can.queueNext || index === current || index === current + 1);
    if (!snapshot.can.queueNext) next.title = '当前播放模式由网易云决定续播，请在原生队列中操作';
    menuButton(view.queueMenu, 'queue-up', '上移', {}, !editable || index === 0);
    menuButton(view.queueMenu, 'queue-down', '下移', {}, !editable || index === rows.length - 1);
    menuButton(view.queueMenu, 'queue-remove', '从当前队列移除', {}, !editable);
    menuButton(view.queueMenu, 'host-queue', '在网易云管理', {}, !snapshot.can.queue);
    popupFocus = document.activeElement;
    popupAt(view.queueMenu, x, y);
    view.queueMenu.querySelector('button:not(:disabled)')?.focus();
  }

  function mergedMetadata() {
    const supplement = details?.id === snapshot?.songId ? details : {};
    const artists = Array.isArray(snapshot?.artistItems) && snapshot.artistItems.length ? snapshot.artistItems :
      supplement.artists || supplement.ar || [];
    const album = snapshot?.albumItem?.name ? snapshot.albumItem : supplement.album || supplement.al || {};
    return {
      artists, album,
      aliases: snapshot?.aliases?.length ? snapshot.aliases : supplement.alias || [],
      translated: snapshot?.translatedNames?.length ? snapshot.translatedNames : supplement.transNames || supplement.tns || [],
    };
  }

  function renderMetadata() {
    if (!snapshot) return;
    const data = mergedMetadata();
    const signature = JSON.stringify([snapshot.id, snapshot.name, snapshot.artist, snapshot.album, snapshot.quality, snapshot.can.navigate, data, preferences.alias]);
    if (signature === metadataSignature) return;
    metadataSignature = signature;
    text(view.title, snapshot.name || '暂无播放');
    view.title.title = snapshot.name;
    view.title.disabled = !snapshot.id || !snapshot.can.navigate;
    const aliases = (Array.isArray(data.aliases) ? data.aliases : []).filter(value => typeof value === 'string' && value !== snapshot.name);
    const translated = (Array.isArray(data.translated) ? data.translated : []).filter(value => typeof value === 'string' && value !== snapshot.name);
    const names = preferences.alias === 'alias' ? aliases.length ? aliases : translated :
      preferences.alias === 'translated' ? translated.length ? translated : aliases :
      preferences.alias === 'both' ? [...aliases, ...translated] : [];
    text(view.alias, [...new Set(names)].join(' / '));
    view.alias.hidden = !view.alias.textContent;
    view.alias.title = view.alias.textContent;
    view.sub.replaceChildren();
    if (Array.isArray(data.artists) && data.artists.length) {
      data.artists.forEach((artist, index) => {
        if (index) view.sub.append(' / ');
        const name = typeof artist === 'string' ? artist : artist.name;
        if (artist.id && snapshot.can.metadataNav) {
          menuButton(view.sub, 'detail-artist', name, { id: String(artist.id), trackId: snapshot.id });
        } else {
          view.sub.append(name || '');
        }
      });
    } else {
      view.sub.append(snapshot.artist);
    }
    if (data.album.name) {
      if (view.sub.textContent) view.sub.append(' — ');
      if (data.album.id && snapshot.can.metadataNav) {
        menuButton(view.sub, 'detail-album', data.album.name, { id: String(data.album.id), trackId: snapshot.id });
      } else {
        view.sub.append(data.album.name);
      }
    }
    view.sub.title = view.sub.textContent;
    text(view.quality, snapshot.quality || '');
    view.quality.hidden = !snapshot.quality;
  }

  async function loadDetails() {
    const id = snapshot?.songId;
    if (!activity || !id || detailTrackId === id) return;
    detailRequest?.abort();
    detailTrackId = id;
    details = undefined;
    const request = detailRequest = new AbortController();
    const hostId = snapshot.id;
    const base = window.APP_CONF?.domain || 'https://music.163.com';
    const url = new URL('/api/song/detail/', base);
    url.searchParams.set('ids', JSON.stringify([id]));
    const result = await requestLyrics(url, request, 5000, response => response.json());
    if (request.signal.aborted || detailRequest !== request || !activity || host.trackId() !== hostId) return;
    const song = result.data?.songs?.find(item => String(item.id) === id);
    details = song ? { ...song, id } : undefined;
    metadataSignature = '';
    detailRequest = undefined;
    dirty = true;
  }

  function showTrackMenu() {
    closePopups();
    view.menu.replaceChildren();
    const data = mergedMetadata();
    const id = snapshot?.id || '';
    const target = { trackId: id };
    menuButton(view.menu, 'detail-song', '在网易云查看歌曲详情', target, !id || !snapshot.can.navigate);
    for (const artist of data.artists) {
      if (artist?.id) menuButton(view.menu, 'detail-artist', '歌手：' + artist.name,
        { ...target, id: String(artist.id) }, !snapshot.can.metadataNav);
    }
    if (data.album.id) menuButton(view.menu, 'detail-album', '专辑：' + data.album.name,
      { ...target, id: String(data.album.id) }, !snapshot.can.metadataNav);
    menuButton(view.menu, 'add-playlist', '加入歌单', target, !snapshot.can.addPlaylist);
    menuButton(view.menu, 'copy-track', '复制歌曲名', target, !id);
    if (view.alias.textContent) menuButton(view.menu, 'copy-alias', '复制别名／译名', target);
    menuButton(view.menu, 'save-cover', '保存封面到本地', target, !window.AppleNowPlayingCoverSave || !/^https?:\/\//.test(snapshot?.cover || ''));
    if (!replacementEnabled()) menuButton(view.menu, 'cover', '打开网易云播放页', {}, !snapshot.can.cover);

    popupFocus = page.querySelector('[data-action="menu"]');
    const rect = popupFocus.getBoundingClientRect();
    popupAt(view.menu, rect.right - 220, rect.bottom + 8);
    popupFocus.setAttribute('aria-expanded', 'true');
    view.menu.querySelector('button:not(:disabled)')?.focus();
    setControlsHidden(false);
  }

  function queueVolume(target) {
    if (!activity || !Number.isFinite(target)) return;
    volumeQueued = clamp(target, 0, 1);
    pendingVolume = { target: volumeQueued, sent: false, until: performance.now() + 1200 };
    if (volumeTimer === undefined) {
      const delay = Math.max(0, 40 - (performance.now() - volumeSentAt));
      volumeTimer = setTimeout(flushVolume, delay);
    }
  }

  function flushVolume() {
    clearTimeout(volumeTimer);
    volumeTimer = undefined;
    if (!activity || volumeQueued === undefined) return;
    const target = volumeQueued;
    volumeQueued = undefined;
    const now = volumeSentAt = performance.now();
    pendingVolume = host.volume(target) ? { target, sent: true, confirmAfter: now + 160, until: now + 1200 } : undefined;
    dirty = true;
  }

  function finishVolumeGesture() {
    if (!activity) return;
    volumeGesture = undefined;
    view.volumeGroup.classList.remove('is-adjusting');
    flushVolume();
    if (pendingVolume) {
      pendingVolume.confirmAfter = performance.now() + 160;
      pendingVolume.until = performance.now() + 1200;
    }
  }

  function fillRange(range) {
    const fill = clamp(range.valueAsNumber / Number(range.max) * 100, 0, 100).toFixed(1) + '%';
    if (range.style.getPropertyValue('--fill') !== fill) range.style.setProperty('--fill', fill);
    const surface = range.closest('.apple-now-playing-volume-control');
    if (surface && surface.style.getPropertyValue('--fill') !== fill) surface.style.setProperty('--fill', fill);
  }

  function formatTime(seconds) {
    const value = Math.max(0, Math.floor(seconds));
    return Math.floor(value / 60) + ':' + String(value % 60).padStart(2, '0');
  }

  let nextTimelinePaint = 0, lastTimelinePosition = NaN;
  function renderTime(seconds, time) {
    syncLyrics(seconds, time);
    // Progress text and the track are coarse controls. Give every display
    // refresh to the lyrics without invalidating a range control at 160 Hz.
    if (clock?.running && !drag && !pendingSeek && time < nextTimelinePaint &&
        Math.abs(lastTimelinePosition - seconds) < .15) return;
    lastTimelinePosition = seconds;
    nextTimelinePaint = time + 1000 / 30;
    const duration = snapshot?.duration || 0;
    if ((!drag || drag.cancelled) && Math.abs(view.seek.valueAsNumber - seconds) >= .005) view.seek.value = seconds;
    fillRange(view.seek);
    text(view.elapsed, formatTime(seconds));
    text(view.remaining, '-' + formatTime(duration - seconds));
  }

  function seek(seconds, retry = false) {
    if (!activity || !snapshot?.can.seek || !Number.isFinite(seconds)) return;
    const current = host.read();
    if (current.id !== snapshot.id || !current.can.seek) return;
    const target = clamp(seconds, 0, current.duration);
    const now = performance.now();
    const previousOperation = pendingSeek;
    const operation = {
      id: current.id, target, from: current.position, receipt: current.audioReceipt, sentAt: now, until: now + 1400,
      retryOnResume: !retry && !current.playing && current.restored && Math.abs(current.position - target) > .035,
    };
    // The host can emit a position synchronously during command dispatch.
    pendingSeek = operation;
    if (!host.seek(operation.id, target)) { pendingSeek = previousOperation; return; }
    deferredSeek = seekAlignment = undefined;
    clearLyricScrollIndicator();
    browseUntil = 0;
    page.dataset.lyricBrowsing = 'false';
    lyricView.player.resetScroll();
    lyricView.lastTime = undefined;
    renderTime(target, now);
    dirty = true;
  }

  function settleSeek(time) {
    let settled = false;
    if (pendingSeek) {
      const operation = pendingSeek;
      const { position, speed, playing } = snapshot;
      const fresh = snapshot.hasAudioStream ? snapshot.audioReceipt > operation.receipt : position !== operation.from;
      const elapsed = Math.max(0, time - operation.sentAt) / 1000;
      const distance = position - operation.target;
      const movedToTarget = Math.abs(distance) <= .035 || Math.abs(position - operation.from) > .025;
      const landed = fresh && movedToTarget && !(operation.retryOnResume && snapshot.restored) &&
        distance >= -.5 && distance <= .5 + (playing ? elapsed * speed : 0);
      if (landed || time >= operation.until) {
        if (!landed && operation.retryOnResume) {
          deferredSeek = { id: operation.id, target: operation.target, position, resumeAt: 0 };
        }
        pendingSeek = undefined;
        // A target echo proves placement, but can precede decoded audio by
        // hundreds of milliseconds. Pin both clocks until the position moves.
        seekAlignment = { position, at: time, receipt: snapshot.audioReceipt, runningSince: null, outlier: undefined };
        settled = true;
      }
    }
    if (deferredSeek) {
      if (deferredSeek.id !== snapshot.id || (!snapshot.playing && snapshot.position !== deferredSeek.position)) {
        deferredSeek = undefined;
      } else if (snapshot.playing && !snapshot.loading) {
        deferredSeek.resumeAt ||= time + 240;
        if (time >= deferredSeek.resumeAt) seek(deferredSeek.target, true);
      }
    }
    return settled;
  }

  function clockPosition(time) {
    if (!clock) return 0;
    const step = clock.running ? clamp((time - clock.at) / 1000, 0, 1.1) * clock.rate : 0;
    return clamp(clock.position + step, 0, snapshot?.duration || 0);
  }

  function playbackTime(time) {
    if (drag && !drag.cancelled && drag.id === snapshot?.id && drag.changed) return drag.target;
    if (pendingSeek) return pendingSeek.target;
    return clock?.running ? Math.min(snapshot.duration, Math.max(displayed, clockPosition(time))) : clockPosition(time);
  }

  // During reacquisition a delayed packet can still describe the old side
  // of a seek. Corroborate large changes instead of applying one packet twice.
  function acceptsSeekSample(alignment, position, time, speed, paused) {
    const elapsed = clamp((time - alignment.at) / 1000, 0, 1.5);
    const delta = position - alignment.position;
    if (delta >= -.10 && delta <= .35 + elapsed * speed) {
      alignment.outlier = undefined;
      return true;
    }
    const last = alignment.outlier;
    if (!last) { alignment.outlier = { position, at: time }; return false; }
    const advance = position - last.position;
    if (advance > 0 && advance <= .35 + Math.max(0, time - last.at) / 1000 * speed) {
      alignment.outlier = undefined;
      return true;
    }
    // Also allow a genuine external jump that remains paused at a new value.
    if (paused && advance === 0 && time - last.at > 1400) {
      alignment.outlier = undefined;
      return true;
    }
    if (advance !== 0) alignment.outlier = { position, at: time };
    return false;
  }

  function updateClock(time, reset, nativeEvent = false) {
    const { position, speed, playing, loading } = snapshot;
    let running = playing && !loading;
    if (pendingSeek) return;
    if (seekAlignment) {
      const alignment = seekAlignment;
      if (alignment.runningSince !== null && time - alignment.runningSince > 1400 && !alignment.outlier) {
        seekAlignment = undefined;
      } else {
        if (!acceptsSeekSample(alignment, position, time, speed, !playing)) {
          if (!running && clock?.running) {
            alignment.runningSince = null;
            displayed = alignment.position;
            clock = { sample: displayed, position: displayed, at: time, speed, running: false, rate: speed };
          }
          return;
        }
        const freshAudio = snapshot.audioReceipt > 0 && snapshot.audioReceipt !== alignment.receipt;
        alignment.receipt = snapshot.audioReceipt;
        if (freshAudio && position === alignment.position && time - alignment.at > 160) {
          // A seek can move briefly and then buffer again. Repeated native
          // receipts at the identical position pin the clock; cached polls do not.
          alignment.runningSince = null;
        }
        if (alignment.runningSince === null) {
          running = running && position > alignment.position + .001;
          if (running) alignment.runningSince = time;
          // Awaiting motion or receiving its first sample: use the audio value
          // exactly, without carrying over pre-seek interpolation or effects.
          reset = true;
        } else if (!running) {
          alignment.runningSince = null;
          reset = true;
        }
        if (position !== alignment.position) {
          alignment.position = position;
          alignment.at = time;
        }
      }
    }
    // An unchanged cache read between native events is normal. A new event
    // confirming the same position after a stall overrides local interpolation.
    if (!seekAlignment && !reset && running && clock && position === clock.sample) {
      if (clock.audioHeld) return;
      if (clock.running && nativeEvent && time - clock.at > 160) {
        displayed = position;
        clock = { sample: position, position, at: time, speed, running: false, rate: speed, audioHeld: true };
        return;
      }
    }
    if (!reset && clock && !clock.audioHeld && position === clock.sample && speed === clock.speed && running === clock.running) return;
    const estimate = clockPosition(time);
    const discontinuity = !clock || position < clock.sample - .15 || Math.abs(position - estimate) > 1.25;
    const resumedSamples = clock && position !== clock.sample && time - clock.at >= 1100;
    if (reset || !running || !clock?.running || discontinuity || resumedSamples) {
      displayed = position;
      clock = { sample: position, position, at: time, speed, running, rate: speed };
      return;
    }
    // Ordinary late/early progress samples change the pace briefly. Restarting
    // from a slightly older sample makes a monotone fill stall until it catches up.
    const error = position - estimate;
    const correction = clamp(error / .48, -speed * .22, speed * .22);
    clock = { sample: position, position: estimate, at: time, speed, running, rate: speed + correction };
  }

  function clearSharedArt() {
    view.coverBox.classList.remove('shared-art');
    view.coverBox.style.removeProperty('background-image');
  }

  function updateCover(id, url) {
    const key = id + '|' + url;
    if (key === coverKey) return;
    coverKey = key;
    clearSharedArt();
    fluidRenderer.setCover(undefined);
    page.style.setProperty('--apple-now-playing-cover-image', url ? 'url(' + JSON.stringify(url) + ')' : 'none');
    // Replace the loading element so late events from a former URL can only
    // affect the detached image.
    const img = document.createElement('img');
    img.alt = '';
    img.hidden = true;
    img.addEventListener('load', () => {
      if (view.cover !== img || host.trackId() !== id) return;
      img.hidden = false;
      clearSharedArt();
    });
    view.cover.replaceWith(img);
    view.cover = img;
    if (url) img.src = url;
    updateBackdrop(id, url);
  }

  function paintSnapshot(previous, time) {
    const { playing, loading, liked, mode, can, duration, volume } = snapshot;
    renderMetadata();
    if (!previous || playing !== previous.playing) {
      view.play.innerHTML = icon(playing ? 'pause' : 'play');
      setButtonLabel(view.play, playing ? '暂停' : '播放');
      page.classList.toggle('is-playing', playing);
    }
    if (!previous || loading !== previous.loading) view.loading.hidden = !loading;
    if (!previous || liked !== previous.liked) {
      view.favorite.setAttribute('aria-pressed', String(liked));
      setButtonLabel(view.favorite, liked ? '取消喜欢' : '喜欢');
    }
    if (!previous || mode !== previous.mode || snapshot.modeIconMarkup !== previous.modeIconMarkup) {
      const [label, symbol] = modes[mode] || ['未知', 'order'];
      if (snapshot.modeIcon) {
        const glyph = snapshot.modeIcon.cloneNode(true);
        glyph.setAttribute('aria-hidden', 'true');
        glyph.setAttribute('focusable', 'false');
        view.mode.replaceChildren(glyph);
      } else view.mode.innerHTML = icon(symbol);
      view.mode.dataset.mode = mode;
      setButtonLabel(view.mode, '播放模式：' + label);
    }
    for (const [action, button] of view.hostButtons) {
      if (button.disabled !== !can[action]) button.disabled = !can[action];
    }
    if (!previous || previous.id !== snapshot.id || previous.can.seek !== can.seek) updateLyricTools();
    if (view.seek.disabled === can.seek) {
      view.seek.disabled = !can.seek;
      view.lyricHost.setAttribute('aria-disabled', String(!can.seek));
    }
    if (view.volume.disabled === can.volume) view.volume.disabled = !can.volume;
    if ((!drag || drag.cancelled) && Number(view.seek.max) !== (duration || 1)) view.seek.max = duration || 1;
    if (!volumeGesture && pendingVolume && pendingVolume.sent &&
        (time >= pendingVolume.until || (time >= pendingVolume.confirmAfter && Math.abs(volume - pendingVolume.target) < .004))) {
      pendingVolume = undefined;
    }
    if (!volumeGesture && !pendingVolume && volumeQueued === undefined && Math.abs(view.volume.valueAsNumber - volume) >= .005) {
      view.volume.value = volume;
    }
    fillRange(view.volume);
    if (tab === 'queue') renderQueue();
  }

  function refresh(time) {
    const previous = snapshot;
    snapshot = host.read();
    const trackChanged = !previous || previous.id !== snapshot.id;
    const sessionChanged = previous?.playId && snapshot.playId && previous.playId !== snapshot.playId;
    if (trackChanged || sessionChanged) {
      clearLyricScrollIndicator();
      hidePreview();
      closePopups();
      if (trackChanged) cancelCoverFlight();
      if (previous?.id !== snapshot.id) {
        detailRequest?.abort();
        detailRequest = undefined;
        if (details?.id !== snapshot.songId) {
          details = undefined;
          detailTrackId = undefined;
        }
        panelPositions = {};
        if (copyMode) toggleCopy(false);
      }
      if (drag && (sessionChanged || drag.id !== snapshot.id)) {
        drag.cancelled = true;
        view.seek.value = 0;
      }
      pendingSeek = deferredSeek = seekAlignment = undefined;
      ignoreFallbackPosition = previous && !snapshot.confirmedPosition ? previous.position : undefined;
    }
    if (ignoreFallbackPosition !== undefined) {
      if (snapshot.confirmedPosition || snapshot.position !== ignoreFallbackPosition) {
        ignoreFallbackPosition = undefined;
      } else {
        snapshot.position = 0;
      }
    }
    const seekSettled = settleSeek(time);
    updateClock(time, trackChanged || sessionChanged || seekSettled);
    updateCover(snapshot.id, snapshot.cover);
    paintSnapshot(previous, time);
    syncAudioAnalysis();
    if (!detailRequest && snapshot.songId && (preferences.alias !== 'hidden' || !snapshot.artistItems?.length || !snapshot.albumItem?.name)) loadDetails();
    if (snapshot.id !== lyricTrackId || restartLyrics) loadLyrics(snapshot.id);
  }

  function tick(time) {
    if (!activity) return;
    if (closing) {
      if (time >= sampleAt) {
        sampleAt = time + 32;
        if (host.trackId() !== snapshot?.id) refresh(time);
      }
      frame = requestAnimationFrame(tick);
      return;
    }
    if (dirty || time >= sampleAt) {
      dirty = false;
      sampleAt = time + (snapshot?.confirmedPosition ? 400 : 150);
      refresh(time);
    }
    const seconds = playbackTime(time);
    if ((!drag || drag.cancelled) && !pendingSeek) displayed = seconds;
    renderTime(seconds, time);
    if (previewView && !view.preview.children[1].hidden) previewView.tick(previewPosition.milliseconds, time, 0);
    paintAudioBackground(time);
    fluidRenderer.draw(time, audioPulse);
    frame = requestAnimationFrame(tick);
  }

  plugin.onLoad(() => {
    if (!document.getElementById('apple-now-playing-launch')) mount();
  });

  if (typeof plugin.onUnload === 'function') plugin.onUnload(dispose);

  plugin.onConfig(() => {
    const repositoryUrl = 'https://github.com/Cellophane233/AppleNowPlaying';
    const settings = document.createElement('div');
    settings.className = 'apple-now-playing-settings';
    settings.innerHTML = `
      <h2>AppleNowPlaying 设置</h2>
      <section class="anp-config-section">
        <h3>播放页</h3>
        <label class="anp-config-card"> 
          <span class="anp-config-icon">${icon('settings')}</span>
          <span class="anp-config-copy">
            <strong>替换原生播放页</strong>
            <small>点击网易云底栏的封面时打开 AppleNowPlaying。</small>
          </span>
          <input class="anp-config-switch" type="checkbox" role="switch">
        </label>
        <section class="anp-config-card">
          <span class="anp-config-icon">${icon('screen')}</span>
          <span class="anp-config-copy">
            <strong>独立入口</strong>
            <small>关闭替换后，也可以从这里打开沉浸播放页。</small>
          </span>
          <button type="button" class="anp-config-action">打开沉浸播放页</button>
        </section>
      </section>
      <section class="anp-config-section">
        <h3>歌词</h3>
        <section class="anp-config-card">
          <span class="anp-config-icon">${icon('lyrics')}</span>
          <div class="anp-config-copy"><strong>当前曲目歌词来源：</strong><output aria-live="polite"></output></div>
        </section>
        <section class="anp-config-card">
          <span class="anp-config-icon">${icon('music')}</span>
          <span class="anp-config-copy">
            <strong>AMLL 社区歌词库</strong>
            <small>目前部分歌曲的歌词资源仍存在缺失、时间轴不准确或动态效果不佳等问题，欢迎大家参与歌词库共建，一起完善歌词资源，提升播放体验！</small>
          </span>
          <a class="anp-config-action" href="https://github.com/amll-dev/amll-ttml-db" target="_blank" rel="noopener noreferrer">查看歌词库</a>
        </section>
      </section>
      <section class="anp-config-section">
        <h3>项目</h3>
        <div class="anp-config-card">
          <span class="anp-config-icon">${icon('more')}</span>
          <span class="anp-config-copy"><strong>AppleNowPlaying</strong></span>
          <a class="anp-config-action" href="${repositoryUrl}" target="_blank" rel="noopener noreferrer">源代码</a>
          <a class="anp-config-action" href="${repositoryUrl}/issues" target="_blank" rel="noopener noreferrer">问题反馈</a>
        </div>
      </section>`;
    const toggle = settings.querySelector('input');
    toggle.checked = takeover;
    toggle.addEventListener('change', () => {
      takeover = toggle.checked;
      localStorage.setItem(takeoverKey, takeover ? 'on' : 'off');
      updateLauncher();
      dirty = true;
      metadataSignature = '';
    });
    settingsSource = settings.querySelector('output');
    refreshSettingsSource();
    const entry = settings.querySelector('button');
    entry.addEventListener('click', () => open(entry));
    for (const reference of settings.querySelectorAll('a')) {
      const url = reference.href;
      reference.addEventListener('click', async event => {
        if (typeof window.betterncm?.app?.exec !== 'function') {
          if (host.openExternal(url)) event.preventDefault();
          return;
        }
        event.preventDefault();
        try {
          await window.betterncm.app.exec(url);
        } catch (error) {
          if (!host.openExternal(url)) console.warn('[AppleNowPlaying] 无法打开外部链接', error);
        }
      });
    }
    return settings;
  });
})();
