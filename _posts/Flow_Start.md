---
layout: post
title: "开始使用 Flow 来进行类型检查"
category: JavaScript
date: 2017-07-28 18:00:00
---

## 介绍

前些日子在拜读 VueJS 源码时发现，VueJS 的源码中给变量和参数声明了类型，这也引起了我在未来项目中使用类型检查工具的想法。本着抄起家伙就是干，在我最新的开源项目中，我引入了 VueJS 使用的 Flow 做类型检查。

众所周知，JavaScript 是弱类型语言，并且类型非常宽松。这使我们在编写 JavaScript 代码的时候非常爽，从来不用去担心 IDE 的类型报错，不需要定义函数接收参数的类型。每一个项目的启动，都是一场狂欢，我们在没有类型约束的语言里荡漾，去放纵，去狂妄。代码日增，功能渐多，迎来了一次又一次的羁绊，我徜徉，我彷徨。

在同一个项目中，现在的你和两个星期之前的你可能不是同一个人。两个星期前我创造了一个函数，这个函数接收一个对象作为参数，我利用传进来的对象做了一系列不可描述的事情，然后返回了一个新的对象。今天，我使用这个函数的时候，突然发现，我已然忘记我将要构造一个什么结构的对象当做参数，也不记得这个函数返回的对象里有哪些属性了。

那么，Flow 是如何做到类型检查的呢？

在 C#/Java 等强类型语言中，所有的变量、属性、参数是需要对其定义类型的，也需要对函数的返回值进行类型定义。这样，在程序编译过程中，编译器就会进行类型检查，如果类型不匹配，将会终止编译。也就是说，变量存储的数据自始至终必须是一种类型、函数接收的变量类型也被固定，如果在调用函数时传递其它类型，编译会被中断。

第一步：

我们要模仿 C#/Java 之类的语言，在编码过程中对类型进行定义。举个例子：

```js
function getStringLength(str: string):number {
    const len: number = str.length;
    return len;
}
```

虽然看起来没有什么用，但可以简单讲述如何定义类型了。这个函数接收一个 `string` 类型的参数，参数名为 `str`，函数的返回值是 `number` 类型。定义了一个类型为 `number` 的常量 `len`，它的值为 `str` 的长度，并且将其返回。

我们写了一段简单的根据 Flow 的规则，进行类型声明的代码。


第二步：

通过 Flow 提供的工具进行类型检查。如果有类型不匹配的地方，工具会提示错误。工具安装和使用方式将会在后文提到。

第三步：
但是，发布到线上的代码是不能加类型声明的，因为这样不符合规范，浏览器也不认。所以，我们需要对源代码进行一次编译，将所有声明的类型去掉，像正常的 JS 代码一样了。

上面的代码编译过后将会变成：

```js
function getStringLength(str) {
    const len = str.length;
    return len;
}
```

## 安装

从上文中，我们可以发现，使用 Flow 至少需要两个东西，一个是检查工具，另外一个是编译器。检查工具类似一个命令行工具，每次需要检查类型的时候就去执行一下。而编译器，就是将你的源码转换成浏览器可读的代码。

类型检查其实就是 Flow 要做的事情，安装 `flow-bin`，即可在项目中使用。当然也可以安装在全局，在命令行中使用。

Flow 提供两种编译方式：一种是基于 Babel 的，Flow 提供了一个 Babel 规则 `babel-preset-flow`，结合 Babel 对源代码进行编译；如果项目中没有用到 Babel 可以使用 `flow-remove-types` 来编译。

这些工具都可以使用 npm 或 yarn 来安装。

安装和配置过程可以参考[官网教程](https://flow.org/en/docs/install/)。

## 配置

在项目创建以后，我们需要初始化 Flow 的配置。我们使用 `flow init` 命令来初始化 Flow。当然，如果你没有安装到全局的话，只能使用 `node_modules` 里面的命令了，我们这里来把 `flow-bin` 安装到全局环境中。

进入项目根目录，执行以下命令。

```
// 将 flow 命令安装到全局环境中
npm install -g flow-bin

// 初始化 flow
flow init
```

执行完以后，会在当前目录生成一个 `.flowconfig` 文件，这是 Flow 的配置文件。默认有以下几个配置项：

```
[ignore]

[include]

[libs]

[options]

[lints]
```

在 `.flowconfig` 文件生成以后，就可以在项目中使用 flow 命令来检查代码了。

### [ignore]
Flow 默认检查项目目录下所有文件，但是有很多文件必定是我们不想检查的，就像 `node_modules`、`build` 等目录下的文件，所以我们需要在将这些目录写在 `ignore` 配置下。


### [include]
所谓的项目目录其实是 `.flowconfig` 目录，并不是真正的项目目录，如果我们在这个项目中的某个目录下创建一个 `.flowconfig`，那么 `.flowconfig` 所在的目录也会变为一个 Flow 项目。那么，如果我们想对当前 Flow 项目以外的文件或者目录进行检查，需要把它们写在 `include` 配置项中。

### [libs]
在项目中，我们可能会用到很多自定义的类型，比如说本文开始所提到对要记录对象的结构，它可能在每个文件中都会被运用到，我们将其抽取为全局的类型或数据结构，在任何文件都可以使用。为了管理方便，我们将全局类型都定义在一个或多个单纯的目录中统一管理。

这里存放的有可能是一个定义好的数据结构，存放的也有可能是根据项目中某个类对应的数据类型。

我们将这些文件或目录写在 `libs` 配置项中。

### [options]
这里填写对 Flow 项目的一些配置，配置项以`key=value`的形式，每行写一个。所有的配置见[官方文档](https://flow.org/en/docs/config/options/)

### [lints]
官网中没有提到 lints 相关的配置，但在[某次提交](https://github.com/facebook/flow/commit/319cddf221078b32558f20c5389cf6f72364255f) 添加了大量相关代码，留作后续观察。

## 检查

Flow 默认会检查以 `// @flow`开头，一个被注释掉的 `@flow` 为第一行的文件。

比如：

index.js

```js
// @flow
function getStringLength(str: string):number {
    const len: number = str.length;
    return len;
}
getStringLength('abcdfeg');
```

以 `// @flow` 开头的文件会被检查。

如果不愿意那么麻烦，想检查全部文件，那么可以修改配置文件`.flowconfig`，在`[options]`配置项中添加 `all=ture`。
```
[ignore]
[include]
[libs]
[options]
all=true
[lints]
```

`[libs]` 配置项中的文件不需要添加`// @flow`，它们都将被检查。

使用 flow 命令检查：

```
flow
```

使用 `flow`后，会创建一个 Flow 的服务：

```
$ flow
Launching Flow server for /Users/fanmingfei/flow_test
Spawned flow server (pid=2304)
Logs will go to /private/tmp/flow/zSUserszSrenxiangleizSa.log
```

以后每次执行 `flow` 的时候，会在当前这个服务下进行检查，除非执行 `flow stop` 停止服务，或者修改 `.flowconfig` 文件。

每次执行 `flow` 后，都会对当前所监控对文件中对类型进行检查。比如：

```js
// @flow
function getStringLength(str: string):number {
    const len: number = str.length;
    return len;
}
getStringLength('abcdfeg');
```

```
$ flow
No errors!
```

如果为少做修改，更改`getStringLength`所传递的参数类型：
```js
// @flow
function getStringLength(str: string):number {
    const len: number = str.length;
    return len;
}
getStringLength(20170729);
```

```
$ flow
Error: index.js:6
  6: getStringLength(20170729);
                     ^^^^^^^^ number. This type is incompatible with the expected param type of
  2: function getStringLength(str: string):number {
                                   ^^^^^^ string


Found 1 error
```

将告诉我们类型错误的位置。

## 编译

其实官方文档中已经有介绍如何[安装编译工具](https://flow.org/en/docs/install/)了，只要针对你所需要的场景进行配置就行了。

## 类型注释

上面简单的介绍个如何初始化一个项目，以及简单的用法。但是，使用 Flow 的过程中，最主要的还是要对我们对代码进行类型注释。Flow 有着很强大对类型判断和推理能力。

初始化 Flow 项目我们已经搞定，对于具体到项目中的代码，我们可以去参考一些有针对性的文章或者官方文档中的[类型注释](https://flow.org/en/docs/types/)章节，简单易懂。


