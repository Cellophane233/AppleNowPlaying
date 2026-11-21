"use strict";
var ExtSpotify = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/bezier-easing/src/index.js
  var require_src = __commonJS({
    "node_modules/bezier-easing/src/index.js"(exports, module) {
      var NEWTON_ITERATIONS = 4;
      var NEWTON_MIN_SLOPE = 1e-3;
      var SUBDIVISION_PRECISION = 1e-7;
      var SUBDIVISION_MAX_ITERATIONS = 10;
      var kSplineTableSize = 11;
      var kSampleStepSize = 1 / (kSplineTableSize - 1);
      var float32ArraySupported = typeof Float32Array === "function";
      function A(aA1, aA2) {
        return 1 - 3 * aA2 + 3 * aA1;
      }
      function B(aA1, aA2) {
        return 3 * aA2 - 6 * aA1;
      }
      function C(aA1) {
        return 3 * aA1;
      }
      function calcBezier(aT, aA1, aA2) {
        return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
      }
      function getSlope(aT, aA1, aA2) {
        return 3 * A(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1);
      }
      function binarySubdivide(aX, aA, aB, mX1, mX2) {
        var currentX, currentT, i = 0;
        do {
          currentT = aA + (aB - aA) / 2;
          currentX = calcBezier(currentT, mX1, mX2) - aX;
          if (currentX > 0) {
            aB = currentT;
          } else {
            aA = currentT;
          }
        } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
        return currentT;
      }
      function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
        for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
          var currentSlope = getSlope(aGuessT, mX1, mX2);
          if (currentSlope === 0) {
            return aGuessT;
          }
          var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
          aGuessT -= currentX / currentSlope;
        }
        return aGuessT;
      }
      function LinearEasing(x) {
        return x;
      }
      module.exports = function bezier2(mX1, mY1, mX2, mY2) {
        if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
          throw new Error("bezier x values must be in [0, 1] range");
        }
        if (mX1 === mY1 && mX2 === mY2) {
          return LinearEasing;
        }
        var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
        for (var i = 0; i < kSplineTableSize; ++i) {
          sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
        }
        function getTForX(aX) {
          var intervalStart = 0;
          var currentSample = 1;
          var lastSample = kSplineTableSize - 1;
          for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
            intervalStart += kSampleStepSize;
          }
          --currentSample;
          var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
          var guessForT = intervalStart + dist * kSampleStepSize;
          var initialSlope = getSlope(guessForT, mX1, mX2);
          if (initialSlope >= NEWTON_MIN_SLOPE) {
            return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
          } else if (initialSlope === 0) {
            return guessForT;
          } else {
            return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
          }
        }
        return function BezierEasing(x) {
          if (x === 0) {
            return 0;
          }
          if (x === 1) {
            return 1;
          }
          return calcBezier(getTForX(x), mY1, mY2);
        };
      };
    }
  });

  // src/lyric-player/dom/index.ts
  var dom_exports = {};
  __export(dom_exports, {
    DomLyricPlayer: () => DomLyricPlayer,
    LyricLineMouseEvent: () => LyricLineMouseEvent
  });

  // src/styles/lyric-player.module.css
  var lyric_player_default = {
    lyricLine: "lyric_player_lyricLine",
    lyricBgLine: "lyric_player_lyricBgLine",
    active: "lyric_player_active",
    lyricDuetLine: "lyric_player_lyricDuetLine",
    lyricMainLine: "lyric_player_lyricMainLine",
    emphasizeWrapper: "lyric_player_emphasizeWrapper",
    emphasize: "lyric_player_emphasize",
    lyricSubLine: "lyric_player_lyricSubLine",
    disableSpring: "lyric_player_disableSpring",
    interludeDots: "lyric_player_interludeDots",
    enabled: "lyric_player_enabled",
    duet: "lyric_player_duet",
    tmpDisableTransition: "lyric_player_tmpDisableTransition"
  };

  // src/lyric-player/dom/browse-column.ts
  function firstIndex(length, matches) {
    let low = 0, high = length;
    while (low < high) {
      const mid = low + high >>> 1;
      if (matches(mid)) high = mid;
      else low = mid + 1;
    }
    return low;
  }
  var BrowseColumn = class {
    constructor(layer, dots, offset) {
      this.layer = layer;
      this.dots = dots;
      this.dotsTop = dots.top + offset;
      this.layoutOffset = offset;
      layer.classList.add("anp-browsing-column");
    }
    rows = [];
    all = [];
    mounted = /* @__PURE__ */ new Map();
    first = -1;
    end = -1;
    offset = NaN;
    layoutOffset = 0;
    origin = 0;
    anchor(y) {
      if (!this.rows.length || !Number.isFinite(this.offset)) return;
      const index = firstIndex(this.rows.length, (i) => this.rows[i].top + this.rows[i].height > y + this.offset);
      const row = this.rows[Math.min(index, this.rows.length - 1)];
      return { line: row.line, y: row.top - this.offset };
    }
    get presentedOffset() {
      return Number.isFinite(this.offset) ? this.offset : this.layoutOffset;
    }
    setRows(all, offset, dotsTop) {
      this.dotsTop = dotsTop ?? this.dotsTop + offset - this.presentedOffset;
      if (!this.all.length) {
        for (const row of all) {
          if (row.line.getElement().parentElement === this.layer) this.mounted.set(row.line, null);
        }
      }
      if (Number.isFinite(this.offset)) {
        this.origin += offset - this.offset;
        this.offset = offset;
      }
      this.layoutOffset = offset;
      this.all = all;
      this.rows = all.filter((row) => row.height > 0);
      this.first = this.end = -1;
    }
    screenTop(index) {
      return this.all[index].top - (Number.isFinite(this.offset) ? this.offset : 0);
    }
    move(offset, height) {
      if (this.first >= 0 && offset === this.offset) return;
      const rows = this.rows;
      const first = firstIndex(rows.length, (i) => rows[i].top + rows[i].height > offset - 1);
      const end = firstIndex(rows.length, (i) => rows[i].top >= offset + height + 1);
      if (first !== this.first || end !== this.end) {
        const nearby = rows.slice(first, end);
        if (!Number.isFinite(this.offset) || !nearby.some((row) => this.mounted.has(row.line))) {
          this.origin = rows[first]?.top ?? 0;
        }
        // Hold already built neighbours across small scroll reversals.
        if (first > 0 && this.mounted.has(rows[first - 1].line)) nearby.unshift(rows[first - 1]);
        if (end < rows.length && this.mounted.has(rows[end].line)) nearby.push(rows[end]);
        const retained = new Set(nearby.map((row) => row.line));
        for (const line of this.mounted.keys()) {
          if (retained.has(line)) continue;
          line.leaveBrowseWindow();
          this.mounted.delete(line);
        }
        for (const row of nearby) {
          const y = row.top - this.origin, previous = this.mounted.get(row.line);
          if (previous && Math.abs(previous.y - y) < 1e-3 && previous.scale === row.scale && previous.opacity === row.opacity) continue;
          row.line.placeInBrowse(y, row.scale, row.opacity);
          this.mounted.set(row.line, { y, scale: row.scale, opacity: row.opacity });
        }
        this.first = first;
        this.end = end;
      }
      this.offset = offset;
      // Rows and dots share the layer's rebased origin while browsing.
      this.dots.setTransform(0, this.dotsTop - this.origin);
      this.layer.style.transform = `translate3d(0,${this.origin - offset}px,0)`;
    }
    updateReadingState(time) {
      for (const line of this.mounted.keys()) line.updateReadingState(time);
    }
    finish() {
      if (Number.isFinite(this.offset)) {
        for (const row of this.all) row.line.lineTransforms.posY.setPosition(row.top - this.offset);
        for (const line of this.mounted.keys()) line.show();
        this.dots.setTransform(0, this.dotsTop - this.offset);
      }
      this.layer.style.removeProperty("transform");
      this.layer.classList.remove("anp-browsing-column");
    }
  };

  // node_modules/@ungap/structured-clone/esm/types.js
  var VOID = -1;
  var PRIMITIVE = 0;
  var ARRAY = 1;
  var OBJECT = 2;
  var DATE = 3;
  var REGEXP = 4;
  var MAP = 5;
  var SET = 6;
  var ERROR = 7;
  var BIGINT = 8;

  // node_modules/@ungap/structured-clone/esm/deserialize.js
  var env = typeof self === "object" ? self : globalThis;
  var deserializer = ($, _) => {
    const as = (out, index) => {
      $.set(index, out);
      return out;
    };
    const unpair = (index) => {
      if ($.has(index))
        return $.get(index);
      const [type, value] = _[index];
      switch (type) {
        case PRIMITIVE:
        case VOID:
          return as(value, index);
        case ARRAY: {
          const arr = as([], index);
          for (const index2 of value)
            arr.push(unpair(index2));
          return arr;
        }
        case OBJECT: {
          const object = as({}, index);
          for (const [key, index2] of value)
            object[unpair(key)] = unpair(index2);
          return object;
        }
        case DATE:
          return as(new Date(value), index);
        case REGEXP: {
          const { source, flags } = value;
          return as(new RegExp(source, flags), index);
        }
        case MAP: {
          const map = as(/* @__PURE__ */ new Map(), index);
          for (const [key, index2] of value)
            map.set(unpair(key), unpair(index2));
          return map;
        }
        case SET: {
          const set = as(/* @__PURE__ */ new Set(), index);
          for (const index2 of value)
            set.add(unpair(index2));
          return set;
        }
        case ERROR: {
          const { name, message } = value;
          return as(new env[name](message), index);
        }
        case BIGINT:
          return as(BigInt(value), index);
        case "BigInt":
          return as(Object(BigInt(value)), index);
      }
      return as(new env[type](value), index);
    };
    return unpair;
  };
  var deserialize = (serialized) => deserializer(/* @__PURE__ */ new Map(), serialized)(0);

  // node_modules/@ungap/structured-clone/esm/serialize.js
  var EMPTY = "";
  var { toString } = {};
  var { keys } = Object;
  var typeOf = (value) => {
    const type = typeof value;
    if (type !== "object" || !value)
      return [PRIMITIVE, type];
    const asString = toString.call(value).slice(8, -1);
    switch (asString) {
      case "Array":
        return [ARRAY, EMPTY];
      case "Object":
        return [OBJECT, EMPTY];
      case "Date":
        return [DATE, EMPTY];
      case "RegExp":
        return [REGEXP, EMPTY];
      case "Map":
        return [MAP, EMPTY];
      case "Set":
        return [SET, EMPTY];
    }
    if (asString.includes("Array"))
      return [ARRAY, asString];
    if (asString.includes("Error"))
      return [ERROR, asString];
    return [OBJECT, asString];
  };
  var shouldSkip = ([TYPE, type]) => TYPE === PRIMITIVE && (type === "function" || type === "symbol");
  var serializer = (strict, json, $, _) => {
    const as = (out, value) => {
      const index = _.push(out) - 1;
      $.set(value, index);
      return index;
    };
    const pair = (value) => {
      if ($.has(value))
        return $.get(value);
      let [TYPE, type] = typeOf(value);
      switch (TYPE) {
        case PRIMITIVE: {
          let entry = value;
          switch (type) {
            case "bigint":
              TYPE = BIGINT;
              entry = value.toString();
              break;
            case "function":
            case "symbol":
              if (strict)
                throw new TypeError("unable to serialize " + type);
              entry = null;
              break;
            case "undefined":
              return as([VOID], value);
          }
          return as([TYPE, entry], value);
        }
        case ARRAY: {
          if (type)
            return as([type, [...value]], value);
          const arr = [];
          const index = as([TYPE, arr], value);
          for (const entry of value)
            arr.push(pair(entry));
          return index;
        }
        case OBJECT: {
          if (type) {
            switch (type) {
              case "BigInt":
                return as([type, value.toString()], value);
              case "Boolean":
              case "Number":
              case "String":
                return as([type, value.valueOf()], value);
            }
          }
          if (json && "toJSON" in value)
            return pair(value.toJSON());
          const entries = [];
          const index = as([TYPE, entries], value);
          for (const key of keys(value)) {
            if (strict || !shouldSkip(typeOf(value[key])))
              entries.push([pair(key), pair(value[key])]);
          }
          return index;
        }
        case DATE:
          return as([TYPE, value.toISOString()], value);
        case REGEXP: {
          const { source, flags } = value;
          return as([TYPE, { source, flags }], value);
        }
        case MAP: {
          const entries = [];
          const index = as([TYPE, entries], value);
          for (const [key, entry] of value) {
            if (strict || !(shouldSkip(typeOf(key)) || shouldSkip(typeOf(entry))))
              entries.push([pair(key), pair(entry)]);
          }
          return index;
        }
        case SET: {
          const entries = [];
          const index = as([TYPE, entries], value);
          for (const entry of value) {
            if (strict || !shouldSkip(typeOf(entry)))
              entries.push(pair(entry));
          }
          return index;
        }
      }
      const { message } = value;
      return as([TYPE, { name: type, message }], value);
    };
    return pair;
  };
  var serialize = (value, { json, lossy } = {}) => {
    const _ = [];
    return serializer(!(json || lossy), !!json, /* @__PURE__ */ new Map(), _)(value), _;
  };

  // node_modules/@ungap/structured-clone/esm/index.js
  var esm_default = typeof structuredClone === "function" ? (
    /* c8 ignore start */
    (any, options) => options && ("json" in options || "lossy" in options) ? deserialize(serialize(any, options)) : structuredClone(any)
  ) : (any, options) => deserialize(serialize(any, options));

  // src/utils/eq-set.ts
  var eqSet = (xs, ys) => xs.size === ys.size && [...xs].every((x) => ys.has(x));

  // src/utils/derivative.ts
  function derivative(f) {
    const h = 1e-3;
    return (x) => (f(x + h) - f(x - h)) / (2 * h);
  }
  function getVelocity(f) {
    return derivative(f);
  }

  // src/utils/spring.ts
  var zeroVelocity = () => 0;
  var Spring = class {
    currentPosition = 0;
    targetPosition = 0;
    currentTime = 0;
    params = {};
    resting = true;
    holdPosition = () => this.targetPosition;
    currentSolver = this.holdPosition;
    getV = zeroVelocity;
    getV2 = zeroVelocity;
    queueParams;
    queuePosition;
    constructor(currentPosition = 0) {
      this.targetPosition = currentPosition;
      this.currentPosition = this.targetPosition;
    }
    resetSolver() {
      const curV = this.getV(this.currentTime);
      this.resting = false;
      this.currentTime = 0;
      this.currentSolver = solveSpring(
        this.currentPosition,
        curV,
        this.targetPosition,
        0,
        this.params
      );
      this.getV = getVelocity(this.currentSolver);
      this.getV2 = getVelocity(this.getV);
    }
    get idle() {
      return this.resting && !this.queueParams && !this.queuePosition;
    }
    arrived() {
      return Math.abs(this.targetPosition - this.currentPosition) < 0.01 && this.getV(this.currentTime) < 0.01 && this.getV2(this.currentTime) < 0.01 && this.queueParams === void 0 && this.queuePosition === void 0;
    }
    setPosition(targetPosition) {
      this.targetPosition = targetPosition;
      this.currentPosition = targetPosition;
      this.currentSolver = this.holdPosition;
      this.getV = this.getV2 = zeroVelocity;
      this.resting = true;
    }
    update(delta = 0) {
      if (this.resting && !this.queueParams && !this.queuePosition) return;
      if (!this.resting) {
        this.currentTime += delta;
        this.currentPosition = this.currentSolver(this.currentTime);
      }
      if (this.queueParams) {
        this.queueParams.time -= delta;
        if (this.queueParams.time <= 0) {
          const { time, ...params } = this.queueParams;
          this.queueParams = void 0;
          this.applyParams(params);
        }
      }
      if (this.queuePosition) {
        this.queuePosition.time -= delta;
        if (this.queuePosition.time <= 0) {
          this.setTargetPosition(this.queuePosition.position);
        }
      }
      if (!this.resting && this.arrived()) {
        this.setPosition(this.targetPosition);
      }
    }
    updateParams(params, delay = 0) {
      if (delay > 0) {
        this.queueParams = {
          ...params,
          time: delay
        };
      } else {
        this.queuePosition = void 0;
        this.applyParams(params);
      }
    }
    applyParams(params) {
      this.params = { ...this.params, ...params };
      if (!this.resting) this.resetSolver();
    }
    setTargetPosition(targetPosition, delay = 0) {
      if (delay > 0) {
        this.queuePosition = {
          ...this.queuePosition ?? {},
          position: targetPosition,
          time: delay
        };
      } else {
        this.queuePosition = void 0;
        if (this.resting && this.currentPosition === targetPosition) return;
        this.targetPosition = targetPosition;
        this.resetSolver();
      }
    }
    getCurrentPosition() {
      return this.currentPosition;
    }
  };
  function solveSpring(from, velocity, to, delay = 0, params) {
    const soft = params?.soft ?? false;
    const stiffness = params?.stiffness ?? 100;
    const damping = params?.damping ?? 10;
    const mass = params?.mass ?? 1;
    const delta = to - from;
    if (soft || 1 <= damping / (2 * Math.sqrt(stiffness * mass))) {
      const angular_frequency = -Math.sqrt(stiffness / mass);
      const leftover2 = -angular_frequency * delta - velocity;
      return (t) => {
        t -= delay;
        if (t < 0) return from;
        return to - (delta + t * leftover2) * Math.E ** (t * angular_frequency);
      };
    }
    const damping_frequency = Math.sqrt(4 * mass * stiffness - damping ** 2);
    const leftover = (damping * delta - 2 * mass * velocity) / damping_frequency;
    const dfm = 0.5 * damping_frequency / mass;
    const dm = -(0.5 * damping) / mass;
    return (t) => {
      t -= delay;
      if (t < 0) return from;
      return to - (Math.cos(t * dfm) * delta + Math.sin(t * dfm) * leftover) * Math.E ** (t * dm);
    };
  }

  // src/lyric-player/bottom-line.ts
  var BottomLineEl = class {
    constructor(lyricPlayer) {
      this.lyricPlayer = lyricPlayer;
      this.element.setAttribute("class", lyric_player_default.lyricLine);
      this.rebuildStyle();
    }
    element = document.createElement("div");
    left = 0;
    top = 0;
    delay = 0;
    // 由 LyricPlayer 来设置
    lineSize = [0, 0];
    lineTransforms = {
      posX: new Spring(0),
      posY: new Spring(0)
    };
    measureSize() {
      const size = [
        this.element.clientWidth,
        this.element.clientHeight
      ];
      return size;
    }
    lastStyle = "";
    show() {
      this.rebuildStyle();
    }
    hide() {
      this.rebuildStyle();
    }
    rebuildStyle() {
      let style = `transform:translate(${this.lineTransforms.posX.getCurrentPosition().toFixed(2)}px,${this.lineTransforms.posY.getCurrentPosition().toFixed(2)}px);`;
      if (!this.lyricPlayer.getEnableSpring() && this.isInSight) {
        style += `transition-delay:${this.delay}ms;`;
      }
      if (style !== this.lastStyle) {
        this.lastStyle = style;
        this.element.setAttribute("style", style);
      }
    }
    getElement() {
      return this.element;
    }
    setTransform(left = this.left, top = this.top, force = false, delay = 0) {
      this.left = left;
      this.top = top;
      this.delay = delay * 1e3 | 0;
      if (force || !this.lyricPlayer.getEnableSpring()) {
        if (force) this.element.classList.add(lyric_player_default.tmpDisableTransition);
        this.lineTransforms.posX.setPosition(left);
        this.lineTransforms.posY.setPosition(top);
        if (!this.lyricPlayer.getEnableSpring()) this.show();
        else this.rebuildStyle();
        if (force)
          requestAnimationFrame(() => {
            this.element.classList.remove(lyric_player_default.tmpDisableTransition);
          });
      } else {
        this.lineTransforms.posX.setTargetPosition(left, delay);
        this.lineTransforms.posY.setTargetPosition(top, delay);
      }
    }
    update(delta = 0) {
      if (!this.lyricPlayer.getEnableSpring()) return;
      this.lineTransforms.posX.update(delta);
      this.lineTransforms.posY.update(delta);
      if (this.isInSight) {
        this.show();
      } else {
        this.hide();
      }
    }
    get isInSight() {
      const l = this.lineTransforms.posX.getCurrentPosition();
      const t = this.lineTransforms.posY.getCurrentPosition();
      const r = l + this.lineSize[0];
      const b = t + this.lineSize[1];
      const pr = this.lyricPlayer.size[0];
      const pb = this.lyricPlayer.size[1];
      return !(l > pr || t > pb || r < 0 || b < 0);
    }
    dispose() {
      this.element.remove();
    }
  };

  // src/lyric-player/dom/interlude-dots.ts
  function easeInOutBack(x) {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return x < 0.5 ? (2 * x) ** 2 * ((c2 + 1) * 2 * x - c2) / 2 : ((2 * x - 2) ** 2 * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
  }
  function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - 2 ** (-10 * x);
  }
  var clamp = (min, cur, max) => Math.max(min, Math.min(cur, max));
  var InterludeDots = class {
    element = document.createElement("div");
    dot0 = document.createElement("span");
    dot1 = document.createElement("span");
    dot2 = document.createElement("span");
    left = 0;
    top = 0;
    playing = true;
    scale = 1;
    lastStyle = "";
    currentInterlude;
    currentTime = 0;
    targetBreatheDuration = 1500;
    constructor() {
      this.element.className = lyric_player_default.interludeDots;
      this.element.appendChild(this.dot0);
      this.element.appendChild(this.dot1);
      this.element.appendChild(this.dot2);
    }
    getElement() {
      return this.element;
    }
    setTransform(left = this.left, top = this.top) {
      if (left === this.left && top === this.top) return;
      this.left = left;
      this.top = top;
      this.applyTransform();
    }
    applyTransform() {
      const style = `translate(${this.left.toFixed(2)}px, ${this.top.toFixed(2)}px) scale(${this.scale})`;
      if (this.lastStyle === style) return;
      this.element.style.transform = style;
      this.lastStyle = style;
    }
    setInterlude(interlude) {
      this.currentInterlude = interlude;
      this.currentTime = interlude?.[0] ?? 0;
      if (interlude) {
        this.element.classList.add(lyric_player_default.enabled);
      } else {
        this.element.classList.remove(lyric_player_default.enabled);
      }
    }
    pause() {
      this.playing = false;
      this.element.classList.remove(lyric_player_default.playing);
    }
    resume() {
      this.playing = true;
      this.element.classList.add(lyric_player_default.playing);
    }
    update(delta = 0, mediaTime) {
      if (mediaTime === void 0 && !this.playing) return;
      this.currentTime = mediaTime ?? this.currentTime + delta;
      if (this.currentInterlude) {
        const interludeDuration = this.currentInterlude[1] - this.currentInterlude[0];
        const currentDuration = this.currentTime - this.currentInterlude[0];
        if (currentDuration <= interludeDuration) {
          const breatheDuration = interludeDuration / Math.ceil(interludeDuration / this.targetBreatheDuration);
          let scale = 1;
          let globalOpacity = 1;
          scale *= Math.sin(1.5 * Math.PI - currentDuration / breatheDuration * 2) / 20 + 1;
          if (currentDuration < 2e3) {
            scale *= easeOutExpo(currentDuration / 2e3);
          }
          if (currentDuration < 500) {
            globalOpacity = 0;
          } else if (currentDuration < 1e3) {
            globalOpacity *= (currentDuration - 500) / 500;
          }
          if (interludeDuration - currentDuration < 750) {
            scale *= 1 - easeInOutBack(
              (750 - (interludeDuration - currentDuration)) / 750 / 2
            );
          }
          if (interludeDuration - currentDuration < 375) {
            globalOpacity *= clamp(
              0,
              (interludeDuration - currentDuration) / 375,
              1
            );
          }
          const dotsDuration = Math.max(0, interludeDuration - 750);
          this.scale = Math.max(0, scale) * 0.7;
          const dot0Opacity = clamp(
            0.25,
            currentDuration * 3 / dotsDuration * 0.75,
            1
          );
          const dot1Opacity = clamp(
            0.25,
            (currentDuration - dotsDuration / 3) * 3 / dotsDuration * 0.75,
            1
          );
          const dot2Opacity = clamp(
            0.25,
            (currentDuration - dotsDuration / 3 * 2) * 3 / dotsDuration * 0.75,
            1
          );
          this.dot0.style.opacity = `${clamp(
            0,
            Math.max(0, globalOpacity * dot0Opacity),
            1
          )}`;
          this.dot1.style.opacity = `${clamp(
            0,
            Math.max(0, globalOpacity * dot1Opacity),
            1
          )}`;
          this.dot2.style.opacity = `${clamp(
            0,
            Math.max(0, globalOpacity * dot2Opacity),
            1
          )}`;
        } else {
          this.scale = 0;
          this.dot0.style.opacity = "0";
          this.dot1.style.opacity = "0";
          this.dot2.style.opacity = "0";
        }
        this.applyTransform();
      }
    }
    dispose() {
      this.element.remove();
    }
  };

  // src/lyric-player/base.ts
  var LyricPlayerBase = class extends EventTarget {
    element = document.createElement("div");
    currentTime = 0;
    lyricLinesSize = /* @__PURE__ */ new WeakMap();
    currentLyricLines = [];
    publicSnapshot;
    // protected currentLyricLineObjects: LyricLineBase[] = [];
    processedLines = [];
    lyricLinesIndexes = /* @__PURE__ */ new WeakMap();
    hotLines = /* @__PURE__ */ new Set();
    bufferedLines = /* @__PURE__ */ new Set();
    isNonDynamic = false;
    scrollToIndex = 0;
    visualAlignIndex = 0;
    disableSpring = false;
    interludeDotsSize = [0, 0];
    interludeDots = new InterludeDots();
    bottomLine = new BottomLineEl(this);
    enableBlur = true;
    enableScale = true;
    hidePassedLines = false;
    scrollBoundary = [0, 0];
    currentLyricLineObjects = [];
    isSeeking = false;
    lastCurrentTime = 0;
    alignAnchor = "center";
    alignPosition = 0.35;
    scrollOffset = 0;
    size = [0, 0];
    allowScroll = true;
    isPageVisible = true;
    posXSpringParams = {
      mass: 1,
      damping: 10,
      stiffness: 100
    };
    posYSpringParams = {
      mass: 0.9,
      damping: 15,
      stiffness: 90
    };
    scaleSpringParams = {
      mass: 2,
      damping: 25,
      stiffness: 100
    };
    scaleForBGSpringParams = {
      mass: 1,
      damping: 20,
      stiffness: 50
    };
    onPageShow = () => {
      this.isPageVisible = true;
      this.setCurrentTime(this.currentTime, true);
    };
    onPageHide = () => {
      this.isPageVisible = false;
    };
    scrolledHandler = 0;
    isScrolled = false;
    resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (!width || !height) return;
      this.onResize();
    });
    wordFadeWidth = 0.5;
    constructor() {
      super();
      this.resizeObserver.observe(this.element);
      this.element.classList.add(lyric_player_default.lyricPlayer);
      this.element.appendChild(this.interludeDots.getElement());
      this.element.appendChild(this.bottomLine.getElement());
      window.addEventListener("pageshow", this.onPageShow);
      window.addEventListener("pagehide", this.onPageHide);
      let startScrollY = 0;
      let direction = "none";
      let startTouchPosY = 0;
      let startScrollTime = 0;
      let scrollSpeed = 0;
      let scrollId = Symbol("amll-scroll");
      let lastMoveY = 0;
      let lastDragTime = 0;
      this.element.addEventListener("touchstart", (evt) => {
        if (this.beginBrowse()) {
          evt.preventDefault();
          startScrollY = this.scrollOffset;
          startTouchPosY = evt.touches[0].screenY;
          lastMoveY = startTouchPosY;
          startScrollTime = Date.now();
          scrollSpeed = 0;
        }
      });
      this.element.addEventListener("touchmove", (evt) => {
        if (this.beginBrowse()) {
          evt.preventDefault();
          const touchScreenY = evt.touches[0].screenY;
          const delta = touchScreenY - startTouchPosY;
          const lastDelta = touchScreenY - lastMoveY;
          const targetDirection = lastDelta > 0 ? "down" : lastDelta < 0 ? "up" : "none";
          if (direction !== targetDirection) {
            direction = targetDirection;
            startScrollY = this.scrollOffset;
            startTouchPosY = touchScreenY;
            startScrollTime = Date.now();
          } else {
            this.scrollOffset = startScrollY - delta;
          }
          lastMoveY = touchScreenY;
          lastDragTime = Date.now();
          this.limitScrollOffset();
          this.queueBrowseLayout(true);
        }
      });
      this.element.addEventListener("touchend", (evt) => {
        if (this.beginBrowse()) {
          evt.preventDefault();
          startTouchPosY = 0;
          const curTime = Date.now();
          if (curTime - lastDragTime > 100) return this.endScrollHandler();
          const scrollDuration = curTime - startScrollTime;
          scrollSpeed = (this.scrollOffset - startScrollY) / scrollDuration * 1e3;
          let lt = 0;
          const curScrollId = Symbol("amll-scroll");
          scrollId = curScrollId;
          const onScrollFrame = (dt) => {
            lt ||= dt;
            if (scrollId === curScrollId && this.beginBrowse()) {
              this.scrollOffset += scrollSpeed * (dt - lt) / 1e3;
              scrollSpeed *= 0.99;
              this.limitScrollOffset();
              this.queueBrowseLayout(true);
              if (Math.abs(scrollSpeed) > 1 && !this.scrollBoundary.includes(this.scrollOffset)) {
                requestAnimationFrame(onScrollFrame);
              }
              this.endScrollHandler();
              lt = dt;
            }
          };
          requestAnimationFrame(onScrollFrame);
          this.endScrollHandler();
        }
      });
      this.element.addEventListener("wheel", (evt) => {
        if (this.beginBrowse()) {
          if (evt.deltaMode === evt.DOM_DELTA_PIXEL) {
            this.scrollOffset += evt.deltaY;
            this.limitScrollOffset();
            this.queueBrowseLayout(true);
          } else {
            this.scrollOffset += evt.deltaY * 50;
            this.limitScrollOffset();
            this.queueBrowseLayout(false);
          }
          this.endScrollHandler();
        }
      });
    }
    browseLayout;
    get isManualScrolling() {
      return this.isScrolled;
    }
    queueBrowseLayout(force = true) {
      this.browseLayout = force || !!this.browseLayout;
    }
    beginBrowse() {
      const allowed = this.allowScroll;
      if (allowed) {
        this.isScrolled = true;
        clearTimeout(this.scrolledHandler);
        this.scrolledHandler = setTimeout(() => {
          this.resetScroll();
          this.calcLayout();
        }, 5e3);
      }
      return allowed;
    }
    endScrollHandler() {
    }
    limitScrollOffset() {
      this.scrollOffset = Math.max(
        Math.min(this.scrollBoundary[1], this.scrollOffset),
        this.scrollBoundary[0]
      );
    }
    /**
     * 设置文字动画的渐变宽度，单位以歌词行的主文字字体大小的倍数为单位，默认为 0.5，即一个全角字符的一半宽度
     *
     * 如果要模拟 Apple Music for Android 的效果，可以设置为 1
     *
     * 如果要模拟 Apple Music for iPad 的效果，可以设置为 0.5
     *
     * 如果想要近乎禁用渐变效果，可以设置成非常接近 0 的小数（例如 `0.0001` ），但是**不可以为 0**
     *
     * @param value 需要设置的渐变宽度，单位以歌词行的主文字字体大小的倍数为单位，默认为 0.5
     */
    setWordFadeWidth(value = 0.5) {
      this.wordFadeWidth = Math.max(1e-4, value);
    }
    /**
     * 是否启用歌词行缩放效果，默认启用
     *
     * 如果启用，非选中的歌词行会轻微缩小以凸显当前播放歌词行效果
     *
     * 此效果对性能影响微乎其微，推荐启用
     * @param enable 是否启用歌词行缩放效果
     */
    setEnableScale(enable = true) {
      this.enableScale = enable;
      this.calcLayout();
    }
    /**
     * 获取当前是否启用了歌词行缩放效果
     * @returns 是否启用歌词行缩放效果
     */
    getEnableScale() {
      return this.enableScale;
    }
    /**
     * 获取当前文字动画的渐变宽度，单位以歌词行的主文字字体大小的倍数为单位
     * @returns 当前文字动画的渐变宽度，单位以歌词行的主文字字体大小的倍数为单位
     */
    getWordFadeWidth() {
      return this.wordFadeWidth;
    }
    setIsSeeking(isSeeking) {
      this.isSeeking = isSeeking;
    }
    /**
     * 设置是否隐藏已经播放过的歌词行，默认不隐藏
     * @param hide 是否隐藏已经播放过的歌词行，默认不隐藏
     */
    setHidePassedLines(hide) {
      this.hidePassedLines = hide;
      this.calcLayout();
    }
    /**
     * 设置是否启用歌词行的模糊效果
     * @param enable 是否启用
     */
    setEnableBlur(enable) {
      if (this.enableBlur === enable) return;
      this.enableBlur = enable;
      this.calcLayout();
    }
    /**
     * 设置目标歌词行的对齐方式，默认为 `center`
     *
     * - 设置成 `top` 的话将会向目标歌词行的顶部对齐
     * - 设置成 `bottom` 的话将会向目标歌词行的底部对齐
     * - 设置成 `center` 的话将会向目标歌词行的垂直中心对齐
     * @param alignAnchor 歌词行对齐方式，详情见函数说明
     */
    setAlignAnchor(alignAnchor) {
      this.alignAnchor = alignAnchor;
    }
    /**
     * 设置默认的歌词行对齐位置，相对于整个歌词播放组件的大小位置，默认为 `0.5`
     * @param alignPosition 一个 `[0.0-1.0]` 之间的任意数字，代表组件高度由上到下的比例位置
     */
    setAlignPosition(alignPosition) {
      this.alignPosition = alignPosition;
    }
    /**
     * 设置是否使用物理弹簧算法实现歌词动画效果，默认启用
     *
     * 如果启用，则会通过弹簧算法实时处理歌词位置，但是需要性能足够强劲的电脑方可流畅运行
     *
     * 如果不启用，则会回退到基于 `transition` 的过渡效果，对低性能的机器比较友好，但是效果会比较单一
     */
    setEnableSpring(enable = true) {
      this.disableSpring = !enable;
      if (enable) {
        this.element.classList.remove(lyric_player_default.disableSpring);
      } else {
        this.element.classList.add(lyric_player_default.disableSpring);
      }
      this.calcLayout(true);
    }
    /**
     * 获取当前是否启用了物理弹簧
     * @returns 是否启用物理弹簧
     */
    getEnableSpring() {
      return !this.disableSpring;
    }
    /**
     * 获取当前播放时间里是否处于间奏区间
     * 如果是则会返回单位为毫秒的始末时间
     * 否则返回 undefined
     *
     * 这个只允许内部调用
     * @returns [开始时间,结束时间,大概处于的歌词行ID,下一句是否为对唱歌词] 或 undefined 如果不处于间奏区间
     */
    getCurrentInterlude() {
      if (this.bufferedLines.size > 0) return void 0;
      const time = this.currentTime;
      const nextIndex = this.processedLines.findIndex((line) => !line.isBG && line.startTime > time);
      if (nextIndex < 0) return void 0;
      const next = this.processedLines[nextIndex];
      if (nextIndex === 0) {
        const end = Math.max(0, next.startTime - 250);
        if (time < end) return [0, end, -2, next.isDuet];
        return void 0;
      }
      let start = 0;
      for (let i = 0; i < nextIndex; i++) {
        start = Math.max(start, this.processedLines[i].endTime);
      }
      if (start <= time) return [start, next.startTime, nextIndex - 1, next.isDuet];
      return void 0;
    }
    /**
     * 设置当前播放歌词，要注意传入后这个数组内的信息不得修改，否则会发生错误
     * @param lines 歌词数组
     * @param initialTime 初始时间，默认为 0
     */
    setLyricLines(lines, initialTime = 0) {
      for (const line of lines) {
        for (const word of line.words) {
          word.word = word.word.replace(/\s+/g, " ");
        }
      }
      this.lastCurrentTime = initialTime;
      this.currentTime = initialTime;
      this.currentLyricLines = esm_default(lines);
      this.processedLines = this.currentLyricLines.map((line) => ({ ...line }));
      this.publicSnapshot = void 0;
      this.isNonDynamic = true;
      for (const line of this.processedLines) {
        if (line.words.length > 1 || line.hasWordTiming || line.romanWords?.length) {
          this.isNonDynamic = false;
          break;
        }
      }
      this.processedLines.forEach((line, i, lines2) => {
        const nextLine = lines2[i + 1];
        const lastWord = line.words[line.words.length - 1];
        if (lastWord) {
          if (nextLine) {
            if (nextLine.startTime > line.endTime) {
              line.endTime = Math.min(line.endTime + 1500, nextLine.startTime);
            }
          } else {
            line.endTime = line.endTime + 1500;
          }
        }
      });
      this.processedLines.forEach((line, i, lines2) => {
        if (line.isBG) return;
        const nextLine = lines2[i + 1];
        if (nextLine?.isBG) {
          nextLine.startTime = Math.min(nextLine.startTime, line.startTime);
        }
      });
      let nextLead;
      for (let i = this.processedLines.length - 1; i >= 0; i--) {
        const line = this.processedLines[i];
        if (nextLead) {
          line.tailHandoffTime = nextLead.startTime - line.endTime < 4000
            ? Math.max(line.endTime, nextLead.startTime)
            : line.endTime;
        }
        if (!line.isBG) nextLead = line;
      }
      this.interludeDots.setInterlude(void 0);
      this.hotLines.clear();
      this.bufferedLines.clear();
      this.resetScroll();
    }
    /**
     * 设置当前播放进度，单位为毫秒且**必须是整数**，此时将会更新内部的歌词进度信息
     * 内部会根据调用间隔和播放进度自动决定如何滚动和显示歌词，所以这个的调用频率越快越准确越好
     *
     * 调用完成后，可以每帧调用 `update` 函数来执行歌词动画效果
     * @param time 当前播放进度，单位为毫秒
     */
    setCurrentTime(time, isSeek = false) {
      this.currentTime = time;
      const removedHotIds = /* @__PURE__ */ new Set();
      const removedIds = /* @__PURE__ */ new Set();
      const addedIds = /* @__PURE__ */ new Set();
      for (const lastHotId of this.hotLines) {
        const line = this.processedLines[lastHotId];
        if (line) {
          if (line.isBG) continue;
          const nextLine = this.processedLines[lastHotId + 1];
          if (nextLine?.isBG) {
            const nextMainLine = this.processedLines[lastHotId + 2];
            const startTime = Math.min(line.startTime, nextLine?.startTime);
            const endTime = Math.min(
              Math.max(line.endTime, nextMainLine?.startTime ?? Number.MAX_VALUE),
              Math.max(line.endTime, nextLine?.endTime)
            );
            if (startTime > time || endTime <= time) {
              this.hotLines.delete(lastHotId);
              removedHotIds.add(lastHotId);
              this.hotLines.delete(lastHotId + 1);
              removedHotIds.add(lastHotId + 1);
              if (isSeek) {
                this.currentLyricLineObjects[lastHotId]?.disable();
                this.currentLyricLineObjects[lastHotId + 1]?.disable();
              }
            }
          } else if (line.startTime > time || line.endTime <= time) {
            this.hotLines.delete(lastHotId);
            removedHotIds.add(lastHotId);
            if (isSeek) this.currentLyricLineObjects[lastHotId]?.disable();
          }
        } else {
          this.hotLines.delete(lastHotId);
          removedHotIds.add(lastHotId);
          if (isSeek) this.currentLyricLineObjects[lastHotId]?.disable();
        }
      }
      this.currentLyricLineObjects.forEach((lineObj, id, arr) => {
        const line = lineObj.getLine();
        if (!line.isBG && line.startTime <= time && line.endTime > time) {
          if (!this.hotLines.has(id)) {
            this.hotLines.add(id);
            addedIds.add(id);
            if (isSeek) lineObj.enable();
            if (arr[id + 1]?.getLine()?.isBG) {
              this.hotLines.add(id + 1);
              addedIds.add(id + 1);
              if (isSeek) arr[id + 1].enable();
            }
          }
        }
      });
      for (const v of this.bufferedLines) {
        if (!this.hotLines.has(v)) {
          removedIds.add(v);
          if (isSeek) this.currentLyricLineObjects[v]?.disable();
        }
      }
      if (isSeek) {
        if (this.hotLines.size > 0) {
          this.scrollToIndex = Math.min(...this.hotLines);
        } else {
          const next = this.processedLines.findIndex((line) => !line.isBG && line.startTime >= time);
          const lastMain = this.processedLines.map((line) => !line.isBG).lastIndexOf(true);
          this.scrollToIndex = next >= 0 ? next : Math.max(0, lastMain);
        }
        this.bufferedLines.clear();
        for (const v of this.hotLines) {
          this.bufferedLines.add(v);
        }
        this.calcLayout(true);
      } else if (removedIds.size > 0 || addedIds.size > 0) {
        if (removedIds.size === 0 && addedIds.size > 0) {
          for (const v of addedIds) {
            this.bufferedLines.add(v);
            this.currentLyricLineObjects[v]?.enable();
          }
          this.scrollToIndex = Math.min(...this.bufferedLines);
          this.calcLayout();
        } else if (addedIds.size === 0 && removedIds.size > 0) {
          if (eqSet(removedIds, this.bufferedLines)) {
            for (const v of this.bufferedLines) {
              if (!this.hotLines.has(v)) {
                this.bufferedLines.delete(v);
                this.currentLyricLineObjects[v]?.disable();
              }
            }
            this.calcLayout();
          }
        } else {
          for (const v of addedIds) {
            this.bufferedLines.add(v);
            this.currentLyricLineObjects[v]?.enable();
          }
          for (const v of removedIds) {
            this.bufferedLines.delete(v);
            this.currentLyricLineObjects[v]?.disable();
          }
          if (this.bufferedLines.size > 0)
            this.scrollToIndex = Math.min(...this.bufferedLines);
          this.calcLayout();
        }
      }
      this.lastCurrentTime = time;
    }
    /**
     * 重新布局定位歌词行的位置，调用完成后再逐帧调用 `update`
     * 函数即可让歌词通过动画移动到目标位置。
     *
     * 函数有一个 `force` 参数，用于指定是否强制修改布局，也就是不经过动画直接调整元素位置和大小。
     *
     * 此函数还有一个 `reflow` 参数，用于指定是否需要重新计算布局
     *
     * 因为计算布局必定会导致浏览器重排布局，所以会大幅度影响流畅度和性能，故请只在以下情况下将其​设置为 true：
     *
     * 1. 歌词页面大小发生改变时（这个组件会自行处理）
     * 2. 加载了新的歌词时（不论前后歌词是否完全一样）
     * 3. 用户自行跳转了歌曲播放位置（不论距离远近）
     *
     * @param force 是否不经过动画直接修改布局定位
     * @param reflow 是否进行重新布局（重新计算每行歌词大小）
     */
    measureLineSizes() {
      for (const line of this.currentLyricLineObjects) this.lyricLinesSize.set(line, line.measureSize());
    }
    calcLayout(force, reflow, capture) {
      if (this.size[0] <= 0 || this.size[1] <= 0) return;
      if (reflow) {
        this.measureLineSizes();
        this.interludeDotsSize[0] = this.interludeDots.getElement().clientWidth;
        this.interludeDotsSize[1] = this.interludeDots.getElement().clientHeight;
        this.bottomLine.lineSize = this.bottomLine.measureSize();
      }
      const interlude = this.getCurrentInterlude();
      const offset = capture ? 0 : this.scrollOffset;
      let curPos = -offset;
      let targetAlignIndex = this.scrollToIndex;
      let interludeDuration = 0;
      if (interlude) {
        interludeDuration = interlude[1] - interlude[0];
        if (interludeDuration >= 4e3) {
          const nextLine = this.currentLyricLineObjects[interlude[2] + 1];
          if (nextLine) {
            targetAlignIndex = interlude[2] + 1;
          }
        }
      }
      if (interludeDuration < 4e3) {
        this.interludeDots.setInterlude(void 0);
      }
      this.visualAlignIndex = targetAlignIndex;
      const scrollOffset = this.currentLyricLineObjects.slice(0, targetAlignIndex).reduce(
        (acc, el) => acc + (el.getLine().isBG ? 0 : this.lyricLinesSize.get(el)?.[1] ?? 0),
        0
      );
      this.scrollBoundary[0] = -scrollOffset;
      curPos -= scrollOffset;
      curPos += this.size[1] * this.alignPosition;
      const curLine = this.currentLyricLineObjects[targetAlignIndex];
      if (curLine) {
        const lineHeight = this.lyricLinesSize.get(curLine)?.[1] ?? 0;
        switch (this.alignAnchor) {
          case "bottom":
            curPos -= lineHeight;
            break;
          case "center":
            curPos -= lineHeight / 2;
            break;
          case "top":
            break;
        }
      }
      const latestIndex = Math.max(...this.bufferedLines);
      let delay = 0;
      let baseDelay = 0.05;
      let dotsTop;
      this.currentLyricLineObjects.forEach((lineObj, i) => {
        const hasBuffered = this.bufferedLines.has(i);
        const isActive = hasBuffered || i >= this.scrollToIndex && i < latestIndex;
        const line = lineObj.getLine();
        const plainOriginal = this.isNonDynamic || line.staticOriginal;
        const left = 0;
        if (interludeDuration >= 4e3 && i === (interlude[2] === -2 ? 0 : interlude[2] + 1)) {
          dotsTop = curPos + 10;
          if (!capture) this.interludeDots.setTransform(0, dotsTop);
          this.interludeDots.setInterlude([interlude[0], interlude[1]]);
          curPos += this.interludeDotsSize[1] + 40;
        }
        let targetOpacity;
        if (this.hidePassedLines) {
          if (i < (interlude ? interlude[2] + 1 : this.scrollToIndex)) {
            targetOpacity = 0;
          } else if (hasBuffered) {
            targetOpacity = 0.85;
          } else {
            targetOpacity = plainOriginal ? 0.2 : 1;
          }
        } else {
          if (hasBuffered) {
            targetOpacity = 0.85;
          } else {
            targetOpacity = plainOriginal ? 0.2 : 1;
          }
        }
        let blurLevel = 0;
        if (this.enableBlur) {
          if (isActive) {
            blurLevel = 0;
          } else {
            blurLevel = 1;
            if (i < this.scrollToIndex) {
              blurLevel += Math.abs(this.scrollToIndex - i) + 1;
            } else {
              blurLevel += Math.abs(
                i - Math.max(this.scrollToIndex, latestIndex)
              );
            }
          }
        }
        const SCALE_ASPECT = this.enableScale ? 97 : 100;
        const scale = isActive ? 100 : line.isBG ? 75 : SCALE_ASPECT;
        const height = !line.isBG || isActive ? this.lyricLinesSize.get(lineObj)?.[1] ?? 0 : 0;
        if (capture) capture(i, curPos, height, scale, targetOpacity);
        else lineObj.setTransform(
          left,
          curPos,
          scale,
          targetOpacity,
          window.innerWidth <= 1024 ? blurLevel * 0.8 : blurLevel,
          force,
          delay
        );
        curPos += height;
        if (curPos >= 0 && !this.isSeeking) {
          if (!line.isBG) delay += baseDelay;
          if (i >= this.scrollToIndex) baseDelay /= 1.05;
        }
      });
      this.scrollBoundary[1] = curPos + offset - this.size[1] / 2;
      this.bottomLine.setTransform(0, curPos, force, delay);
      return dotsTop;
    }
    /**
     * 设置所有歌词行在横坐标上的弹簧属性，包括重量、弹力和阻力。
     *
     * @param params 需要设置的弹簧属性，提供的属性将会覆盖原来的属性，未提供的属性将会保持原样
     */
    setLinePosXSpringParams(params = {}) {
      this.posXSpringParams = {
        ...this.posXSpringParams,
        ...params
      };
      this.bottomLine.lineTransforms.posX.updateParams(this.posXSpringParams);
      for (const line of this.currentLyricLineObjects) {
        line.lineTransforms.posX.updateParams(this.posXSpringParams);
      }
    }
    /**
     * 设置所有歌词行在​纵坐标上的弹簧属性，包括重量、弹力和阻力。
     *
     * @param params 需要设置的弹簧属性，提供的属性将会覆盖原来的属性，未提供的属性将会保持原样
     */
    setLinePosYSpringParams(params = {}) {
      this.posYSpringParams = {
        ...this.posYSpringParams,
        ...params
      };
      this.bottomLine.lineTransforms.posY.updateParams(this.posYSpringParams);
      for (const line of this.currentLyricLineObjects) {
        line.lineTransforms.posY.updateParams(this.posYSpringParams);
      }
    }
    /**
     * 设置所有歌词行在​缩放大小上的弹簧属性，包括重量、弹力和阻力。
     *
     * @param params 需要设置的弹簧属性，提供的属性将会覆盖原来的属性，未提供的属性将会保持原样
     */
    setLineScaleSpringParams(params = {}) {
      this.scaleSpringParams = {
        ...this.scaleSpringParams,
        ...params
      };
      this.scaleForBGSpringParams = {
        ...this.scaleForBGSpringParams,
        ...params
      };
      for (const lineObj of this.currentLyricLineObjects) {
        if (lineObj.getLine().isBG) {
          lineObj.lineTransforms.scale.updateParams(this.scaleForBGSpringParams);
        } else {
          lineObj.lineTransforms.scale.updateParams(this.scaleSpringParams);
        }
      }
    }
    /**
     * 暂停部分效果演出，目前会暂停播放间奏点的动画
     */
    pause() {
      this.interludeDots.pause();
    }
    /**
     * 恢复部分效果演出，目前会恢复播放间奏点的动画
     */
    resume() {
      this.interludeDots.resume();
    }
    /**
     * 更新动画，这个函数应该被逐帧调用或者在以下情况下调用一次：
     *
     * 1. 刚刚调用完设置歌词函数的时候
     * @param delta 距离上一次被调用到现在的时长，单位为毫秒（可为浮点数）
     */
    update(delta = 0) {
      if (this.browseLayout !== void 0) {
        const force = this.browseLayout;
        this.browseLayout = void 0;
        this.calcLayout(force);
      }
      this.bottomLine.update(delta / 1e3);
      this.interludeDots.update(0, this.currentTime);
    }
    onResize() {
    }
    /**
     * 获取一个特殊的底栏元素，默认是空白的，可以往内部添加任意元素
     *
     * 这个元素始终在歌词的底部，可以用于显示歌曲创作者等信息
     *
     * 但是请勿删除该元素，只能在内部存放元素
     *
     * @returns 一个元素，可以往内部添加任意元素
     */
    getBottomLineElement() {
      return this.bottomLine.getElement();
    }
    /**
     * 重置用户滚动状态
     *
     * 请在用户完成滚动点击跳转歌词时调用本事件再调用 `calcLayout` 以正确滚动到目标位置
     */
    resetScroll() {
      this.browseLayout = void 0;
      this.isScrolled = false;
      this.scrollOffset = 0;
      clearTimeout(this.scrolledHandler);
      this.scrolledHandler = 0;
    }
    /**
     * 获取当前歌词数组
     *
     * 一般和最后调用 `setLyricLines` 给予的参数一样
     * @returns 当前歌词数组
     */
    getLyricLines() {
      return this.publicSnapshot ??= esm_default(this.currentLyricLines);
    }
    /**
     * 获取当前歌词的播放位置
     *
     * 一般和最后调用 `setCurrentTime` 给予的参数一样
     * @returns 当前播放位置
     */
    getCurrentTime() {
      return this.currentTime;
    }
    getElement() {
      return this.element;
    }
    dispose() {
      this.allowScroll = false;
      this.resetScroll();
      this.resizeObserver.disconnect();
      this.element.remove();
      window.removeEventListener("pageshow", this.onPageShow);
      window.removeEventListener("pagehide", this.onPageHide);
    }
  };
  var LyricLineBase = class extends EventTarget {
    left = 0;
    top = 0;
    scale = 1;
    blur = 0;
    opacity = 1;
    delay = 0;
    lineTransforms = {
      posX: new Spring(0),
      posY: new Spring(0),
      scale: new Spring(100)
    };
    setTransform(left = this.left, top = this.top, scale = this.scale, opacity = this.opacity, blur = this.blur, _force = false, delay = 0) {
      this.left = left;
      this.top = top;
      this.scale = scale;
      this.opacity = opacity;
      this.blur = blur;
      this.delay = delay;
    }
    /**
     * 判定歌词是否可以应用强调辉光效果
     *
     * 果子在对辉光效果的解释是一种强调（emphasized）效果
     *
     * 条件是一个单词时长大于等于 1s 且长度小于等于 7
     *
     * @param word 单词
     * @returns 是否可以应用强调辉光效果
     */
    static shouldEmphasize(word) {
      return word.endTime - word.startTime >= 1e3 && word.word.trim().length <= 7 && word.word.trim().length > 1;
    }
    dispose() {
    }
  };

  // src/lyric-player/dom/lyric-line.ts
  var import_bezier_easing = __toESM(require_src());

  // src/utils/lyric-split-words.ts
  var CJKEXP = /^[\p{Unified_Ideograph}\u0800-\u9FFC]+$/u;
  function chunkAndSplitLyricWords(words) {
    const resplitedWords = [];
    for (const w of words) {
      const realLength = w.word.replace(/\s/g, "").length;
      const splited = w.word.split(" ").filter((v) => v.trim().length > 0);
      if (splited.length > 1) {
        if (w.word.startsWith(" ")) {
          resplitedWords.push({
            word: " ",
            startTime: 0,
            endTime: 0
          });
        }
        let charPos = 0;
        for (const s of splited) {
          const word = {
            word: s,
            startTime: w.startTime + charPos / realLength * (w.endTime - w.startTime),
            endTime: w.startTime + (charPos + s.length) / realLength * (w.endTime - w.startTime)
          };
          resplitedWords.push(word);
          resplitedWords.push({
            word: " ",
            startTime: 0,
            endTime: 0
          });
          charPos += s.length;
        }
        if (!w.word.endsWith(" ")) {
          resplitedWords.pop();
        }
      } else {
        resplitedWords.push({
          ...w
        });
      }
    }
    let wordChunk = [];
    let wChunk = [];
    const result = [];
    for (const w of resplitedWords) {
      const word = w.word;
      wordChunk.push(word);
      wChunk.push(w);
      if (word.length > 0 && word.trim().length === 0) {
        wordChunk.pop();
        wChunk.pop();
        if (wChunk.length === 1) {
          result.push(wChunk[0]);
        } else if (wChunk.length > 1) {
          result.push(wChunk);
        }
        result.push(w);
        wordChunk = [];
        wChunk = [];
      } else if (!/^\s*[^\s]*\s*$/.test(wordChunk.join("")) || CJKEXP.test(word)) {
        wordChunk.pop();
        wChunk.pop();
        if (wChunk.length === 1) {
          result.push(wChunk[0]);
        } else if (wChunk.length > 1) {
          result.push(wChunk);
        }
        wordChunk = [word];
        wChunk = [w];
      }
    }
    if (wChunk.length === 1) {
      result.push(wChunk[0]);
    } else {
      result.push(wChunk);
    }
    return result;
  }

  // src/utils/matrix.ts
  function createMatrix4() {
    return [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ];
  }
  function scaleMatrix4(m, scale = 1, origin = { x: 0, y: 0 }) {
    const [ox, oy] = [origin.x, origin.y];
    return [
      m[0] * scale,
      m[1] * scale,
      m[2] * scale,
      m[3],
      m[4] * scale,
      m[5] * scale,
      m[6] * scale,
      m[7],
      m[8] * scale,
      m[9] * scale,
      m[10] * scale,
      m[11],
      m[12] - ox * scale + ox,
      m[13] - oy * scale + oy,
      m[14],
      m[15]
    ];
  }
  function matrix4ToCSS(m, fractionDigits = 4) {
    const format = (n, i) => n.toFixed(fractionDigits);
    return `matrix3d(${m.map(format).join(", ")})`;
  }

  // src/lyric-player/dom/lyric-line.ts
  var ANIMATION_FRAME_QUANTITY = 32;
  var norNum = (min, max) => (x) => Math.min(1, Math.max(0, (x - min) / (max - min)));
  var EMP_EASING_MID = 0.5;
  var beginNum = norNum(0, EMP_EASING_MID);
  var endNum = norNum(EMP_EASING_MID, 1);
  var bezIn = (0, import_bezier_easing.default)(0.2, 0.4, 0.58, 1);
  var bezOut = (0, import_bezier_easing.default)(0.3, 0, 0.58, 1);
  var makeEmpEasing = (mid) => {
    return (x) => x < mid ? bezIn(beginNum(x)) : 1 - bezOut(endNum(x));
  };
  function generateFadeGradient(width, padding = 0, bright = "rgba(0,0,0,var(--bright-mask-alpha, 1.0))", dark = "rgba(0,0,0,var(--dark-mask-alpha, 1.0))") {
    const totalAspect = 2 + width + padding;
    const widthInTotal = width / totalAspect;
    const leftPos = (1 - widthInTotal) / 2;
    return [
      `linear-gradient(to right,${bright} ${leftPos * 100}%,${dark} ${(leftPos + widthInTotal) * 100}%)`,
      totalAspect
    ];
  }
  var RawLyricLineMouseEvent = class extends MouseEvent {
    constructor(line, event) {
      super(event.type, event);
      this.line = line;
    }
  };
  function getScaleFromTransform(transform) {
    const match = transform.match(/matrix\(([^)]+)\)/);
    if (match) {
      const values = match[1].split(", ");
      const scaleX = Number.parseFloat(values[0]);
      const scaleY = Number.parseFloat(values[3]);
      return (scaleX + scaleY) / 2;
    }
    return 1;
  }
  var LyricLineEl = class extends LyricLineBase {
    constructor(lyricPlayer, lyricLine = {
      words: [],
      translatedLyric: "",
      romanLyric: "",
      startTime: 0,
      endTime: 0,
      isBG: false,
      isDuet: false
    }) {
      super();
      this.lyricPlayer = lyricPlayer;
      this.lyricLine = lyricLine;
      this._prevParentEl = lyricPlayer.rowLayer;
      this.element.setAttribute("class", lyric_player_default.lyricLine);
      this.element.classList.toggle("anp-background-vocal", !!this.lyricLine.backgroundVocal || this.lyricLine.isBG);
      if (this.lyricLine.isBG) {
        this.element.classList.add(lyric_player_default.lyricBgLine);
      }
      if (this.lyricLine.isDuet) {
        this.element.classList.add(lyric_player_default.lyricDuetLine);
      }
      this.element.appendChild(document.createElement("div"));
      this.element.appendChild(document.createElement("div"));
      this.element.appendChild(document.createElement("div"));
      const main = this.element.children[0];
      const trans = this.element.children[2];
      const roman = this.element.children[1];
      main.setAttribute("class", lyric_player_default.lyricMainLine);
      trans.setAttribute("class", lyric_player_default.lyricSubLine);
      roman.classList.add(lyric_player_default.lyricSubLine, "anp-roman");
      trans.classList.add("anp-translation");
      this.rebuildStyle();
    }
    element = document.createElement("div");
    splittedWords = [];
    romanWords = [];
    readingSpans = [];
    litReadings = 0;
    animatedWords = [];
    // 由 LyricPlayer 来设置
    lineSize = [0, 0];
    listenersMap = /* @__PURE__ */ new Map();
    onMouseEvent = (e) => {
      const wrapped = new RawLyricLineMouseEvent(this, e);
      for (const listener of this.listenersMap.get(e.type) ?? []) {
        listener.call(this, wrapped);
      }
      if (!this.dispatchEvent(wrapped) || wrapped.defaultPrevented) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
    };
    addMouseEventListener(type, callback, options) {
      if (callback) {
        const listeners = this.listenersMap.get(type) ?? /* @__PURE__ */ new Set();
        if (listeners.size === 0)
          this.element.addEventListener(type, this.onMouseEvent, options);
        listeners.add(callback);
        this.listenersMap.set(type, listeners);
      }
    }
    removeMouseEventListener(type, callback, options) {
      if (callback) {
        const listeners = this.listenersMap.get(type);
        if (listeners) {
          listeners.delete(callback);
          if (listeners.size === 0)
            this.element.removeEventListener(type, this.onMouseEvent, options);
        }
      }
    }
    areWordsOnSameLine(word1, word2) {
      if (word1?.mainElement && word2?.mainElement) {
        const word1el = word1.mainElement;
        const word2el = word2.mainElement;
        const rect1 = word1el.getBoundingClientRect();
        const rect2 = word2el.getBoundingClientRect();
        const topDifference = Math.abs(rect1.top - rect2.top);
        return topDifference < 10;
      }
      return true;
    }
    isEnabled = false;
    hasContent = false;
    played = false;
    get motionSettled() {
      const { posX, posY, scale } = this.lineTransforms;
      return posX.idle && posY.idle && scale.idle;
    }
    ensureContent() {
      if (!this.hasContent) this.rebuildElement();
    }
    releaseHiddenContent() {
      if (!this.hasContent || this.isEnabled || !this._hide) return;
      this.disposeElements();
      for (const child of this.element.children) child.replaceChildren();
      this.hasContent = this.hasEffects = false;
    }
    hasEffects = false;
    lastMaskProgress = NaN;
    enable(maskAnimationTime = this.lyricLine.startTime) {
      this.lyricPlayer.movingLines.add(this);
      this.isEnabled = true;
      if (this.lyricPlayer.supportWebkitMaskImage && !this.lyricPlayer.supportMaskImage) this.lyricPlayer.clockMasks.add(this);
      if (!this.hasEffects && !this.lyricPlayer._getIsNonDynamic()) {
        this.rebuildElement(true);
        this.markMaskImageDirty();
      }
      this.element.classList.add(lyric_player_default.active);
      const main = this.element.children[0];
      for (const word of this.animatedWords) {
        for (const a of word.elementAnimations) {
          a.currentTime = 0;
          a.playbackRate = 1;
          a.play();
        }
        for (const a of word.maskAnimations) {
          a.currentTime = Math.min(
            this.totalDuration,
            Math.max(0, maskAnimationTime - this.lyricLine.startTime)
          );
          a.playbackRate = 1;
          a.play();
        }
      }
      main.classList.add(lyric_player_default.active);
    }
    disable() {
      const time = this.lyricPlayer.getCurrentTime();
      this.paintClockMasks(time);
      this.syncReadingGroups(time);
      this.lyricPlayer.clockMasks.delete(this);
      this.lyricPlayer.movingLines.add(this);
      this.isEnabled = false;
      this.element.classList.remove(lyric_player_default.active);
      const main = this.element.children[0];
      for (const word of this.animatedWords) {
        for (const a of word.elementAnimations) {
          if (a.id === "anp-tail-glow") {
            a.pause();
            continue;
          }
          if (a.id === "float-word" || a.id.includes("emphasize-word-float-only")) {
            a.playbackRate = -1;
            a.play();
          }
        }
      }
      main.classList.remove(lyric_player_default.active);
      this.releaseHiddenContent();
    }
    lastWord;
    resume() {
      if (!this.isEnabled) return;
      for (const word of this.animatedWords) {
        for (const a of word.elementAnimations) {
          if (!this.lastWord || this.animatedWords.indexOf(this.lastWord) < this.animatedWords.indexOf(word)) {
            a.play();
          }
        }
        for (const a of word.maskAnimations) {
          if (!this.lastWord || this.animatedWords.indexOf(this.lastWord) < this.animatedWords.indexOf(word)) {
            a.play();
          }
        }
      }
    }
    pause() {
      if (!this.isEnabled) return;
      for (const word of this.animatedWords) {
        for (const a of word.elementAnimations) {
          a.pause();
        }
        for (const a of word.maskAnimations) {
          a.pause();
        }
      }
    }
    setMaskAnimationState(maskAnimationTime = 0) {
      const t = maskAnimationTime - this.lyricLine.startTime;
      for (const word of this.animatedWords) {
        for (const a of word.maskAnimations) {
          a.currentTime = Math.min(this.totalDuration, Math.max(0, t));
          a.playbackRate = 1;
          if (t >= 0 && t < this.totalDuration) a.play();
          else a.pause();
        }
      }
    }
    prepareMeasure() {
      this.ensureContent();
      if (!this._hide) return;
      this._prevParentEl?.appendChild(this.element);
      this.element.style.display = "";
      this.element.style.visibility = "hidden";
    }
    readSize() {
      const size = [this.element.clientWidth, this.element.clientHeight];
      this.lineSize = size;
      return size;
    }
    finishMeasure() {
      if (!this._hide) return;
      this.element.remove();
      this.element.style.display = "none";
      this.element.style.visibility = "";
      this.releaseHiddenContent();
    }
    measureSize() {
      this.prepareMeasure();
      try {
        return this.readSize();
      } finally {
        this.finishMeasure();
      }
    }
    getLine() {
      return this.lyricLine;
    }
    _hide = true;
    _prevParentEl = null;
    styleHidden;
    lastX = NaN;
    lastY = NaN;
    lastScale = NaN;
    lastTransform = "";
    lastBlur = NaN;
    lastDelay = "";
    show() {
      this.ensureContent();
      this._hide = false;
      if (this._prevParentEl) {
        this._prevParentEl.appendChild(this.element);
        this._prevParentEl = null;
      }
      this.rebuildStyle();
    }
    hide() {
      this._hide = true;
      if (this.element.parentElement) {
        this._prevParentEl = this.element.parentElement;
        this.element.remove();
      }
      this.rebuildStyle();
    }
    resetUnstartedInk(time) {
      this.syncReadingGroups(time);
      if (this.isEnabled || !this.hasEffects || time >= this.lyricLine.startTime) return;
      if (this._hide) this.releaseHiddenContent();
      else this.rebuildElement();
    }
    updateReadingState(time) {
      const played = time >= this.lyricLine.endTime;
      if (played === this.played) return;
      this.played = played;
      this.element.classList.toggle("anp-played-row", played);
    }
    placeInBrowse(top, scale, opacity) {
      this.updateReadingState(this.lyricPlayer.getCurrentTime());
      this.lineTransforms.posY.setPosition(top);
      this.lineTransforms.scale.setPosition(scale);
      this.setMainOpacity(opacity);
      this.show();
      this.updateMaskAlpha(scale / 100);
    }
    leaveBrowseWindow() {
      this.hide();
      this.releaseHiddenContent();
    }
    refreshBrowseInk() {
      if (!this._hide && this.maskImageDirty) this.updateMaskImage();
    }
    setMainOpacity(opacity) {
      const style = this.element.children[0].style;
      const value = String(opacity);
      if (style.opacity !== value) style.opacity = value;
    }
    rebuildStyle() {
      const style = this.element.style;
      if (this.styleHidden !== this._hide) {
        style.display = this._hide ? "none" : "";
        this.styleHidden = this._hide;
        if (this._hide) {
          style.transform = "translate(0,-10000px)";
          this.lastX = NaN;
          this.lastTransform = "";
        }
      }
      if (this._hide) return;
      const x = this.lineTransforms.posX.getCurrentPosition();
      const y = this.lineTransforms.posY.getCurrentPosition();
      const scale = this.lineTransforms.scale.getCurrentPosition() / 100;
      if (x !== this.lastX || y !== this.lastY || scale !== this.lastScale) {
        this.lastX = x;
        this.lastY = y;
        this.lastScale = scale;
        const transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px) scale(" + scale.toFixed(4) + ")";
        if (transform !== this.lastTransform) {
          style.transform = transform;
          this.lastTransform = transform;
        }
      }
      const blur = Math.min(32, this.blur);
      if (blur !== this.lastBlur) {
        style.filter = "blur(" + blur + "px)";
        this.lastBlur = blur;
      }
      const delay = !this.lyricPlayer.getEnableSpring() && this.isInSight ? this.delay + "ms" : "";
      if (delay !== this.lastDelay) {
        style.transitionDelay = delay;
        this.lastDelay = delay;
      }
    }
    rebuildElement(withEffects = false) {
      this.hasContent = true;
      this.disposeElements();
      this.hasEffects = withEffects;
      this.element.classList.toggle("anp-reading-row", !withEffects && !this.lyricPlayer._getIsNonDynamic());
      const main = this.element.children[0];
      const trans = this.element.children[2];
      const roman = this.element.children[1];
      const groups = this.lyricLine.readingGroups;
      main.classList.toggle("anp-grouped-readings", !!groups?.length);
      main.replaceChildren();
      if (groups?.length) {
        roman.replaceChildren();
        roman.classList.remove("anp-roman-timed");
        for (const group of groups) {
          const unit = document.createElement("span");
          const base = document.createElement("span");
          const label = document.createElement("span");
          unit.className = "anp-reading-group";
          base.className = "anp-reading-base";
          label.className = "anp-reading-caption";
          if (group.words) this.buildWords(base, group.words, withEffects);
          else base.textContent = group.text ?? "";
          label.textContent = group.roman;
          unit.append(base, label);
          main.append(unit);
          if (withEffects && group.endTime != null && group.endTime > group.startTime) {
            label.classList.add("anp-reading-sweep");
            this.romanWords.push({
              word: group.roman,
              startTime: group.startTime,
              endTime: group.endTime,
              mainElement: label,
              subElements: [],
              maskAnimations: [],
              elementAnimations: [],
              shouldEmphasize: false,
              width: 0,
              height: 0,
              padding: 0
            });
          } else {
            this.readingSpans.push({ label, startTime: group.startTime });
          }
        }
        this.syncReadingGroups(this.lyricPlayer.getCurrentTime());
      } else {
        this.buildRoman(roman);
        if (this.lyricLine.staticOriginal || this.lyricPlayer._getIsNonDynamic()) main.innerText = this.lyricLine.words.map((word) => word.word).join("");
        else this.buildWords(main, this.lyricLine.words, withEffects);
      }
      trans.innerText = this.lyricLine.translatedLyric;
      if (withEffects) this.attachTailGlow();
      this.animatedWords = this.splittedWords.concat(this.romanWords);
    }
    buildWords(main, words, withEffects) {
      const chunkedWords = chunkAndSplitLyricWords(words);
      // A gap belongs between word boxes in both the reading and active layouts.
      const appendGap = () => {
        if (main.lastChild?.nodeType !== Node.TEXT_NODE) main.append(" ");
      };
      for (const chunk of chunkedWords) {
        if (Array.isArray(chunk)) {
          if (chunk.length === 0) continue;
          const merged = chunk.reduce(
            (a, b) => {
              a.endTime = Math.max(a.endTime, b.endTime);
              a.startTime = Math.min(a.startTime, b.startTime);
              a.word += b.word;
              return a;
            },
            {
              word: "",
              startTime: Number.POSITIVE_INFINITY,
              endTime: Number.NEGATIVE_INFINITY
            }
          );
          const emp = chunk.map((word) => LyricLineBase.shouldEmphasize(word)).reduce((a, b) => a || b, LyricLineBase.shouldEmphasize(merged));
          const wrapperWordEl = document.createElement("span");
          wrapperWordEl.classList.add(lyric_player_default.emphasizeWrapper);
          const characterElements = [];
          for (const word of chunk) {
            const mainWordEl = document.createElement("span");
            if (emp) {
              mainWordEl.classList.add(lyric_player_default.emphasize);
              const charEls = [];
              for (const char of word.word.trim().split("")) {
                const charEl = document.createElement("span");
                charEl.innerText = char;
                charEls.push(charEl);
                characterElements.push(charEl);
                mainWordEl.appendChild(charEl);
              }
              const realWord = {
                ...word,
                mainElement: mainWordEl,
                subElements: charEls,
                elementAnimations: this.hasEffects ? [this.initFloatAnimation(word, mainWordEl)] : [],
                maskAnimations: [],
                width: 0,
                height: 0,
                padding: 0,
                shouldEmphasize: emp
              };
              this.splittedWords.push(realWord);
            } else {
              mainWordEl.classList.add("anp-descender-space");
              mainWordEl.innerText = word.word.trim();
              this.splittedWords.push({
                ...word,
                mainElement: mainWordEl,
                subElements: [],
                elementAnimations: this.hasEffects ? [this.initFloatAnimation(word, mainWordEl)] : [],
                maskAnimations: [],
                width: 0,
                height: 0,
                padding: 0,
                shouldEmphasize: emp
              });
            }
            wrapperWordEl.appendChild(mainWordEl);
          }
          if (emp && withEffects) {
            this.splittedWords[this.splittedWords.length - 1].elementAnimations.push(
              ...this.initEmphasizeAnimation(
                merged,
                characterElements,
                merged.endTime - merged.startTime,
                merged.startTime - this.lyricLine.startTime
              )
            );
          }
          if (merged.word.trimStart() !== merged.word) {
            appendGap();
          }
          main.appendChild(wrapperWordEl);
          if (merged.word.trimEnd() !== merged.word) {
            appendGap();
          }
        } else if (chunk.word.trim().length === 0) {
          appendGap();
        } else {
          const emp = LyricLineBase.shouldEmphasize(chunk);
          const mainWordEl = document.createElement("span");
          const realWord = {
            ...chunk,
            mainElement: mainWordEl,
            subElements: [],
            elementAnimations: this.hasEffects ? [this.initFloatAnimation(chunk, mainWordEl)] : [],
            maskAnimations: [],
            width: 0,
            height: 0,
            padding: 0,
            shouldEmphasize: emp
          };
          if (emp) {
            mainWordEl.classList.add(lyric_player_default.emphasize);
            const charEls = [];
            for (const char of chunk.word.trim().split("")) {
              const charEl = document.createElement("span");
              charEl.innerText = char;
              charEls.push(charEl);
              mainWordEl.appendChild(charEl);
            }
            realWord.subElements = charEls;
            if (withEffects) {
              const duration = Math.abs(realWord.endTime - realWord.startTime);
              realWord.elementAnimations.push(
                ...this.initEmphasizeAnimation(
                  chunk,
                  charEls,
                  duration,
                  realWord.startTime - this.lyricLine.startTime
                )
              );
            }
          } else {
            mainWordEl.innerText = chunk.word.trim();
          }
          if (chunk.word.trimStart() !== chunk.word) {
            appendGap();
          }
          main.appendChild(mainWordEl);
          if (chunk.word.trimEnd() !== chunk.word) {
            appendGap();
          }
          this.splittedWords.push(realWord);
        }
      }
    }
    syncReadingGroups(time) {
      const readings = this.readingSpans;
      while (this.litReadings > 0 && readings[this.litReadings - 1].startTime > time) {
        readings[--this.litReadings].label.classList.remove("anp-reading-lit");
      }
      while (this.litReadings < readings.length && readings[this.litReadings].startTime <= time) {
        readings[this.litReadings++].label.classList.add("anp-reading-lit");
      }
    }
    // Romanization has its own beat boundaries, even when both lines wrap.
    buildRoman(container) {
      container.replaceChildren();
      const timed = this.lyricLine.romanWords || [];
      container.classList.toggle("anp-roman-timed", timed.length > 0);
      if (!timed.length) {
        container.textContent = this.lyricLine.romanLyric;
        return;
      }
      for (const part of timed) {
        const el = document.createElement("span");
        const text = part.word.trim();
        if (/^\s/.test(part.word)) container.append(" ");
        if (text) {
          el.textContent = text;
          container.append(el);
          this.romanWords.push({
            ...part,
            mainElement: el,
            subElements: [],
            maskAnimations: [],
            elementAnimations: this.hasEffects ? [this.initFloatAnimation(part, el)] : [],
            shouldEmphasize: false,
            width: 0,
            height: 0,
            padding: 0
          });
        }
        if (text && /\s$/.test(part.word)) container.append(" ");
      }
    }
    attachTailGlow() {
      if (!this.lyricLine.hasWordTiming) return;
      const word = [...this.splittedWords].reverse().find((w) => /[\p{L}\p{N}]/u.test(w.word));
      if (!word) return;
      const duration = word.endTime - word.startTime;
      if (duration < 380) return;
      const wordDuration = Math.max(0, duration);
      const handoff = this.lyricLine.tailHandoffTime ?? this.lyricLine.endTime;
      const tailGap = Math.max(0, handoff - word.endTime);
      const delay = word.startTime - this.lyricLine.startTime;
      const totalDuration = wordDuration + tailGap + 250;
      word.tailGlowRestTime = delay + wordDuration + tailGap;
      const walker = document.createTreeWalker(word.mainElement, NodeFilter.SHOW_TEXT);
      let last;
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        if (/[\p{L}\p{N}]/u.test(node.textContent || "")) last = node;
      }
      const match = last?.data.match(new RegExp("([\\p{Script=Han}\\p{Script=Hiragana}\\p{Script=Katakana}\\p{Script=Hangul}ー]\\p{M}*)[\\p{P}\\s]*$", "u"));
      if (!last || !match || match.index === void 0) return;
      const glyph = last.splitText(match.index);
      glyph.splitText(match[1].length);
      const ink = document.createElement("span");
      ink.className = "anp-tail-ink";
      glyph.replaceWith(ink);
      ink.append(glyph);
      // A grouped word can store this tail's old emphasis on another segment.
      for (const part of this.splittedWords) {
        part.elementAnimations = part.elementAnimations.filter((effect) => {
          if (!word.mainElement.contains(effect.effect.target)) return true;
          effect.cancel();
          return false;
        });
      }
      word.elementAnimations.push(this.initFloatAnimation(word, ink, 0.045));
      const isLightTail = wordDuration < 650;
      const strength = isLightTail ? 0.5 * Math.min(1, wordDuration / 650) : Math.min(1, wordDuration / 1e3);
      word.tailFeather = (isLightTail ? 0.15 : 0.22) * strength;
      const decoration = "var(--anp-word-decoration, 0 0 transparent)";
      const off = "0 0 0em transparent, 0 0 0em transparent, " + decoration;
      const shadow = (alpha) => `0 0 .075em rgba(255,255,255,${0.72 * alpha}), 0 0 .20em rgba(255,255,255,${0.54 * alpha}), ${decoration}`;
      const peak = shadow(strength);
      const tPeak = wordDuration * 0.35 / totalDuration;
      const tHold = wordDuration / totalDuration;
      const animation = ink.animate([
        { textShadow: off, offset: 0, easing: "ease-out" },
        { textShadow: peak, offset: tPeak },
        { textShadow: peak, offset: tHold, easing: "ease-out" },
        ...(tailGap > 0 ? [{
          textShadow: shadow(strength * 0.12),
          offset: (wordDuration + tailGap) / totalDuration,
          easing: "ease-out"
        }] : []),
        { textShadow: off, offset: 1 }
      ], {
        id: "anp-tail-glow",
        duration: totalDuration,
        delay,
        fill: "both",
        easing: "linear"
      });
      animation.pause();
      word.elementAnimations.push(animation);
    }
    initFloatAnimation(word, wordEl, up = this.lyricLine.isBG ? 0.1 : 0.05) {
      const delay = word.startTime - this.lyricLine.startTime;
      const duration = Math.max(1e3, word.endTime - word.startTime);
      const a = wordEl.animate(
        [
          {
            transform: "translateY(0px)"
          },
          {
            transform: `translateY(${-up}em)`
          }
        ],
        {
          duration: Number.isFinite(duration) ? duration : 0,
          delay: Number.isFinite(delay) ? delay : 0,
          id: "float-word",
          composite: "add",
          fill: "both",
          easing: "ease-out"
        }
      );
      a.pause();
      return a;
    }
    // 按照原 Apple Music 参考，强调效果只应用缩放、轻微左右位移和辉光效果，原主要的悬浮位移效果不变
    // 为了避免产生锯齿抖动感，使用 matrix3d 来实现缩放和位移
    initEmphasizeAnimation(word, characterElements, duration, delay) {
      const de = Math.max(0, delay);
      let du = Math.max(1e3, duration);
      let result = [];
      let amount = du / 2e3;
      amount = amount > 1 ? Math.sqrt(amount) : amount ** 3;
      let blur = du / 3e3;
      blur = blur > 1 ? Math.sqrt(blur) : blur ** 3;
      amount *= 0.6;
      blur *= 0.5;
      if (this.lyricLine.words.length > 0 && word.word.includes(
        this.lyricLine.words[this.lyricLine.words.length - 1].word
      )) {
        amount *= 1.6;
        blur *= 1.5;
        du *= 1.2;
      }
      amount = Math.min(1.2, amount);
      blur = Math.min(0.8, blur);
      const animateDu = Number.isFinite(du) ? du : 0;
      const empEasing = makeEmpEasing(EMP_EASING_MID);
      const steadyLift = this.steadyVocalLift;
      result = characterElements.flatMap((el, i, arr) => {
        const wordDe = de + du / 2.5 / arr.length * i;
        const result2 = [];
        const frames = new Array(ANIMATION_FRAME_QUANTITY).fill(0).map((_, j) => {
          const x = (j + 1) / ANIMATION_FRAME_QUANTITY;
          const transX = empEasing(x);
          const glowLevel = empEasing(x) * blur;
          const mat = scaleMatrix4(createMatrix4(), 1 + transX * 0.1 * amount);
          const offsetX = -transX * 0.03 * amount * (arr.length / 2 - i);
          const offsetY = steadyLift ? 0 : -transX * 0.025 * amount;
          return {
            offset: x,
            transform: `${matrix4ToCSS(
              mat,
              4
            )} translate(${offsetX}em, ${offsetY}em)`,
            textShadow: `0 0 ${Math.min(
              0.3,
              blur * 0.3
            )}em rgba(255, 255, 255, ${glowLevel}), var(--anp-word-decoration, 0 0 transparent)`
          };
        });
        const glow = el.animate(frames, {
          duration: animateDu,
          delay: Number.isFinite(wordDe) ? wordDe : 0,
          id: `emphasize-word-${el.innerText}-${i}`,
          iterations: 1,
          composite: "replace",
          fill: "both"
        });
        glow.onfinish = () => {
          glow.pause();
        };
        glow.pause();
        result2.push(glow);
        if (steadyLift) {
          const startTime = this.lyricLine.startTime + wordDe - 400;
          result2.push(this.initFloatAnimation(
            { ...word, startTime, endTime: startTime + animateDu * 0.7 },
            el
          ));
          return result2;
        }
        const floatFrame = new Array(ANIMATION_FRAME_QUANTITY).fill(0).map((_, j) => {
          const x = (j + 1) / ANIMATION_FRAME_QUANTITY;
          let y = Math.sin(x * Math.PI);
          if (this.lyricLine.isBG) {
            y *= 2;
          }
          return {
            offset: x,
            transform: `translateY(${-y * 0.05}em)`
          };
        });
        const float = el.animate(floatFrame, {
          duration: animateDu * 1.4,
          delay: Number.isFinite(wordDe) ? wordDe - 400 : 0,
          id: "emphasize-word-float",
          iterations: 1,
          composite: "add",
          fill: "both"
        });
        float.onfinish = () => {
          float.pause();
        };
        float.pause();
        result2.push(float);
        return result2;
      });
      return result;
    }
    get steadyVocalLift() {
      const { isDuet, isBG, backgroundVocal, hasWordTiming, words } = this.lyricLine;
      return isDuet || isBG || backgroundVocal || (!hasWordTiming && words.length === 1);
    }
    get totalDuration() {
      return this.lyricLine.endTime - this.lyricLine.startTime;
    }
    maskImageDirty = false;
    markMaskImageDirty() {
      this.lyricPlayer.movingLines.add(this);
      this.maskImageDirty = this.hasEffects;
    }
    updateMaskImage() {
      this.maskImageDirty = false;
      for (const word of this.animatedWords) {
        const el = word.mainElement;
        const style = getComputedStyle(el);
        word.padding = parseFloat(style.paddingLeft) || 0;
        word.width = el.clientWidth - 2 * word.padding;
        // The extra bottom padding is paint space, so it must not widen the horizontal feather.
        let height = el.clientHeight;
        if (el.classList.contains("anp-descender-space")) {
          const boxHeight = parseFloat(style.height);
          const inset = style.boxSizing === "border-box" ? parseFloat(style.paddingBottom) || 0 : 0;
          if (Number.isFinite(boxHeight)) height = Math.round(boxHeight - inset);
        }
        word.height = height - 2 * word.padding;
      }
      if (this.lyricPlayer.supportMaskImage || this.lyricPlayer.supportWebkitMaskImage) {
        this.generateWebAnimationBasedMaskImage(this.splittedWords);
        if (this.lyricLine.readingGroups?.length) {
          for (const caption of this.romanWords) this.generateWebAnimationBasedMaskImage([caption]);
        } else {
          this.generateWebAnimationBasedMaskImage(this.romanWords);
        }
      } else {
        this.generateCalcBasedMaskImage();
      }
      if (this.isEnabled) {
        this.setMaskAnimationState(this.lyricPlayer.getCurrentTime());
        this.paintClockMasks(this.lyricPlayer.getCurrentTime());
      }
    }
    generateCalcBasedMaskImage() {
      for (const word of this.animatedWords) {
        const wordEl = word.mainElement;
        if (wordEl) {
          word.width = wordEl.clientWidth;
          word.height += 2 * word.padding;
          const fadeWidth = word.height * (this.lyricPlayer.getWordFadeWidth() + (word.tailFeather || 0));
          const [maskImage, totalAspect] = generateFadeGradient(
            fadeWidth / word.width
          );
          const totalAspectStr = `${totalAspect * 100}% 100%`;
          if (this.lyricPlayer.supportMaskImage) {
            wordEl.style.maskImage = maskImage;
            wordEl.style.maskRepeat = "no-repeat";
            wordEl.style.maskOrigin = "left";
            wordEl.style.maskSize = totalAspectStr;
          } else {
            wordEl.style.webkitMaskImage = maskImage;
            wordEl.style.webkitMaskRepeat = "no-repeat";
            wordEl.style.webkitMaskOrigin = "left";
            wordEl.style.webkitMaskSize = totalAspectStr;
          }
          const w = word.width + fadeWidth;
          const maskPos = `clamp(${-w}px,calc(${-w}px + (var(--amll-player-time) - ${word.startTime})*${w / Math.abs(word.endTime - word.startTime)}px),0px) 0px, left top`;
          wordEl.style.maskPosition = maskPos;
          wordEl.style.webkitMaskPosition = maskPos;
        }
      }
    }
    // CEF 91 animates registered custom properties on the style engine. Only
    // write a prefixed mask position when its actual gradient edge changes.
    paintClockMasks(time) {
      if (this._hide) return;
      const elapsed = time - this.lyricLine.startTime;
      for (const word of this.animatedWords) {
        const mask = word.clockMask;
        if (!mask) continue;
        const { times, pixels } = mask;
        let i = mask.index;
        while (i > 0 && elapsed < times[i]) i--;
        while (i + 1 < times.length && elapsed >= times[i + 1]) i++;
        mask.index = i;
        let x = pixels[i];
        if (elapsed > times[i] && i + 1 < times.length) {
          x += (pixels[i + 1] - x) * (elapsed - times[i]) / (times[i + 1] - times[i]);
        }
        const pixel = Math.round(x * 1e3) / 1e3;
        if (pixel !== mask.last) {
          mask.last = pixel;
          word.mainElement.style.webkitMaskPosition = pixel + "px 0px";
        }
      }
    }
    generateWebAnimationBasedMaskImage(track) {
      const totalFadeDuration = Math.max(
        track.reduce((pv, w) => Math.max(w.endTime, pv), 0),
        this.lyricLine.endTime
      ) - this.lyricLine.startTime;
      let precedingWidth = 0;
      track.forEach((word, i) => {
        const prefixWidth = precedingWidth;
        precedingWidth += word.width;
        const wordEl = word.mainElement;
        if (wordEl && word.width > 0 && word.height > 0) {
          const fadeWidth = word.height * (this.lyricPlayer.getWordFadeWidth() + (word.tailFeather || 0));
          const [maskImage, totalAspect] = generateFadeGradient(
            fadeWidth / (word.width + word.padding * 2)
          );
          const totalAspectStr = `${totalAspect * 100}% 100%`;
          if (this.lyricPlayer.supportMaskImage) {
            wordEl.style.maskImage = maskImage;
            wordEl.style.maskRepeat = "no-repeat";
            wordEl.style.maskOrigin = "left";
            wordEl.style.maskSize = totalAspectStr;
          } else {
            wordEl.style.webkitMaskImage = maskImage;
            wordEl.style.webkitMaskRepeat = "no-repeat";
            wordEl.style.webkitMaskOrigin = "left";
            wordEl.style.webkitMaskSize = totalAspectStr;
          }
          const widthBeforeSelf = prefixWidth + (track[0] ? fadeWidth : 0);
          const minOffset = -(word.width + word.padding * 2 + fadeWidth);
          const clampOffset = (x) => Math.max(minOffset, Math.min(0, x));
          let curPos = -widthBeforeSelf - word.width - word.padding - fadeWidth;
          let timeOffset = 0;
          const frames = [];
          const nativeMask = this.lyricPlayer.supportMaskImage;
          const maskPosition = nativeMask ? "maskPosition" : "--anp-extspotify-mask-x";
          let lastPos = curPos;
          let lastTime = 0;
          const pushFrame = () => {
            const moveOffset = curPos - lastPos;
            const time = Math.max(0, Math.min(1, timeOffset));
            const duration = time - lastTime;
            const d = Math.abs(duration / moveOffset);
            if (curPos > minOffset && lastPos < minOffset) {
              const staticTime = Math.abs(lastPos - minOffset) * d;
              const value2 = `${clampOffset(lastPos)}px 0`;
              const frame2 = {
                offset: lastTime + staticTime,
                [maskPosition]: nativeMask ? value2 : value2.split(" ")[0]
              };
              frames.push(frame2);
            }
            if (curPos > 0 && lastPos < 0) {
              const staticTime = Math.abs(lastPos) * d;
              const value2 = `${clampOffset(curPos)}px 0`;
              const frame2 = {
                offset: lastTime + staticTime,
                [maskPosition]: nativeMask ? value2 : value2.split(" ")[0]
              };
              frames.push(frame2);
            }
            const value = `${clampOffset(curPos)}px 0`;
            const frame = {
              offset: time,
              [maskPosition]: nativeMask ? value : value.split(" ")[0]
            };
            frames.push(frame);
            lastPos = curPos;
            lastTime = time;
          };
          pushFrame();
          let lastTimeStamp = 0;
          track.forEach((otherWord, j) => {
            {
              const curTimeStamp = otherWord.startTime - this.lyricLine.startTime;
              const staticDuration = curTimeStamp - lastTimeStamp;
              timeOffset += staticDuration / totalFadeDuration;
              if (staticDuration > 0) pushFrame();
              lastTimeStamp = curTimeStamp;
            }
            {
              const fadeDuration = otherWord.endTime - otherWord.startTime;
              timeOffset += fadeDuration / totalFadeDuration;
              curPos += otherWord.width;
              if (j === 0) {
                curPos += fadeWidth * 1.5;
              }
              if (j === track.length - 1) {
                curPos += fadeWidth * 0.5 + (word.tailFeather ? fadeWidth * 0.5 : 0);
              }
              if (fadeDuration > 0) pushFrame();
              lastTimeStamp += fadeDuration;
            }
          });
          for (const a of word.maskAnimations) {
            a.cancel();
          }
          if (!nativeMask && frames.length && totalFadeDuration > 0 && frames.every((f, k) => Number.isFinite(f.offset) && (!k || Number(f.offset) >= Number(frames[k - 1].offset)))) {
            const times = [], pixels = [];
            for (const frame of frames) {
              const x = parseFloat(String(frame[maskPosition]));
              const ms = Number(frame.offset) * totalFadeDuration, n = pixels.length;
              if (n >= 2 && x === pixels[n - 1] && x === pixels[n - 2]) times[n - 1] = ms;
              else {
                times.push(ms);
                pixels.push(x);
              }
            }
            if (times[times.length - 1] < totalFadeDuration) {
              times.push(totalFadeDuration);
              pixels.push(0);
            }
            word.clockMask = { times, pixels, index: 0, last: NaN };
            word.maskAnimations = [];
            return;
          }
          if (!nativeMask) wordEl.style.webkitMaskPosition = "var(--anp-extspotify-mask-x) 0px";
          try {
            let first = 0, last = frames.length - 1;
            while (first + 1 < last && frames[first][maskPosition] === frames[first + 1][maskPosition]) first++;
            const explicitEnd = frames[last].offset === 1;
            while (explicitEnd && last > first + 1 && frames[last][maskPosition] === frames[last - 1][maskPosition]) last--;
            const start = Number(frames[first].offset);
            const end = explicitEnd ? Number(frames[last].offset) : 1;
            const span = end - start;
            const compact = span > 0 ? frames.slice(first, last + 1) : frames;
            if (span > 0) {
              for (const frame of compact) frame.offset = (Number(frame.offset) - start) / span;
            }
            const ani = wordEl.animate(compact, {
              delay: span > 0 ? start * totalFadeDuration : 0,
              duration: (span > 0 ? span : 1) * totalFadeDuration || 1,
              id: `fade-word-${word.word}-${i}`,
              fill: "both"
            });
            ani.pause();
            word.maskAnimations = [ani];
          } catch (err) {
            console.warn("应用渐变动画发生错误", frames, totalFadeDuration, err);
          }
        }
      });
    }
    getElement() {
      return this.element;
    }
    setTransform(left = this.left, top = this.top, scale = this.scale, opacity = 1, blur = 0, force = false, delay = 0) {
      this.lyricPlayer.movingLines.add(this);
      super.setTransform(left, top, scale, opacity, blur, force, delay);
      const beforeInSight = this.isInSight;
      const enableSpring = this.lyricPlayer.getEnableSpring();
      this.left = left;
      this.top = top;
      this.scale = scale;
      this.delay = delay * 1e3 | 0;
      this.setMainOpacity(opacity);
      if (force || !enableSpring) {
        this.blur = Math.min(32, blur);
        const disableTransition = force && !this.lyricPlayer.isManualScrolling && !this._hide;
        if (disableTransition) this.element.classList.add(lyric_player_default.tmpDisableTransition);
        this.lineTransforms.posX.setPosition(left);
        this.lineTransforms.posY.setPosition(top);
        this.lineTransforms.scale.setPosition(scale);
        if (!enableSpring) {
          const afterInSight = this.isInSight;
          if (beforeInSight || afterInSight) {
            this.show();
          } else {
            this.hide();
          }
        } else this.rebuildStyle();
        if (disableTransition)
          requestAnimationFrame(() => {
            this.element.classList.remove(lyric_player_default.tmpDisableTransition);
          });
      } else {
        this.lineTransforms.posX.setTargetPosition(left, delay);
        this.lineTransforms.posY.setTargetPosition(top, delay);
        this.lineTransforms.scale.setTargetPosition(scale);
      }
    }
    update(delta = 0) {
      if (this.lyricPlayer.getEnableSpring()) {
        this.lineTransforms.posX.update(delta);
        this.lineTransforms.posY.update(delta);
        this.lineTransforms.scale.update(delta);
      }
      if (this.isInSight) {
        this.show();
        if (this.maskImageDirty) {
          this.updateMaskImage();
        }
      } else {
        this.hide();
      }
      if (this._hide) {
        this.releaseHiddenContent();
        return;
      }
      const scale = this.lyricPlayer.getEnableSpring() ? this.lineTransforms.scale.getCurrentPosition() / 100 : getScaleFromTransform(getComputedStyle(this.element).transform);
      this.updateMaskAlpha(scale);
    }
    updateMaskAlpha(scale) {
      const progress = Math.max(0, Math.min(1, (scale - 0.97) / 0.03));
      if (progress === this.lastMaskProgress) return;
      this.lastMaskProgress = progress;
      this.element.style.setProperty("--bright-mask-alpha", String(0.2 + progress * 0.8));
      this.element.style.setProperty("--dark-mask-alpha", String(0.2 + progress * 0.2));
    }
    _getDebugTargetPos() {
      return `[位移: ${this.left}, ${this.top}; 缩放: ${this.scale}; 延时: ${this.delay}]`;
    }
    get isInSight() {
      const l = this.lineTransforms.posX.getCurrentPosition();
      const t = this.lineTransforms.posY.getCurrentPosition();
      const w = this.lineSize[0];
      const h = this.lineSize[1];
      const r = l + w;
      const b = t + h;
      const pr = this.lyricPlayer.size[0];
      const pb = this.lyricPlayer.size[1];
      return !(l > pr + w || r < -w || t > pb + h || b < -h);
    }
    disposeElements() {
      for (const realWord of this.animatedWords) {
        for (const a of realWord.elementAnimations) {
          a.cancel();
        }
        for (const a of realWord.maskAnimations) {
          a.cancel();
        }
        for (const sub of realWord.subElements) {
          sub.remove();
          sub.parentNode?.removeChild(sub);
        }
        realWord.elementAnimations = [];
        realWord.maskAnimations = [];
        realWord.subElements = [];
        realWord.mainElement.remove();
        realWord.mainElement.parentNode?.removeChild(realWord.mainElement);
      }
      this.splittedWords = [];
      this.romanWords = [];
      this.readingSpans = [];
      this.litReadings = 0;
      this.animatedWords = [];
    }
    dispose() {
      this.lyricPlayer.clockMasks.delete(this);
      this.isEnabled = false;
      this._prevParentEl = null;
      this.disposeElements();
      this.element.remove();
    }
  };

  // src/lyric-player/dom/index.ts
  var LyricLineMouseEvent = class extends MouseEvent {
    constructor(lineIndex, line, event) {
      super(`line-${event.type}`, event);
      this.lineIndex = lineIndex;
      this.line = line;
    }
  };
  var DomLyricPlayer = class extends LyricPlayerBase {
    currentLyricLineObjects = [];
    rowLayer = document.createElement("div");
    browseColumn;
    timingEdges = [];
    nextEdge = -Infinity;
    clockMasks = /* @__PURE__ */ new Set();
    movingLines = /* @__PURE__ */ new Set();
    measureLineSizes() {
      const rows = this.currentLyricLineObjects;
      for (let i = 0; i < rows.length; i += 24) {
        const batch = rows.slice(i, i + 24);
        try {
          for (const line of batch) line.prepareMeasure();
          for (const line of batch) this.lyricLinesSize.set(line, line.readSize());
        } finally {
          for (const line of batch) line.finishMeasure();
        }
      }
    }
    beginBrowse() {
      if (!this.currentLyricLineObjects.length || !super.beginBrowse()) return false;
      if (!this.browseColumn) {
        this.browseColumn = new BrowseColumn(this.rowLayer, this.interludeDots, this.scrollOffset);
        this.nextEdge = -Infinity;
        this.calcLayout();
      }
      return true;
    }
    queueBrowseLayout(force = true) {
      if (!this.browseColumn) super.queueBrowseLayout(force);
    }
    setBrowseOffset(offset) {
      if (!this.beginBrowse()) return;
      this.scrollOffset = offset;
      this.limitScrollOffset();
    }
    revealLine(line) {
      if (!this.beginBrowse()) return;
      const column = this.browseColumn;
      column.move(this.scrollOffset, this.size[1]);
      const index = this.lyricLinesIndexes.get(line);
      if (index === void 0) return;
      this.scrollOffset += column.screenTop(index) + line.lineSize[1] / 2 - this.size[1] * this.alignPosition;
      this.limitScrollOffset();
      column.move(this.scrollOffset, this.size[1]);
    }
    resetScroll() {
      this.browseColumn?.finish();
      this.browseColumn = void 0;
      super.resetScroll();
    }
    calcLayout(force, reflow) {
      const column = this.browseColumn;
      if (!column) return super.calcLayout(force, reflow);
      if (!this.size[0] || !this.size[1]) return;
      const center = this.size[1] * this.alignPosition;
      const pendingDelta = this.scrollOffset - column.presentedOffset;
      let anchor = column.anchor(center);
      if (!anchor) {
        let nearest = Infinity;
        for (const line of this.currentLyricLineObjects) {
          if (line.getLine().isBG || line.getElement().parentElement !== this.rowLayer) continue;
          const y = line.lineTransforms.posY.getCurrentPosition();
          const distance = Math.abs(y + line.lineSize[1] / 2 - center);
          if (distance < nearest) {
            nearest = distance;
            anchor = { line, y };
          }
        }
      }
      const rows = [];
      const dotsTop = super.calcLayout(true, reflow, (index, top, height, scale, opacity) => {
        const line = this.currentLyricLineObjects[index];
        rows.push({ line, top, height, scale, opacity });
        if (anchor?.line === line) this.scrollOffset = top - anchor.y;
      });
      column.setRows(rows, this.scrollOffset, dotsTop);
      if (anchor) this.scrollOffset += pendingDelta;
      this.limitScrollOffset();
    }
    setCurrentTime(time, seek = false) {
      if (!seek && this.currentTime <= time && time < this.nextEdge) {
        this.lastCurrentTime = this.currentTime = time;
        return;
      }
      const rewound = time < this.currentTime;
      super.setCurrentTime(time, seek);
      if (rewound) {
        for (const line of this.currentLyricLineObjects) line.resetUnstartedInk(time);
      }
      this.browseColumn?.updateReadingState(time);
      const next = firstIndex(this.timingEdges.length, (i) => this.timingEdges[i] > time);
      this.nextEdge = this.timingEdges[next] ?? Infinity;
    }
    onResize() {
      const width = this.element.clientWidth, height = this.element.clientHeight;
      if (!width || !height) return;
      const styles = getComputedStyle(this.element);
      this._baseFontSize = Number.parseFloat(styles.fontSize);
      this.size[0] = this.innerSize[0] = width - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
      this.size[1] = this.innerSize[1] = height - parseFloat(styles.paddingTop) - parseFloat(styles.paddingBottom);
      this.rebuildStyle();
      this.calcLayout(true, true);
      for (const line of this.currentLyricLineObjects) line.markMaskImageDirty();
    }
    supportPlusLighter = CSS.supports("mix-blend-mode", "plus-lighter");
    supportMaskImage = CSS.supports("mask-image", "none");
    supportWebkitMaskImage = CSS.supports("-webkit-mask-image", "none");
    innerSize = [0, 0];
    onLineClickedHandler = (e) => {
      const evt = new LyricLineMouseEvent(
        this.lyricLinesIndexes.get(e.line) ?? -1,
        e.line,
        e
      );
      if (!this.dispatchEvent(evt)) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    };
    /**
     * 是否为非逐词歌词
     * @internal
     */
    _getIsNonDynamic() {
      return this.isNonDynamic;
    }
    _baseFontSize = Number.parseFloat(
      getComputedStyle(this.element).fontSize
    );
    get baseFontSize() {
      return this._baseFontSize;
    }
    constructor() {
      super();
      this.rowLayer.className = "anp-lyric-column";
      this.rowLayer.append(this.interludeDots.getElement(), this.bottomLine.getElement());
      this.element.append(this.rowLayer);
      this.onResize();
      this.element.classList.add("amll-lyric-player", "apple-now-playing-extspotify", "dom");
      if (this.disableSpring) {
        this.element.classList.add(lyric_player_default.disableSpring);
      }
    }
    rebuildStyle() {
      const width = this.innerSize[0];
      const height = this.innerSize[1];
      this.element.style.setProperty("--amll-lp-width", `${width.toFixed(4)}px`);
      this.element.style.setProperty(
        "--amll-lp-height",
        `${height.toFixed(4)}px`
      );
    }
    setWordFadeWidth(value = 0.5) {
      super.setWordFadeWidth(value);
      for (const el of this.currentLyricLineObjects) {
        el.markMaskImageDirty();
      }
    }
    /**
     * 设置当前播放歌词，要注意传入后这个数组内的信息不得修改，否则会发生错误
     * @param lines 歌词数组
     * @param initialTime 初始时间，默认为 0
     */
    setLyricLines(lines, initialTime = 0) {
      super.setLyricLines(lines, initialTime);
      this.movingLines.clear();
      this.clockMasks.clear();
      this.nextEdge = -Infinity;
      this.timingEdges = this.processedLines.flatMap((line) => [line.startTime, line.endTime]).sort((a, b) => a - b);
      for (const line of this.currentLyricLineObjects) {
        line.removeMouseEventListener("click", this.onLineClickedHandler);
        line.removeMouseEventListener("contextmenu", this.onLineClickedHandler);
        line.dispose();
      }
      this.currentLyricLineObjects = this.processedLines.map((line, i) => {
        const lineEl = new LyricLineEl(this, line);
        lineEl.addMouseEventListener("click", this.onLineClickedHandler);
        lineEl.addMouseEventListener("contextmenu", this.onLineClickedHandler);
        this.lyricLinesIndexes.set(lineEl, i);
        lineEl.markMaskImageDirty();
        return lineEl;
      });
      this.setLinePosXSpringParams({});
      this.setLinePosYSpringParams({});
      this.setLineScaleSpringParams({});
      this.setCurrentTime(initialTime, true);
      this.calcLayout(true, true);
    }
    pause() {
      super.pause();
      this.interludeDots.pause();
      for (const line of this.currentLyricLineObjects) {
        line.pause();
      }
    }
    resume() {
      super.resume();
      this.interludeDots.resume();
      for (const line of this.currentLyricLineObjects) {
        line.resume();
      }
    }
    update(delta = 0) {
      if (this.browseColumn) {
        if (!this.isPageVisible) return;
        this.browseColumn.move(this.scrollOffset, this.size[1]);
        for (const i of this.hotLines) this.currentLyricLineObjects[i]?.refreshBrowseInk();
        this.interludeDots.update(0, this.currentTime);
        for (const line of this.clockMasks) line.paintClockMasks(this.currentTime);
        return;
      }
      super.update(delta);
      if (!this.isPageVisible) return;
      const deltaS = delta / 1e3;
      this.bottomLine.update(deltaS);
      const spring = this.getEnableSpring();
      for (const line of spring ? this.movingLines : this.currentLyricLineObjects) {
        line.update(deltaS);
        if (spring && line.motionSettled) this.movingLines.delete(line);
      }
      for (const line of this.clockMasks) line.paintClockMasks(this.currentTime);
    }
    dispose() {
      super.dispose();
      this.element.remove();
      for (const el of this.currentLyricLineObjects) {
        el.dispose();
      }
      this.currentLyricLineObjects = [];
      this.movingLines.clear();
      this.clockMasks.clear();
      this.bottomLine.dispose();
      this.interludeDots.dispose();
    }
  };
  return __toCommonJS(dom_exports);
})();
