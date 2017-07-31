---
layout: post
title: "[译]使用JavaScript创建一个WebAssembly模块的实例"
category: WebAssembly
date: 2017-07-20 23:54:00
---

> 英文原文：[https://hacks.mozilla.org/2017/07/creating-a-webassembly-module-instance-with-javascript/](https://hacks.mozilla.org/2017/07/creating-a-webassembly-module-instance-with-javascript/)

这是系列文章：

* [使用 JavaScript 创建一个 WebAssembly 模块的实例](https://fanmingfei.com/posts/WebAssembly_Instance.html)。
* [WebAssembly 中的 Memory](https://fanmingfei.com/posts/WebAssembly_Memory.html)
* [什么是 WebAssembly table？](https://fanmingfei.com/posts/WebAssembly_Table.html)

***

WebAssembly是[在Web上运行代码的新途径](https://www.w3ctech.com/topics/3)。使用它，你可以使用C/C++编写一些模块，并在浏览器上运行

目前，模块不能自动运行。随着ES模块的发展，浏览器逐步开始支持ES模块。WebAssembly 模块将会像加载 ES 模块一样被加载。比如：`<script type="module">`。

不过现在，你需要使用 JavaScript 来加载运行 WebAssembly 模块。首先创建一个 WebAssembly 模块的实例。然后，JavaScript 可以调用 WebAssembly 实例上的方法。

例如，我们来看看[React 如何实例化 WebAssembly模块](https://www.youtube.com/watch?v=3GHJ4cbxsVQ)。（可以看这个视频来了解 [React 如何实例化 WebAssembly 模块](https://www.youtube.com/watch?v=3GHJ4cbxsVQ)。）

用户加载页面这个过程都是相同的。

页面加载以后，浏览器开始下载JS文件。然后，一个 .wasm 文件将会被请求。这个文件里包含了二进制的 WebAssembly 代码。

[![Browser downloading a .js file and a .wasm file](http://p0.qhimg.com/t01a67073d8f8c946a6.png)](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/07/1-1.png)

我们学要加载这些代码文件才能运行它们。首先是 .js 文件，使用 React 的 JavaScript 文件。JavaScript 将会创建 WebAssembly 模块的实例。

需要使用 WebAssembly.instantiate 方法来创建实例。

[![React.js robot calling WebAssembly.instantiate](http://p0.qhimg.com/t01c1a5587e598b5695.png)](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/07/1-2.png)

我们来仔细看看这个。

第一步，.wasm 文件里的代码其实就是模块代码，我们将从 .wasm 文件中的二进制代码传递给`WebAssembly.instantiate`。

所以我们需要将二进制代码转换成buffer，并且传递给 `WebAssembly.instantiate` 方法。

[![Binary code being passed in as the source parameter to WebAssembly.instantiate](http://p0.qhimg.com/t0106d299c60399d146.png)](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/07/1-03.png)

然后，引擎就会将这个模块编译成当前的机器所能运行的东西。

但是我们不想让它在主线程运行。主进程已经非常忙了，因为它要处理 JavaScript、DOM、layout。我们不想占用主线程，所以，`WebAssembly.instantiate` 返回一个 promise。

[![Promise being returned as module compiles](http://p0.qhimg.com/t01d2e826b45bfd1e69.png)](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/07/1-04.png)

这样，主进程就可以去做一些别的事情了。一旦模块实例化完成，主进程就会拿到 promise 返回的实例。

如果创建一个实例，你还需要其它的参数。我觉得模块就像是王者荣耀的装备合成图谱。

实例就像是合成后的装备。如果想合成一个高级装备，需要一些低级装备。所以我们需要一些其它的东西才能实例化一个 WebAssembly 模块。

[![Instruction book next to WebAssembly robot](http://p0.qhimg.com/t014976edecffd9caba.png)](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/07/1-05.png)

也就是`WebAssembly.instantiate`的第二个参数。这是一个需要导入到 WebAssembly 实例的对象：`import object`。

[![Arrow pointing to importObject param of WebAssembly.instantiate](http://p0.qhimg.com/t01f1c91fb7bc40e195.png)](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/07/1-06.png)

我们将 `import object` 当做低级装备。使用这些低级装备（这些`import object`）来构建实例。就像装备打造图谱一样，每一个 WebAssembly 模块都需要特殊的 imports。

[![Imports box next to WebAssembly robot](http://p0.qhimg.com/t01505d1d3b87f495f5.png)](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/07/1-07.png)

所以，如果你想实例化一个模块的话，你需要传入这个对象。传入的对象的属性值可以是一下几种类型：

*   values

*   function closures

*   memory

*   tables

#### Values

它可以是一个变量。WebAssembly 的数据类型只有两种，int 类型和 float 类型，所以 values 必须是这两种类型中的一种。当然 WebAssembly 规范如果增加了其它类型，这里就会变化。

#### Function closures

我们也可以传递函数闭包。也就是说，你传递一个 JavaScript 函数过去，WebAssembly 可以调用。

这非常的有用，因为当前版本的 WebAssembly 不能直接调用 DOM 方法。直接修改 DOM 在 WebAssembly 的规划中，不过现在规范里还没有。

你可以通过传递 JavaScript 函数过去，让 WebAssembly 调用，达到修改DOM的目的。所以 WebAssembly 可以调用一个 JS 函数

#### Memory

另外一个类型是 memory 对象。这个对象可以让 WebAssembly 模拟手动内存管理。Memory 对象的概念让人感到困惑，所以我在另一篇文章中进一步深入了解，这是本系列的下一篇文章。

#### Tables

最后可以导入的类型和安全有关。它叫做 table。它可以让你使用叫做函数指针。这个东西比较复杂，将会在这个系列文章中的第三篇中讲述。

这是所有你可以导入 WebAssembly 实例的类型。

[![Different kinds of imports going into the imports box](http://p0.qhimg.com/t017e575195fca9809a.png)](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/07/1-08.png)

`WebAssembly.instantiate` 的状态变为 resolved。它返回了两个内容：一个实例，和一个编译后的模块。

返回一个编译后的模块的好处是你可以随时拿它来生成一个新的实例。你只需要将 `WebAssembly.instantiate` 的`source` 这个参数替换成拿到的 module 来生成实例。模块本身没有任何状态。也就是说，编译后的模块可以生成很多实例。

你的实例已经整装待发。你可以调用它的方法。

[![WebAssembly robot is booted](http://p0.qhimg.com/t01fa40a366ec5b1515.png)](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/07/1-09.png)

下一篇将会深入去讲解[memory import](https://hacks.mozilla.org/2017/07/memory-in-webassembly-and-why-its-safer-than-you-think/)和[table import](https://fanmingfei.com/posts/WebAssembly_Memory.html)。

## About

[Lin Clark](http://code-cartoons.com)

Lin 是Mozilla Developer Relations团队的工程师。她使用 JavaScript、WebAssembly、Rust 和 Servo，也画一些漫画。