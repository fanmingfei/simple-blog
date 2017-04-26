---
layout: post
title: [译]在 Docker 上运行本地版的 TravisCI
category: 工具&框架
date: 2017-04-26 21:23:00
---

> 首发于众成翻译：[在 Docker 上运行本地版的 TravisCI](http://zcfy.cc/translate/2682)
> 原文链接：[How to Run TravisCI locally on Docker](https://medium.com/google-developers/how-to-run-travisci-locally-on-docker-822fc6b2db2e)

不想让 Github 私有仓库代码被线上版 Travis 服务获取？面对构建异常抓狂却没有日志可偱？把他跑在本地吧！([Interested in TravisCI configuration](https://medium.com/google-developers/hacks-i-did-to-use-travis-ci-with-firebase-ios-quickstarts-da67c4986f29)?)

![](http://p0.qhimg.com/t011abafa00876ca05d.jpg)

1.  [安装 Docker](https://docs.docker.com/docker-for-mac/install/)

2.  在 Docker 上安装 Travis

```
# 根据你项目中.travis.yml的开发语言的配置来安装与之对应的travis镜像。
$ docker run -it -u travis quay.io/travisci/travis-jvm /bin/bash

```

```
# 现在你已经在你的 docker 镜像里了，切换到 travis 用户
sudo — travis

```

```
# 安装最新版的 ruby (默认是 1.9.3)
rvm install 2.3.0
rvm use 2.3.0

```

```
# 安装 travis-build 来生成 .travis.yml 的.sh文件
cd builds
git clone https://github.com/travis-ci/travis-build.git
cd travis-build
gem install travis
travis # 创建 ~/.travis
ln -s `pwd` ~/.travis/travis-build
bundle install

```

```
# 为 Github 创建 ssh Key
ssh-keygen -t rsa -b 4096 -C “YOUR EMAIL REGISTERED IN GITHUB”

```

```
# 点击回车将文件存到默认位置
# 点击两次回车设置空密码

```

```
# 好了，我们生成了 ssh key 现在可以分享到 github 了
less ~/.ssh/id_rsa.pub

```

```
# Copy the contents of the id_rsa.pub

```

3\. 打开 [Github SSH key settings](https://github.com/settings/keys)

4\. 创建一个名字为 “docker key” 的 ssh key，并且将 ~/.ssh/id_rsa.pub 粘贴到内容处。

5\. 返回 docker 命令行。

```
# 创建项目目录，将你的项目 clone 到本地
cd ~/builds
mkdir AUTHOR
cd AUTHOR
git clone https://github.com/AUTHOR/PROJECT.git
cd PROJECT

```

```
# 切换到你想检测的分支
# 并将 travis 脚本编译成 bash 脚本
travis compile > ci.sh

```

```
# 打开 bash script 修改分支名字
vi ci.sh

```

```
# in Vi type “/branch” to search and add the right branch name
# 在 vi 工具里输入 “/branch” 来查找到分支设置的位置，并且将其修改正确
# — branch\=\’\NEW_BRANCH’\

```

```
# You most likely will need to edit ci.sh as it ignores ‘matrix’ and ‘env’ keywords

# 你有可能需要编辑ci.sh来忽略 “matrix” 和 “env” 关键词
bash ci.sh

```

恭喜，你已经在本地跑起了 TravisCI。