---
layout: post
title: 使用 Ant Design + dva 构建小型前端项目 (一)
category: 工具&框架
date: 2017-04-24 17:33:00
---
## 前言
去年11月的时候接手了一个小型的后台系统，负责前端开发，团队经过研究选择了从来没有用过的 [Ant Design](https://ant.design/index-cn)，作为一门设计语言([什么是设计语言](https://www.zhihu.com/question/47144626/answer/121635402))，如果我们此次项目使用 Ant Design 获得收益，我们以后所有的新的 To B 业务 ([To B 业务具体指什么](https://www.zhihu.com/question/37841619))将继续使用这门设计语言。

虽然说 Ant Design 是一门设计语言，但官方给我们提供了一套基于 Ant Design 开发出来的完整的 React UI 组件库，并且提供了一套完整的解决方案。

官方提供了一套 npm + webpack 的解决方案来辅助开发，主要工具也是阿里大神开发的 [dva](https://github.com/dvajs/dva)，dva 是一个基于 react 和 redux 的轻量应用框架，具体可参考[项目实战](https://ant.design/docs/react/practical-projects-cn)。

在去年11月做项目的时候，dva 的版本还是 0.x，时至今日，已经升级到1.x，使用方法也不一样了。

这是本系列的第一篇文章，主要根据 dva 来搭建起目录结构。

## dva 简介

基于 [redux](https://github.com/reactjs/redux)、[redux-saga](https://github.com/yelouafi/redux-saga) 和 [react-router@2.x](https://github.com/ReactTraining/react-router/tree/v2.8.1) 的轻量级前端框架。

可以查看 [快速开始](https://github.com/dvajs/dva/blob/master/docs/GettingStarted.md)

dva 的数据流向
![](https://camo.githubusercontent.com/c826ff066ed438e2689154e81ff5961ab0b9befe/68747470733a2f2f7a6f732e616c697061796f626a656374732e636f6d2f726d73706f7274616c2f505072657245414b62496f445a59722e706e67)

具体参考：[dva 概念](https://github.com/dvajs/dva/blob/master/docs/Concepts_zh-CN.md)

dva 在 v1.0 以后使用了 [roadhog](https://github.com/sorrycc/roadhog) 来作为项目脚手架，用来负责管理本地开发服务以及项目编译等。

## 创建项目

使用 dva 创建一个初始项目，项目会自动创建一个 demo。

```
npm install -g dva-cli
mkdir demo && cd demo
dva init
```

![](http://p3.qhimg.com/t017231fc68f3785c69.jpg)


## 代码目录结构

- `mocks` Mock 数据存放的位置
- `public` 静态页面存放的位置
- `src` 代码目录
    - `assets` 资源目录，一些通用的 css/images
    - `components` 对应的是 dva 里面的 Component。
    - `models` 对应的是 dva 里面的 Model。
    - `routes` 是各个页面的入口，这里来引用功能所需的组件。
    - `services` 里面定义一些基础服务，比如 API 请求、错误处理、事件系统、弹窗提醒等服务。
    - `utils` 存放一些工具方法或类
- `.roadhogrc` roadhog的配置文件。
- `.roadhogrc.mock.js` 管理 Mock 数据的地方

拿我大学在的社团鲁大学生网的最新版 Android App 举例

![](http://p6.qhimg.com/t011ddf5c3a872ac23e.jpg)

首先分析一下功能：

暂时先看我截图的几个内容

- 首页
- 成绩查询
- 小e快报
- 二手市场
- 失物招领
- 心愿墙
- 求助

抛去首页和成绩查询外，其它功能都有列表页和详情页。其实都是可以抽象化成文章的发布和展示（这里我并没有截图发布相关的页面）。

## Model

如果使用面向对象模式，我可能会创建一个文章的模型，不同的功能都来继承这个模型，添加不同的属性和方法。

但现在看来只是一些简简单单的数据展示，每条数据没有太多需要用户操作的地方，我们可以使用 dva 提供给我们的 Model 来实现数据的展示和更新。

看起来我们不仅仅是需要这些内容，有些文章是可以评论的，我们是否需要一个评论的 Model 呢？

那我们可以看一下具体需要哪些 Model 了

![](http://p0.qhimg.com/t013da4d0860a0bf518.jpg)

## Route

Model 搞定了，我们开始创建 Route。

其实这里的 Route 也是一个 Component，只不过是用来为不同的功能引用不用的 Component 的中转站，用来提供给 router.js 文件当做功能入口的。

如果我们每个功能的页面都要创建一个 Router 的话，我们可能会创建很多。我们可以通过需要展示的文章类型来创建 Route。

所以我把所有类似文章类型的列表使用一个 Route，然后在 Route 里面来根据类型引用不同的 Component。

另外还需要一个首页。

![](http://p6.qhimg.com/t0143a1ca3a2a1d9619.jpg)

> 备注：所有的 Component 我们都用大驼峰的命名方法命名，与里面的 React 组件名称保持一直。

## Component

Router 的内容不是很多，只有 3 个文件，感觉很薄，主要还是要在Component这里了。

Component 这边主要是根据业务来提供一些展示数据用的组件。

回想一下刚刚网站上的一些功能，总结我们需要的模块：

### 首页

首页只是一个九宫格，只是一些简单的页面，不需要什么逻辑。

### 文章类页面

这里要考虑文章的类型，是把文章按照类型分成不同的 Component，还是统统使用一个 Component 呢？

从文章列表来看，这四种文章的页面展示都不太一样，内容也不太一样，那难道我们真的是要每种文章类型使用不同的 Component 吗？

好吧，我们看一下有哪些比较通用的部分吧，既然不能在这文章类型一层进行统一，那我们看看里面会不会有重复的东西。

可以发现，把 `用户信息（头像+名字+时间）` 提取出来当做一个 Component，仔细观察，发现还有文章的浏览次数和评论的展示部分，评论也可以抽出来。

### 通用型

刚刚提到的

- 用户信息（头像+名字+时间）
- 浏览次数
- 评论

观察其它相关内容

- 右下角的 `+` 按钮
- 标题栏
- 搜索功能


### 创建文件

好吧，先整理这些，为这些 Component 创建目录和文件

![](http://p5.qhimg.com/t017007dec43aeede72.jpg)

我们把强业务相关的放在 `bussiness` 文件夹内，通用的放在 `common` 里。

`helps` 里的 arc.js/list.js 分别代表文章页和列表页，其它文章类 component 也类似，`less` 文件分别是它们的样式文件。

## Service

目前来说初期阶段，还没有太多的基础服务，在业务开发中，需要通用服务的地方会越来越多。

比如一定会需要一个服务来请求API，不管是使用 XMLHttpRequest 还是 Fetch。

未来可能还需要通用弹窗服务、通用错误服务，还会有更多贴近业务的服务。

## Mock

建议每一个模块的mock文件分开写，这样不容易乱掉。

![](http://p5.qhimg.com/t01bf73e9dbcb4f2286.jpg)


## 总结

举例的这个系统并不大，主要还是以数据展示为主，并没有特别多的数据操作和数据依赖关系以及数据处理相关的事务，所以实现起来还是相对简单。

这篇文章主要讲了目录结构的和组件的创建，还没有叙述如何连接使用，下篇文章将会连接 Route/Component/Model。