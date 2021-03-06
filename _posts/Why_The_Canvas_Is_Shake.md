---
layout: post
title: "为何 Canvas 内元素动画总是在颤抖？"
date: 2018-04-22 15:39:20
category: JavaScript
---

## 背景
过年的项目中遇到一个问题让我百思不得其解，明明我的帧率保持在60帧，为何我的动画却一直抖动？

我的场景是一个匀速直线运动的小姐姐。

先上一个 [Demo](https://codepen.io/fanmingfei/pen/JvYdWW)

在这个 Demo 中，小姐姐是按照 x 轴 10px/s，y 轴 30 px/s 进行移动的，不过她的移动是明显伴随着抖动的。

这到底是怎么了呢？

## 解决

如果小姐姐的y轴速度是 10px/s，我们的帧率是 60f/s，计算一下：

```
10 / 60 = 1/6 (px/f)
```

实际上，的实际速度是每 6 帧才会移动 1px，这当然会有抖动，小姐姐走一步停一会，总感觉怪怪的~

我索性把小姐姐的移动速度调快，调成 100px/s，发现，还是会抖动，以为高高兴兴能解决了这个问题，发现还是没那么简单。

既然我们能算，那我们就算一算

```js
100 / 60 = 10/6 (px/f) = 1.666666....(px/f)
```

写了个for循环，看看一秒中每一帧小姐姐都在什么位置

```js
for(let i = 0; i < 60; i ++) {
  console.log(i*10/6)
}
```

输出结果取小数点后两位是这样的：

```js
0.00 1.67 3.33 5.00 6.67 8.33 10.00 11.67 13.33 15.00 16.67 18.33 20.00 21.67 23.33 25.00 26.67 28.33 30.00 31.67
33.33 35.00 36.67 38.33 40.00 41.67 43.33 45.00 46.67 48.33 50.00 51.67 53.33 55.00 56.67 58.33 60.00 61.67 63.33
65.00 66.67 68.33 70.00 71.67 73.33 75.00 76.67 78.33 80.00 81.67 83.33 85.00 86.67 88.33 90.00 91.67 93.33 95.00 96.67 98.33
```
那么作为浮点数，Canvas 将如何定位呢？

我们来写一个 [Demo](https://codepen.io/fanmingfei/pen/vjNNRq)

使用 Chrome 打开，作为一个像素眼，我发现，小姐姐定位在 50.6px 的时候，其实就已经被渲染到 51px 的位置。

所以在 Chrome 中，`drawImage` 中设置的位置最终会被四舍五入，这可能和 CSS Sub-pixel 有关 这里先不探究。

所以真正的位置其实是

```
 0 2 3 5 7 8 10 12 13 15 17 18 20 22 23 25 27 28 30 32
 33 35 37 38 40 42 43 45 47 48 50 52 53 55 57 58 60 62 63 65
 67 68 70 72 73 75 77 78 80 82 83 85 87 88 90 92 93 95 97 98
```

从数值来看，每帧移动的距离可能是 1px 也可能是 2px，小姐姐可能是在边跳芭蕾边走路喽~

既然这样，60 帧的帧率下，设置 60px/s 就可以解决问题了，尝试了一下，真的可以！

## 总结

 [前端动画/游戏开发 requestAnimationFrame 之 锁帧](https://fanmingfei.com/posts/RequestAnimationFrame_Lock_Frame.html) 这篇文章介绍过，在项目中我们可能对动画进行锁帧，帧率可能是 60 或者 30，如果我们想保证渲染不抖动，在匀速直线运动中，我们尽量保证我们设置的速度要是帧率的倍数，或者保证平均每帧移动的像素点是一样的。

在 `drawImage` 中，不建议使用浮点数进行定位。