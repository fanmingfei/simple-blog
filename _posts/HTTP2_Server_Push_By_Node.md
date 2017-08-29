---
layout: post
title: "[译]使用 Node.js 进行 HTTP/2 Server Push"
date: 2017-08-29 15:39:20
category: Other
---

> 原文：[https://blog.risingstack.com/node-js-http-2-push](https://blog.risingstack.com/node-js-http-2-push)

Node.js 8.4.0 开始实验性的支持HTTP/2，可以使用`--expose-http2`参数来启用。

在这篇博客中，我们将要介绍HTTP/2的服务端推送并且创建一个小的Node.js 应用来进行尝试。

## 关于 HTTP/2

HTTP/2的主要目标是通过启用完整的请求和响应复用来**减少延迟**，通过HTTP头域的高效压缩来最大限度地减少协议开销，并增加对请求优先级和服务器推送的支持。

了解更多关于 HTTP/2，请阅读 [HTTP/2 介绍](https://developers.google.com/web/fundamentals/performance/http2/)。

## Server Push

HTTP/2 Server Push 可以让服务器在用户允许的情况下，主动向浏览器发送资源。

> 在我们使用 HTTP/2 之前，让我们了解一下 HTTP/1 如何实现：

在HTTP/1中，客户端向服务器发送一个请求，通常是一个 HTML 文件，里面包含着很多资源的链接_（.js、.css 等文件）_，服务器根据这些链接返回资源。当浏览器处理这个初始 HTML 文件时，它开始解析这些链接，并分别请求它们。

下面的图片演示了这个过程。请注意时间表上的独立请求以及这些请求的启动时间：

![HTTP 1.1 in Node.js](http://p0.qhimg.com/t01d1d73a37aa7d925a.png)

HTTP/1 资源加载

这是HTTP/1的工作原理，我们使用这种方式开发应用已经很多年了。为什么要改变呢？

当前方法的问题是，用户必须等待浏览器解析相应，获取链接并且加载资源。这样延缓渲染并且增加加载时间。有一些解决方案，如内联一些资源，但这样让初始的相应变得更大、更慢。

> 这是使用 HTTP/2 Server Push 的图片，服务器可以在资源甚至要求之前将资源发送给浏览器。

下面这张图展示的是相同的网页，在 HTTP/2 下访问的情况。检查一下时间轴和初始化内容。您可以看到 HTTP/2 通过复用减少了请求数量，并且资源与初始请求一起立即发送。

![HTTP/2 with Server Push in Node.js](http://p0.qhimg.com/t010af5c7cb8da06f1f.png)

HTTP/2 Server Push

让我们看一下如何通过 Node.js 使用 HTTP/2 Server Push 来提升客户端加载时间。

## Node.js HTTP/2 Server Push 例子

通过要求内置的 http2 模块，我们可以创建我们的服务器，就像我们使用 https 模块一样。

有趣的部分是在请求 index.html 时推送其他资源：
```
const http2 = require('http2')  
const server = http2.createSecureServer(  
  { cert, key },
  onRequest
)

function push (stream, filePath) {  
  const { file, headers } = getFile(filePath)
  const pushHeaders = { [HTTP2_HEADER_PATH]: filePath }

  stream.pushStream(pushHeaders, (pushStream) => {
    pushStream.respondWithFD(file, headers)
  })
}

function onRequest (req, res) {  
  // Push files with index.html
  if (reqPath === '/index.html') {
    push(res.stream, 'bundle1.js')
    push(res.stream, 'bundle2.js')
  }

  // Serve file
  res.stream.respondWithFD(file.fileDescriptor, file.headers)
}
```
通过这种方法，`bundle1.js`和`bundle2.js`将会在没有被请求的时候bei推送到浏览器。

整个例子可以点击这里查看：[https://github.com/RisingStack/http2-push-example](https://github.com/RisingStack/http2-push-example)