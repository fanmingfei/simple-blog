---
layout: post
title: "如何为 Vue 项目写单元测试"
category: JavaScript
date: 2017-07-17 18:40:00
---

> 本文转载自：[众成翻译](http://www.zcfy.cc)

> 译者：[明非](http://www.zcfy.cc/@edire)

> 链接：[http://www.zcfy.cc/article/3602](http://www.zcfy.cc/article/3602)

> 原文：[https://scotch.io/amp/tutorials/how-to-write-a-unit-test-for-vuejs?from=timeline&isappinstalled=0](https://scotch.io/amp/tutorials/how-to-write-a-unit-test-for-vuejs?from=timeline&isappinstalled=0)

众所周知，Vue.js 是一个非常牛逼的 JavaScript 框架，对于创建复杂功能的前端项目是非常有用的。不管是什么项目，检查应用是否正常工作，运行是否为预期，是尤为重要的。然而，为了保证业务正常运行，我们的项目，每做一次更新，都要对所有功能做一次回归测试，随着项目的增大，重复的测试工作越来越多，越来越乏味，手工测试将变成一个恶心的事情。正因如此，自动化测试诞生了，它可以随时监测我们的代码是否正常工作，运行结果是否符合预期。在这个教程中，我们将创建一个简单的VueJS项目，并为其写一个简单的单元测试。

我们创建一个基本的 to-do list 组件进行测试。我们将要测试的是，列表展示是否正确，用户是否可以正常添加到 to-do list。通过这个教程，你将学会如何去为你的组件写一个测试，测试包括HTML展示是否正确以及用户的操作是否能正常进行。

[这个git库](https://github.com/lilyrae/vue-tests)是这篇文章的所有代码。

## 创建项目

创建 JavaScript 项目可能是一个复杂的过程。琳琅满目的依赖库供我们选择。不过还好，我们可以使用[vue-cli](https://github.com/vuejs/vue-cli)来创建VueJS项目，它帮我们包办一切。运行 npm install 来安装依赖：

    npm install -g vue-cli
    vue init webpack project-name

在这个过程中，你可能会遇到几个提示。大多数提示比较简单易懂，你可以直接选择默认选项。需要注意的是，我们需要是否安装 `vue-router`、`Karma`、`Mocha`的提示后输入YES来引入这些工具。然后开始安装依赖：

    cd project-name
    npm install

接下来我们执行下面的命令，这个命令将会在本地运行你的应用并在浏览器中打开。

    `npm run dev`

如果你的网络好的话，一会就装好了。

### 依赖

**Webpack (2.3)** 是一个打包器，它可以合并打包JavaScript，CSS，HTML文件，并且提供给应用运行。**Bable (v6.22)** 是一个编译器，用来把ES6编译成ES5。目前有很多 JavaScript 标准在许多浏览器中还没有被支持，所以需要将ES6转成ES。

### 测试依赖

**Karma (v1.4)** 是一个运行时，它产生一个 Web 服务环境来运行项目代码，并且执行测试。**Mocha (v3.2)** 是一个 JavaScript 测试框架。**Chai (v3.5)** 是一个 Mocha 可以使用的断言库。

在你的项目中，你可以找到下面这些目录：`build`、`config`、`node_modules`、`src`、`static` 和 `test`。对于本教程来说最重要的是`src`，它包括我们应用的代码，用来测试。

## 第一次测试

从最基本的开始去做一般都没错。我们将从创建简单的列表组件开始。在 `src/components` 里创建一个新文件叫做 `List.vue` 并且将下面代码写进去。

    <template>
      <div>
        <h1>My To Do List</h1>
        </br>
        <!--displays list -->
        <ul>
          <li v-for="item in listItems">{{ item }}</li>
        </ul>
      </div>
    </template>

    <script>
    export default {
      name: 'list',
      data () {
        return {
          listItems: ['buy food', 'play games', 'sleep'],
        }
      }
    }
    </script>

在这个组件中，列表项被储存在数组（`listItems`）里面。数据被传递到模板，然后被遍历（`v-for`），然后展现在页面上。

当然，我们需要看到刚刚创建的列表，我们可以创建一个新的路由来展示这个组件。在`src/router/index.js`中创建一个路由，添加完了代码应该是下面这样的：

    import Vue from 'vue'
    import Router from 'vue-router'
    import Hello from '@/components/Hello'
    import List from '@/components/List'

    Vue.use(Router)

    export default new Router({
      routes: [
        {
          path: '/',
          name: 'Hello',
          component: Hello
        },
        {
          path: '/to-do',
          name: 'ToDo',
          component: List
        },
      ]
    })

现在，访问[localhost:8080/#/to-do](http://localhost:8080/#/to-do)，可以看到我们做的应用。

首先，我们要测试的是数据的正确性。在`test/unit/specs`目录下创建一个`List.spec.js`，并且写入下面的代码：

    import List from '@/components/List';
    import Vue from 'vue';

    describe('List.vue', () => {

      it('displays items from the list', () => {
          // our test goes here
      })
    })

在这个文件中，我们_describing_了`List.vue`组件，并且我们创建了一个空的测试，他将要检查这个组件的列表展示。这是一个基本的 Mocha 测试文件。

我们首先要安装我们的Vue组件。复制下面代码放在测试文件的'our test goes here'下面：

    // build component
    const Constructor = Vue.extend(List);
    const ListComponent = new Constructor().$mount();

我们继承了Vue组件并且安装这个组件。安装组件很重要，只有这样我们才能将通过模板来渲染HTML。也就是说，HTML已经被创建，并且我们模板中的变量（比如 `item`）已经被填充内容，这样我们就可以获取HTML了（使用`$el`）。

我们的组件准备好了，我们可以写第一个断言。在这个例子中，我们使用Chai 断言库提供的 'expect' 模式，还有 'should' 和 'assert'模式。将下面的代码放到，启动组件的后面。

    // assert that component text contains items from the list
    expect(ListComponent.$el.textContent).to.contain('play games');

之前提到过，我们可以使用`ListComponent.$el`来获取组件的HTML，如果想去获取HTML内的内容（比如 文本），我们可以使用`ListComponent.$el.textContent`。这个断言用来检查HTML列表中的文本是否和组件的data里的数据列表吻合。

为了检查所有的事情都符合我们的预期，我们可以运行测试！通过 vue-cli 创建的项目，我们可以简单的使用`npm run unit`来运行`cross-env BABEL_ENV=test karma start test/unit/karma.conf.js --single-run`。

    `npm run unit`

如果测试都通过了，将会有一个绿色的列表来显示测试报告，让你了解测试都覆盖了哪些代码。

## 模拟用户输入

虽然前面的功能赞赞哒，但没有多少应用只是用来展示数据。下一步我们要做到是添加新的项目到to-do list中。看这里，我们创建了一个input框来输入内容，然后创建一个button用来提交内容。下面是更新后的 List.vue：

    <template>
      <div>
        <h1>My To Do List</h1>
        </br>
        <input v-model="newItem" >
        <button @click="addItemToList">Add</button>
        <!-- displays list --> 
        <ul>
          <li v-for="item in listItems">{{ item }}</li>
        </ul>
      </div>
    </template>

    <script>
    export default {
      name: 'test',
      data () {
        return {
          listItems: ['buy food', 'play games', 'sleep'],
          newItem: ''
        }
      },
      methods: {
          addItemToList() {
            this.listItems.push(this.newItem);
            this.newItem = '';
          }
      }
    }
    </script>

使用`v-model`，输入框里面的内容将和newItem进行双向绑定。当按钮被点击后，执行`addItemToList`，将`newItem`添加到to-do list数组里面，并且清空`newItem`里面的内容，新的项目将会被添加到列表中。

可以为新功能写测试文件了，创建`List.spec.js`，并且添加以下测试代码。

    it('adds a new item to list on click', () => {
        // our test goes here
    })

第一步，我们需要创建我们的组件，并且模拟一个用户在输入框的输入行为。因为 VueJs 将输入框和 `newItem` 变量进行了绑定，我们可以给`newItem`设置内容。

    // build component
    const Constructor = Vue.extend(List);
    const ListComponent = new Constructor().$mount();

    // set value of new item
    ListComponent.newItem = 'brush my teeth';

下一步，我们需要点击按钮。我们需要在HTML中找到按钮，在`$el`中即可找到。这是，我们可以使用`querySelector`，像选择真是元素一样选择这个按钮。也可以使用class(`.buttonClass`)、ID（`#buttonID`）或者标签名(`button`)来选择。

    // find button
    const button = ListComponent.$el.querySelector('button');

为了模拟点击，我们需要给按钮一个新的事件对象。在测试环境中，List组件不会监听任何事件，因此我们需要手动运行`watcher`。

    // simulate click event
    const clickEvent = new window.Event('click');
    button.dispatchEvent(clickEvent);
    ListComponent._watcher.run();

最后，我们需要检查我们添加的新项目是否显示在HTML中，这个在前面已经介绍过。我们也需要检查`newItem`是否被存储在了数组里面。

    //assert list contains new item
    expect(ListComponent.$el.textContent).to.contain('brush my teeth');
    expect(ListComponent.listItems).to.contain('brush my teeth');

下面是整个测试文件的内容：

    import List from '@/components/List';
    import Vue from 'vue';

    describe('List.vue', () => {
      it('displays items from the list', () => {
        const Constructor = Vue.extend(List);
        const ListComponent = new Constructor().$mount();
        expect(ListComponent.$el.textContent).to.contain('play games');
      })

      it('adds a new item to list on click', () => {
        // build component
        const Constructor = Vue.extend(List);
        const ListComponent = new Constructor().$mount();

        // set input value
        ListComponent.newItem = 'brush my teeth';

        // simulate click event
        const button = ListComponent.$el.querySelector('button');
        const clickEvent = new window.Event('click');
        button.dispatchEvent(clickEvent);
        ListComponent._watcher.run();

        // assert list contains new item
        expect(ListComponent.$el.textContent).to.contain('brush my teeth');
        expect(ListComponent.listItems).to.contain('brush my teeth');
      })
    })

现在跑一次这个测试，应该全是绿色的。

希望你读这些代码的时候思路能够清晰，不过它对于刚刚开始接触VueJs单元测试的人来说可读性并不是很高。有一个VueJS实用程序库，它将一些复杂的代码进行了封装。如果想使用它，可以在项目的根目录下输入以下命令安装。

    `npm install avoriaz`

下面这个测试实际上和上面测试相同，只不过写法上有些不同。我们使用了`mount()`法来安装Vue组件，使用`find()`获取按钮，使用`dispatch()`来触发点击。

    import { mount } from 'avoriaz';
    import List from '@/components/List';
    import Vue from 'vue';

    describe('List.vue', () => {
      // previous tests ..

      it('adds new item to list on click with avoriaz', () => {
           // build component
        const ListComponent = mount(List);

        // set input value
        ListComponent.setData({
          newItem: 'brush my teeth',
        });

        // simulate click event
        const button = ListComponent.find('button')[0];
        button.dispatch('click');

        // assert list contains new item
        expect(ListComponent.text()).to.contain('brush my teeth');
        expect(ListComponent.data().listItems).to.contain('brush my teeth');
      })
    })

## 总结

在日常工作以及JavaScript开发中，尤其是VueJS项目，测试是非常重要的。因为刚开始接触测试的时候，我遇到了一些问题，所以总结出一篇文章供大家参考。希望这篇文章能够帮到所有像我一样的人。

[这个git库](https://github.com/lilyrae/vue-tests)是这次教程所有的代码。