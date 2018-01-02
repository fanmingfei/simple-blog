---
layout: post
title: "使用 webpack/rollup/browserify 支持 WebAssembly 引入"
category: WebAssembly
date: 2017-04-16 00:00:00
---

随着 WebAssembly 迅速的发展，网络上关于 WebAssembly 的文章和工具越来越多。

今天推荐三个常用构建工具支持文件引入 `wasm` 的方法。分别通过 Webpack/Rollup/Browserify 来支持。

## wasm 文件

在这个介绍开始之前，我们需要一个 `wasm` 文件来确保我们接下来的事情可以正常进行，作为 Demo，我们可以通过 [WasmExplorer](https://mbebenita.github.io/WasmExplorer/) 或者 [WasmFiddle](https://wasdk.github.io/WasmFiddle/) 来生成一个。

为了方便，我们使用 WasmFiddle：
打开 [WasmFiddle](https://wasdk.github.io/WasmFiddle/) 在左边输入 C 语言代码：

```
extern int log (int num);
void test () {
  log(1234567890);
}
```

这段代码的意思是：

- 我们定义一个 `log` 方法，这个 `log` 方法是 JavaScript 传过来的
- 定义一个函数 `test`，当执行函数 test 的时候，将会调用 `log` 方法，并且传递 1234567890 作为参数。

点击上方的 Build，如果成功，可以看到左下角出现与之对应的 `wast` 代码，然后点击 `wast` 上面一行的 `wasm` 下载按钮。这样我们就把一个简单的 `wasm` 下载下来了。

如果我们不用下面我将要介绍的工具，我们引入并调用的代码将会是这样的：

```
const importObject = {
    env: {
        log: (num) => console.log(num)
    }
};

fetch('./program.wasm')
    .then(result => result.arrayBuffer())
    .then(buffer => new WebAssembly.Module(buffer))
    .then(module => new WebAssembly.Instance(module, importObject))
    .then(instance => instance.exports.test())

```

- 我们创建了一个 `importObject`，其中有一个 `env` 属性里面有个 `log` 方法，这就是我们要传递给 wasm 的方法。
- 获取出 `program.wasm` 的内容，调用 `arrayBuffer()` 返回文件的 `ArrayBuffer`
- 使用 `new WebAssembly.Module(ArrayBuffer)` 获取 `wasm` 的 module
- 通过 `new WebAssembly.Instance(module, importObject)` 创建一个实例
- 调用实例 `exports` 上的 `test()`



## Webpack  

wasm-loader 早在今年三月份就出现了，它支持你的 JS 文件可以以 ES Module 的形式引入 .wasm 文件，使用起来非常简单。

首先需要安装 webpack loader：

```
npm install --save wasm-loader
```

在 webpack.config.js 中引入 loader：

```
loaders: [
    {
        test: /\.wasm$/,
        loaders: ['wasm-loader']
    }
]
```

那么，我们在 JS 文件中就可以直接引入 `wasm` 文件了！

```
import wasm from './program.wasm'

const importObject = {
    env: {
        log: (num) => console.log(num)
    }
};
wasm(importObject)
    .then(({instance, module})=> instance.exports.test())
```

## Rollup

与 webpack 的 wasm-loader 相比，Rollup 的更能更为广泛。

你既可以直接在文件中引入 `wasm` 文件，也可以引入可以编译成 `wasm` 文件的源代码，比如 C, C++, Wat, Rust。

安装方式：

```
npm i -D rollup-plugin-wasm
```




​