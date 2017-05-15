---
layout: post
title: "[译]图说 WebAssembly"
category: JavaScript
date: 2017-05-14 23:59:59
---

# 图说 WebAssembly

> 本文转载自：[众成翻译](http://www.zcfy.cc)

> 译者：[明非](http://www.zcfy.cc/@edire)

> 链接：[http://www.zcfy.cc/article/2799](http://www.zcfy.cc/article/2799)

> 原文：[https://www.smashingmagazine.com/2017/05/abridged-cartoon-introduction-webassembly/](https://www.smashingmagazine.com/2017/05/abridged-cartoon-introduction-webassembly/)

最近，WebAssembly 在 JavaScript 圈非常的火！人们都在谈论它多么多么快，怎样怎样改变 Web 开发领域。但是没有人讲他到底为什么那么快。在这篇文章里，我将会帮你了解 WebAssembly 到底为什么那么快。

第一，我们需要知道它到底是什么！WebAssembly 是一种可以使用非 JavaScript 编程语言编写代码并且能在浏览器上运行的技术方案。

[![Computer screen with JavaScript running on it](http://p0.qhimg.com/t01e3d9daa8e422a81d.png)](https://www.smashingmagazine.com/wp-content/uploads/2017/05/01-wasm_intro05-large-opt.png)

（[看大图](https://www.smashingmagazine.com/wp-content/uploads/2017/05/01-wasm_intro05-large-opt.png)）

当大家谈论起 WebAssembly 时，首先想到的就是 JavaScript。现在，我没有必须在 WebAssembly 和 JavaScript 中选一个的意思。实际上，我们期待开发者在一个项目中把 WebAssembly 和 JavaScript 结合使用。但是，比较这两者是有用的，这对你了解 WebAssembly 有一定帮助。

#### 拓展阅读阅读：

### 一点点性能历史

1995 年 JavaScript 诞生。它的设计时间非常短，前十年发展迅速。

紧接着浏览器厂商们就开始了更多的竞争。

2008年，人们称之为浏览器性能大战的时期开始了。很多浏览器加入了即时编译器，又称之为JITs。在这种模式下，JavaScript在运行的时候，JIT 选择模式然后基于这些模式使代码运行更快。  

这些 JITs 的引入是浏览器运行代码机制的一个转折点。所有的突然之间，JavaScript 的运行速度快了10倍。

[![Camparison JavaScript speed 1995 and 2008](http://p0.qhimg.com/t01e95afbf2a7776b9e.png)](https://www.smashingmagazine.com/wp-content/uploads/2017/05/02-perf_graph05-large-opt.png)

（[看大图](https://www.smashingmagazine.com/wp-content/uploads/2017/05/02-perf_graph05-large-opt.png)）

随着这种改进的性能，JavaScript 开始被用于意想不到的事情，比如使用Node.js和Electron构建应用程序。

现在 WebAssembly 可能是的另一个转折点。

[![JavaScript speed inflection point](http://p0.qhimg.com/t014903943e4e21fff9.png)](https://www.smashingmagazine.com/wp-content/uploads/2017/05/03-perf_graph10-large-opt.png)

（[看大图](https://www.smashingmagazine.com/wp-content/uploads/2017/05/03-perf_graph10-large-opt.png)）

在我们没有搞清楚 JavaScript 和 WebAssembly 之间的性能差前，我们需要理解 JS 引擎所做的工作。

### JavaScript 是如何在浏览器中运行的呢？

作为一个开发人员，您将JavaScript添加到页面时，您有一个目标并遇到一个问题。

*   目标：你想要告诉计算机做什么
*   问题：你和计算机使用不通的语言。

您说的是人类的语言，计算机说的是机器语言。尽管你不认为 JavaScript 或者其他高级语言是人类语言，但事实就是这样的。它们的设计是为了让人们认知，不是为机器设计的。

所以JavaScript引擎的工作就是把你的人类语言转化成机器所理解的语言。

我想到电影《Arrival》，这就像人类和外星人进行交谈。

[![Human and alien trying to talk to each other](http://p0.qhimg.com/t01a103838df9898ef4.png)](https://www.smashingmagazine.com/wp-content/uploads/2017/05/04-alien03-large-opt.png)

（[看大图](https://www.smashingmagazine.com/wp-content/uploads/2017/05/04-alien03-large-opt.png)）

在这部电影中，人类语言不能从逐字翻译成外星语言。他们的语言反映出两种对世界不同的认知。人类和机器也是这样。

所以，怎么进行翻译呢？  

在编程中，通常有两种翻译方法将代码翻译成机器语言。你可以使用解释器或者编译器。

使用解释器，翻译的过程基本上是一行一行及时生效的。

[![Interpreter](http://p0.qhimg.com/t0178a083867383e612.png)](https://www.smashingmagazine.com/wp-content/uploads/2017/05/05-interp02-large-opt.png)

（[看大图](https://www.smashingmagazine.com/wp-content/uploads/2017/05/05-interp02-large-opt.png)）

编译器是另外一种工作方式，它在执行前翻译。

[![Compiler](http://p0.qhimg.com/t01341dc95c4512dd99.png)](https://www.smashingmagazine.com/wp-content/uploads/2017/05/06-compile02-large-opt.png)

（[看大图](https://www.smashingmagazine.com/wp-content/uploads/2017/05/06-compile02-large-opt.png)）

每种翻译方法都有利弊。

#### 解释器的利弊

解释器很快的获取代码并且执行。您不需要在您可以执行代码的时候知道全部的编译步骤。因此，解释器感觉与 JavaScript  有着自然的契合。web 开发者能够立即得到反馈很重要。

这也是浏览器最开始使用 JavaScript 解释器的原因之一。

但是实用解释器的弊端是当nin运行相同的代码的时候。比如，您执行了一个循环。然后您就会一遍又一遍的做同样的事情。

#### 编译器的利弊

编译器则有相反的效果。在程序开始的时候，它可能需要稍微多一点的时间来了解整个编译的步骤。但是当运行一个循环的时候他会更快，因为他不需要重复的去翻译每一次循环里的代码。

因为解释器必须在每次循环访问时不断重新转换代码，作为一个可以摆脱解释器低效率的方法，浏览器开始将编译器引入。

不同的浏览器实现起来稍有不同，但是基本目的是相同的。他们给 JavaScript 引擎添加了一个新的部分，称为监视器（也称为分析器）。该监视器在 JavaScript 运行时监控代码，并记录代码片段运行的次数以及使用了那些数据类型。

如果相同的代码行运行了几次，这段代码被标记为 “warm”。如果运行次数比较多，就被标记为 “hot”。  
被标记为 “warm” 的代码被扔给基础编译器，只能提升一点点的速度。被标记为 “hot” 的代码被扔给优化编译器，速度提升的更多。

[![Hot code is put through an optimizing compiler, which speeds it up more.](http://p0.qhimg.com/t01404d6fb66c173e28.png)](https://www.smashingmagazine.com/wp-content/uploads/2017/05/07-jit09-large-opt.png)

（[看大图](https://www.smashingmagazine.com/wp-content/uploads/2017/05/07-jit09-large-opt.png)）

了解更多，可以读 [https://hacks.mozilla.org/2017/02/a-crash-course-in-just-in-time-jit-compilers/](https://hacks.mozilla.org/2017/02/a-crash-course-in-just-in-time-jit-compilers/)

### 耗时比较：JavaScript Vs. WebAssembly

这张图大致给出了现在一个程序的启动性能，目前 JIT 编译器在浏览器中很常见。

> 该图显示了 JS 引擎运行程序花费的时间。显示的时间并不是平均的。这个图片表明，JS 引擎做的这些任务花费的时间取决于页面中 JavaScript 做了什么事情。但是我们可以用这个图来构建一个心理模型。

[![Time spent on tasks](http://p0.qhimg.com/t01d258910c04295f80.png)](https://www.smashingmagazine.com/wp-content/uploads/2017/05/08-diagram_now01-large-opt.png)

（[看大图](https://www.smashingmagazine.com/wp-content/uploads/2017/05/08-diagram_now01-large-opt.png)）

每栏显示花费在特定任务上的时间。

*   Parsing - 讲源码转换成解释器可以运行的东西所用的事情。  

*   Compiling + optimizing - 花费在基础编译和优化编译上的时间。有一些优化编译的工作不在主线程，所以这里并不包括这些时间。
*   Re-optimizing - 当预先编译优化的代码不能被优化的情况下，JIT 将这些代码重新优化，如果不能重新优化那么久丢给基础编译去做。这个过程叫做重新优化。
*   Execution - 执行代码的过程
*   Garbage collection - 清理内存的时间  

一个重要的事情要注意：这些任务不会发生在离散块或特定的序列中。相反，它们将被交叉执行。比如正在做一些代码解析时，还执行者一些其他的逻辑，有些代码编译完成后，引擎又做了一些解析，然后又执行了一些逻辑，等等。

这种交叉执行对早期 JavaScript 的性能有很大的帮助，早期的 JavaScript 的执行就像下图一样：

[![Performance in the early days of JavaScript](http://p0.qhimg.com/t01f6684b1f2923c561.png)](https://www.smashingmagazine.com/wp-content/uploads/2017/05/09-diagram_past01-large-opt.png)

（[看大图](https://www.smashingmagazine.com/wp-content/uploads/2017/05/09-diagram_past01-large-opt.png)）

一开始，当只有一个解释器运行 JavaScript 时，执行速度相当缓慢。JITs 的引入，大大提升了执行效率。

监视和编译代码的开销是需要权衡的事情。如果 JavaScript 开发人员按照相同的方式编写JavaScript，解析和编译时间将会很小。但是，性能的提升使开发人员能够创建更大的JavaScript应用程序。

这意味着还有改进的余地。

下面是 WebAssembly 如何比较典型 web 应用。  

[![WebAssembly performance compared to a typical web application](http://p0.qhimg.com/t0118556b14dad96769.png)](https://www.smashingmagazine.com/wp-content/uploads/2017/05/10-diagram_future01-large-opt.png)

（[看大图](https://www.smashingmagazine.com/wp-content/uploads/2017/05/10-diagram_future01-large-opt.png)）

浏览器的 JS 引擎有轻微的不同。我是基于 SpiderMonkey 来讲。

#### 请求

这没有展示在图上，但是从服务器获取文件是会消耗时间的

下载执行与 JavaScript 等效的 WebAssembly 文件需要更少的时间，因为它的体积更小。WebAssembly 设计的体积更小，可以以二进制形式表示。

即使使用 gzip 压缩的 JavaScript文件很小，但 WebAssembly 中的等效代码可能更小。

所以说，下载资源的时间会更少。在网速慢的情况下更能显示出效果来。

#### 解析

JavaScript 源码一旦被下载到浏览器，源将被解析为抽象语法树（AST）。

通常浏览器解析源码是懒惰的，浏览器首先会解析他们真正需要的东西，没有及时被调用的函数只会被创建成存根。

在这个过程中，AST被转换为该 JS 引擎的中间表示（称为字节码）。

相反，WebAssembly 不需要被转换，因为它已经是字节码了。它仅仅需要被解码并确定没有任何错误。

[![Parse and decode in WebAssembly](http://p0.qhimg.com/t015e6718f2ff7c66d1.png)](https://www.smashingmagazine.com/wp-content/uploads/2017/05/11-diagram_compare02-large-opt.png)

（[看大图](https://www.smashingmagazine.com/wp-content/uploads/2017/05/11-diagram_compare02-large-opt.png)）

#### 编译 + 优化

如前所述，JavaScript 是在执行代码期间编译的。因为 JavaScript 是动态类型语言，相同的代码在多次执行中都有可能都因为代码里含有不同的类型数据被重新编译。这样会消耗时间。

相反，WebAssembly 与机器代码更接近。例如，类型是程序的一部分。这是速度更快的一个原因：

*   编译器不需要在运行代码时花费时间去观察代码中的数据类型，在开始编译时做优化。
*   编译器不需要去每次执行相同代码中数据类型是否一样。  

*   更多的优化在 LLVM 最前面就已经完成了。所以编译和优化的工作很少。

[![Compile and optimize in WebAssembly](http://p0.qhimg.com/t0190b85ed6cceff7a7.png)](https://www.smashingmagazine.com/wp-content/uploads/2017/05/12-diagram_compare03-large-opt.png)

（[看大图](https://www.smashingmagazine.com/wp-content/uploads/2017/05/12-diagram_compare03-large-opt.png)）

#### 重新优化

有时 JIT 抛出一个优化版本的代码，然后重新优化。

JIT 基于运行代码的假设不正确时，会发生这种情况。例如，当进入循环的变量与先前的迭代不同时，或者在原型链中插入新函数时，会发生重新优化。

在 WebAssembly 中，类型是明确的，因此 JIT 不需要根据运行时收集的数据对类型进行假设。这意味着它不必经过重新优化的周期。

[![WebAssembly doesn’t have to go through reoptimization cycles](http://p0.qhimg.com/t01f85bbda7b4a728b7.png)](https://www.smashingmagazine.com/wp-content/uploads/2017/05/13-diagram_compare04-large-opt.png)

（[看大图](https://www.smashingmagazine.com/wp-content/uploads/2017/05/13-diagram_compare04-large-opt.png)）

#### 执行

尽可能编写执行性能好的 JavaScript。所以，你可能需要知道 JIT 是如何做优化的。

然而，大多数开发者并不知道 JIT 的内部原理。即使是那些了解 JIT 内部原理的开发人员，也很难实现最佳的方案。有很多时候，人们为了使他们的代码更易于阅读（例如：将常见任务抽象为跨类型工作的函数）会阻碍编译器优化代码。

正因如此，执行 WebAssembly 代码通常更快。有些必须对 JavaScript 做的优化不需要用在 WebAssembly 上

另外，WebAssembly 是为编译器设计的。意思是，它是专门给编译器来阅读，并不是当做编程语言让程序员去写的。

由于程序员不需要直接编程，WebAssembly 提供了一组更适合机器的指令。根据您的代码所做的工作，这些指令的运行速度可以在10％到800％之间。

[![WebAssembly execute](http://p0.qhimg.com/t0129c6d52c15ef0b2a.png)](https://www.smashingmagazine.com/wp-content/uploads/2017/05/14-diagram_compare05-large-opt.png)

（[看大图](https://www.smashingmagazine.com/wp-content/uploads/2017/05/14-diagram_compare05-large-opt.png)）

#### 垃圾回收

在 JavaScript 中，开发者不需要担心内存中无用变量的回收。JS 引擎使用一个叫垃圾回收器的东西来自动进行垃圾回收处理。

这对于控制性能可能并不是一件好事。你并不能控制垃圾回收时机，所以它可能在非常重要的时间去工作，从而影响性能。

现在，WebAssembly 根本不支持垃圾回收。内存是手动管理的（就像 C/C++）。虽然这些可能让开发者编程更困难，但它的确提升了性能。

[![WebAssembly does not support garbage collection](http://p0.qhimg.com/t01cf19d5c383546563.png)](https://www.smashingmagazine.com/wp-content/uploads/2017/05/15-diagram_compare06-large-opt.png)

（[看大图](https://www.smashingmagazine.com/wp-content/uploads/2017/05/15-diagram_compare06-large-opt.png)）

总而言之，这些都是在许多情况下，在执行相同任务时WebAssembly 将胜过 JavaScript 的原因。

在某些情况下，WebAssembly 不能像预期的那样执行，还有一些更改使其更快。我在另一篇文章中[更深入地介绍了这些未来的功能](https://hacks.mozilla.org/2017/02/where-is-webassembly-now-and-whats-next/)。

### WebAssembly 是如何工作的？

现在，您了解开发人员为什么对 WebAssembly 感到兴奋，让我们来看看它是如何工作的。

当我谈到上面的 JIT 时，我谈到了与机器的沟通像与外星人沟通。

[![Human and alien trying to talk to each other](http://p0.qhimg.com/t018a0e0bd84a9b66bc.png)](https://www.smashingmagazine.com/wp-content/uploads/2017/05/16-human_alien-large-opt.png)

（[看大图](https://www.smashingmagazine.com/wp-content/uploads/2017/05/16-human_alien-large-opt.png)）

我现在想看看这个外星人的大脑如何工作 - 机器的大脑如何解析和理解交流内容。

这个大脑的一部分是专注于思考，例如算术和逻辑。有一部分脑部提供短期记忆，另一部分提供长期记忆。

这些不同的部分都有名字。

*   负责思考的部分是算术逻辑单元（ALU）。
*   短期储存由寄存器（Registers）提供。
*   随机存储器（或RAM）来提供长期储存能力。

[![RAM, ALU, Registers and CPU](http://p0.qhimg.com/t01b20109552ceccf13.png)](https://www.smashingmagazine.com/wp-content/uploads/2017/05/17-computer_architecture10-large-opt.png)

（[看大图](https://www.smashingmagazine.com/wp-content/uploads/2017/05/17-computer_architecture10-large-opt.png)）

机器码中的语句被称为指令。

当一条指令进入大脑时会发生什么？它被拆分成了多个的部分并有特殊的含义。

被拆分成的多个部分分别进入不同的大脑单元进行处理，这也是拆分指令所依赖的方式。

例如，这个大脑从机器码中取出4-10位，并将它们发送到 ALU。ALU进行计算，它根据 0 和 1 的位置来确定是否需要将两个数相加。

这个块被称为“操作码”，因为它告诉 ALU 执行什么操作。

[![Opcode](http://p0.qhimg.com/t012399026409b86ad0.png)](https://www.smashingmagazine.com/wp-content/uploads/2017/05/18-computer_architecture13-large-opt.png)

（[看大图](https://www.smashingmagazine.com/wp-content/uploads/2017/05/18-computer_architecture13-large-opt.png)）

那么这个大脑会拿后面的两个块来确定他们所要操作的数。这两个块对应的是寄存器的地址。

[![Register addresses](http://p0.qhimg.com/t01b2901f6632949323.png)](https://www.smashingmagazine.com/wp-content/uploads/2017/05/19-computer_architecture17-large-opt.png)

（[看大图](https://www.smashingmagazine.com/wp-content/uploads/2017/05/19-computer_architecture17-large-opt.png)）

请注意添加在机器码上面的标注（ADD R1 R2），这使我们更容易了解发生了什么。这就是汇编。它被称为符号机器码。这样人类也能看懂机器码的含义。

您可以看到，这个机器的汇编和机器码之间有非常直接的关系。每种机器内部有不同的结构，所以每种机器都有自己独有的汇编语言。

所以我们并不只有一个翻译的目标。  
相反，我们的目标是不同类型的机器码。就像人类说不同的语言一样，机器也有不同的语言。

您希望能够将这些任何一种高级编程语言转换为任何一种汇编语言。这样做的一个方法是创建一大堆不同的翻译器，可以从任意一种语言转换成任意一种汇编语言。

[![Translators that can go from each language to each assembly.](http://p0.qhimg.com/t01147116ae9b42b098.png)](https://www.smashingmagazine.com/wp-content/uploads/2017/05/20-langs05-large-opt.png)

（[看大图](https://www.smashingmagazine.com/wp-content/uploads/2017/05/20-langs05-large-opt.png)）

这样做的效率非常低。为了解决这个问题，大多数编译器会在高级语言和汇编语言之间多加一层。编译器将把高级语言翻译成一种更低级的语言，但比机器码的等级高。这就是中间代码（IR）。

[![Intermediate representation](http://p0.qhimg.com/t01a3082bedd6be95b0.png)](https://www.smashingmagazine.com/wp-content/uploads/2017/05/21-langs06-large-opt.png)

（[看大图](https://www.smashingmagazine.com/wp-content/uploads/2017/05/21-langs06-large-opt.png)）

意思就是编译器可以将任何一种高级语言转换成一种中间语言。然后，编译器的另外的部分将中间语言编译成目标机器的汇编代码。

编译器的“前端”将高级编程语言转换为IR。编译器的“后端”将 IR 转换成目标机器的汇编代码。

[![IR](http://p0.qhimg.com/t01563931f19d4052a3.png)](https://www.smashingmagazine.com/wp-content/uploads/2017/05/22-langs10-large-opt.png)

（[看大图](https://www.smashingmagazine.com/wp-content/uploads/2017/05/22-langs10-large-opt.png)）

#### WebAssembly 适合在哪里使用？

您可能会将 WebAssembly 当做是另外一种目标汇编语言。这是真的，这些机器语言（x86，ARM等）中的每一种都对应于特定的机器架构。

当你的代码运行在用户的机器的 web 平台上的时候，你不知道你的代码将会运行在那种机器结构上。

所以 WebAssembly 和别的汇编语言是有一些不同的。所以他是一个概念机上的机器语言，不是在一个真正存在的物理机上运行的机器语言。

正因如此，WebAssembly 指令有时候被称为虚拟指令。它比 JavaScript 代码更快更直接的转换成机器代码，但它们不直接和特定硬件的特定机器代码对应。

在浏览器下载 WebAssembly后，使 WebAssembly 的迅速转换成目标机器的汇编代码。

[![Targeting the machine’s assembly code](http://p0.qhimg.com/t019949c4e0d7cd3c62.png)](https://www.smashingmagazine.com/wp-content/uploads/2017/05/23-langs08-large-opt.png)

（[看大图](https://www.smashingmagazine.com/wp-content/uploads/2017/05/23-langs08-large-opt.png)）

如果想在您的页面里上添加 WebAssembly，您需要将您的代码编译成 .wasm 文件。

### 编译到 .wasm 文件

当前对 WebAssembly 支持最多的编译器工具链称是 LLVM。有许多不同的“前端”和“后端”可以插入到 LLVM 中。

注意：大多数 WebAssembly 模块开发者使用 C 和 Rust 编写代码，然后编译成 WebAssembly，但是这里有其他创建 WebAssembly 模块的途径。比如，这里有一个实验性工具，他可以帮你[使用 TypeScript 创建一个 WebAssembly 模块](https://github.com/rsms/wasm-util)，你可以在[这里直接编辑WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format)。

架设我们想通过 C 来创建 WebAssembly。我们可以使用 clang “前端” 从 C 编译成 LLVM 中间代码。当它变成 LLVM 的中间代码（IR）以后，LLVM 可以理解他，所以 LLVM 可以对代码做一些优化。

如果想让 LLVM 的 IR 变成 WebAssembly，我们需要一个 “后端”。目前 LLVM 项目中有一个正在开发中的。这个“后端”对做这件事情很重要，应该很快就会完成。可惜，它现在还不能用。

另外有一个工具叫做 Emscripten，它用起来比较简单。它还可以有比较有用的可以选择，比如说由 IndexDB 支持的文件系统。

[![Compiler toolchain](https://www.smashingmagazine.com/wp-content/uploads/2017/05/24-toolchain07-opt.png)](http://p0.qhimg.com/t017e3ca870c9d84649.png)

（[看大图](https://www.smashingmagazine.com/wp-content/uploads/2017/05/24-toolchain07-large-opt.png)）

不管你使用的什么工具链，最终的结果都应该是以 .wasm 结尾的文件。来让我们看一下如何将它用在你的 web 页面。

### 在 JavaScript 中加载一个 .wasm 组件

.wasm 文件是 WebAssembly 组件，它可以被 JavaScript 加载。到目前为止，加载过程有点复杂。

    function fetchAndInstantiate(url, importObject) {
      return fetch(url).then(response =>
        response.arrayBuffer()
      ).then(bytes =>
        WebAssembly.instantiate(bytes, importObject)
      ).then(results =>
        results.instance
      );
    }

您可以在[文档](https://developer.mozilla.org/en-US/docs/WebAssembly)中更深入地了解这些。

我们正在努力使这个过程更容易。我们期望对工具链进行改进，并与现有的模块管理工具（如Webpack）或加载器（如SystemJS）相结合。我相信，加载 WebAssembly 模块越来越简单，就像加载 JavaScript 一样。

但是，WebAssembly模块和JS模块之间存在重大差异。目前，WebAssembly 中的函数只能使用 WebAssembly 类型（整数或浮点数）作为参数或返回值。

[![Functions in WebAssembly can only use WebAssembly types](http://p0.qhimg.com/t01e2868f23596df57e.png)](https://www.smashingmagazine.com/wp-content/uploads/2017/05/25-memory04-large-opt.png)

（[看大图](https://www.smashingmagazine.com/wp-content/uploads/2017/05/25-memory04-large-opt.png)）

对于任何更复杂的数据类型（如字符串），必须使用 WebAssembly 模块的内存。

如果你之前主要使用 JavaScript，可能对于直接访问内存是不熟悉的。C，C ++和Rust等性能更高的语言往往具有手动内存管理功能。WebAssembly 模块的内存模拟这些语言中的堆。

为此，它使用 JavaScript 中称为 ArrayBuffer。ArrayBuffer 是一个字节数组。因此，数组的索引作为内存地址。

如果要在 JavaScript 和 WebAssembly 之间传递一个字符串，需要将字符转换为等效的字符码。然后你需要将它写入内存数组。由于索引是整数，所以可以将索引传递给 WebAssembly 函数。因此，字符串的第一个字符的索引可以当作指针。

[![Index and WebAssembly function](http://p0.qhimg.com/t01b992fcc551764ea1.png)](https://www.smashingmagazine.com/wp-content/uploads/2017/05/26-memory12-large-opt.png)

（[看大图](https://www.smashingmagazine.com/wp-content/uploads/2017/05/26-memory12-large-opt.png)）

任何人开发的 WebAssembly 模块很可能被 Web 开发人员使用并为该模块创建一个的装饰器。这样，您当做用户来使用这个模块就不需要考虑内存管理的事情了。

我已经在另一篇文章中解释了更多关于[使用WebAssembly模块的内容](https://hacks.mozilla.org/2017/02/creating-and-working-with-webassembly-modules/)。

### WebAssembly 现在是什么状态？

二月二十八日，四大浏览器宣布达成共识，即 WebAssembly 的 MVP （最小化可行产品）已经完成。大约一周后，Firefox会默认打开 WebAssembly 支持，而Chrome则在第二周开始。它也可用于预览版本的Edge和Safari。

这提供了一个稳定的初始版本，浏览器开始支持。

[![Browsers](http://p0.qhimg.com/t0148ea3544a57b6757.png)](https://www.smashingmagazine.com/wp-content/uploads/2017/05/27-logo_party01-large-opt.png)

（[看大图](https://www.smashingmagazine.com/wp-content/uploads/2017/05/27-logo_party01-large-opt.png)）

该核心不包含社区组织计划的所有功能。即使在初始版本中，WebAssembly 也会很快。但是，通过修复和新功能的组合，将来应该能够更快。我在另一篇文章中[详细介绍了这些功能](https://hacks.mozilla.org/2017/02/where-is-webassembly-now-and-whats-next/)。

### 总结

使用WebAssembly，可以更快地在 web 应用上运行代码。这里有 几个 WebAssembly 代码运行速度比 JavaScript 高效的原因。

*   文件加载 - WebAssembly 文件体积更小，所以下载速度更快。
*   解析 - 解码 WebAssembly 比解析 JavaScript 要快
*   编译和优化 - 编译和优化所需的时间较少，因为在将文件推送到服务器之前已经进行了更多优化，JavaScript 需要为动态类型多次编译代码
*   重新优化 - WebAssembly 代码不需要重新优化，因为编译器有足够的信息可以在第一次运行时获得正确的代码
*   执行 - 执行可以更快，WebAssembly 指令更接近机器码
*   垃圾回收 - 目前 WebAssembly 不直接支持垃圾回收，垃圾回收都是手动控制的，所以比自动垃圾回收效率更高。

目前浏览器中的 MVP（最小化可行产品） 已经很快了。在接下来的几年里，随着浏览器的发展和新功能的增加，它将在未来几年内变得更快。没有人可以肯定地说，这些性能改进可以实现什么样的应用。但是，如果过去有任何迹象，我们可以期待惊奇。

_(rb, ms, cm, il)_  

This article has been republished from [Medium](https://medium.com/@linclark/a9cee6e259ed).