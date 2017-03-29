---
layout: post
title: "JavaScript void 关键字"
date: 2017-03-29 10:26:44
category: JavaScript
---


<blockquote>
     转自众成翻译：<a href="http://www.zcfy.cc/article/2620">http://www.zcfy.cc/article/2620</a>
     原文链接：<a href="http://cmichel.io/javascript-void-keyword/">http://cmichel.io/javascript-void-keyword/</a>
</blockquote>

看这是啥语言？

```
void function foo()
{
    // ...
}

```

是的，JavaScript，从文章标题里就知道了。最近在[consistent return](http://eslint.org/docs/rules/consistent-return) ESLint 规则中发现了 `void` 关键字。

## [#](#what-does-js-void-do)JS 里的 void 干了啥?

[`void`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/void) 后面跟一个表达式，整条语句执行后返回 `undefined`。

我承认，我认为这没啥用，虽然少写了一点代码。

再看一次 [consistent return](http://eslint.org/docs/rules/consistent-return) ESLint 规则。他的表明函数_总是_返回一个值或者不返回内容（也就是在 JavaScript 函数中，返回 undefined）。

比如，你在使用 **Express** 的一个中间件，并且你想使用 `next()` 调用下一个中间件，而且不想在后面执行其他的代码，所以你可能会写 `return next()`。


```
function middleware(next) {
  somethingAsync((err, value) => {
    // call next and return from this callback on error
    // 在错误的时候调用并返回 next
    if (err) return next(err)

    // otherwise do something with value
    // 否则做一些其他的事情
    database.save(value)

    // returns undefined implicitly here
    // => consistent-return violated, because no return here,
    // but in the error branch we return the (unknown) return value of next

    // 这里虽然没有写return undefined 其实返回了undefined
    // => 这违反了 consistent-return， 因为这里没有 return。
    // 如果在走进上面错误的if分支，我们将会返回一个未知的next的返回值。
  })
}

```


然而，我们的错误分支也许返回一个值，但这个函数通常不会返回任何值。这里有些不好的地方，原因是这个方法的调用者可能需要这个函数的返回值，并不是next的返回值，这样会造成返回值的不统一。

为了避免困惑，我们可以写成：

```
if (err) {
    next(err)
    return
}

```

或者使用 `void` 关键字，使其更短。


```
if (err) return void next(err)

```

这样写就没有歧义了，无论如何返回的都是 `undefined`。


## [#](#other-use-cases)其他用例


这里有 `void` 其他的几个用例。一个比较有意思的是结合IIFEs（immediately-invoked function expressions， 立即执行函数）去修改作用域内一个变量的值。你可以直接将 `function` 关键字作为表达式代替函数声明，并且通过 `()` 立即执行。

```
var foo = 1
void function() { foo = 2 } ()
console.log(foo) // 2

```

比起下面的代码，哪个读起来更好理解？

```
var foo = 1
(function() { foo = 2 }) ()
console.log(foo) // 2

```

## [#](#should-you-use-it) 你应该使用它吗？

在我看来，不用，这是一个非常没用的关键词。虽然他在某些时刻可以减少代码量，但是这让之前在 JavaScript 中没有听说过 `void` 关键字的人更难阅读和理解。
                