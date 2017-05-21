---
layout: post
title: "什么是 Transducer"
category: JavaScript
date: 2017-05-21 14:24:00
---

# 什么是 Transducer

> 本文转载自：[众成翻译](http://www.zcfy.cc)

> 译者：[明非](http://www.zcfy.cc/@edire)

> 链接：[http://www.zcfy.cc/article/2819](http://www.zcfy.cc/article/2819)

> 原文：[http://raganwald.com/2017/04/30/transducers.html](http://raganwald.com/2017/04/30/transducers.html)

[![a matrix dream](http://p0.qhimg.com/t0189b9915264f6b35f.jpg)](https://www.flickr.com/photos/gi/127757006)

在[使用迭代器编写高可组合代码](http://raganwald.com/2017/04/19/incremental.html)中，我们看到[staged approach](http://raganwald.com/2017/04/19/incremental.html#I)的数据转换方法是被分解的，但是复制了整个数据集。而[single pass approach](http://raganwald.com/2017/04/19/incremental.html#II)更有效率，但代码是混乱不清晰的。

现在我们来看一个有趣的转换方法来实现代码的可组合，而不会导致内存损失，transducer。

我们先来看看 reducing：

* * *

### reducers

**reducer**函数接收一个集合和一个值，它将这个值加入到集合中。比如，如果 `[1,2,3]` 是一个 `集合`，`4` 是将要被添加到集合的一个值， 执行 `(acc, val) => acc.concat([val])`通过这个reducer将返回`[1,2,3,4]`：

    const acc = [1, 2, 3];
    const val = 4;
    const reducer = (acc, val) => acc.concat([val]);

    reducer(acc, val)
      ///=> 1, 2, 3, 4

`(acc, val) => acc.concat([val])`是一个 reducer，它可以将一个数组和一个值连接。

`(acc, val) => acc.add(val)`也是一个同样的 reducer，`.add`是将一个值插入到这个集合后面。它适用于任何有`.add`事件，并且执行`.add`事件后返回自身的对象，比如 Set.prototype.add：

    const acc = new Set([1, 2, 3]);
    const val = 4;
    const reducer = (acc, val) => acc.add(val);

    reducer(acc, val)
      ///=> Set{1, 2, 3, 4}

这里有一个函数，使用我们的之前创建的reducer，可以让任何可迭代的数据变成数组。

    const toArray = iterable => {
      const reducer = (acc, val) => acc.concat([val]);
      const seed = [];
      let accumulation = seed;

      for (value of iterable) {
        accumulation = reducer(accumulation, value);
      }

      return accumulation;
    }

    toArray([1, 2, 3])
      //=> [1, 2, 3]

我们可以创建一个`reduction`函数，将`reducer`和`seed`（初始值）变量作为参数。

    const reduce = (iterable, reducer, seed) => {
      let accumulation = seed;

      for (const value of iterable) {
        accumulation = reducer(accumulation, value);
      }

      return accumulation;
    }

    reduce([1, 2, 3], (acc, val) => acc.concat([val]), [])
      //=> [1, 2, 3]

值得庆幸的是，JavaScript正在逐渐发展成一个编写函数的惯例，如`reduce`方法一般先传一个reducer当做参数。根据[JavaScript Allongé](https://leanpub.com/javascriptallongesix)编码风格，我们可以这样写：

    const reduceWith = (reducer, seed, iterable) => {
      let accumulation = seed;

      for (const value of iterable) {
        accumulation = reducer(accumulation, value);
      }

      return accumulation;
    }

    reduce([1, 2, 3], (acc, val) => acc.concat([val]), [])
      //=> [1, 2, 3]

    // becomes:

    reduceWith((acc, val) => acc.concat([val]), [], [1, 2, 3])
      //=> [1, 2, 3]

在JavaScript中，数组有一个`.reduce`方法，它的行为与`reduce`和`reduceWith`比较像：

    [1, 2, 3].reduce((acc, val) => acc.concat([val]), [])
      //=> [1, 2, 3]

现在，`(acc, val) => acc.concat([val])` 会产生大量新的数组，占用内存，我们可以使用`(acc,val) => { acc.push(val);return acc;}` .([1](#fn:comma))

无论哪种方式，我们都能获得的是将一个值加到数组最后面的reducer。我们给这个方法一个名字：

    const arrayOf = (acc, val) => { acc.push(val); return acc; };

    reduceWith(arrayOf, [], [1, 2, 3])
      //=> [1, 2, 3]

这有另外一个reducer：

    const sumOf = (acc, val) => acc + val;

    reduceWith(sumOf, 0, [1, 2, 3])
      //=> 6

我们可以编写一个reducer，它将可迭代的数据（如数组）通过reduce转变为另一种类型（如数字）。

* * *

### 装饰reducer

使用JavaScript写一个返回值是一个函数的函数比较容易。这里有一个reducer：

    const joinedWith =
      separator =>
        (acc, val) =>
          acc == '' ? val : `${acc}${separator}${val}`;

    reduceWith(joinedWith(', '), '', [1, 2, 3])
      //=> "1, 2, 3"

    reduceWith(joinedWith('.'), '', [1, 2, 3])
      //=> "1.2.3"

JavaScript编写以函数为参数的函数也很容易。

在JavaScript中，装饰器函数可以接受一个函数作为参数，然后返回一个对传过来的函数进行包装的函数。比如，这个方法获取一个`binaryFn`，然后将函数包装成第二个参数加`1`的另外一个函数。

    const incrementSecondArgument =
      binaryFn =>
        (x, y) => binaryFn(x, y + 1);

    const power =
      (base, exponent) => base ** exponent;

    const higherPower = incrementSecondArgument(power);

    power(2, 3)
      //=> 8

    higherPower(2, 3)
      //=> 16

`power`被装饰后，指数（第二个参数）+1，返回一个方法，我们将它赋值给`higherPower`。因此，调用`higherPower(2, 3)`其实是调用了`power(2, 4)`。当然，我们一直在使用`binaryFn`。这里的 reducer 是 `binaryFn`。我们可以装饰它吗？当然！

    reduceWith(incrementSecondArgument(arrayOf), [], [1, 2, 3])
      //=> [2, 3, 4]

    const incremented =
      iterable =>
        reduceWith(incrementSecondArgument(arrayOf), [], iterable);

    incremented([1, 2, 3])
      //=> [2, 3, 4]

* * *

### mappers

上面的代码，我们生成了一个_mapper_函数，他接收可迭代的集合，返回一个原数据基础上，每一个数据+1的集合。但是我们当然要做的不仅仅是把每个数据增加1。让我们单独看一下`incrementSecondArgument`：

    const incrementSecondArgument =
      binaryFn =>
        (x, y) => binaryFn(x, y + 1);

当我们装饰reducers的时候，多起一些有意义的名字。

    const incrementValue =
      reducer =>
        (acc, val) => reducer(acc, val + 1);

现在，我们可以看到`incrementValue`获得了一个reducer作为参数，然后返回一个第二个参数+1的reducer。我们可以提取出`val+1`当做一个方法为一个参数：

    const map =
      fn =>
        reducer =>
          (acc, val) => reducer(acc, fn(val));

    const incrementValue = map(x => x + 1);

    reduceWith(incrementValue(arrayOf), [], [1, 2, 3])
      //=> [2, 3, 4]

虽然看起来不太习惯这样写，一个函数需要函数作为参数，然后返回一个参数是函数的函数（译者注：这的确很绕，看一看上面那段代码应该可以明白）。我们可以用`map(x => x + 1)`替换`incrementValue`，可以写成：

    reduceWith(map(x => x + 1)(arrayOf), [], [1, 2, 3])
      //=> [2, 3, 4]

因为我们的`map`装饰器可以装饰任何reducer，我们可以将1-3变成一个字符串或者进行累加：

    reduceWith(map(x => x + 1)(joinedWith('.')), '', [1, 2, 3])
      //=> "2.3.4"

    reduceWith(map(x => x + 1)(sumOf), 0, [1, 2, 3])
      //=> 9

直到这里，我们可以计算1到10的数字的平方和是多少：

    const squares = map(x => power(x, 2));
    const one2ten = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    reduceWith(squares(sumOf), 0, one2ten)
      //=> 385

[![Pythagoras Tree](http://p0.qhimg.com/t01838d66cb999b04fb.png)](https://commons.wikimedia.org/wiki/File:Pythagoras_tree_1_1_13_Summer.svg)

* * *

### 过滤器

我们看我们写的第一个reducer：

    const arrayOf = (acc, val) => { acc.push(val); return acc; };

    reduceWith(arrayOf, 0, one2ten)
      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

我们怎么滤掉小于等于5的数字，获得一个所有数都大于5的数组。这很简单：

    const bigUns = (acc, val) => {
      if (val > 5 ) {
        acc.push(val);
      }
      return acc;
    };

    reduceWith(bigUns, [], one2ten)
      //=> [6, 7, 8, 9, 10]

当然，我们可以通过之前写的squares方法将大于5的数进行平方：

    reduceWith(squares(bigUns), [], one2ten)
      //=> [9, 16, 25, 36, 49, 64, 81, 100]

显然，这并不是我们想要的！我们想要进行_平方_计算的是大于5的数，而这种方法返回的是平方后大于5的数。我们想先选出数字来，然后在进行平方。这很容易完成，我们想要的装饰器是选择数字，我们可以使用它来装饰reducer：

    reduceWith(squares(arrayOf), [], one2ten)
      //=> [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

    const bigUnsOf =
      reducer =>
        (acc, val) =>
          (val > 5) ? reducer(acc, val) : acc;

    reduceWith(bigUnsOf(squares(arrayOf)), [], one2ten)
      //=> [36, 49, 64, 81, 100]

`bgUnsOf`是相当具体的。我们可以将它写成`map`一样，我们来提取判定函数：

    reduceWith(squares(arrayOf), [], one2ten)
      //=> [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

    const filter =
      fn =>
        reducer =>
          (acc, val) =>
            fn(val) ? reducer(acc, val) : acc;

    reduceWith(filter(x => x > 5)(squares(arrayOf)), [], one2ten)
      //=> [36, 49, 64, 81, 100]

这样我们就可以制作各种过滤器。比如：

    reduceWith(filter(x => x % 2 === 1)(arrayOf), [], one2ten)
      //=> [1, 3, 5, 7, 9]

有了这一切，从1到10的奇数的平方和是：

    reduceWith(filter(x => x % 2 === 1)(squares(sumOf)), 0, one2ten)
      //=> 165

* * *

### “转换器”和组合

其他的编程社区给这种把参数转换成其他东西的函数起了个名字：他们称之为“转换器”。我们所说的装饰器是一种特殊的转换器，因此，如果有人谈到“转换器”是把一个reducer转换成另外一个reducer，就像我们之前所看到的，我们使用了一个叫“装饰器”的东西，将reducer添加了一些额外的功能，比如 map 或者 filter。

之前我们讨论过的mapper和filters都是转换器。在这种编程模式的下，转换器的一个基本特征是它将多个转换器组合成一个新的转换器。复习一下，这里有一个方法组合任何两个函数：

    const plusFive = x => x + 5;
    const divideByTwo = x => x / 2;

    plusFive(3)
      //=> 8

    divideByTow(8)
      //=> 4

    const compose2 =
      (a, b) =>
        (...c) =>
          a(b(...c));

    const plusFiveDividedByTwo = compose2(divideByTwo, plusFive);

    plusFiveDividedByTwo(3)
      //=> 4

为什么说转换器合并成一个新的转换器？就是说，我们使用`compose2`组合了任何两个转换器，得到一个新的转换器来转换一个reducer。所以：

    const squaresOfTheOddNumbers = compose2(
      filter(x => x % 2 === 1),
      squares
    );

    reduceWith(squaresOfTheOddNumbers(sumOf), 0, one2ten)
      //=> 165

`squaresOfTheOddNumbers`转换器是由filter和mapper合并而来。

组装装饰器，让我们将复杂和高度耦合的代码分解成有意义的更小的单元。

* * *

### 通过转换器组合

刚刚我们知道了组合两个转换器，我们是否可以组合任意数量的函数呢？这里有一个可行的reduction：

我们开始将之前的 `compose2`重写成转换器，`compositionOf`：

    `const compositionOf = (acc, val) => (...args) => val(acc(...args));`

我们可以写一个 `compose` 来获取reduction的参数。

    const compose = (...fns) =>
      reduceWith(compositionOf, x => x, fns);

* * *

### 所以，什么是transducer呢？

将reduction写成这种样式：

    `reduceWith(squaresOfTheOddNumbers(sumOf), 0, one2ten)`

可以发现，执行这个方法时的参数分成了四个元素：一个reducer转换器（或许是一个转换器组合），一个seed，一个可迭代数据。如果我们把它们分为单独的参数，我们得到：.([2](#fn:xf))

    const transduce = (transformer, reducer, seed, iterable) => {
      const transformedReducer = transformer(reducer);
      let accumulation = seed;

      for (const value of iterable) {
        accumulation = transformedReducer(accumulation, value);
      }

      return accumulation;
    }

    transduce(squaresOfTheOddNumbers, sumOf, 0, one2ten)
      //=> 165

读到这里你可以了解到：reducer 是你将要传递给.reduce的函数——他需要一个数据集和一个新的数据，返回一个新的数据集。转换器是一个将reducer转换成另外一个reducer的函数。和一个transducer（“转换器”加“reducer”，明白了吗？）是一个参数为一个转换器、一个reducer、一个seed外加一个可迭代数据，并通过reduce变成一个值。

transducer模式的优雅之处在于转换器自然组合生产新的转换器。所以我们可以连接尽可能多的transformer，最终得到一个转换过的reducer，我们只需要迭代一次集合。我们不需要为集合创建副本，也不需要多次迭代数据。

Transducer的概念来自[Clojure](https://clojure.org/reference/transducers)编程社区，但是您可以发现，它在JavaScript也非常实用，并且使用JavaScript实现起来非常简单。

那么，如果有人问我们什么是“transducer”，我们现在可以回复：

![What's the problem?](http://p0.qhimg.com/t0150e091404f29c073.png)

* * *

### 最后

我们编写transducer的代码是非常紧凑和优雅的：

    const arrayOf = (acc, val) => { acc.push(val); return acc; };

    const sumOf = (acc, val) => acc + val;

    const setOf = (acc, val) => acc.add(val);

    const map =
      fn =>
        reducer =>
          (acc, val) => reducer(acc, fn(val));

    const filter =
      fn =>
        reducer =>
          (acc, val) =>
            fn(val) ? reducer(acc, val) : acc;

    const compose = (...fns) =>
      fns.reduce((acc, val) => (...args) => val(acc(...args)), x => x);

    const transduce = (transformer, reducer, seed, iterable) => {
      const transformedReducer = transformer(reducer);
      let accumulation = seed;

      for (const value of iterable) {
        accumulation = transformedReducer(accumulation, value);
      }

      return accumulation;
    }

它涵盖了我们目前用于数组所使用的所有情况：.map，.filter和.reduce，组合后的transducer不会产生数据集的任何副本。可以使用transducer来实现一些常用的方法（比如`.find`功能），产出一个JavaScript库。

其他的库有这样搞的：`transduce`函数假定数据集是可迭代的，它要求我们提供seed和reducer。在大多数情况下，同一类型的所有集合的种子和reducer函数是相同的。

当然，OOP已经使用多态的解决了这个问题。类库提供了方法，所以如果你调用正确的方法，你会得到正确的返回值。Production-class libraries 给我们提供了可视化的集合类型来让transducer的操作更加优雅。

但是，这足以掌握transducer模式，再次拥抱语言把函数当做一等公民的美好远景。

* * *

### transducer方法来跟踪用户转换

（请参阅使用迭代器编写高度可编写的代码。）

    const logContents = `1a2ddc2, 5f2b932
    f1a543f, 5890595
    3abe124, bd11537
    f1a543f, 5f2b932
    f1a543f, bd11537
    f1a543f, 5890595
    1a2ddc2, bd11537
    1a2ddc2, 5890595
    3abe124, 5f2b932
    f1a543f, 5f2b932
    f1a543f, bd11537
    f1a543f, 5890595
    1a2ddc2, 5f2b932
    1a2ddc2, bd11537
    1a2ddc2, 5890595`;

    const asStream = function * (iterable) { yield * iterable; };

    const lines = str => str.split('\n');
    const streamOfLines = asStream(lines(logContents));

    const datums = str => str.split(', ');
    const datumize = map(datums);

    const userKey = ([user, _]) => user;

    const pairMaker = () => {
      let wip = [];

      return reducer =>
        (acc, val) => {
          wip.push(val);

          if (wip.length === 2) {
            const pair = wip;
            wip = wip.slice(1);
            return reducer(acc, pair);
          } else {
            return acc;
          }
      }
    }

    const sortedTransformation =
      (xfMaker, keyFn) => {
        const decoratedReducersByKey = new Map();

        return reducer =>
          (acc, val) => {
            const key = keyFn(val);
            let decoratedReducer;

            if (decoratedReducersByKey.has(key)) {
              decoratedReducer = decoratedReducersByKey.get(key);
            } else {
              decoratedReducer = xfMaker()(reducer);
              decoratedReducersByKey.set(key, decoratedReducer);
            }

            return decoratedReducer(acc, val);
          }
      }

    const userTransitions = sortedTransformation(pairMaker, userKey);

    const justLocations = map(([[u1, l1], [u2, l2]]) => [l1, l2]);

    const stringify = map(transition => transition.join(' -> '));

    const transitionKeys = compose(
      stringify, justLocations, userTransitions, datumize
    );

    const countsOf =
      (acc, val) => {
        if (acc.has(val)) {
          acc.set(val, 1 + acc.get(val));
        } else {
          acc.set(val, 1);
        }
        return acc;
      }

    const greatestValue = inMap =>
      Array.from(inMap.entries()).reduce(
        ([wasKeys, wasCount], [transitionKey, count]) => {
          if (count < wasCount) {
            return [wasKeys, wasCount];
          } else if (count > wasCount) {
            return [new Set([transitionKey]), count];
          } else {
            wasKeys.add(transitionKey);
            return [wasKeys, wasCount];
          }
        }
        , [new Set(), 0]
      );

    greatestValue(
      transduce(transitionKeys, countsOf, new Map(), streamOfLines)
    )
      //=>
        [
          "5f2b932 -> bd11537",
          "bd11537 -> 5890595"
        ],
        4

* * *

### 进一步阅读

* * *

### 笔记

1.  `（acc，val）=>（acc.push（val），acc）`在语义是令人赏心悦目的，但是不经常逗号操作符会有些不习惯，最好避免在生产代码中。[↩](#fnref:comma)
2.  在一些编程社区中，对于字符有很强的保护意识，所以tarnsformer缩写为xform甚至xf。如果你看到像`(xf,reduce,seed,coll)`或 `xf((val,acc) => acc) -> (val,acc) => acc`不要惊讶。这篇文章没有这么写，我们在生产代码中也没有像xf或xform这样的名称。[↩](#fnref:xf)