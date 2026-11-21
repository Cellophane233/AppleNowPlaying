/* The pinned extSpotify renderer owns the keyframes, masks and row layout.
 * Only the transport clock and the playback-page interactions belong here. */
window.AppleNowPlayingExtView = class {
  constructor(container, seekLine, openMenu) {
    this.player = new ExtSpotify.DomLyricPlayer();
    this.root = this.player.getElement();
    this.needsLayout = true;
    this.root.setAttribute('aria-label', '同步歌词');
    container.replaceChildren(this.root);
    this.nodes = new Map();
    this.animationEnds = new WeakMap();
    this.enabledLines = new Map();
    this.releases = new Map();
    this.player.addEventListener('line-click', event => seekLine(event.lineIndex, event.line.getElement()));
    this.player.addEventListener('line-contextmenu', event => {
      event.preventDefault();
      openMenu(event.line.getElement(), event.clientX, event.clientY);
    });
  }

  configure(prefs, reduced) {
    const p = this.player;
    p.setEnableBlur(!reduced && prefs.lyricBlur);
    if (p.getEnableScale() !== (!reduced && prefs.lyricScale)) p.setEnableScale(!reduced && prefs.lyricScale);
    this.reduced = reduced;
    this.lift = prefs.lyricLift && !reduced;
    p.setAlignPosition(prefs.alignment === 'upper' ? .28 : .46);
    // The default uses the fork's spring and stagger settings verbatim.
    p.setIsSeeking(prefs.scrollStyle === 'spring');
    if (this.scrollStyle !== prefs.scrollStyle) {
      this.scrollStyle = prefs.scrollStyle;
      p.setLinePosYSpringParams({ damping: prefs.scrollStyle === 'spring' ? 12 : 15,
        stiffness: prefs.scrollStyle === 'stagger' ? 72 : 90 });
    }
  }

  set(rows, prefs, endTime, ms) {
    this.released = false;
    const { lines, rowIndices } = window.AppleNowPlayingExtLyrics.convert(rows, prefs, endTime);
    this.player.resetScroll();
    this.ensureLayout();
    this.player.setLyricLines(lines, ms);
    this.nodes.clear();
    this.enabledLines.clear();
    this.releases.clear();
    this.focusNode = undefined;
    this.currentNode = undefined;
    this.player.currentLyricLineObjects.forEach((line, index) => {
      const node = line.getElement();
      const sourceIndex = rowIndices[index];
      node.dataset.action = 'lyric';
      node.dataset.index = sourceIndex;
      node.dataset.time = lines[index].startTime;
      node.setAttribute('role', 'button');
      node.tabIndex = -1;
      if (!this.nodes.has(sourceIndex)) this.nodes.set(sourceIndex, node);
    });
    this.lastTime = undefined;
    this.setFocus(this.nodes.keys().next().value);
  }

  setFocus(index, focus = false) {
    const target = this.nodes.get(index);
    if (!target) return;
    if (this.focusNode !== target) {
      if (this.focusNode) this.focusNode.tabIndex = -1;
      this.focusNode = target;
      target.tabIndex = 0;
    }
    if (focus) target.focus({ preventScroll: true });
  }

  // Retain the original Animation objects, including additive emphasis. Anchor
  // newly created/revealed effects and real discontinuities to the audio clock.
  syncEffect(animation, elapsed, rate, force) {
    let end = this.animationEnds.get(animation);
    if (end === undefined) {
      end = animation.effect.getComputedTiming().endTime;
      this.animationEnds.set(animation, end);
      force = true;
    }
    const target = Math.max(0, Math.min(end, elapsed));
    const playing = rate > 0 && elapsed < end;
    if (playing && animation.playbackRate !== rate) animation.playbackRate = rate;
    if (force || Math.abs((animation.currentTime ?? -Infinity) - target) > (playing ? 45 : .5)) {
      animation.currentTime = target;
    }
    if (playing && animation.playState !== 'running') animation.play();
    if (!playing && animation.playState === 'running') animation.pause();
  }

  syncReleases(ms, rate, discontinuity) {
    // Disabled rows fall out of the transport loop while their effects wind down.
    for (const [line, index] of this.enabledLines) {
      if (line.isEnabled) continue;
      this.enabledLines.delete(line);
      for (const word of line.animatedWords) {
        for (const effect of word.elementAnimations) {
          if (effect.id === 'anp-tail-glow') {
            const end = effect.effect.getComputedTiming().endTime;
            this.releases.set(effect, { line, index, word, end });
          } else if (effect.playbackRate < 0) {
            this.releases.set(effect, { line, at: ms, from: Number(effect.currentTime) || 0 });
          }
        }
      }
    }
    for (const [effect, release] of this.releases) {
      if (release.line.isEnabled || !release.line.hasEffects) {
        this.releases.delete(effect);
        continue;
      }
      if (effect.id === 'anp-tail-glow') {
        const { line, index, word, end } = release;
        if (this.reduced || discontinuity) {
          this.syncEffect(effect, end, 0, true);
          this.releases.delete(effect);
          continue;
        }
        const { startTime, tailHandoffTime } = line.getLine();
        const parkedTime = Math.min(ms - startTime, word.tailGlowRestTime);
        if (release.at === undefined && (index < this.player.visualAlignIndex || tailHandoffTime === undefined)) {
          release.at = ms;
          const wordStart = word.startTime - startTime;
          const wordEnd = word.endTime - startTime;
          const reachedPeak = parkedTime >= wordStart + (wordEnd - wordStart) * .35;
          release.from = reachedPeak ? Math.max(parkedTime, wordEnd) : parkedTime;
          release.to = reachedPeak ? end : wordStart;
        }
        const progress = release.at === undefined ? 0 :
          Math.min(1, (ms - release.at) / (end - word.tailGlowRestTime));
        const elapsed = release.at === undefined ? parkedTime :
          release.from + (release.to - release.from) * progress;
        this.syncEffect(effect, elapsed, 0, progress === 1);
        if (progress === 1) this.releases.delete(effect);
        continue;
      }
      const target = this.lift && !discontinuity ? Math.max(0, release.from - (ms - release.at)) : 0;
      if (release.line.steadyVocalLift && effect.id === 'float-word') {
        this.syncEffect(effect, target, 0, discontinuity);
        if (!target) this.releases.delete(effect);
      } else if (!target || !rate) {
        if (effect.playState === 'running') effect.pause();
        effect.currentTime = target;
        if (!target) this.releases.delete(effect);
      } else {
        if (effect.playbackRate !== -rate) effect.playbackRate = -rate;
        if (Math.abs(effect.currentTime - target) > 45) effect.currentTime = target;
        if (effect.playState !== 'running') effect.play();
      }
    }
  }

  ensureLayout() {
    if (!this.needsLayout) return true;
    if (!this.root.clientWidth || !this.root.clientHeight) return false;
    this.player.onResize();
    this.needsLayout = false;
    return true;
  }

  tick(timeMs, now, rate, seek = false) {
    const p = this.player;
    if (!this.ensureLayout()) return;
    const ms = Math.max(0, Math.round(timeMs));
    const delta = this.lastFrame === undefined ? 0 : Math.max(0, now - this.lastFrame);
    const discontinuity = seek || this.lastTime === undefined ||
      Math.abs(ms - this.lastTime - delta * (this.rate || 0)) > 180;
    const transportChanged = this.rate !== rate;
    if (transportChanged) rate ? p.resume() : p.pause();
    this.rate = rate;
    if (ms !== this.lastTime || discontinuity) p.setCurrentTime(ms, discontinuity);
    if (this.reduced && this.hotIndex !== p.scrollToIndex) p.calcLayout(true);
    this.hotIndex = p.scrollToIndex;
    p.update(Math.min(delta, 64));
    this.lastFrame = now;
    this.lastTime = ms;
    this.syncReleases(ms, rate, discontinuity);
    for (const index of p.bufferedLines) {
      const line = p.currentLyricLineObjects[index];
      this.enabledLines.set(line, index);
      const elapsed = ms - line.getLine().startTime;
      const hot = p.hotLines.has(index);
      line.syncReadingGroups(ms);
      for (const word of line.animatedWords) {
        for (const effect of word.elementAnimations) {
          if (effect.id === 'anp-tail-glow') {
            const target = this.reduced ? 0 : Math.min(elapsed, word.tailGlowRestTime);
            this.syncEffect(effect, target, 0, discontinuity);
          } else if (line.steadyVocalLift && effect.id === 'float-word') {
            // Keep one clock driving the lift while overlapping voices share the screen.
            const held = rate > 0 && !discontinuity ? Math.max(elapsed, effect.currentTime ?? 0) : elapsed;
            this.syncEffect(effect, this.lift ? held : 0, 0, discontinuity || transportChanged);
          } else if (hot) {
            this.syncEffect(effect, this.lift ? elapsed : 0, this.lift ? rate : 0, discontinuity || transportChanged);
          }
        }
        if (hot) {
          for (const effect of word.maskAnimations) this.syncEffect(effect, elapsed, rate, discontinuity || transportChanged);
        }
      }
    }
    const current = p.currentLyricLineObjects[p.scrollToIndex]?.getElement();
    if (this.currentNode !== current) {
      this.currentNode?.removeAttribute('aria-current');
      current?.setAttribute('aria-current', 'true');
      this.currentNode = current;
    }
  }

  suspend() {
    this.needsLayout = true;
    this.player.pause();
    for (const effect of this.releases.keys()) effect.pause();
    this.rate = this.lastTime = this.lastFrame = undefined;
  }

  reveal(index) {
    const node = this.nodes.get(index);
    if (!node) return;
    // Offscreen rows are detached by the component; use its measured geometry.
    const p = this.player;
    const line = p.currentLyricLineObjects.find(item => item.getElement() === node);
    if (!line) return;
    p.revealLine(line);
    this.setFocus(index, true);
  }

  releaseRows() {
    this.suspend();
    this.player.setLyricLines([], 0);
    this.nodes.clear();
    this.releases.clear();
    this.enabledLines.clear();
    this.focusNode = this.currentNode = undefined;
    this.released = true;
  }

  dispose() {
    this.player.dispose();
    this.nodes.clear();
  }
};

