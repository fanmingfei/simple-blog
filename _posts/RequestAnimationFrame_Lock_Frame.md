## 前言
这里就不介绍 requestAnimationFrame 的使用方法了，具体可以参考 [requestAnimationFrame | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)
在日常的动画项目中，我们需要使用 `requestAnimationFrame` 实现持续顺畅的动画效果，如果是简单动画还好，涉及到游戏、重逻辑的情况，可能一帧的时间不能支持逻辑运行，造成帧率忽高忽低，渲染卡顿的情况。这种情况，在我们业务逻辑优化以后，我多数考虑使用锁帧进行处理。

## 锁帧
关于锁帧，我们实现一套锁帧方案：

```
const fps = 60
let lastTime = 0
const logic = (time)=>{
    requestAnimationFrame(logic)
    if (time - lastTime < 1000/fps) {
        return
    }
    let realFPS = 1000 / (time - lastTime)
    console.log('real fps', realFPS)
    // do something
    lastTime = time
}
requestAnimationFrame(logic)
```

回调函数中输出了当前的真实帧率。

设置 fps 的值为锁帧的帧率，我们可以输入几个值观察真实帧率，真实帧率我已经忽略了运行少量代码导致的性能损耗。

| 设置帧率 | 真实帧率 |
|----|----|
| 60 | 60 |
| 50 | 30 |
| 40 | 30 |
| 25 | 20 |
| 15 | 15 |

可以发现，并不是设置多少帧，实际帧率就是多少帧的。

因为浏览器 `requestAnimationFrame` 的额定帧率是60帧，如果通过这种锁帧的方式让帧率更低的话，帧周期只能是60帧的帧周期的倍数，也就是 1000/60 的倍数，所以实际的帧周期只能是大于或者等于设置的帧率对应的帧周期。

比如我们设置帧率是50，那么帧周期是 1000/50=20ms，`requestAnimationFrame` 额定帧周期是 1000/60=16.666…ms，第二帧开始的时间是16.66…ms，不会执行业务逻辑，等到第三帧，时间过去了33.33…ms，满足锁帧规则，开始执行业务代码，当前距离上一次执行业务逻辑已经过了33.33…ms，所以帧周期是33.33…ms，所以即便我们设置帧率为50帧，其实际帧率也会是30帧。

## 其他
`requestAnimationFrame` 回调函数的参数是当前帧开始的时间，有时候我们使用 `performance.now()` 来获取当前时间进行，其实是获取的当前时间，通过这个时间进行游戏状态的更新，所以每一次取到的时间间隔可能不同，导致游戏可能并不是真正想要的状态。通过`requestAnimationFrame`回调函数参数拿到的是当前帧开始的时间，通过计算拿到游戏状态，是当前帧开始时候的游戏状态，保证帧率的情况下，游戏状态一定是准确的。