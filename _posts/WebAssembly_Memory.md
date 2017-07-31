---
layout: post
title: "[译]WebAssembly 中的 Memory"
category: WebAssembly
date: 2017-07-21 23:54:00
---

> 英文原文：[https://hacks.mozilla.org/2017/07/memory-in-webassembly-and-why-its-safer-than-you-think/](https://hacks.mozilla.org/2017/07/memory-in-webassembly-and-why-its-safer-than-you-think/)

这是系列文章：

* [使用 JavaScript 创建一个 WebAssembly 模块的实例](https://fanmingfei.com/posts/WebAssembly_Instance.html)。
* [WebAssembly 中的 Memory](https://fanmingfei.com/posts/WebAssembly_Memory.html)
* [什么是 WebAssembly table？](https://fanmingfei.com/posts/WebAssembly_Table.html)

***

WebAssembly中的内存与JavaScript中的内存有所不同。使用WebAssembly，您可以直接访问原始字节码...这可能令人担忧。但是，它的确比你想象中的要安全。

### 什么是 memory 对象？

当 WebAssembly 模块被实例化时，它需要一个 memory 对象。你可以创建一个新的WebAssembly.Memory并传递该对象。如果没有创建 memory 对象，在模块实例化的时候将会自动创建，并且传递给实例。

JS引擎创建一个ArrayBuffer（我在另一篇文章中解释）来做这件事情。ArrayBuffer 是 JS 引用的 JavaScript 对象。JS 为你分配内存。你告诉它需要多少内存，它会创建一个对应大小的ArrayBuffer。

[![React.js requesting a new memory object and JS engine creating one](http://p0.qhimg.com/t01ec0c97c63f7d3af5.png)](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/07/02-01.png)

数组的索引可以视为内存地址。如果你需要增加它的内存，你可以使用 `grow` 方法让数组变大。

ArrayBuffer 做了两件事情，一件是做 WebAssembly 的内存，另外一件是做 JavaScript 的对象。

1.  它使 JS 和 WebAssembly 之间传递内容更方便。

2.  使内存管理更安全。

### JS 和 WebAssembly 之间传值

因为 ArrayBuffer 是一个 JavaScript 对象，这意味着 JavaScript 也可以获取到这个 memory 中的字节。所以通过这种方式， WebAssembly 和 JavaScript 可以共享内存，并且相互传值。

使用数组索引来访问每个字节，而不是使用内存地址。

比如，WebAssembly 想将一个字符串写入内存。它需要将字符串转换成字节码。

[![WebAssembly robot putting string "Hello" through decoder ring](http://p0.qhimg.com/t01a59cccabeb12770e.png)](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/07/02-02.png)

然后把这些字节码放进数组。

[![WebAssembly robot putting bytes into memory](http://p0.qhimg.com/t016f618191c2712a45.png)](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/07/02-03.png)

然后将字符串所在的内存位置的第一个位置，也就是数组的某个索引，传递给 JavaScript。JavaScript 可以根据索引从 ArrayBuffer 中拿到字符串

[![WebAssembly robot returning index of first byte in string](http://p0.qhimg.com/t018163cb0ae6c93d11.png)](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/07/02-04.png)

现在，很多人并不知道如何在 JavaScript 中使用字节码。你需要将字节码转换为有用的内容，比如说字符串。

在一些浏览器中，你可以使用[TextDecoder](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder)和[TextEncoder](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder)API来处理。或者你可以在你的js文件里添加一些帮助函数。比如，[Emscripten](https://github.com/kripken/emscripten)就可以帮你添加编码和解码的方法。

[![JS engine pulling out bytes, and React.js decoding them](http://p0.qhimg.com/t01890a8ce1a7a7127f.png)](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/07/02-05.png)

所以，WebAssembly memory 最好的地方就是它是一个 JS 对象。WebAssembly 和 JavaScript 可以直接使用 memory 互相传值。

### 让 memory 存取更安全

另外一个好处是，WebAssembly memory 只是一个 JavaScript 对象：安全。通过防止浏览器级内存泄漏并提供内存隔离，使事情变得更安全。

#### 内存泄漏

正如我在内存管理的文章中提到的，当你管理自己的内存时，你可能会忘记清除它。这可能导致系统内存不足。

如果 WebAssembly 模块实例直接访问内存，并且如果在超出范围之前忘记清除该内存，那么浏览器可能会泄漏内存。

因为内存对象只是一个JavaScript对象，所以它本身就被垃圾回收器跟踪（尽管它的内容不会垃圾回收）。

也就是说，WebAssembly 实例被移除以后，所有的内存数组将会被回收。

[![Garbage collector cleaning up memory object](http://p0.qhimg.com/t01c7849172f8b31f45.png)](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/07/02-06.png)

#### 内存隔离

当人们听到WebAssembly让你直接访问内存时，他们可能有点紧张。他们认为，一个恶意的 WebAssembly 模块可能会进入并在内存中干坏事，这是绝对不允许的。但事实并非如此。

ArrayBuffer 提供了边界。WebAssembly 模块可以直接管理的内存是受限制的。

[![Red arrows pointing to the boundaries of the memory object](http://p0.qhimg.com/t0184c5417b37507df6.png)](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/07/02-07.png)

它可以直接管理该数组内部的字节，但它看不到任何超出此数组范围的内容。

例如，内存中的任何其它 JS 对象，如 window 对象，WebAssembly无法访问。这对安全性非常重要。

每当 WebAssembly 中有操作内存时，引擎会进行数组限制检查，以确保该地址位于 WebAssembly 实例的内存中。

如果代码尝试访问超出范围的地址，引擎将抛出异常。这保护了其它的内存。

[![WebAssembly trying to store out of bounds and being rejected](http://p0.qhimg.com/t01697df6c15636743d.png)](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/07/02-08.png)

所以这就是 memory 相关的内容。在下一篇文章中，我们将看研究一些关于安全性的其它类型的 import 数据：[table import](https://fanmingfei.com/posts/WebAssembly_Table.html)。

## About

[Lin Clark](http://code-cartoons.com)

Lin 是Mozilla Developer Relations团队的工程师。她使用 JavaScript、WebAssembly、Rust 和 Servo，也画一些漫画。