# AppleNowPlaying

AppleNowPlaying 是基于 BetterNCM 的 Windows 网易云音乐桌面端插件，提供 Apple Music 风格的沉浸播放页。它可以接管底栏封面入口，提供同步歌词、封面背景和队列操作。网易云音乐负责音频播放、账户和曲库。

当前版本为 `0.5.67`，版本与宿主要求以 [manifest.json](./manifest.json) 为准。

![AppleNowPlaying 播放页预览](./preview.webp)

## 功能特性

- **沉浸播放**。宽窗双栏、窄窗或矮窗单栏，可显示封面与歌词、仅歌词或仅封面。支持全屏、播放与切歌、进度与音量调节、收藏和播放模式切换。
- **同步歌词**。支持有时间轴的逐行与逐字歌词、译文、罗马音、对唱、背景和声与间奏提示。可点句跳转、手动滚动后恢复跟随、预览进度位置的歌词、复制歌词和校准偏移。
- **宿主队列与歌曲操作**。可查看网易云当前队列、跳播、拖动排序、设置下一首和移除曲目。歌曲菜单提供打开网易云详情、加入歌单和保存封面等操作，具体取决于当前曲目、播放模式与宿主能力。
- **背景与字体**。支持按封面取色的渐变、模糊封面、纯色、流体和静态流体，以及可选的音频律动。可调歌词字号、滚动效果、阴影与辉光，并使用本机字体。

## 架构与目录

| 文件或目录 | 职责 |
| --- | --- |
| [manifest.json](./manifest.json)、[build.py](./build.py) | 声明版本、宿主要求与注入入口。打包脚本合并脚本和样式，生成含 `main.js` 的 ZIP 格式 `.plugin` 文件。 |
| [playing.js](./playing.js)、[playing.css](./playing.css) | 管理播放页、设置、宿主适配、播放时钟、歌词加载与缓存、队列和背景。CSS 负责自适应布局与主题。 |
| [ext-lyric-data.js](./ext-lyric-data.js)、[ext-lyric-view.js](./ext-lyric-view.js) | 将统一的歌词数据转换为渲染器输入，对齐播放时钟，并连接定位、焦点和右键菜单。 |
| [vendor/extspotify/](./vendor/extspotify/) | 随包提供经适配的 AMLL-Player-extSpotify DOM 歌词渲染器，负责逐字扫光、上浮、歌词滚动与间奏动画。包含对应源码和许可证，详见 [组件说明](./vendor/extspotify/README.md)。 |
| [qq-lyrics-provider.js](./qq-lyrics-provider.js)、[qq-lyrics-codec.js](./qq-lyrics-codec.js) | 匹配 QQ 音乐曲目并获取歌词，解码 QRC，必要时请求 LRC。 |
| [cover-save.js](./cover-save.js) | 验证并保存当前封面，处理同名文件。 |
| [验收/](./验收/) | 模拟宿主与插件设置回归脚本。 |

### 关键流程

1. **注入与同步**。BetterNCM 在 `Main` 注入打包后的 `main.js`。通过 `plugin.onLoad` 挂载界面，`plugin.onConfig` 提供插件设置。打开播放页后读取网易云播放状态并订阅进度事件，以宿主进度校准界面的播放时钟。播放控制、跳转和队列变更交给网易云处理。
2. **歌词加载与渲染**。按网易云歌曲 ID 检查本地缓存。歌词源设置相同时，七天内的有效缓存可直接使用。需要重新取词时，按设置的优先级查找，默认顺序为 **AMLL TTML → QQ 音乐 QRC → QQ 音乐 LRC → 网易云 YRC → 网易云 LRC**。AMLL 依次尝试 GDBA、作者镜像和 GitHub，缺少译文或罗马音时尝试用网易云数据补齐。歌词解析后交给 extSpotify，跟随宿主时钟和偏移设置渲染。缓存过期时可先显示已有歌词，后台查找结果可用于更新磁盘缓存。手动刷新成功后会更新当前显示。
3. **收起与卸载**。关闭播放页会停止渲染循环和音频分析、取消进行中的请求并释放歌词节点。插件卸载或宿主页面退出时销毁界面，解除对原生入口的接管。

## 安装与运行

需要已安装 BetterNCM 的 Windows 网易云音乐桌面端。清单声明网易云音乐 `>=3.1.41`、BetterNCM `>=1.0.0`，并标记支持网易云 3.x。网易云适配以 Windows 版 3.1.41 的播放接口为基础。

**已有安装包**时，将 `AppleNowPlaying-<版本>.plugin` 放入 BetterNCM 数据目录的 `plugins` 子目录，保留 `.plugin` 扩展名，然后完全退出并重新启动网易云音乐，在 BetterNCM 中确认插件已启用。此工作区的安装目录为 `C:\betterncm\plugins`。

**从源码构建**时，在项目根目录用 PowerShell 执行以下命令。构建只需 Python 3 标准库，extSpotify 已随源码提供。

```powershell
New-Item -ItemType Directory -Path ..\plugins -Force | Out-Null
python .\build.py
```

脚本输出 `..\plugins\AppleNowPlaying-0.5.67.plugin`，其中版本号取自清单。源码目录位于 BetterNCM 数据目录下时，产物直接写入该数据目录的 `plugins`。其他位置构建时，将产物复制到实际的 BetterNCM 插件目录后重启宿主。运行时由 BetterNCM 加载 `main.js`，无需启动本地服务。单独重建 extSpotify 组件的依赖和步骤见 [组件说明](./vendor/extspotify/README.md)。

## 插件商店发布

构建后，将安装包解压到干净的 `dist/` 目录。本仓库的 [商店登记条目](./plugins-list/AppleNowPlaying.json) 使用 `/dist` 作为 `subpath`。

```powershell
python -m zipfile -e ..\plugins\AppleNowPlaying-0.5.67.plugin .\dist
```

`dist/` 包含 `manifest.json`、生成的 `main.js`、预览图、项目许可证，以及随包的第三方源码和许可证。向插件库提交登记 JSON 时，将它放入插件库的 `plugins-list/` 目录。

## 基本使用

1. 播放一首歌曲，点击网易云底栏封面打开沉浸页。也可用 `Ctrl+Shift+M` 开关页面，或从 BetterNCM 的插件设置点击「打开沉浸播放页」。点击顶部收起按钮退出，也可用 `Esc` 依次退出全屏、弹层或播放页。
2. 用底部按钮切换歌词和队列。点击歌词行可跳到相应进度，右键可复制歌词。滚轮可手动浏览，停止操作后会恢复跟随。歌词工具栏可切换逐字、译文和罗马音，并查看当前来源。
3. 点击播放页齿轮调整显示、字体、背景和歌词同步。「同步与工具」中可刷新本曲歌词。使用队列项菜单管理曲目，或使用歌曲「更多」菜单保存封面。封面保存在 Windows 当前用户的「图片」目录下的 `CloudMusicImage` 文件夹。

## 配置项

| 设置位置 | 选项与默认值 |
| --- | --- |
| BetterNCM 插件设置 | 「替换原生播放页」默认开启。关闭后底栏封面恢复网易云原生入口，独立入口和快捷键仍可使用。歌词设置支持调整来源顺序、添加或导入自定义来源，以及刷新本曲歌词。 |
| 页面外观 | 默认显示封面与歌词，歌曲译名优先。封面阴影、文字阴影和文字辉光默认开启。 |
| 背景效果 | 默认流体、均衡画质、30 FPS，鼓点律动关闭。可切换渐变、模糊封面、纯色或静态流体。渐变漂移默认开启、暗化为 0%，模糊封面默认 60 px、暗化为 30%。 |
| 歌词与字体 | 逐字、译文、原文加粗、手动滚动条和进度条歌词预览默认开启。罗马音与罗马音逐字默认开启。当前行默认居中。原文默认随窗口调整，译文与罗马音默认为原文字号的 64%，背景和声与对唱分别为 24 px 和 36 px。自定义字体默认关闭，开启后可选字体预设或填写本机字体的回退顺序。 |
| 歌词动效 | 默认「轻微回弹」，可选「平滑移动」或「逐行错开」。上浮、渐隐、缩放和模糊默认开启。 |
| 同步与工具 | 全局偏移和单曲偏移默认均为 0 ms，可分别在 −10,000 到 10,000 ms 内调整，实际偏移为两者之和。正值表示歌词提前。 |
| 实验性功能 | 「罗马音分词」默认关闭。 |

外观设置、单曲偏移和歌词来源配置保存在宿主 `localStorage` 的 `apple-now-playing.` 命名空间。歌词缓存由 BetterNCM 文件接口写入其数据目录下的 `AppleNowPlaying-data\lyrics-cache\<歌曲 ID>.json`。

自定义歌词源支持 LRC、TTML、YRC、QRC 和 Lyricify Syllable。可填写带歌曲占位符的 HTTPS 地址模板，例如 `https://example.com/lyrics/[NCM_ID].ttml`，也可导入 AMLL 歌词源字符串。

## 注意事项

- 逐字、译文、罗马音与和声的可用性取决于当前歌曲的歌词数据。AMLL 与 QQ 歌词依赖外部服务，访问失败会按上述顺序回退。QQ 匹配会核对曲名、艺人、版本和时长，匹配失败后继续尝试其他歌词来源。QQ 歌词查询会向腾讯发送当前歌曲的曲名、艺人和可用的专辑名。AMLL 歌词查询会向社区镜像发送网易云歌曲 ID。
- 播放、队列编辑、字体枚举与音频分析依赖网易云的内部接口。客户端升级或切换播放模式后，部分操作可能不可用，可从队列菜单回到原生队列管理。系统减少动态效果、静态背景和暂停状态会限制音频律动。
- 保存封面需要 BetterNCM 的本地文件接口，首次解析保存目录时会用隐藏 PowerShell 查询 Windows「图片」目录。支持 JPEG、PNG、GIF、WebP 和 AVIF，大小上限为 20 MiB。同名封面会加序号保存。

## 开源许可

AppleNowPlaying 自有代码采用 [GNU Affero General Public License v3.0](./LICENSE)（`AGPL-3.0-only`）。

第三方组件沿用各自的许可。extSpotify 渲染器和所含依赖的源码及许可见 [组件说明](./vendor/extspotify/README.md)。QQ 歌词模块中的第三方代码保留原有的 Apache-2.0 声明。预览图中第三方封面和歌词的权利由各自权利人保留。
