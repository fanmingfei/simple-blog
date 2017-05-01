---
layout: post
title: 使用 dva 构建小型前端项目（二）
category: 工具&框架
date: 2017-04-26 22:11:03
---

本系列的上一篇文章我们已经根据 dva 自带的项目目录创建好了文件。这篇文章要把他们连接起来，把这个小项目跑起来。

在开始正式写码之前，我们先引入 Ant Design 来确保我们在不需要设计师的情况下能够正常将项目进行下去

可以查看 Ant Design [项目实战](https://mobile.ant.design/docs/react/practical-projects-cn)


大约是以下步骤


```
npm install antd-mobile babel-plugin-import --save # 安装依赖
```


编辑 `.roadhogrc`

```
{
  "entry": "src/index.js",
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        ["import", { "libraryName": "antd", "libraryDirectory": "lib", "style": "css" }]
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime",
        ["import", { "libraryName": "antd", "libraryDirectory": "lib", "style": "css" }]
      ]
    }
  }
}
```


这样，我们就可以在项目里面使用 Ant Design 来制作界面了。

## index.js

```
import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
```

这是默认的 `index.js`，是一个项目的入口文件，默认 2 和 3 都是被注释掉的。2 我们暂时用不到，3 是引入我们开始创建的Model的，4 是引入我们的路由文件的。

所以我们的这个 `index.js` 文件将会变成：

```
import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/comment'));
app.model(require('./models/flea-market'));
app.model(require('./models/helps'));
app.model(require('./models/lost-office'));
app.model(require('./models/news'));
app.model(require('./models/wish-wall'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
```

我们看一下我们的路由文件 `router.js` 是怎么写的

```
import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/Index';
import IntroPage from './routes/Intro';
import ListPage from './routes/List';

function RouterConfig({ history }) {
    return (
        <Router history={history}>
            {/* 首页路由 */}
            <Route path="/" component={IndexPage} />
            <Route path="/list">
                {/* 文章列表页路由，第一个参数是文章类型，第二个参数是当前第几页 */}
                <Route path=":type/:page" component={IntroPage} />
            </Route>
            <Route path="/intro">
                {/* 文页路由，第一个参数是文章类型，第二个参数是当前文章id */}
                <Route path=":type/:id" component={IntroPage} />
            </Route>
        </Router>
    );
}

export default RouterConfig;
```

未完待续。。。









