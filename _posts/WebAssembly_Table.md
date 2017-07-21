---
layout: post
title: "[译]什么是 WebAssembly table imports？"
category: WebAssembly
date: 2017-07-21 23:54:00
---

这是系列文章：

*[使用 JavaScript 创建一个 WebAssembly 模块的实例](https://fanmingfei.com/posts/WebAssembly_Instance.html)。
*[WebAssembly 中的 Memory](https://fanmingfei.com/posts/WebAssembly_Memory.html)
*[什么是 WebAssembly table？](https://fanmingfei.com/posts/WebAssembly_Table.html)

***


在第一篇文章中，我介绍了 WebAssembly 可以导入的四中不同的类型。

*   values

*   function

*   memory

*   tables

最后一个可能有点陌生。什么是 table import，它有什么用呢？

有时在程序中，你想要有一个变量指向一个函数，就像一个回调。然后你可以把它传递给其他的方法。

[![Defining a callback and passing it into a function](http://p0.qhimg.com/t013f3283d610d13d62.png)](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/07/03-01.png)

在 C 语言中，这叫做函数指针。函数存在内存中。变量，函数指针，只是指向该内存地址。

[![Function pointer at memory address 4 points to the callback at memory address 1](http://p0.qhimg.com/t01443ce0dad73dcbec.png)](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/07/03-02.png)

如果需要，以后可以将变量指向一个不同的函数。这应该是一个熟悉的概念。

[![Function pointer at memory address 4 changes to point to callback2 at memory address 4](http://p0.qhimg.com/t015624ec75c5304983.png)](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/07/03-03.png)

在 web 页面中，所有的方法都是 JavaScript 对象而且由于它们是 JavaScript 对象，所以它们存在于 WebAssembly 内存之外的内存地址中。

[![JS function living in JS managed memory](http://p0.qhimg.com/t018d5df01e553a649e.png)](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/07/03-04.png)

如果我们想要一个指向其中一个函数的变量，我们需要把它的地址放在我们的内存中。

[![Function pointer in WebAssembly memory pointing to function](http://p0.qhimg.com/t01375e1e5405704164.png)](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/07/03-05.png)

保证网页安全的一部分是保证内存地址的不可见。你不希望页面上的代码可以看到或操作这些内存地址。如果页面上有恶意代码，它可以使用修改内存来创建漏洞。

例如，它可能会更改你的内存地址，以指向不同的内存位置。

那么当你尝试调用这个函数的时候，你会加载攻击者给你的内存地址。

[![Malicious actor changing the address in WebAssembly memory to point to malicious code](http://p0.qhimg.com/t01a71d9f6cf5dcc633.png)](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/07/03-06.png)

可能是以某种方式插入到内存中的恶意代码，可能嵌入到字符串中。

Tables 可能实现类似函数指针的东西，这样不容易受到这些攻击的影响。

Table 是存在于 WebAssembly 内存之外的数组。它的值是对函数的引用。

[![Another region of memory is added, distinct from WebAssembly memory, which contains the function pointer](http://p0.qhimg.com/t01a9163d03ad9b400b.png)](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/07/03-07.png)

这些引用包含内存地址，但由于它不在 WebAssembly 的内存中，WebAssembly 不能看到这些地址。

但它确实可以访问数组索引。

[![All memory outside of the WebAssembly memory object is obfuscated](http://p0.qhimg.com/t0164f8cf596f6cb980.png)](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/07/03-08.png)

如果 WebAssembly 模块想要调用这些函数，它将该索引传递给一个名为`call_indirect`的操作。这样就可以调用函数了。

[![call_indirect points to the first element of the obfuscated array, which in turn points to the function](http://p0.qhimg.com/t0125978a342d28a2f2.png)](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/07/03-09.png)

现在，Table 的用例非常有限。它被添加到用于支持函数指针的规范中，因为C/C++非常依赖函数指针。

所以，当前唯一可以使用table来引用的只有函数但是随着WebAssembly扩展的功能，例如，当添加对DOM的直接访问时，你可能将会看到Table上存储着其他的类型的引用，和除了`call_indirect`之外的操作。

## About

[Lin Clark](http://code-cartoons.com)

Lin 是Mozilla Developer Relations团队的工程师。她使用 JavaScript、WebAssembly、Rust 和 Servo，也画一些漫画。