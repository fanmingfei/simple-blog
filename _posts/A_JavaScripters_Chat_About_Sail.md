---
layout: post
title: "一组随之飘过的 JavaScripters 的聊天记录"
category: JavaScript
date: 2017-05-13 10:00:00
---

随着网络的发展，聊天软件日益成为人类生活中不可或缺的一部分。日常刷屏的人屡见不鲜。
今年不知怎么着就遇到了一群老厉害的人了，身在世界各地，说着不同的语言，commit 着各式各样的代码。
每天和他们聊天都感觉157个人的群里有156个大神和一个我。每天我就在群里窥着，想着能有一天插上话。
但是现实总是残酷的，从来都不敢说话。
不知道我前面扯了这么多能不能把我 blog 的 description 占掉，因为我嫌首页出现下面那么长的图不好看。

![](http://p7.qhimg.com/t01d12870651b6c4937.jpg)
![](http://p2.qhimg.com/t01d489b65960b97981.jpg)
![](http://p8.qhimg.com/t016dbb1f107a7f6ee8.jpg)
![](http://p9.qhimg.com/t016b62195820e5817a.jpg)

就这样，一场高端水准的 JavaScripter 交流随之开始：


第一个解决方案随之而来：

![](http://p0.qhimg.com/t01f1754d547eda20f0.jpg)

随后第二个解决方案马上出现：

![](http://p9.qhimg.com/t015f128c6619010830.jpg)

接着有人提出了关于这两个方法快慢的疑问:

![](http://p5.qhimg.com/t016629aa9438ffe296.jpg)

随后有人通过 jsperf 检测了这两种方法的速度：

![](http://p0.qhimg.com/t012ad3364ad2227197.jpg)

从图片来看，似乎 split 比 match 快一倍！


然后，@Zac 做出了疑问，是否 for 会更快

![](http://p3.qhimg.com/t018d84e2cba9c52d34.jpg)

直接抛出 perf 后，群主众人提出了异议

![](http://p9.qhimg.com/t01109a046b65458639.jpg)


提出 length 的检测结果：

![](http://p7.qhimg.com/t01f6d1e73f53a65192.jpg)

![](http://p0.qhimg.com/t01518956340f1fa121.jpg)

虽然对刚刚的逻辑有一些不满意

![](http://p9.qhimg.com/t0187f75a16f2fe8d30.jpg)

但是也没有去优化

接下来 @该群已解散 提出了新的方案

![](http://p2.qhimg.com/t01cf62a3ee4fce835a.jpg)

结果是：

![](http://p0.qhimg.com/t01267428fcd513aa70.jpg)


后来发现 replace 写错了。

![](http://p6.qhimg.com/t019fafce33ef833aa9.jpg)


最后 @Zac 把 var i 提出来了

![](http://p2.qhimg.com/t016a79279af25548ae.jpg)

看起来快了那么那么多，可惜的是... 他写错了代码

后来，他把代码改好了

![](http://p2.qhimg.com/t01539699626b2e6f7f.jpg)

发现还是 split 快

后来 @hugo 发了新 perf

![](http://p7.qhimg.com/t01a87a999ff945b2b0.jpg)

第一个是 for ，第二个是 split，这里是 for 快。


接着 @rannn🐨 发了一个

![](http://p4.qhimg.com/t01f30e687c91dc20fe.jpg)

但是 @Zac 又发了一个

![](http://p5.qhimg.com/t01a0abab917f0074d5.jpg)

for 最快，不过他们两个的写法不太一样。

对比两个人的 for3 和 for charCodeAt。

他们两个除了用的终端不一样以外，for3 进入下一次循环的时候跳过了“飘”后面那个字，

虽然这样可能存在问题，比如“飘”后面根本不是“过”而是“飘过的话，就会少检索一个。

![](http://p0.qhimg.com/t01c48e0d401f98fe99.jpg)

不过是在这个题里是可用的，这个题“飘”后面都是“过”。
但是为了完美，我们稍作改动

![](http://p4.qhimg.com/t01c0ef56e92168b140.jpg)

```
var count = 0;
var len = data.length;
for(i = 0;i < len;){
  if(data.charCodeAt(i++) === 39128 && data.charCodeAt(i) === 36807){
        count++;
        i ++;
    }
}
```

就上面的几个模糊不清的例子

到底怎么样才快呢....

亲自试一下吧

split 方案
```
var count = data.split('飘过').length - 1;
count;
```


改良过的跳过“过”字
```
var count = 0;
var len = data.length;
for(i = 0;i < len;){
  if(data.charCodeAt(i++) === 39128 && data.charCodeAt(i) === 36807){
        count++;
        i ++;
    }
}
count;
```

有修改的 @rannn🐨 的
```
var count = 0;
var len = data.length;
for(var i = 0;i < len;i++){
  if(data.charCodeAt(i) === 39128 && data.charCodeAt(i+1) === 36807){
        count++;
    }
}
count;
```



@rannn🐨 他的 i 是没有 被 var 的
```
var count = 0;
var len = data.length;
for(i = 0;i < len;){
  if(data.charCodeAt(i++) === 39128 && data.charCodeAt(i++) === 36807) count++;
}
count;

```

@Zac
```
var count = 0;
var len = data.length;
var i = 0;
for(i;i < len;i++){
  if(data.charCodeAt(i) === 39128 && data.charCodeAt(i+1) === 36807)
        count++;
}
count;
```


我的机器：

![](http://p5.qhimg.com/t0180730edc5857d284.jpg)
![](http://p6.qhimg.com/t015545ed86ce201cdb.jpg)
![](http://p1.qhimg.com/t0144a26e84d1886f80.jpg)

从我的机器上测试可以看出，for 是别 split 要快

@Zac的 和 for 2 是差不多的，但是 @Zac 将 `var i = 0` 提出来了，稳定性上提升了不少。

测试地址：

[https://jsperf.com/splite-for-pg](https://jsperf.com/splite-for-pg)



