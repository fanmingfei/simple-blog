---
layout: post
title: "《第五届中国CSSConf开发者大会》参会总结"
date: 2019-04-04 19:00:00
category: Other
---

<a name="df368884"></a>
## 前言
对于我来讲，虽然做前端那么多年，但对 CSS 的探索非常少，很多 CSS 知识还是在毕业之前积累下来。揣着一本《精通CSS:高级Web标准解决方案(第二版)》（现在出第三版了，这是我在 CSS 道路上的启蒙书）在前端路上走了这么几年。这次怀着对 CSS 的伪热爱，狠了狠心买了一张 CSSConf 的票上了车。<br /><br /><br />我个人经常会参加一些前端的会议，参加大会主要是能看看业界都在用什么方案，处理一些什么问题，虽然这些在会后都会有分享，但是实际体感还是不一样的，其实这也不是最主要原因，更重要的是能在会议上认识一些朋友，相互交流，听一些解决方案和他们遇到的问题，或许以后就是同事了。

<a name="c6001ce1"></a>
## 开场
开场的时候，严肃而又诙谐主持人，周裕波，做了开场白，描述了这可能是最后一次办 CSSConf 了，其实我是很不解的，只是说行业里有一些不同的声音，并没有具体说明原因，其实会后我问了一下他，为什么以后不再办 CSSConf 了，他回答找到好的主题比较难，大家参会意愿不强。

后面的议题就正式开始了。

<a name="1b21b2af"></a>
## 新时代 CSS 布局 - 陈慧晶
Slide：[https://www.chenhuijing.com/slides/53-cssconfcn-2019/](https://www.chenhuijing.com/slides/53-cssconfcn-2019/)<br />大会第一个议题正式开始之前，讲师上台准备 Slide，我就想这个讲师好娘啊，难道是女的么？我还发消息给朋友，说这个讲师好娘哦，朋友说：“她是个女的吧！”哈哈，真是误会了误会了，跟陈慧晶老师远程道个歉。陈慧晶老师曾经是个专业篮球运动员，后来慢慢的转向了 CSS 技术领域，在布局和中文排版方面研究非常深入。

陈慧晶老师主要讲解了一些关于最新的 CSS 布局方面的知识，细节讲的比较多，讲解了一些属性，并做了一些掩饰，让我们能够非常直观的感受到各个属性的效果。

<a name="c12b3275"></a>
### CSS 显示模块

陈慧静老师讲到，之所以纵向比横向难排是因为，网页一开始是为了展示文字所产生。随着浏览器的发展，才慢慢开始支持弹性盒子、网络布局、盒模型。

目前已经有很多关于布局的属性，通常布局我们是使用配置 display 属性，这个属性有很多可选的值，分为**内部显示模型**和**外部显示模型**。<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/107226/1554262454300-d4f6b38d-1a93-4872-a489-9719b828fdf4.png#align=left&display=inline&height=508&name=image.png&originHeight=1016&originWidth=2296&size=281065&status=done&width=1148)

CSS 的 display 属性值对应不同的显示类型，下面是我从[规范](https://www.w3.org/TR/css-display-3/#outer-role)里面复制来的：
* 外部显示模型的值：[block](https://www.w3.org/TR/css-display-3/#valdef-display-block), [inline](https://www.w3.org/TR/css-display-3/#valdef-display-inline), [run-in](https://www.w3.org/TR/css-display-3/#valdef-display-run-in)
* 内部显示模型的值：[flow](https://www.w3.org/TR/css-display-3/#valdef-display-flow), [flow-root](https://www.w3.org/TR/css-display-3/#valdef-display-flow-root), [table](https://www.w3.org/TR/css-display-3/#valdef-display-table), [flex](https://www.w3.org/TR/css-display-3/#valdef-display-flex), [grid](https://www.w3.org/TR/css-display-3/#valdef-display-grid), [ruby](https://www.w3.org/TR/css-display-3/#valdef-display-ruby) 

后面讲了一些 CSS flex 布局的具体用法和现象，这些在网上就可以学得到，不过我感觉 grid 布局很神奇。flex 和grid 会结合使用，小孩子才做选择题，成年人全要了。

<a name="45dcee17"></a>
### 以内容为主的尺寸计算方式
![image.png](https://cdn.nlark.com/yuque/0/2019/png/107226/1554262479074-cf84b191-fc10-4ad7-b521-1060f773eca3.png#align=left&display=inline&height=521&name=image.png&originHeight=1042&originWidth=1842&size=300119&status=done&width=921)

<a name="0f0e9524"></a>
### 灵活性尺寸
这种布局方案比较灵活，可以优先使用某个尺寸，达到某个临界点才会变化，或者固定某个尺寸不变化。描述起来可能有些困难，可以参考陈慧晶老师的 [Slide](https://www.chenhuijing.com/slides/53-cssconfcn-2019/#/36)，里面有视频。

<a name="74cb856d"></a>
### 旧版浏览器的支持
旧版浏览器使用 `@supports()` 方案，可以查看当前浏览器是否支持该属性。

最后陈慧晶老师问了大家一个问题，我们做的在所有浏览器上显示效果必须是一样的吗？答案是否定的，不同的浏览器显示的样式可能不一样，我们可以针对不同尺寸的浏览器进行不同的布局，当然我们也可以针对不同 CSS 支持度的浏览器进行不同的降级处理。



<a name="af319241"></a>
## 剖析css-tricks新版，为你所用 - 大漠
第二个议题是大漠老师的，大漠老师是[ www.w3cplus.com](https://www.w3cplus.com/) 的站长，著有《图解CSS3：核心技术与案例实战》。他的议题是对最新版的 css-tricks 进行剖析，看看最新版 css-tricks 都用了哪些有意思的东西。大漠老师也提到了一些无障碍化的事情，讲到 css-trickers 使用黑色或许是出于对无障碍化的考虑，其实这一块也是目前业界比较关注的一方面。大漠老师已经将演讲内容发表到自己的博客：[https://www.w3cplus.com/css/css-css-conf-5.html](https://www.w3cplus.com/css/css-css-conf-5.html)，感兴趣可以到这里来看一下。下面，我可能会根据我自己的理解来拓展一些其他的想法。

<a name="f90b9b2a"></a>
### SVG的使用
在 css-tricks 中使用 SVG 比较多的地方是图标，大漠老师从性能的角度分析了，图标从小图片到 CSS Sprites 然后到 icon-font，后来使用 SVG，到 SVG Sprites 的演变，分析了每种方案的优劣。<br />QA环节有一个人问，现在 SVG 这种格式出来以后，还有其他格式的图片，是否其他格式就不需要再用了，SVG和WebP哪个好？其实，每种图片格式解决了不同的问题，SVG 是一种矢量图，解决一些简单的几何图形可以解决的图像表达问题，WebP、JPG、PNG等是一基于像素形成的位图，可以展示一些颜色和图形比较复杂的图像信息。其实他们的定位不一样。

<a name="e16d4d95"></a>
### 滚动特性
<a name="e511c900"></a>
#### 滚动条样式
在不同的浏览器或者系统版本下，滚动条的样式其实是不同的，滚动条样式在几年前就已经可以使用了，只不过需要加 -webkit- 前缀，所以目前只支持 chrome 和 safari 浏览器，目前不支持手机上的 safari。

<a name="e562b436"></a>
#### 滚动捕捉
比如在 banner 轮滚这种场景下，我们希望自动停到对应的位置，大漠老师还举了一个特别有意思的[人物换装的demo](https://codepen.io/airen/pen/VRgevr)。

<a name="ec47b5a2"></a>
### 自定义属性
大漠老师多次强调，这叫做 CSS 自定义属性，不叫 CSS 变量。在 LESS 和 SCSS 中，也实现了类似的概念，但是在 LESS/SCSS 中，这真是一个变量，先定义了一个变量，在后续的 LESS/SCSS 中使用，但是这样的问题在于，在编译以后，这些变量对应的值就固定到了 CSS 代码中，不会再“变”。

例如：

```css
/* SCSS */ 
$color: red;
a { color: $color; }
```

编译后生成的代码

```css
a {
    color: red;
}
```

所以，网页上我们无法对 $color 进行修改。

CSS 自定义属性和一些普通 CSS 属性一样，可以被继承，也有作用域的概念。

```html
<body>
  Hello,
  <div class="box">
    CSS
    <span>World!</span>
  </div>
</body>
```

```css
body {
    --color: red;
  color: var(--color);
}
.box {
  --color: blue;
}
span {
  color: var(--color);
}
```

demo 地址：[https://codepen.io/fanmingfei/pen/mgJOvP](https://codepen.io/fanmingfei/pen/mgJOvP)

body 的 --color 属性red，并且 body 的 color 属性设置成了 var(--color)，所以，body 的 color 属性是 red；

.box 没有设置 color，所以继承了 body 的红色，但是设置 --color 为 blue，所以 .box 里面使用 var(--color) 获取到的是 blue。

<a name="56c64d53"></a>
#### 条件判断
基于自定义属性和 CSS 的一些特性，我们可以做到以前 CSS 做不到的一些条件判断的能力，例如条件判断，其实是基于自定义属性的变化引发的状态变化，后面张鑫旭的议题中也有用到这一点。<br />具体可以参考大漠老师这篇文章[如何通过CSS自定义属性给CSS属性切换提供开关](https://www.w3cplus.com/css/dry-switching-with-css-variables-the-difference-of-one-declaration.html)。

<a name="2ba1872b"></a>
#### JS in CSS (Houdini)
其实是基于 CSS Paint API 来定义 CSS 自定义属性。使用一个类似 Canvas2D API 的上下文，可以直接绘制图形，大漠老师的demo是将 JS 代码写在了 CSS 自定义属性后面，然后用 JS 去获取了 CSS 自定义属性，拿到了这个方法的字符串，然后用 eval 去执行了，这样显得像是在 CSS 里面写了 JS。不过这样写也是一个思路，因为我们可以直接在属性后面面定义属性的样式，看起来也是合理的，但是如果用来渲染的 JS 量比较大，并不是一个好的方案。其实我们可以直接将用于绘制的 JS 代码写在 JS 文件中。

有了 CSS Paint API 我们用 CSS 做的事情有可以变得更多了，这是一个很令人兴奋的 API！

<a name="0d98c747"></a>
#### 其他
看到这里，大漠老师再三强调的，没有 CSS 变量，只有 CSS 自定义属性，是非常合理的。我们其实是定义了一个 CSS 属性，并且给于它一个值，真正用到它的时候才是真正描述这个值去做什么事情的时候，用 var() 函数，它就变成了一个变量，用 paint() 函数，它就变成了 CSS Houdini.


<a name="4ed6d2c8"></a>
### Web Layout
陈慧静老师全篇都在讲 Web 布局，大漠老师讲了一些 Web Layout 相关的一些属性和函数，并且指出了一些关于Web Layout 的一些误区和社区争论。

<a name="6534943c"></a>
### 混合模式和滤镜
简单讲解了一些滤镜的效果和一些属性，而且这些功能已经可以在线上跑了，我在去年项目中已经用过 CSS 滤镜了。

<a name="685d1694"></a>
### 其他(^_^)
最后讲了一些零散的点，有一些在项目里都可以用到，我们的项目也有用到过~而且都是一些小技巧，挺有意思的。

<a name="3dd2685b"></a>
## CSS创意与视觉表现 - 张鑫旭
张鑫旭老师，经常会在搜 CSS 问题的时候搜到他的博客，[张鑫旭-鑫空间-鑫生活](https://www.zhangxinxu.com/)，他写文章有时候特别幽默，比如[《理解 CSS3 transform 中的 Matrix - 矩阵》](https://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-%E7%9F%A9%E9%98%B5/)中。

![image.png](https://cdn.nlark.com/yuque/0/2019/png/107226/1554262510375-4621d575-5e09-4caa-9ba3-9ddf32ef98bf.png#align=left&display=inline&height=78&name=image.png&originHeight=156&originWidth=972&size=28714&status=done&width=486)

张老师这次分享了很多的非常实用的案例。

![image.png](https://cdn.nlark.com/yuque/0/2019/png/107226/1554262494923-2bedd60f-584e-41e3-b46b-2da658f8335b.png#align=left&display=inline&height=399&name=image.png&originHeight=798&originWidth=2024&size=194744&status=done&width=1012)

CSS 属性放在那里，具体怎么用？有些人真的可以使用一些属性加上一些思维做出很好的效果，这个可能是要看天分的。这次大会混入了一个产品经理，她提了一个问题，如何提升前端的这种创意思维，张鑫旭老师给出的答案是，可以招聘新的符合你要求的前端，这种创意不是每个人都有的，业界有很多优秀的作品已经出来了，大家不需要自己去研究，直接用现有的就好。

张鑫旭老师的 Slide 里面每个效果都有demo，感兴趣的话可以直接下载查看 [《CSS 创意与视觉表现.pdf》](https://yuque.antfin-inc.com/mingfei.fmf/threkp/agbfq0/edit)

其实有很多实现布局、特效的技巧，都是一些大师发明出来的，我们可以在项目中使用这些技巧，CSS 提供了很多属性，达到效果的方式不是唯一的，我们在日常工作中，其实可以多去思考这个效果如何实现，可能会发明出自己的奇淫技巧。

<a name="0184d147"></a>
## CSS 生成艺术 - 袁川
Slide: [https://yuanchuan.name/talk/generative-art-with-css/](https://yuanchuan.name/talk/generative-art-with-css/)<br />看了这个议题，很是震撼，袁川老师把浏览器当做了他的画板，CSS 当成他的画笔，生成了很多震撼的艺术作品，整个议题过程中，会场多次响起掌声。具体可以看 Slide，也可以看他的[Codepen](https://codepen.io/yuanchuan/)。
<a name="929a88a0"></a>
#### 几张图片


![image.png](https://cdn.nlark.com/yuque/0/2019/png/107226/1554262749009-d670eccf-7433-4032-b41c-d1a5d29ad680.png#align=left&display=inline&height=529&name=image.png&originHeight=1058&originWidth=1418&size=2035334&status=done&width=709)

![image.png](https://cdn.nlark.com/yuque/0/2019/png/107226/1554262788409-b02ac613-e8da-4a12-9c84-bce9ab889040.png#align=left&display=inline&height=684&name=image.png&originHeight=1368&originWidth=2874&size=167452&status=done&width=1437)<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/107226/1554262827546-df0b8f53-5183-42d1-ba1f-706e3dbb095f.png#align=left&display=inline&height=900&name=image.png&originHeight=1800&originWidth=2880&size=9278806&status=done&width=1440)

![image.png](https://cdn.nlark.com/yuque/0/2019/png/107226/1554262888922-a94e29d8-74d5-47b0-94dd-bf704edadb8e.png#align=left&display=inline&height=900&name=image.png&originHeight=1800&originWidth=2880&size=5785767&status=done&width=1440)<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/107226/1554262856441-af237eaa-a430-4f16-8434-6c74465efa96.png#align=left&display=inline&height=900&name=image.png&originHeight=1800&originWidth=2880&size=4813141&status=done&width=1440)

上面这两张图，都是用逗号做的。

![image.png](https://cdn.nlark.com/yuque/0/2019/png/107226/1554262936276-8a3d43b6-45f5-4e5e-a896-cdc0a02e2257.png#align=left&display=inline&height=787&name=image.png&originHeight=1574&originWidth=2876&size=429325&status=done&width=1438)

CSS 有着天然生成树的特性。

<a name="f2fa74a0"></a>
#### 现场视频
放一个现场的视频感受一下，在文末大会官网上可以看全部视频。<br />[cssconf.mp4](https://www.yuque.com/attachments/yuque/0/2019/mp4/107226/1554266268967-6fae981d-ef51-493e-b072-31c81a05cceb.mp4?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2019%2Fmp4%2F107226%2F1554266268967-6fae981d-ef51-493e-b072-31c81a05cceb.mp4%22%2C%22name%22%3A%22cssconf.mp4%22%2C%22size%22%3A9605094%2C%22type%22%3A%22video%2Fmp4%22%2C%22progress%22%3A%7B%22percent%22%3A0%7D%2C%22status%22%3A%22done%22%2C%22percent%22%3A0%2C%22card%22%3A%22file%22%7D)
<a name="d41d8cd9"></a>
## 
<a name="87d3c473"></a>
## 你不知道的五个 CSS 新特性 - 勾三股四
勾股介绍了几个 CSS 的新特性，感觉实用性没有那么好，还有很多在草案阶段。勾股的 Slide 地址：[https://jinjiang.github.io/slides/five-css-features/](https://jinjiang.github.io/slides/five-css-features/#70)
<a name="float"></a>
### float
<a name="aeb85d17"></a>
#### float & CSS Shapes
我们使用 float 可以进行文字环绕图片、多列布局，但是现在我们已经很少用 float 了。大家已经开始使用更新的布局方案。但是如果想实现图文混排 float 还是少不了的。

![image.png](https://cdn.nlark.com/yuque/0/2019/png/107226/1554281282352-d9e40a59-1c13-40eb-8db5-ae792459a71d.png#align=left&display=inline&height=657&name=image.png&originHeight=1314&originWidth=2368&size=3384872&status=done&width=1184)<br />

如果想让文字根据图片内容进行排版，单单只用 float 是不够的。需要配合 CSS Shapes 实现。

<a name="1b7e5572"></a>
#### 其他效果

![image.png](https://cdn.nlark.com/yuque/0/2019/png/107226/1554281418689-1d747176-b5ca-4237-8b6b-1222031b48a7.png#align=left&display=inline&height=766&name=image.png&originHeight=1532&originWidth=2624&size=1275125&status=done&width=1312)<br />

![image.png](https://cdn.nlark.com/yuque/0/2019/png/107226/1554281429084-7247e7cc-a6a4-44e4-9362-5b58885204db.png#align=left&display=inline&height=758&name=image.png&originHeight=1516&originWidth=2608&size=312320&status=done&width=1304)

<a name="page"></a>
### page
网页里面有个打印的功能，可以针对打印状态下的页面进行样式设置，里面拓展了一些和打印相关的属性。<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/107226/1554281701131-48582d79-3754-428b-9eb1-5e11c6f5fbb2.png#align=left&display=inline&height=779&name=image.png&originHeight=1558&originWidth=2328&size=250033&status=done&width=1164)

更多内容可以参考 [https://www.pagedmedia.org/](https://www.pagedmedia.org/)

<a name="scroll"></a>
### scroll
勾股也讲了一些滚动条相关的内容。

<a name="font"></a>
### font
Adobe, Apple, Google, Microsoft 4大巨头企业联合宣布了全新的字体规范Variable Font，字体在设计过程中可以提供出一些参数，CSS 中可以对参数进行配置。

<a name="viewport"></a>
### viewport
以后可以使用 CSS 来设置页面的 viewport 啦！

<a name="275d3987"></a>
## CSS动画你应该知道的10件事 - Brian Birtles
这个议题提到了关于 CSS 动画的一些知识。<br />中文版Slide：[https://birtles.github.io/cssconf2019/index.zh.html](https://birtles.github.io/cssconf2019/index.zh.html)<br />英文版Slide：[https://birtles.github.io/cssconf2019/#/title](https://birtles.github.io/cssconf2019/#/title)<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/107226/1554284091955-606fe4c0-3689-4d54-a9e8-1fe4203e2261.png#align=left&display=inline&height=751&name=image.png&originHeight=1502&originWidth=2388&size=346132&status=done&width=1194)<br />

我都不用去总结啦！对某个点感兴趣的话，可以看一下他的 Slide，每一个点，都对应了一些解释和实践。

<a name="5c8929f9"></a>
## CSS TIME - 陈在真
陈在真老师的 CSS TIME 这个话题，介绍了一些他做了很多 CSS 动画后总结的一些方法论。后面我和他有过一些交流，我在想，是否能有什么工具可以按照他的这种方法论产生的规则设计动画，直接产生线上可用的 CSS 动画效果，其实这也是从工程化上要考虑的事情。
<a name="d41d8cd9-2"></a>
### 
<a name="763b6632"></a>
### 简单案例
使用了几个简单的案例，总结出在做 CSS 动画时候，如何让多个动画联动起来，如何实现循环时间统一。

讲了一个复杂案例的实现，他做的动画很多都是他自己来设计的，所以在实现动画的设计理论上也有一些介绍。

<a name="870cc1b5"></a>
### 各种设备下的时间
在不同的设备下，比如 pad、手机、穿戴设备，用户对时间的体感不同，一个动画使用的时间可能是不同的。


![image.png](https://cdn.nlark.com/yuque/0/2019/png/107226/1554285071963-7f450c7b-23aa-481a-81f9-0dc1ca09ca24.png#align=left&display=inline&height=632&name=image.png&originHeight=1262&originWidth=1070&size=236707&status=done&width=536)

<a name="2658b14d"></a>
## 后语
这里只是按照我的理解和记忆总结了一些在大会上的所见所闻，列出了各位讲师分享的一些点，如果大家对哪些点感兴趣可以深入到 Slide 中学习。大会视频后续也会放出，可以进入大会官网[中国第五届 CSS 开发者大会](https://css.w3ctech.com/)查看议题、Slide 以及视频。

