---
layout: post
title: "大话 JavaScript 动画"
category: JavaScript
date: 2018-10-05 01:24:00
---

## 背景
138.2亿年前，世界上没有时间和空间，或许世界都不存在，在一个似有似无的点上，汇集了所有的物质，它孕育着无限的能量与可能性。

## 宇宙大爆炸
巨大的内力已无法被抑制，瞬间爆发，它爆炸了！世界上有了时间和空间，随着岁月的变迁，时光的流逝，无数的星系、恒星、卫星、彗星形成。我们生活的地球，只是茫茫宇宙中的一个小小的天体，或许在遥远的宇宙的另一边，会有平行世界的存在，或许在那里，我们可能是医生、老师、公务员。科学家说我们的宇宙正在加速度的膨胀，暗能量在无限吞噬着暗物质，未来的世界将会变得虚无缥缈。

![](https://p4.ssl.qhimg.com/t01d8909596dde78d20.jpg)

## 人类起源
宇宙的形成，带来了无限可能性，人类释放着欲望和克制，对宇宙的渴望产生于公元前五世纪，古巴比伦人通过观察天体的位置以及外观变化，来预测人世间的各种事物。在遥远的古罗马，人们也舞弄着灵魂，把不羁的想象赋予肉体。Anim，来源于拉丁语，代表着灵魂与生命，代表着所有与生俱来。似乎世间万物都存在联系，宇宙、自然都存在灵魂。

![](https://p2.ssl.qhimg.com/t018418fe1df058643c.jpg)

## 动画的形成
两万五前年钱的石器时代，石洞中的野兽奔跑分析图，这是人类开始试图捕捉动作最早证据。文艺复兴时期的达芬奇画作上，用两只手臂两条腿来标识上下摆动的动作，在一张画作上做出不同时间的两个动作。
直到1906年，世界上第一部动画片《[滑稽脸的幽默相](https://www.bilibili.com/video/av6265790/)》问世。

![](https://p5.ssl.qhimg.com/t01469153556cf26a97.jpg)

所以动画是否就是将多个画面连起来播放呢？

时间是连续的吗？是可以无线分割的吗？我也不太清楚，你看到的流星、人们的动作是连续的吗？或许是吧，毕竟现实生活中还没有像瞬间移动这种事情发生吧。

神经可能不是连续的，生物课学过，神经的传递是一个电信号传递过程，并且是颗粒的(神经信号)，那么我们看到的东西在我们脑海里的成像一定不是连续的。

![](https://p2.ssl.qhimg.com/t0176ac32fc9404dbfd.gif)

那么我们为什么能看到连续的动作呢？

视觉暂留（Persistence of vision），让我们看到了连续的画面，视神经反应速度大约为1/16秒，每个人不太一样，有些人高一点，一些人低一点。上一次视神经传递的图像将会在大脑中存留，直到下一次神经信号到达。维基百科上说，日常用的日光灯每秒钟大约会熄灭100次，但是你并没有感觉。

一般电影的在帧率在24FPS以上，一般30FPS以上大脑会认为是连贯的，我们玩的游戏一般在30FPS，高帧率是60FPS。

小时候一定看过翻页动画吧，可以看一看[翻页动画-地球进化史](https://www.bilibili.com/video/av3049)

## 前端动画实现
Atwood 定律：Any application that can be written in JavaScript will eventually be written in JavaScript.

前端做动画不是什么新鲜事了，从jQuery时代，到当下，无不是前端动画横行的时代。

我们知道多张不同的图像连在一起就变成了动态的图像。

在前端的世界里，浏览器在视觉暂留时间内，连续不断的**逐帧**输出图像。每一帧输出一张图像。

提及动画一定会讨论到帧率(FPS, Frame Per Second)，代表每秒输出帧数，也就是浏览器每秒展示出多少张静态的图像。


### DOM动画中的 CSS3
CSS3 动画是当今盛行的 Web 端制作动画的方式之一，对于移动设备来说覆盖率已经非常广泛，在日常开发中可以使用。CSS3 动画只能通过对 CSS 样式的改变控制 DOM 进行动画

- [CSS3 Animation MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Animations)

- [CSS3 Translate MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/translate)


### DOM动画中的 WebAnimation
WebAnimation 还在草案阶段，在Chrome可以尝试使用一下。移动设备还是相当惨烈，iOS 并没有开始支持。

[Element Animation MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Animation)

![Can I Use](https://p0.ssl.qhimg.com/t01a0eb75de86b52934.jpg)


CSS3 和 WebAnimation 都只能作用于DOM，那么，如果我们想让 Canvas 上的对象产生动画，那我们该怎么办呢？

### JavaScript
既然我们知道动画的原理，其实就是让用户看到连续的图片，并且每一张图片是有变化的。

对于事物来讲，我们可以通过改变某些数值来修改他的属性，从来改变他的外在展示。比如正方形的边长，颜色的RGB值，台风的位置（世界坐标），在每一帧去改变这些数值，根据这些数值将对象绘依次制到屏幕上，将会产生动画。

通过上面的描述，我们知道，实现一个动画，其实是数值随时间变化，以帧为时间单位。

在很久很久以前，JavaScript 使用 `setInterval` 进行定时调用函数。所以可以使用setInterval来进行数值的改变。

为了更好的让各位前端小哥哥小姐姐们做动画，出现了`requestAnimationFrame`，`requestAnimationFrame` 接收一个函数，这个函数将在下一帧渲染之前执行，也就是说，不需要太多次的计算，只要在下一帧渲染之前，我们将需要修改的数值修改掉即可。`requestAnimationFrame` 的帧率和硬件以及浏览器有关，一般是60FPS(16.66666666ms/帧)。

我们利用 Dom 进行动画的演示~

#### 元素移动

创建一个方块

```html
<div class=“box”></div>
```

设置宽高和背景颜色

```css
.box {
    width: 100px;
    height: 100px;
    background: red;
}
```

```javascript
const box = document.querySelector('.box') // 获取方块元素
let value = 0 // 设置初始值
// 创建每一帧渲染之前要执行的方法
const add = () => {
    requestAnimationFrame(add) // 下一帧渲染之前继续执行 add 方法
    value += 5 // 每帧加数值增加5
    box.style.transform = `translateX(${value}px)` // 将数值设置给 方块 的 css 属性 transform 属性可以控制元素在水平方向上的位移
}
requestAnimationFrame(add) // 下一帧渲染之前执行 add 方法
```

这样，方块每帧向右移动 5 像素，每秒移动`60*5=300`像素，不是每秒跳动一下，而是一秒在300像素内均匀移动哦。

#### 补间动画

上一个demo实现了小方块从左到右的移动，但是貌似他会永无止境的移动下去，直到数值溢出，小时候学过flash的朋友都知道补间动画，其实就是让小方块0px到300px平滑移动。其实就是固定的时间点，有固定的位置。

所以我们只需要根据运动的已过时间的百分比去计算数值。

保持之前的 HTML 和 CSS 不变

```javascript
/**
 *  执行补间动画方法
 *
 * @param      {Number}    start     开始数值
 * @param      {Number}    end       结束数值
 * @param      {Number}    time      补间时间
 * @param      {Function}  callback  每帧的回调函数
 */
function animate(start, end, time, callback) {
    let startTime = performance.now() // 设置开始的时间戳
    let differ = end - start // 拿到数值差值
    // 创建每帧之前要执行的函数
    function loop() {
        raf = requestAnimationFrame(loop) // 下一阵调用每帧之前要执行的函数
        const passTime = performance.now() - startTime // 获取当前时间和开始时间差
        let per = passTime / time // 计算当前已过百分比
        if (per >= 1) { // 判读如果已经执行
              per = 1 // 设置为最后的状态
              cancelAnimationFrame(raf) // 停掉动画
        }
        const pass = differ * per // 通过已过时间百分比*开始结束数值差得出当前的数值
        callback(pass) // 调用回调函数，把数值传递进去
    }
    let raf = requestAnimationFrame(loop) // 下一阵调用每帧之前要执行的函数
}

```

我们调用一下补间动画，让数值经过1秒匀速从0变成400。

```javascript
let box = document.querySelector()
animate(0, 400, 1000, value => {
    box.style.transform = `translateX(${value}px)` // 将数值设置给 方块 的 css 属性 transform 属性可以控制元素在水平方向上的位移
})
```

一个简单的匀速补间动画就这么被我们做好了。

#### 非匀速动画

那万一，这个动画不是非匀速的，比如抖一抖啊，弹一弹，那该怎么办呢？

当然也是一样，根据已过时间的百分比去计算数值

时间是匀速的，但是数值不是，如果数值变化是有规律的，那么我们就可以使用时间来表示数值，创建一个接收时间比例（当前时间百分比），返回当前位置比例（当前位置百分比）的方法。

我们称这个方法叫做缓动方法。

如果速度从慢到快，我们可以把时间和数值的图像模拟成以下的样子。

![](https://p5.ssl.qhimg.com/t01e205e795742cf4f7.jpg)

公式为 `rate = time ^ 2`

对应的函数应该是

```javascript
function  easeIn(time) { // 接收一个当前的时间占总时间的百分比比
    return time ** 2
}
```

![](https://p5.ssl.qhimg.com/t01bf617d9b51a9b95f.jpg)

这个实现加速后抖动结束的效果，在Time小于0.6时是一个公式，time大于0.6是另外一个公式。

Time < 0.6 时： Rate = Time / 0.6 ^ 2

Time > 0.6 时： Rate = Math.sin((Time-0.6) * ((3 * Math.PI) / 0.4)) * 0.2 + 1

最终实现的函数是

```javascript
function shake(time) {
    if (time < 0.6) {
        return (time / 0.6) ** 2
    } else {
        return Math.sin((time-0.6) * ((3 * Math.PI) / 0.4)) * 0.2 + 1
    }
}
```

我们改造一下之前的 `animate` 函数，接收一个 easing 方法。

```javascript
/**
 *  执行补间动画方法
 *
 * @param      {Number}    start     开始数值
 * @param      {Number}    end       结束数值
 * @param      {Number}    time      补间时间
 * @param      {Function}  callback  每帧回调
 * @param      {Function}  easing    缓动方法，默认匀速
 */
function animate(start, end, time, callback, easing = t => t) {
    let startTime = performance.now() // 设置开始的时间戳
    let differ = end - start // 拿到数值差值
    // 创建每帧之前要执行的函数
    function loop() {
        raf = requestAnimationFrame(loop) // 下一阵调用每帧之前要执行的函数
        const passTime = performance.now() - startTime // 获取当前时间和开始时间差
        let per = passTime / time // 计算当前已过百分比
        if (per >= 1) { // 判读如果已经执行
            per = 1 // 设置为最后的状态
            cancelAnimationFrame(raf) // 停掉动画
        }
        const pass = differ * easing(per) // 通过已过时间百分比*开始结束数值差得出当前的数值
        callback(pass)
    }
    let raf = requestAnimationFrame(loop) // 下一阵调用每帧之前要执行的函数
}

```

测试一下，将我们刚刚创建的 easing 方法传进来

加速运动
```javascript
let box = document.querySelector('.box')
animate(0, 500, 400, value => {
    box.style.transform = `translateX(${value}px)` // 将数值设置给 方块 的 css 属性 transform 属性可以控制元素在水平方向上的位移
}, easeIn)
```

加速后抖一抖
```javascript
let box = document.querySelector('.box')
animate(0, 500, 400, value => {
    box.style.transform = `translateX(${value}px)` // 将数值设置给 方块 的 css 属性 transform 属性可以控制元素在水平方向上的位移
}, shake)
```

## 总结
这些只是 JavaScript 动画基础中的基础，理解动画的原理后，再做动画就更得心应手了。

市面上有很多JS动画库，大家可以开箱即用。有一些是针对DOM操作的，也有一些是针对 JavaScript 对象。实现原理你都已经懂了。


上述代码已发布到Github: [https://github.com/fanmingfei/animation-base](https://github.com/fanmingfei/animation-base)

我的另外两篇关于动画的文章：
- [为何 Canvas 内元素动画总是在颤抖？](https://fanmingfei.com/posts/Why_The_Canvas_Is_Shake.html)
- [前端动画/游戏开发 requestAnimationFrame 之 锁帧](https://fanmingfei.com/posts/RequestAnimationFrame_Lock_Frame.html)
