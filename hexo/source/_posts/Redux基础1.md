---
title: Redux基础1
date: 2018-10-26 15:38:38
tags: Redux
---

# 简介

Redux 是 JavaScript 状态容器，提供可预测化的状态管理。 可以让你构建一致化的应用，运行于不同的环境（客户端、服务器、原生应用），并且易于测试。 Redux 除了和 React一起用外，还支持其它界面库。 它体小精悍（只有2kB，包括依赖）。 

要点：应用中所有的 state 都以一个对象树的形式储存在一个单一的 store 中。 惟一改变 state 的办法是触发 action，一个描述发生什么的对象。 为了描述 action 如何改变 state 树，你需要编写 reducers。 

```
store = state集合
通过createStore（reducer）创建store
API： subscribe, dispatch, getState

reducer = （state，action）=> new state 的纯函数，决定每个action如何改变state。
一个应用只能有一个根reducer，可有多个子reducer。

action描述如何改变state的对象，可以清晰地知道应用中到底发生了什么。

store.dispatch(action) 改变state的唯一方法。
```

# 三大原则

1. 单一数据源

   整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。

2. state是只读的

   唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。

3. 使用纯函数来执行修改

   为了描述 action 如何改变 state tree ，你需要编写 reducers。

![关系图](https://i.imgur.com/jnY85Uw.png)