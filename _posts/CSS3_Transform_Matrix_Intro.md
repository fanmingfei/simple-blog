---
layout: post
title: "大学没学过数学也要理解 CSS3 transform 中的 matrix"
category: CSS
date: 2018-05-23 14:05:00
---
## 前言
CSS3 中使用 transform 可以对元素进行变换。其中包含：位移、旋转、偏移、缩放。
transform 可以使用 translate/rotate/skew/scale 的方式来控制元素变换，也可以使用 matrix 的方式来控制元素变换。

比如：

```html
<div class="box"></div>
```

通过transform属性进行变换。

首先演示使用 translate/rotate/skew/scale 的方式：
```css
.box {
    width: 100px;
    height: 100px;
    background: #00C487;
    transform: translate(10px, 20px) rotate(30deg) scale(1.5, 2);
}
```
也可以使用 matrix 的方式：

```css
.box {
    width: 100px;
    height: 100px;
    background: #00C487;
    transform: matrix(0.75, 0.8, -0.8, 1.2, 10, 20);
}
```

[查看demo](//codepen.io/fanmingfei/pen/pVYdpO)

Matrix 的中文是矩阵，是一个数学术语，在计算机科学中，会用矩阵来对象量进行变换，在 CSS3 的 transform 属性中，可以使用矩阵对图像进行变换。

## 矩阵长什么样子？
矩阵可以分为一个形容词+一个名字，矩是形容词，阵是名词。

如果你喜欢看战争片，不管是古代战争还是现代战争，都需要有阵势，打仗没阵型，等于耍流氓；或者是开一局农药，可能也要考虑各个英雄的站位，各种球类运动、各种棋类都需要有阵型。

阵型中的每一个个体对整体的都会产生影响。比如打王者荣耀射手时候，射手应该猥琐在一个位置输出，站错位置，输掉整个游戏。

![](//gw.alicdn.com/mt/TB1AfLokiCYBuNkHFCcXXcHtVXa-1200-800.jpeg)

那，其实矩阵就是一些列的数字按照矩形排列。

在数学中，矩阵用方括号包裹起来。

![](//gw.alicdn.com/mt/TB1dvt3sL5TBuNjSspmXXaDRVXa-1296-700.png)

上图就是一个矩阵。

## CSS3 里的 matrix 如何和矩阵对应呢？

为什么要用矩阵来表示转换呢？因为在计算机科学中，矩阵可以对向量进行转换。矩阵中的每一个数字，对向量的转换都会产生影响。

CSS3 里面可以用矩阵表示 2D 和 3D 转换，这里只讲 2D。

```css
selector {
    transform: matrix(a, b, c, d, e, f);
}
```

![](//gw.alicdn.com/mt/TB14SYUsTJYBeNjy1zeXXahzVXa-997-700.png)

2D 的转换是由一个 3*3 的矩阵表示的，前两行代表转换的值，分别是 a b c d e f，要注意是竖着排的，第一行代表 x 轴发生的变化，第二行代表 y 轴发生的变化，第三行代表 z 轴发生的变化，因为这里是 2D 不涉及 z 轴，所以这里是 0 0 1。


## 假设一个问题

创建一个宽高为 200px 的div，div 里面有一个红色的点，位置是`{x:181px y:50px}`。
![](//gw.alicdn.com/mt/TB1BnpysHuWBuNjSszgXXb8jVXa-409-409.png)

倘若将这个div 向右平移 10px，x 轴向下平移 20px，旋转37°，x轴缩放 1.5 倍，y 轴缩放 2 倍：

transform: translate(10px, 20px) rotate(37deg) scale(1.5, 2);

![](//gw.alicdn.com/mt/TB1Ew6KsQKWBuNjy1zjXXcOypXa-983-1024.png)

那么红色点的变化后的位置在哪里呢？

既然我们知道矩阵可以对向量进行转换那么我们只要把上面的信息转换成矩阵信息，通过矩阵信息可以将我们的原始坐标转换到新的坐标。

## 缩放 scale(x, y)

缩放对应的是矩阵中的 a 和 d，x 轴的缩放比例对应 a，y 轴的缩放比例对应 d。

transform: scale(x,y);

a=x
d=y

所以 scale(1.5, 2) 对应的矩阵是：

transform: matrix(1.5, <del>0, 0,</del> 2, <del>0, 0</del>);

![](//gw.alicdn.com/mt/TB1t764sH1YBuNjSszhXXcUsFXa-1249-700.png)

如果一个没有元素没有被缩放，默认a=1 d=1。

## 平移 translate(10, 20)
平移对应的是矩阵中的 e 和 f，平移的 x 和 y 分别对应 e 和 f。

transform: translate(10, 20)

e=10

f=20

对应：
transform: matrix(<del>a, b, c, d</del>10, 20);

结合缩放：
transform: matrix(<del>1.5 0, 0, 2, </del>10, 20);

平移只会影响 e 和 f 值。

## 旋转 rotate(θdeg)
旋转影响的是a/b/c/d四个值，分别是什么呢？

transform: rotate(θdeg)

a=cosθ

b=sinθ

c=-sinθ

d=cosθ

这个是高中学的哦~

如果要计算 30° 的sin值：

首先我们要将 30° 转换为弧度，传递给三角函数计算。用 JS 计算就是下面的样子了。

```javascript

// 弧度和角度的转换公式：弧度=π/180×角度 

const radian = Math.PI / 180 * 30 // 算出弧度

const sin = Math.sin(radian) // 计算 sinθ
const cos = Math.cos(radian) // 计算 cosθ

console.log(sin, cos) // 输出 ≈ 0.5, 0.866

```
这样我们算出了 sin 和 cos，分别是 0.5 和 0.866

如果我们不考虑缩放和偏移，只旋转30°，矩阵应该表示为

transform: rotate(30deg)

a=0.866

b=0.5

c=-0.5

d=0.866

transform: matrix(0.866, 0.5, -0.5, 0.866, <del>0, 0</de>);

![](//gw.alicdn.com/mt/TB1xon.sH9YBuNjy0FgXXcxcXXa-1320-700.png)


## 偏移 skew(20deg, 30deg)
上面的题目中没有出现出现偏移值，偏移值也是由两个参数组成，x 轴和 y 轴，分别对应矩阵中的 c 和 b。是 x 对应 c，y 对应 b， 这个对应并不是相等，需要对 skew 的 x 值 和 y 值进行 tan 运算。

transform: skew(20deg, 30deg);

b=tan30°

c=tan20°

注意 y 对应的是 c，x 对应的是 b。

transform: matrix(<del>a,</del> tan(30deg), tan(20deg), <del>d, e, f</del>)

使用 JS 来算出 tan20 和 tan30

```javascript
// 先创建一个方法，直接返回角度的tan值
function tan (deg) {
    const radian = Math.PI / 180 * deg
    return Math.tan(radian)
}

const b = tan(30)
const c = tan(20)
console.log(b, c) // 输出 ≈ 0.577, 0.364
```

b=0.577
c=0.364

transform: matrix(<del>1,</del> 0.577, 0.364, <del> 1, 0, 0</del>)


## 旋转+缩放+偏移+位移怎么办？

如果我们既要旋转又要缩放又要偏移，我们需要将旋转和缩放和偏移和位移多个矩阵相乘，**要按照transform里面rotate/scale/skew/translate所写的顺序相乘**。

这里我们先考虑旋转和缩放，需要将旋转的矩阵和缩放的矩阵相乘

实在是用语言解释不清楚如何去乘，用一张图解释吧：

这里我用小写字母代表第一个矩阵中的值，大写字母代表第二个矩阵里的值

![](//gw.alicdn.com/mt/TB1ukR1tntYBeNjy1XdXXXXyVXa-6355-700.png)

将我们的已经得到的矩阵带入到公式

![](//gw.alicdn.com/mt/TB1rIL4sFuWBuNjSspnXXX1NVXa-8124-2014.png)

得出：

transform: rotate(30) scale(1.5 2);

转换为 matrix 表示为：

transform: matrix(1.299, 0.75,  -1, 1.732, <del>0, 0</de>);


## 找到这次转换的矩阵

div 的 transform 值如下

transform: translate(10px, 20px) rotate(37deg) scale(1.5, 2);

### translate(10px, 20px)

x 平移 10px，y 平移 20px，所以 e=10，f=20。

![](//gw.alicdn.com/mt/TB1VIL5sKuSBuNjSsplXXbe8pXa-1249-700.png)

### rotate(37deg)

sin37° ≈ 0.6

cos37° ≈ 0.8

根据 a 对应 cos b，对应 sin，c 对应 -sin，d 对应 cos 的值

得到：

a=0.8，b=0.6，c=-0.6，d=0.8

![](//gw.alicdn.com/mt/TB1d27LsUR1BeNjy0FmXXb0wVXa-1249-700.png)

### scale(1.5, 2)

x 轴缩放 1.5，y 轴缩放 2，所以 a=1.5，d=2

![](//gw.alicdn.com/mt/TB1vh9UkyCYBuNkSnaVXXcMsVXa-1249-700.png)

### 结合

transform: translate(10px, 20px) rotate(37deg) scale(1.5, 2);

我们使用  位移矩阵 * 旋转矩阵 * 缩放矩阵（根据transform中的变换类型书写的顺序）

可以使用[矩阵计算器](//zh.numberempire.com/matrixbinarycalculator.php)进行计算

从左往右依次计算

![](//gw.alicdn.com/mt/TB1imHdsY1YBuNjSszeXXablFXa-6549-727.png)


所以最终得到矩阵

![](//gw.alicdn.com/mt/TB1emrqkDdYBeNkSmLyXXXfnVXa-997-700.png)

matrix(1.2, 0.9, -1.2 1.6, 10, 20)

[验证一下](//codepen.io/fanmingfei/pen/derzxK)

transform: matrix(1.2, 0.9, -1.2 1.6, 10, 20)

和

transform: translate(10px, 20px) rotate(37deg) scale(1.5, 2);

效果是一样的

## 如何对一个坐标进行矩阵变换

我们已经知道了这个矩阵，如何通过矩阵对一个坐标进行变化，找到这个坐标变化后的位置呢？

我们用之前得出的变换矩阵去乘以这一个坐标组成的3*1（三排一列）矩阵。

![](//gw.alicdn.com/mt/TB1WBO4sHSYBuNjSspfXXcZCpXa-1861-700.png)

上面已经介绍过如何进行矩阵乘法了，这里在介绍一遍

![](//gw.alicdn.com/mt/TB1OSJVsHSYBuNjSspiXXXNzpXa-1861-700.png)

上图中左右两个矩阵颜色相同的位置相乘后相加，每一行都进行这样的计算：

![](//gw.alicdn.com/mt/TB1FfnosGmWBuNjy1XaXXXCbXXa-3812-700.png)

得到一个3*1的矩阵，第一行是转换后的 x 值，第二行是转换后的 y 值，第三行是转换后的 z 值（2d不考虑z值）。

前面讲到，矩阵的第一行影响 x，第二行影响 y，也体现在这个地方。

假设我们的坐标是(50, 80)，这里还没有针对我们提出的问题上面的点进行计算。

我们把坐标写成矩阵的形式，设置 z 轴是1：

![](//gw.alicdn.com/mt/TB1BdIVsN9YBuNjy0FfXXXIsVXa-519-700.png)

然后进行乘法计算：

![](//gw.alicdn.com/mt/TB11DLDsMmTBuNjy1XbXXaMrVXa-4854-727.png)

通过我们计算出来的矩阵变换得到新的位置(46, 172)

## 继续刚刚问题

坐标是需要基于一个坐标系存在的，我们需要找到正确的坐标系才能算出准确的坐标。
在 CSS transform 中，有个属性是 transform-origin，来设置变换所基于的点，默认是`transform-origin: 50% 50%`，基于中间元素的中心点。我们需要以这个点建立坐标系。

在网页中，坐标系是 x 轴向右，y 轴向下。

转换前：

![](//gw.alicdn.com/mt/TB18DKgsWmWBuNjy1XaXXXCbXXa-706-796.png)

转换后：
![](//gw.alicdn.com/mt/TB1Zcxds29TBuNjy1zbXXXpepXa-982-1023.png)

根据题目我们知道，这个点相对于绿色div左上角的坐标是(181, 50)
绿色div的宽高为200
基于绿色div中心点建立的坐标系，这个点的坐标是(81, -50)

将坐标代入公式进行计算：

![](//gw.alicdn.com/mt/TB10o_gksuYBuNkSmRyXXcA3pXa-4854-727.png)

得到坐标约为(167, 13)

再将这个坐标转换成页面坐标系(267,113)

最终我们得到了这个点在经过转换后的坐标

## 总结

矩阵在计算机图形学中运用非常多，就像我们经常用的PhotoShop，虽然是设计软件，但它的图形也是依赖各种数学能力进行计算后展现的。我们玩的游戏、看的3D电影，其实都和数学息息相关，学好这些知识，才能真正的成为发明者，即便不成为发明者，在应用层理解这些，让我们能做的事情更多。

本文错误的地方，欢迎斧正。