---
layout: post
title: iOS 12 JS数组Bug，可能带来互联网风波，附修复方法
category: JavaScript
date: 2018-09-19 04:00:00
---

喜气洋洋，被安利使用iOS12，红红火火，更新最新版本。

网络上已经有人遇到 iOS 数组相关的一个Bug，似乎会酿成整个互联网风波。

[Array state will be cached in iOS 12 Safari, is bug or feature? -- stackoverflow](https://stackoverflow.com/questions/52390368/array-state-will-be-cached-in-ios-12-safari-is-bug-or-feature/52392901#52392901)

[iOS 12 的 safari 有哪些变化吗？今天发现了一个 javascript 的问题 - V2EX](https://www.v2ex.com/t/490590)

先来使用 IOS 12 体验一下：

[这是原网页](https://fanmingfei.github.io/array-reverse-ios12/origin.html)

[这是修复后的](https://fanmingfei.github.io/array-reverse-ios12/fixed.html)

点击网页上方的 Click Refresh，可以看到，网页刷新后，原网页中，数组的顺序在第二次访问网页的时候，变成了倒序，即便是关闭网页重新进来，也会是倒序的。如果反复刷新几次，数组将会反复倒序。看起来是 Webview 将这个数组缓存了。

通过测试，Array的其他API并没有这种问题，包括手动改变数组中的元素顺序，都不会出现这种问题，目前只发现了使用 reverse 出现这种问题。

当我们使用 reverse 去改变数组顺序的时候，那么数组的顺序一定对我们来说特别重要，如果第二次进来还是最后的顺序，这将对我们的应用产生非常大的影响！

紧急写了一个文件来应对这个问题，如果有必要，大家可以使用，如果有问题欢迎大家PR。
[array-reverse-ios12](https://github.com/fanmingfei/array-reverse-ios12)


不知苹果是否可以通过 HotPatch 来修复这个问题，如果不能那可能只能下次版本升级了。已苹果的量级，这个版本可能会有影响很多用户。