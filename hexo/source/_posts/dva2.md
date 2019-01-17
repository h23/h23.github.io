---
title: dva2
date: 2018-12-14 12:40:37
tags: dva
---

## 1. 核心概念

- State：object，保存整个应用状态，即储存数据的地方。收到 Action 以后，会更新数据。

- View：React 组件构成的视图层。从 State 取数据后，渲染成 HTML 代码。只要 State 有变化，View 就会自动更新。

- Action：object，描述 UI 层事件。

- connect 方法：function，绑定 State 到 View。

  ```js
  import { connect } from 'dva';
  
  function mapStateToProps(state) {  
      return { todos: state.todos };
  }
  connect(mapStateToProps)(App);  // 第一个参数是 mapStateToProps 函数，mapStateToProps 函数会返回一个对象，用于建立 State 到 Props 的映射关系。
  ```

- dispatch 方法：function，发送 Action 到 State。

  ```js
  dispatch({
    type: 'click-submit-button',
    payload: this.form.data
  })
  // 被 connect 的 Component 会自动在 props 中拥有 dispatch 方法。
  ```

## 2. dva 应用的最简结构

### 2.1 不带Model

```js
import dva from 'dva';
const App = () => <div>Hello dva</div>;

// 创建应用
const app = dva();
// 注册视图
app.router(() => <App />);
// 启动应用
app.start('#root');
```

### 2.2 带Model

```js
// 创建应用
const app = dva();

// 注册 Model
app.model({    // 所有的应用逻辑都定义 app.model 对象上
  namespace: 'count',
  state: 0,
  reducers: {
    add(state) { return state + 1 },
  },
  effects: {
    *addAfter1Second(action, { call, put }) {
      yield call(delay, 1000);
      yield put({ type: 'add' });
    },
  },
});

// 注册视图
app.router(() => <ConnectedApp />);

// 启动应用
app.start('#root');
```

## 3. Model 对象的属性

- namespace: 当前 Model 的名称。整个应用的 State，由多个小的 Model 的 State 以 namespace 为 key 合成
- state: 该 Model 当前的状态。数据保存在这里，直接决定了视图层的输出
- reducers: Action 处理器，处理同步动作，用来算出最新的 State
- effects：Action 处理器，处理异步动作

### 3.1 Reducer

Reducer 是 Action 处理器，用来处理同步操作，可以看做是 state 的计算器。它的作用是根据 Action，从上一个 State 算出当前 State。

```js
// count +1
function add(state) { return state + 1; }

// 往 [] 里添加一个新 todo
function addTodo(state, action) { return [...state, action.payload]; }

// 往 { todos: [], loading: true } 里添加一个新 todo，并标记 loading 为 false
function addTodo(state, action) {
  return {
    ...state,
    todos: state.todos.concat(action.payload),
    loading: false
  };
}
```

### 3.2 Effect

* 基于 Redux-saga 实现。

* Effect 指的是副作用。根据函数式编程，计算以外的操作都属于 Effect，典型的就是 I/O 操作、数据库读写。

* Effect 是一个 Generator 函数，内部使用 yield 关键字，标识每一步的操作（不管是异步或同步）。

* dva 提供多个 effect 函数内部的处理函数，比较常用的是 `call` 和 `put`。
  * call：执行异步函数
  * put：发出一个 Action，类似于 dispatch

```js
function *addAfter1Second(action, { put, call }) {
  yield call(delay, 1000);
  yield put({ type: 'add' });
}
```
