---
layout: post
title: "Web Starter Kit 介绍"
category: 工具&框架
date: 2016-06-15 00:00:00
---

原文地址： https://github.com/google/web-starter-kit

## 概述
Web Starter Kit 是一套前端开发工具，它不仅有一套响应式的前端模板，提供了夸设备和屏幕的工具，他还可以帮助你快速高效的架构前端项目，能够让前端开发者快速启动或加入开发项目。

## 特点
| 特点           | 简介           |
| ------------- |:-------------:|
| 强大的模板      |  [Material Design Lite](http://getmdl.io/) 的一套强大的响应式模板，你可以选择使用默认模板开始，也可以选择[basic.html](https://github.com/google/web-starter-kit/blob/master/app/basic.html)从零开始 |
| 支持Sass      | 更方便的通过sass编写css，你可以自由使用变量、函数等。（运行 gulp serve 或者 gulp）      |
| 代码优化 | 压缩合并js,css,html,图片来保持页面整洁（使用gulp来将优化版本产出到/dist目录）      |
| 代码检测      | Javascript 代码检测是通过[ESlint](http://eslint.org/)——一个可拓展的JavaScript代码检测工具。Web Starter Kit 使用了 [eslint-config-google](https://github.com/google/eslint-config-google) 代码检测配置，根据Google Javascript 代码规范检测 |
| 支持ES2015      | 可以选择通过Babel 6.0来支持ES2015，删除掉[.babelrc](https://github.com/google/web-starter-kit/blob/master/.babelrc)文件中的 "only": "gulpfile.babel.js" 这一行，可以将ES2015代码转换为ES5     |
| 内置HTTP服务 | 为了开发中在本地预览网页效果，内置了HTTP服务 |
| 浏览器即时刷新     | 新内容产生后刷即时新浏览器，不需要安装其他插件。（需要gulp serve 支持） |
| 跨设备同步     | 同步点击、滚动、表单以及即使刷新。通过[BrowserSync](http://browsersync.io/) 进行支持，（运行gulp serve 需要让设备访问到你的ip）    |
| 离线支持 | 感谢[Service Worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/) [pre-caching](https://github.com/google/web-starter-kit/blob/master/gulpfile.babel.js#L226) 。需要将dist放到https协议下才能使用离线支持。   使用[sw-precache](https://github.com/GoogleChrome/sw-precache/) 实现|
| 页面速度分析    | 展示出你的页面在手机或桌面应用的性能指标。(运行 gulp pagespeed)    |
## 快速开始
[下载](https://github.com/google/web-starter-kit/releases/latest)代码包或者clone这个githsub库，并且在app目录内开发。
这里有两个初始文件可供你选择：
* `index.html` - 默认开始文件，含有已经设计好的页面
* `basic.html` - 没有页面内容，但是仍然含有移动端简洁而又实用的元信息
一定要仔细看一下[安装文档](https://github.com/google/web-starter-kit/blob/master/docs/install.md)来确认你的开发环境是否支持WSK（Web Starter Kit），如果你的开发环境可以运行WSK，那么请查看[命令](https://github.com/google/web-starter-kit/blob/master/docs/commands.md)来开始使用Web Starter Kit吧！

## 页面效率
Web Starter Kit 全力给你创建一个高效的执行体验，我们默认页面的[Speed Index](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index)的测试[成绩](http://www.webpagetest.org/result/151201_VW_XYC/)是小于1100的（1000是最佳效果），重复加载的成绩小于550，这要感谢 Service Worker precaching。

## 浏览器支持
目前，我们官方支持一下浏览器的最后两个版本：
* Chrome
* Edge
* Firefox
* Safari
* Opera
* Internet Explorer 9+
并不是说Web Starter Kit不能支持更早的版本，但是我们保证在这些版本下Web Starter Kit将会运行的更好。

## 疑难解答
如果你在使用Web Starter Kit时遇到问题，请查看我们的[疑难解答](https://github.com/google/web-starter-kit/wiki/Troubleshooting)规则，并且开启一个[issue](https://github.com/google/web-starter-kit/issues)。我们很乐意探讨如何这些问题。

## 只使用模板
如果你不想使用任何我们提供的工具，请在项目中删除以以文件 `package.json`、`gulpfile.babel.js`、`.jshintrc` 和 `.travis.yml`。你可以安全的使用我们提供的模板以及新的构建系统或者不使用任何构建系统了。

## 文档和使用方法
* [文档目录](https://github.com/google/web-starter-kit/blob/master/docs/file-appendix.md) - 文件都是做什么用的？
* [使用 Material Design Lite 的 Sass](https://github.com/google/web-starter-kit/blob/master/docs/mdl-sass.md) - 如何在WSK中使用Material Design Lite 的 Sass
* [部署向导](https://github.com/google/web-starter-kit/blob/master/docs/deploy.md) - 选择 Firebase、Google App Engine 或者其他的服务
* [Gulp使用方法](https://github.com/gulpjs/gulp/tree/master/docs/recipes) - Gulp的官方文档

##灵感
Web Starter Kit 的灵感来自于[Mobile HTML5 Boilerplate](https://html5boilerplate.com/mobile/)和 Yeoman的 [generator-gulp-webapp](https://github.com/yeoman/generator-webapp)，这两个项目是促成Web Starter Kit 主要原因，我们的[FAQs](https://github.com/google/web-starter-kit/wiki/FAQ) 讲解了使用WSK通常会问的问题。

##捐献
我们欢迎和鼓励大家对我们的项目进行捐献、提问和讨论，如果想为WSK贡献代码，在Pull Request之前请阅读我们的[贡献向导](https://github.com/google/web-starter-kit/blob/master/CONTRIBUTING.md)，[网站](https://developers.google.com/web/tools/starter-kit/) 相关问题请到 [Web Fundamentals](https://github.com/google/WebFundamentals/issues/new) 跟进。

## 协议
Apache 2.0  
Copyright 2015 Google Inc
