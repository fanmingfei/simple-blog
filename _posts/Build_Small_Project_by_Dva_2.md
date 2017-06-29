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


接下来，我们正式开始写代码了。

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

这是默认的 `index.js`，是一个项目的入口文件，默认 2 和 3 暂时是被注释掉的。2 我们暂时用不到，3 是引入我们开始创建的Model的，4 是引入我们的路由文件的。

我们引入我们创建的`models`：

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

在路由配置中，`<Router>` 代表路由的根节点，在 `<Router>` 内使用 `<Router>` 来定义路由，`path` 属性定义路由的路径，也就是url，`component` 属性来定义访问这个路由时调用的组件。

分析上面的代码：

```
import React from 'react';
import { Router, Route } from 'dva/router';
```
引入了必要的 React，Router和Route。

```
import IndexPage from './routes/Index';
import IntroPage from './routes/Intro';
import ListPage from './routes/List';
```
引入了3个入口文件，入口文件也是一个组件。

```
<Route path="/" component={IndexPage} />
```

当我们访问 `/` 时，页面会显示 IndexPage 组件。

```
<Route path="/list">
    {/* 文章列表页路由，第一个参数是文章类型，第二个参数是当前第几页 */}
    <Route path=":type/:page" component={IntroPage} />
</Route>
```

当我们访问 `/list/flea-market/2` 时，我们加载了 List 这个组件，但是，List组件不会获取到我们URL中的内容，我们需要通过其他方式获取分析我们的URL，让 List 组件来显示正确的内容，后面会讲到。



未完待续……









