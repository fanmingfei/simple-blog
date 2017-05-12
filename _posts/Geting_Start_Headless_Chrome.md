---
layout: post
title: "开始使用 Headless Chrome"
category: Other
date: 2017-05-12 20:00:00
---

> 本文转载自：[众成翻译](http://www.zcfy.cc)
> 译者：[明非](http://www.zcfy.cc/@edire)
> 链接：[http://www.zcfy.cc/article/2778](http://www.zcfy.cc/article/2778)
> 原文：[https://developers.google.com/web/updates/2017/04/headless-chrome](https://developers.google.com/web/updates/2017/04/headless-chrome)

&nbsp;|&nbsp; Google Developers

Headless Chrome 浏览器正在运行 Chrome 59 内核。就是在 Headless 环境中运行 Chrome 浏览器。实际上，就是脱离 chrome 浏览器的情况下运行一个 Chrome！所有 Chrome 和 Blink 渲染引擎提供给现代 web 平台的特性。

它有什么用呢？

Headless 浏览器可以用于自动化测试，也可以在没有 UI 界面的服务器环境中运行，是一个不错的工具。例如，您可能需要针对一个真实的网页进行测试，为 web 页面创建一个PDF，或者只是检查浏览器如何呈现URL。

注意：<span style="color: rgb(51, 51, 51); font-size: 16px;">Chrome 59 已经在 </span>Mac 和 Linux 中支持 Headless 模式。[Windows 支持](https://bugs.chromium.org/p/chromium/issues/detail?id=686608)也很快就要上线！要查看您的 Chrome 版本，请打开 `chrome://version`。

## 开始使用 Headless (CLI)

开始使用 headless 模式最简单的方式是在命令行下打开 Chrome binary。 <span style="color: rgb(51, 51, 51); font-size: 16px;">如果你已经下载了 Chrome 59+，需要带 `--headless` 参数启动 Chrome。</span>

    chrome \
      --headless \                   # Runs Chrome in headless mode.
      --disable-gpu \                # Temporarily needed for now.
      --remote-debugging-port=9222 \
      https://www.chromestatus.com   # URL to open. Defaults to about:blank.

注意：现在，您还需要包含 `--disable-gpu` 参数。不过这个参数以后会被丢弃。

chrome 命令需要指向 Chrome 的安装路径。Chrome 的位置可能因为平台和操作系统不同而不同。由于我在 Mac 环境上，所以我为安装的每个版本的Chrome创建了方便的别名。

如果你点 Chrome 是稳定版，我建议您使用 chrome-canary：

    alias chrome="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"
    alias chrome-canary="/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary"
    alias chromium="/Applications/Chromium.app/Contents/MacOS/Chromium"

[下载 Chrome Canary](https://www.google.com/chrome/browser/canary.html)

## 命令行特性

在某些情况下，您可能不需要以编程方式编写Headless Chrome。有一些有用的命令行标志来执行常见任务。

### 打印DOM

`--dump-dom` 参数将 document.body.innerHTML 输出：

    `chrome --headless --disable-gpu --dump-dom https://www.chromestatus.com/`

### 创建PDF

`--print-to-pdf`参数创建页面的PDF：

    `chrome --headless --disable-gpu --print-to-pdf https://www.chromestatus.com/`

### 截图

如果想对页面进行截图，可以使用 `--screenshot` 参数：

    chrome --headless --disable-gpu --screenshot https://www.chromestatus.com/

    # Size of a standard letterhead.
    chrome --headless --disable-gpu --screenshot --window-size=1280,1696 https://www.chromestatus.com/

    # Nexus 5x
    chrome --headless --disable-gpu --screenshot --window-size=412,732 https://www.chromestatus.com/

使用 `--screenshot` 将在当前工作目录中生成一个名为`screenshot.png`的文件。如果您正在寻找完整的页面截图，那么会涉及到更多的内容。David Schnurr 发表了一个不错的博客来介绍这个功能。查看 [使用 Headless Chrome 做自动截屏工具](https://medium.com/@dschnr/using-headless-chrome-as-an-automated-screenshot-tool-4b07dffba79a)。

## 脱离浏览器界面来调试 Chrome？

当您使用 `--remote-debug-port=9222` 运行Chrome时，它会启动一个 [DevTools 协议](https://chromedevtools.github.io/devtools-protocol/)的实例。协议用于与Chrome进行通信，并驱动 headless 浏览器实例。它可以用于使用 Sublime，VS Code 和 Node 等工具来远程调试应用程序。#synergy

由于您没有浏览器UI来查看该页面，因此在其他浏览器中进入 [http://localhost:9222](http://localhost:9222)，以检查一切正常。您将看到一个可检查页面的列表，您可以点击它们查看 Headless 正在呈现的内容：

DevTools 远程调试 UI

从这里，您可以使用熟悉的 DevTools 功能来检查，调试和调整页面。如果您以编程模式使用 Headless，页面也是一个功能强大的调试工具，用于查看所有原始的 DevTools 协议命令，并通过浏览器进行通信。

## 使用编程模式（Node）

### 打开 Chrome

在前面的章节，我们使用 `--headless --<span style="color: rgb(51, 51, 51); font-size: 16px;">remote-debugging-port=9222</span>` <span style="color: rgb(51, 51, 51); font-size: 16px;">参数</span>手动启动 Chrome。但是，如果要全面自动化测试，您可能希望从应用程序中打开Chrome。

一种方式是使用 child_process：

    const exec = require('child_process').exec;

    function launchHeadlessChrome(url, callback) {
      // Assuming MacOSx.
      const CHROME = '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome';
      exec(`${CHROME} --headless --disable-gpu --remote-debugging-port=9222 ${url}`, callback);
    }

    launchHeadlessChrome('https://www.chromestatus.com', (err, stdout, stderr) => {
      ...
    });

但是当你想要实现一个跨平台的解决方案，这个事情就变得棘手了。只需要要看看 <span style="color: rgb(51, 51, 51); font-size: 16px;">Chrome 的应用程序</span>路径:(

#### <span style="font-size: 16px;">使用 Lighthouse 的 ChromeLauncher 模块</span>

Lighthouse 是检测web应用质量的一个极好的工具。大多数人没有意识到<span style="color: rgb(51, 51, 51); font-size: 16px;">一件事</span>，它附带了了一些非常用的可以工作在 Chrome 上的模块。其中有一个就是 ChromeLauncher。Chrome 安装后，启动一个调试实例，打开浏览器，并且当你的程序完成后关闭他。多亏了 Node，他可以跨平台工作。

注意：Lighthouse 团队正在开发 ChromeLauncher 的独立软件包，将会改善之前的 API。如果你有新的[反馈](https://github.com/GoogleChrome/lighthouse/issues/2092)可以发送给我们。

默认情况下，`ChromeLauncher` **将会尝试打开 Chrome Canary** （如果安装了），但是你可以手动选择 Chrome 的版本。如果想使用它，首先要使用 npm 安装 Lighthouse：

    `yarn add lighthouse`

示例 - 使用 ChromeLauncher 来打开 Headless

    const {ChromeLauncher} = require('lighthouse/lighthouse-cli/chrome-launcher');

    /**
     * Launches a debugging instance of Chrome on port 9222.
     * @param {boolean=} headless True (default) to launch Chrome in headless mode.
     *     Set to false to launch Chrome normally.
     * @return {Promise<ChromeLauncher>}
     */
    function launchChrome(headless = true) {
      const launcher = new ChromeLauncher({
        port: 9222,
        autoSelectChrome: true, // False to manually select which Chrome install.
        additionalFlags: [
          '--window-size=412,732',
          '--disable-gpu',
          headless ? '--headless' : ''
        ]
      });

      return launcher.run().then(() => launcher)
        .catch(err => {
          return launcher.kill().then(() => { // Kill Chrome if there's an error.
            throw err;
          }, console.error);
        });
    }

    launchChrome(true).then(launcher => {
      ...
    });

<span style="color: rgb(51, 51, 51); font-size: 16px;">这个脚本其实没有什么太多作用</span>，但您应该在任务管理器中看到一个 Chrome 启动实例，他加载了 about:blank。记住，这里没有任何浏览器界面。这是 Headless 模式。

如果想控制浏览器，我们需要 DevTools 协议。

### 检索页面信息

[chrome-remote-interface](https://www.npmjs.com/package/chrome-remote-interface) 是一个非常赞的 Node 包，它为 DevTools 协议提供了非常有用的API。你可以将它用于编排 Headless Chrome结合，页面导航，获取页面的信息。

警告：DevTools协议可以做一些有趣的东西，但是他的入门并不简单。我建议先花费一些时间来浏览[DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/)。<span style="color: rgb(51, 51, 51); font-size: 16px;">然后，移步至 chrome-remote-interface 的 API 文档去看如何包装原始协议。</span>  

让我们安装依赖：

    `yarn add chrome-remote-interface`

#### 例子

举例 - 输出用户代理信息

    launchChrome().then(launcher => {
      chrome.Version().then(version => console.log(version['User-Agent']));
    });

返回值差不多是这样的：HeadlessChrome/60.0.3082.0

举例 - 检查这个网站存在 [web app manifest](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/)

    const chrome = require('chrome-remote-interface');

    function onPageLoad(Page) {
      return Page.getAppManifest().then(response => {
        if (!response.url) {
          console.log('Site has no app manifest');
          return;
        }
        console.log('Manifest: ' + response.url);
        console.log(response.data);
      });
    }

    launchChrome().then(launcher => {

      chrome(protocol => {
        // Extract the parts of the DevTools protocol we need for the task.
        // See API docs: https://chromedevtools.github.io/devtools-protocol/
        const {Page} = protocol;

        // First, enable the Page domain we're going to use.
         Page.enable().then(() => {
          Page.navigate({url: 'https://www.chromestatus.com/'});

          // Wait for window.onload before doing stuff.
          Page.loadEventFired(() => {
            onPageLoad(Page).then(() => {
              protocol.close();
              launcher.kill(); // Kill Chrome.
            });
          });
        });

      }).on('error', err => {
        throw Error('Cannot connect to Chrome:' + err);
      });

    });

举例 - 利用 DOM APIs 取出页面的`<title>`

    const chrome = require('chrome-remote-interface');

    function onPageLoad(Runtime) {
      const js = "document.querySelector('title').textContent";

      // Evaluate the JS expression in the page.
      return Runtime.evaluate({expression: js}).then(result => {
        console.log('Title of page: ' + result.result.value);
      });
    }

    launchChrome().then(launcher => {

      chrome(protocol => {
        // Extract the parts of the DevTools protocol we need for the task.
        // See API docs: https://chromedevtools.github.io/devtools-protocol/
        const {Page, Runtime} = protocol;

        // First, need to enable the domains we're going to use.
        Promise.all([
          Page.enable(),
          Runtime.enable()
        ]).then(() => {
          Page.navigate({url: 'https://www.chromestatus.com/'});

          // Wait for window.onload before doing stuff.
          Page.loadEventFired(() => {
            onPageLoad(Runtime).then(() => {
              protocol.close();
              launcher.kill(); // Kill Chrome.
            });
          });

        });

      }).on('error', err => {
        throw Error('Cannot connect to Chrome:' + err);
      });

    });

## 更多资源

这里有一些有用的入门资源

文档

*   [DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/) - API参考文档

工具

*   [chrome-remote-interface](https://www.npmjs.com/package/chrome-remote-interface) - <span style="color: rgb(11, 21, 29); font-size: 16px;">基于 DevTools 协议的 Node 模块</span>
*   Lighthouse - Web app 质量自动化测试工具

Demos

*   “The Headless Web” - <span style="color: rgb(51, 51, 51); font-size: 16px;"> Paul Kinlan 发表的一篇关于使用 Headless 的博客</span>

## 常见问题解答

我需要 `--disable-gpu` 参数吗

是的，现在需要。`--disable-gpu` 参数是解决几个错误的临时要求。在正式的版本中就不需要了。有关详细信息，请参阅[https://crbug.com/546953#c152](https://crbug.com/546953#c152)和[https://crbug.com/695212](https://crbug.com/695212)。

我们仍然需要 Xvfb？

<span style="color: rgb(51, 51, 51); font-size: 16px;">不需要。Headless Chrome 不需要窗口，所以不需要像 Xvfb 这样的展示服务。</span>  
没有它，你也可以高高兴兴的做自动化测试。

什么是 Xvfb？XXvfb是Unix系统的内存显示服务器，可让您运行图形应用程序（如Chrome），无需附加物理显示。许多人使用 Xvfb 运行早期版本的 Chrome 进行 “Headless” 测试。

我怎么使用 Docker 容器来运行 Headless Chrome

看一下 [lighthouse-cli](https://github.com/ebidel/lighthouse-ci) 。它使用Ubuntu作为基本映像，并在App Engine Flexible 容器中安装+运行 Lighthouse。

Headless Chrome 可以和 <span style="color: rgb(51, 51, 51); font-size: 16px;">Selenium / WebDriver / ChromeDriver 一起使用吗？</span>

当然，<span style="color: rgb(51, 51, 51); font-size: 16px;">Selenium 为 Chrome 浏览器开放了一个完整的实例。</span>换句话说，他是一个自动化解决方案并不是一个完整的 headless。但是，Selenium 在未来可以使用 `--headless`。

如果你想试一试，我建议你先学习 [Runing Selenium with Headless Chrome](https://intoli.com/blog/running-selenium-with-headless-chrome/)。

注意：您可能在使用 ChromeDriver 中遇到的错误。在撰写本文时，最新版本（2.29）仅支持Chrome 58。Headless Chrome 需要 Chrome 59 及其以上版本。

它与PhantomJS有什么关系？

<span style="color: rgb(51, 51, 51); font-size: 16px;">Headless Chrome 是一个和 [PhantomJS](http://phantomjs.org/) 相似的工具。</span>两者都可用于 Headless 环境中进行自动化测试。两者之间是Phantom使用旧版本的WebKit作为其渲染引擎，而Headless Chrome使用最新版本的Blink。

目前，Phantom 还提供了比 [DevTools 协议](https://chromedevtools.github.io/devtools-protocol/)更高级别的API。

在哪里提交 bug？

对于 Headless Chrome 的 bug，可以在[crbug.com](https://bugs.chromium.org/p/chromium/issues/entry?components=Blink&blocking=705916&cc=skyostil%40chromium.org&Proj=Headless)上提交。

对于 DevTools 协议，可以在[github.com/ChromeDevTools/devtools-protocol](https://github.com/ChromeDevTools/devtools-protocol/issues/new) 提交。

除非另有说明，本页面的内容是根据知识共享署名3.0许可协议授权的，代码示例按照Apache 2.0许可协议授权。详情请参阅我们的网站政策。Java是Oracle和/或其附属公司的注册商标。