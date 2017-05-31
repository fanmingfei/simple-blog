---
layout: post
title: "[译]再见 PNaCI，你好 WebAssembly！"
category: WebAssembly
date: 2017-05-31 14:40:00
---

# Chromium Blog：再见 PNaCI，你好 WebAssembly！

> 本文转载自：[众成翻译](http://www.zcfy.cc)
> 译者：[明非](http://www.zcfy.cc/@edire)
> 链接：[http://www.zcfy.cc/article/2984](http://www.zcfy.cc/article/2984)
> 原文：[https://blog.chromium.org/2017/05/goodbye-pnacl-hello-webassembly.html](https://blog.chromium.org/2017/05/goodbye-pnacl-hello-webassembly.html)

再见 PNaCI，你好 WebAssembly！

从前，我们浏览器里跑原生代码需要依靠浏览器插件来支持。在2013年的时候，我们脱离插件，[引入了 PNaCI 沙箱](https://blog.chromium.org/2013/11/portable-native-client-pinnacle-of.html)，来提供安全、便携、高性能的应用。尽管在Chrome里这种方式非常有效，但并不是所有浏览器都支持。

此后，Web 社区已经围绕 WebAssembly 进行了整合，将其作为高性能代码的跨浏览器解决方案。WebAssembly 效率很高，可以基于现有的 Web 平台 API[在浏览器上构建视频编辑器](https://d2jta7o2zej4pf.cloudfront.net/)，或者在浏览器跑一个高帧率的 [Unity 开发的游戏](http://webassembly.org.cn/demo/Tanks/)。WebAssembly 开发的应用程序可以跑在多个浏览器上：Chrome、Firefox 已经开始支持了，Edge 和 Safari 将要在下个版本的浏览器中支持。

鉴于跨浏览器支持的优势，我们计划将我们的本地代码工作集中在 WebAssembly 上，在2018年第一季度，除了Chrome应用程式和扩充功能外，我们将会移除对PNaCl的支持。我们相信，WebAssembly 的生态系统完善将使一些新的和现有的高性能 Web 应用程序都更好的工作，并且 PNaCl 的使用的人已经很少了足以弃用。

我们认识到，技术迁移可能具有挑战性。为了帮助缓解转型，我们为现有的 PNaCl 实现的应用准备了[一套建议](https://developer.chrome.com/native-client/migration)，以便迁移到 Web 平台，以及 WebAssembly 的功能[路线图](https://wasmdash.appspot.com/)。当您着手进行迁移过程时，如果遇到任何问题，请[告知我们](https://groups.google.com/forum/#!forum/native-client-discuss)，以便我们能够尽可能帮您顺利地进行转移。

随着WebAssembly的推出，web 平台已经为在任何浏览器中运行的新一代快速的网络应用奠定了基础。我们很期待看到开发者未来的创作！