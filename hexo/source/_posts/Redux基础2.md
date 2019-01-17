---
title: Redux基础
date: 2018-11-02 14:45:08
tags: Redux
---

## 1. Action

**Action**：将数据从应用传到store的有效载荷。是store数据的唯一来源。通过`store.dispatch()`将action传到store。

action示例： action是一个JS对象，必须包含type属性。

```
{
  type: ADD_TODO,      // type通常是字符串常量
  text: 'Build my first Redux app'
}

注：若应用规模较大，建议使用单独的模块或文件来存放action
import { ADD_TODO, REMOVE_TODO } from '../actionTypes'
```

尽量减少在action中传递的数据。

**Action创建函数**：返回action的函数。

## 2. Reducer

**Reducers**： 指定了应用状态的变化如何响应 actions并发送到 store 的，记住 actions 只是描述了有事情发生了这一事实，并没有描述应用如何更新 state。

Reducer 是一个纯函数，接收旧state和action，返回新state。`(oldState,action)=>newState`。**只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。**

不要再Reducer中做一下操作：

- 修改传入参数
- 执行有副作用的操作，如API请求和路由跳转
- 调用非纯函数，如Date.now() or Math.random()

```
import { VisibilityFilters } from './actions'  // action

const initialState = {                         // 初始state
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: []
};

function todoApp(state = initialState, action) {  // reducer
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {     // 返回new state，通过Object.assign创建（第一个参数必须为空对象。因为不能修改state，而Object.assign对改变第一个参数的值。）
        visibilityFilter: action.filter
      })
    default:                              // 默认情况下返回旧state
      return state
  }
}
```

推荐做法：

1. 开发一个函数来做为主 reducer
2. 主 reducer调用多个子 reducer 分别处理 state 中的一部分数据
3. 主 reducer把这些数据合成一个大的单一对象
4. 主 reducer 并不需要设置初始化时完整的 state。初始时，如果传入 `undefined`, 子 reducer 将负责返回它们的默认值。
5. **注意每个 reducer 只负责管理全局 state 中它负责的一部分。每个 reducer 的 state 参数都不同，分别对应它管理的那部分 state 数据。**

Reducer合成： `combineReducers()`

```
import { combineReducers } from 'redux'

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp
```

## 3. Store

action： 用于描述发生了什么。reducer： 用于根据action更新state。

**Store** 就是把它们联系到一起的对象。Store 有以下职责：

- 维持应用的 state；
- 提供 `getState()`方法获取 state；
- 提供 `dispatch(action)` 方法更新 state；
- 通过 `subscribe(listener)` 注册监听器;
- 通过 `subscribe(listener)`返回的函数注销监听器。
- 通过`createStore(主reducer，state 初始状态)`创建store，**Redux 应用只有一个单一的 store**。