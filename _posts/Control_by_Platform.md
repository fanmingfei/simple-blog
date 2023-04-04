---
layout: post
title: "前女（男）友，吃饭啦！智能硬件的第一步，使用手机控制esp32/esp8266开发板"
date: 2023-03-27 21:41:00
category: 嵌入式&硬件&IoT
---

在完成垃圾桶的[超声波传感器开关控制以后](https://fanmingfei.com/posts/Embeded_Start.html)（这次的设备和环境配置都是基于之前文章的基础上的），我在想是不是可以通过语音打开垃圾桶，例如：“xxx，吃饭啦！”，垃圾桶就可以自动打开。

我本来还以为需要自己去训练语音AI模型，后来发现有现成的语音识别模块，后来想了想，我直接接入智能音箱不就好了。

我通过米家官网发现需要通过公司资质才能接入，所以我从搜索引擎随便搜了搜，发现有一些IoT平台可以直接接入智能音箱。比如[点灯](https://diandeng.tech/home)，[巴法云](https://bemfa.com/)。

我一开始用了巴法云，发现我的设备没有办法在他的后台上线，所以我就转用了点灯。

点灯是可以接入小爱、天猫进来、小度的。

![](https://src.fanmingfei.com/images/bc403698bae82f394820f91774231b9c.jpg)

下载下来，在 Arduino IDE 里面导入库

![](https://src.fanmingfei.com/images/a47530fae8910d2ac38564ee73cd43b3.jpg)

这样我们就可以在文件>示例里面找到一个使用手机点亮LED灯的实例。

![](https://src.fanmingfei.com/images/38d2a21cc015e6d818e04dee61e1ced2.jpg)

得到如下代码

```

#define BLINKER_WIFI

#include <Blinker.h>

char auth[] = "Your Device Secret Key";
char ssid[] = "Your WiFi network SSID or name";
char pswd[] = "Your WiFi network WPA password or WEP key";

// 新建组件对象
BlinkerButton Button1("btn-abc");
BlinkerNumber Number1("num-abc");

int counter = 0;

// 按下按键即会执行该函数
void button1_callback(const String & state)
{
    BLINKER_LOG("get button state: ", state);
    digitalWrite(LED_BUILTIN, !digitalRead(LED_BUILTIN));
}

// 如果未绑定的组件被触发，则会执行其中内容
void dataRead(const String & data)
{
    BLINKER_LOG("Blinker readString: ", data);
    counter++;
    Number1.print(counter);
}

void setup()
{
    // 初始化串口
    Serial.begin(115200);
    BLINKER_DEBUG.stream(Serial);
    BLINKER_DEBUG.debugAll();
    
    // 初始化有LED的IO
    pinMode(LED_BUILTIN, OUTPUT);
    digitalWrite(LED_BUILTIN, HIGH);
    // 初始化blinker
    Blinker.begin(auth, ssid, pswd);
    Blinker.attachData(dataRead);

    Button1.attach(button1_callback);
}

void loop() {
    Blinker.run();
}

```

我们打开手机上的点灯-blinker的App（注册点灯需要先下载App），在App里面点添加设备>点灯>独立设备。

![](https://src.fanmingfei.com/images/55e655d9de235e8247f7da63e8c18350.jpg)

然后他会给我们一个 Secret Key，把Key复制到代码里面，替换代码里的 `Your Device Secret Key`。

然后在代码里输入我们的wifi的账号密码。

然后把代码烧录到硬件里。

回到手机APP里面，点击新添加的设备，选择载入示例。

![](https://src.fanmingfei.com/images/d92da603ae2b9c93755711d7842ad00a.jpg)

可以看到一个可以控制器，这个控制器我们是可以点击右上角进行编辑的。

可以看到里面的按钮和信息会对应到我们代码的内容。

比如，Button1对应的就是UI界面里面的点我开灯，可以看到左上角的btn-abc对应的就是代码里面的`Button1('btn-abc')`
下面这句话代表按钮点击后触发的回调函数

```
Button1.attach(button1_callback);
```

目前为止我们的效果是这样的：
![](https://src.fanmingfei.com/images/20230404-192548.gif)


我们只需要把`button1_callback`函数替换成打开垃圾桶的方法就可以了。

虽然看起来可以用手机控制，但是距离我们使用语音控制还有一段距离。

我在官网找到了一个[接入小爱同学的例子](https://diandeng.tech/doc/xiaoai)。

代码编译烧录以后，发现我手头没有小爱同学，小爱同学被我放到新家了。

所以这也是这篇文章为什么不叫使用小爱同学控制开发板的原因，手动狗头

等我搬到新家，就试一试。