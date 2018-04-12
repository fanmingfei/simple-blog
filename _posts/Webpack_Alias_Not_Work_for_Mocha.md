---
layout: post
title: "Webpack 中配置的 alias 在 Mocha 测试用例中失效的解决方案"
category: JavaScript
date: 2018-04-12 11:30:00
---

## 背景

在日常开发中，有些模块层级太深，在使用的时候可能会写成 

```javascript
import mod from '../../../../a/deep/folder/mod'
```

为了解决这种问题，我们使用 webpack 的 [resolve.alias](https://webpack.js.org/configuration/resolve/) 能力，对目录进行命名：

```javascript
{
    resolve: {
        alias: {
             mod:  path.resolve(__dirname, 'src/a/deep/folder/mod')
        }
    }
}
```

在使用中，可以直接使用下面这种方式引入

```javascript
import module from 'mod'
```

## 问题

**蛋疼的地方来了**

使用 Mocha 进行单元测试：

```javascript
mocha --compilers js:babel-core/register test/specs/**/*Test.js
```

我们通过 Babel 进行编译后测试，遇到了问题，Mocha 并不能读取到 Webpack 内配置的 alias，所以一直提示找不到 mod 模块。

```bash
module.js:557
    throw err;
    ^

Error: Cannot find module 'mod'
    at Function.Module._resolveFilename (module.js:555:15)
    at Function.Module._load (module.js:482:25)
    at Module.require (module.js:604:17)
    at require (internal/module.js:11:18)
...
```


## 解决

搜索了各种方案，在一个不起眼的地方看到了一个方案，使用 Babel 插件：[babel-plugin-webpack-aliases](https://www.npmjs.com/package/babel-plugin-webpack-aliases)

.babelrc 文件

```javascript
"plugins": [
    [ "babel-plugin-webpack-aliases", { "config": "./webpack.config.test.js" } ]
]
```

在 Mocha 测试之前会通过 Babel 进行编译，编译时会通过 `babel-plugin-webpack-aliases` 插件以支持 webpack 中的 alias。

## 其他解决方案

[mocha-webpack](https://www.npmjs.com/package/mocha-webpack) 在 Mocha 测试之前，通过 webpack 进行预编译。