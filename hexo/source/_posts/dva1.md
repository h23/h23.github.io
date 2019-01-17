---
title: dva1
date: 2018-12-07 12:29:46
tags: dva
---

## 1. 基础概念

dva 是基于现有应用架构 (redux + react-router + redux-saga 等)的一层轻量封装。dva 是 framework。

dva最核心的是提供了 `app.model` 方法，用于把 reducer, initialState, action, saga 封装到一起：

```
app.model({
  namespace: 'products',
  state: {
    list: [],
    loading: false,
  },
  subscriptions: [
    function(dispatch) {
      dispatch({type: 'products/query'});
    },
  ],
  effects: {
    ['products/query']: function*() {
      yield call(delay(800));
      yield put({
        type: 'products/query/success',
        payload: ['ant-tool', 'roof'],
      });
    },
  },
  reducers: {
    ['products/query'](state) {
      return { ...state, loading: true, };
    },
    ['products/query/success'](state, { payload }) {
      return { ...state, loading: false, list: payload };
    },
  },
});
```

在有 dva 之前，我们通常会创建 `sagas/products.js`, `reducers/products.js` 和 `actions/products.js`，然后在这些文件之间来回切换。

介绍下这些 model 的 key ：

- namespace - 对应 reducer 在 combine 到 rootReducer 时的 key 值
- state - 对应 reducer 的 initialState
- subscription - elm@0.17 的新概念，在 dom ready 后执行
- effects - 对应 saga，并简化了使用
- reducers

## 2. 数据流向

数据的改变发生通常是通过用户交互行为或者浏览器行为（如路由跳转等）触发的，当此类行为会改变数据的时候可以通过 `dispatch` 发起一个 action，如果是同步行为会直接通过 `Reducers` 改变 `State` ，如果是异步行为会先触发 `Effects` 然后流向 `Reducers` 最终改变 `State`。

## 3. Models

### 3.1 State

```
type State = any
```

State 表示 Model 的状态数据，操作的时候每次都要当作不可变数据来对待，保证每次都是全新对象，没有引用关系，这样才能保证 State 的独立性，便于测试和追踪变化。

可通过 dva 的实例属性 `_store` 看到顶部的 state 数据，少用:

```javascript
const app = dva();
console.log(app._store); // 顶部的 state 数据
```

### 3.2 Action

```
type AsyncAction = any
```

Action 是一个普通 javascript 对象，它是改变 State 的唯一途径。无论是从 UI 事件、网络回调，还是 WebSocket 等数据源所获得的数据，最终都会通过 dispatch 函数调用一个 action，从而改变对应的数据。action 必须带有 `type` 属性指明具体的行为，其它字段可以自定义，如果要发起一个 action 需要使用 `dispatch` 函数；需要注意的是 `dispatch` 是在组件 connect Models以后，通过 props 传入的。

```js
dispatch({
  type: 'add',
});
```

### 3.3 dispatch 函数

```
type dispatch = (a: Action) => Action
```

dispatching function 是一个用于触发 action 的函数，action 是改变 State 的唯一途径，但是它只描述了一个行为，而 dipatch 可以看作是触发这个行为的方式，而 Reducer 则是描述如何改变数据的。

在 dva 中，connect Model 的组件通过 props 可以访问到 dispatch，可以调用 Model 中的 Reducer 或者 Effects，例：

```javascript
dispatch({
  type: 'user/add', // 如果在 model 外调用，需要添加 namespace
  payload: {}, // 需要传递的信息
});
```

### 3.4 Reducer

```
type Reducer<S, A> = (state: S, action: A) => S
```

Reducer（也称为 reducing function）函数接受两个参数：之前已经累积运算的结果和当前要被累积的值，返回的是一个新的累积结果。该函数把一个集合归并成一个单值。

### 3.5 Subscription

Subscriptions 是一种从 **源** 获取数据的方法。

Subscription 语义是订阅，用于订阅一个数据源，然后根据条件 dispatch 需要的 action。数据源可以是当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等。

```javascript
import key from 'keymaster';
...
app.model({
  namespace: 'count',
  subscriptions: {
    keyEvent({dispatch}) {
      key('⌘+up, ctrl+up', () => { dispatch({type:'add'}) });
    },
  }
});
```

## 4. Router

前端路由: 由于我们的应用现在通常是单页应用，所以需要前端代码来控制路由逻辑，通过浏览器提供的 History API可以监听浏览器url的变化，从而控制路由相关操作。

dva 实例提供了 router 方法来控制路由，使用的是react-router。

```javascript
import { Router, Route } from 'dva/router';
app.router(({history}) =>
  <Router history={history}>
    <Route path="/" component={HomePage} />
  </Router>
);
```
