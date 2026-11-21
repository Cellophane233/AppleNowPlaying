/* BetterNCM UI helper. A short hidden process resolves Pictures only; it never downloads images.
 * API: https://github.com/BetterNCM/BetterNCM-Plugin-Template-ESBuild/blob/main/src/global.d.ts
 * Hidden/non-elevated exec: https://github.com/std-microblock/chromatic/blob/1.3.4/src/utils/utils.cpp
 */
(function (root) {
  'use strict';

  const TIMEOUT = 30000;
  const MAX_IMAGE_SIZE = 20 * 1024 * 1024;
  const windowsPath = value => typeof value === 'string' && /^[A-Za-z]:[\\/]/.test(value) && !/[\0\r\n]/.test(value);
  const join = (base, name) => base.replace(/[\\/]+$/, '') + '\\' + name;
  const existsValue = value => value === true || value === 'true';
  const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

  function fail(message, code) {
    const error = new Error(message);
    error.code = code;
    return error;
  }

  function aborted(signal) {
    if (!signal.aborted) return;
    if (signal.reason instanceof Error) throw signal.reason;
    const error = fail('已取消保存封面', 'ABORTED');
    error.name = 'AbortError';
    throw error;
  }

  function guard(promise, signal) {
    aborted(signal);
    return new Promise((resolve, reject) => {
      const cancel = () => { try { aborted(signal); } catch (error) { reject(error); } };
      signal.addEventListener('abort', cancel, { once: true });
      Promise.resolve(promise).then(resolve, reject).finally(() => signal.removeEventListener('abort', cancel));
    });
  }

  function filename(value) {
    let name = String(value || '歌曲封面').normalize('NFC')
      .replace(/[\x00-\x1f<>:"/\\|?*]/g, '_').replace(/[. ]+$/g, '').trim();
    name = Array.from(name).slice(0, 100).join('').replace(/[. ]+$/g, '') || '歌曲封面';
    if (/^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(?:\.|$)/i.test(name)) name = '_' + name;
    return name;
  }

  function powershellEncoded(script) {
    let binary = '';
    for (let i = 0; i < script.length; i++) {
      const code = script.charCodeAt(i);
      binary += String.fromCharCode(code & 255, code >>> 8);
    }
    return root.btoa(binary);
  }

  async function extension(blob, signal) {
    const bytes = new Uint8Array(await guard(blob.slice(0, 32).arrayBuffer(), signal));
    if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return 'jpg';
    if ([137, 80, 78, 71, 13, 10, 26, 10].every((byte, i) => bytes[i] === byte)) return 'png';
    const ascii = String.fromCharCode(...bytes);
    if (ascii.startsWith('GIF87a') || ascii.startsWith('GIF89a')) return 'gif';
    if (ascii.startsWith('RIFF') && ascii.slice(8, 12) === 'WEBP') return 'webp';
    if (ascii.slice(4, 8) === 'ftyp' && /avif|avis/.test(ascii.slice(8))) return 'avif';
    throw fail('封面响应不是受支持的图片，未保存文件', 'INVALID_IMAGE');
  }

  function createSaver(dependencies = {}) {
    const native = root.betterncm || {};
    const fs = dependencies.fs || native.fs;
    const app = dependencies.app || native.app;
    const fetchImage = dependencies.fetch || root.fetch?.bind(root);
    const reservations = new Set();
    let picturesPromise = null;

    function requireApis() {
      if (!fs || !['mkdir', 'exists', 'writeFile', 'readFileText', 'remove'].every(key => typeof fs[key] === 'function') ||
          !app || typeof app.exec !== 'function' || (!dependencies.dataPath && typeof app.getDataPath !== 'function') ||
          typeof fetchImage !== 'function' || typeof root.btoa !== 'function') {
        throw fail('当前 BetterNCM 缺少保存封面所需的文件接口', 'UNSUPPORTED_HOST');
      }
    }

    async function resolvePictures() {
      const base = typeof dependencies.dataPath === 'function' ? await dependencies.dataPath() :
        (dependencies.dataPath || await app.getDataPath());
      if (!windowsPath(base)) throw fail('无法确定 BetterNCM 临时目录', 'INVALID_DATA_PATH');
      const token = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
      const temporary = join(base, '.apple-now-playing-cover-pictures-' + token + '.txt');
      // The only interpolated value is the host's own data path, quoted as a PowerShell literal.
      // Cover URLs, song IDs and song names never enter this command.
      const literal = "'" + temporary.replace(/'/g, "''") + "'";
      const script = "$ErrorActionPreference='Stop';" +
        "$p=[Environment]::GetFolderPath([Environment+SpecialFolder]::MyPictures);" +
        "if([String]::IsNullOrWhiteSpace($p)){" +
        "$u=[Environment]::GetFolderPath([Environment+SpecialFolder]::UserProfile);" +
        "if([String]::IsNullOrWhiteSpace($u)){throw 'No user profile'};" +
        "$p=[IO.Path]::Combine($u,'Pictures')};" +
        '[IO.File]::WriteAllText(' + literal + ',$p,(New-Object Text.UTF8Encoding($false)))';
      const command = 'powershell.exe -NoLogo -NoProfile -NonInteractive -WindowStyle Hidden -EncodedCommand ' + powershellEncoded(script);
      const deadline = Date.now() + 10000;
      try {
        // BetterNCM exec(cmd, elevate, showWindow): false,false maps to open + SW_HIDE.
        // It reports launch only, so wait for the resulting path file before continuing.
        const launched = await app.exec(command, false, false);
        if (launched === false) throw fail('无法启动图片目录解析', 'PATH_RESOLUTION_FAILED');
        while (Date.now() < deadline) {
          if (existsValue(await fs.exists(temporary))) {
            const path = String(await fs.readFileText(temporary)).replace(/^\uFEFF/, '').trim();
            if (windowsPath(path)) return path.replace(/[\\/]+$/, '');
          }
          await sleep(80);
        }
        throw fail('无法取得当前用户的图片目录，请检查 PowerShell 是否可用', 'PATH_RESOLUTION_FAILED');
      } finally {
        // Keep this bounded resolver alive after a cancelled download to collect/remove its path file.
        try { if (existsValue(await fs.exists(temporary))) await fs.remove(temporary); } catch (_) { /* best effort */ }
      }
    }

    function picturesPath() {
      if (!picturesPromise) picturesPromise = resolvePictures().catch(error => { picturesPromise = null; throw error; });
      return picturesPromise;
    }

    async function reserve(directory, basename, suffix, signal) {
      for (let index = 1; index < 10000; index++) {
        aborted(signal);
        const path = join(directory, basename + (index === 1 ? '' : ' (' + index + ')') + '.' + suffix);
        if (reservations.has(path)) continue;
        // Reserve before awaiting fs so concurrent clicks cannot choose the same candidate.
        reservations.add(path);
        try {
          if (!existsValue(await guard(fs.exists(path), signal))) return path;
        } catch (error) { reservations.delete(path); throw error; }
        reservations.delete(path);
      }
      throw fail('同名封面过多，请调整歌曲名后重试', 'NAME_CONFLICT');
    }

    async function save(track, parentSignal) {
      requireApis();
      const controller = new AbortController();
      const signal = controller.signal;
      const cancel = () => controller.abort(parentSignal?.reason);
      if (parentSignal?.aborted) cancel();
      else parentSignal?.addEventListener('abort', cancel, { once: true });
      let timedOut = false;
      const timer = setTimeout(() => { timedOut = true; controller.abort(); }, TIMEOUT);
      let path = null;
      let writing = null;
      let completed = false;
      try {
        aborted(signal);
        const snapshot = { url: String(track?.url || ''), name: String(track?.name || track?.id || '歌曲封面') };
        let url;
        try { url = new URL(snapshot.url); } catch (_) { throw fail('当前歌曲没有可保存的封面', 'INVALID_URL'); }
        if (!/^https?:$/.test(url.protocol) || url.username || url.password) throw fail('当前封面地址不受支持', 'INVALID_URL');
        const response = await guard(fetchImage(url.href, { signal, credentials: 'omit' }), signal);
        if (!response.ok) throw fail('封面下载失败（HTTP ' + response.status + '）', 'DOWNLOAD_FAILED');
        const declaredSize = Number(response.headers?.get?.('content-length'));
        if (declaredSize > MAX_IMAGE_SIZE) throw fail('封面图片过大，未保存', 'IMAGE_TOO_LARGE');
        const blob = await guard(response.blob(), signal);
        if (!blob.size || blob.size > MAX_IMAGE_SIZE) throw fail('封面图片为空或过大，未保存', 'INVALID_IMAGE');
        const suffix = await extension(blob, signal);
        const directory = join(await guard(picturesPath(), signal), 'CloudMusicImage');
        aborted(signal);
        await guard(fs.mkdir(directory), signal);
        if (!existsValue(await guard(fs.exists(directory), signal))) throw fail('无法创建封面保存目录', 'DIRECTORY_FAILED');
        path = await reserve(directory, filename(snapshot.name), suffix, signal);
        aborted(signal);
        writing = Promise.resolve(fs.writeFile(path, blob));
        await guard(writing, signal);
        aborted(signal);
        if (!existsValue(await guard(fs.exists(path), signal))) throw fail('封面写入失败，请检查图片目录权限', 'WRITE_FAILED');
        completed = true;
        return path;
      } catch (error) {
        // Older CEF does not expose AbortSignal.reason; keep timeout feedback explicit.
        if (timedOut) throw fail('保存封面超时，请重试', 'TIMEOUT');
        if (signal.aborted) aborted(signal);
        if (error?.code) throw error;
        throw fail('保存封面失败：' + (error?.message || '请检查网络和目录权限'), 'SAVE_FAILED');
      } finally {
        clearTimeout(timer);
        parentSignal?.removeEventListener('abort', cancel);
        if (path && !completed) {
          const cleanupPath = path;
          const cleanup = () => Promise.resolve().then(() => fs.remove(cleanupPath)).catch(() => {});
          // A native write already in flight cannot be interrupted; remove only our new file afterwards.
          if (writing) writing.then(cleanup, cleanup).finally(() => reservations.delete(cleanupPath)).catch(() => {});
          else { reservations.delete(cleanupPath); }
        } else if (path) reservations.delete(path);
      }
    }

    return Object.freeze({ save });
  }

  const defaultSaver = createSaver();
  root.AppleNowPlayingCoverSave = Object.freeze({ createSaver, save: defaultSaver.save });
})(typeof window !== 'undefined' ? window : globalThis);
