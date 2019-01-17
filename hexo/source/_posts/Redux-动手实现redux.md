---
title: Redux-动手实现redux
date: 2018-11-16 14:43:43
tags: Redux
---

## 1. 传统props数据传递的弊端

react数据相关属性：

- state：用来维护组件内部产生数据的信息
- props：用来维护组件外部传入数据的信息
- context：用来维护跨级组件信息的传递

当前数据传递过于麻烦，通过props一级一级的向下传递，同级组件之间的数据传递还需要提升状态。而context将数据放到全局，任意组件都可直接读/写全局的数据。

## 2. 使用context来提供全局参数

context属性的使用步骤：

- 准备阶段

  1. 在产生参数的最顶级组件中，使用childContextTypes静态属性来定义需要放入全局参数的类型

     ```js
     static childContextTypes={
         title: PropTypes.string
     }
     ```

  2. 在父组件中，提供状态，来管理数据

     ```js
     state = {
         title : 'xxx'
     }
     ```

  3. 声明子组件获取全局参数的方式

     ```js
     getChildContext(){
         return {
             title : this.state.title
         }
     }
     ```

- 使用

  1. 在子组件中，使用contextTypes静态属性，声明需要获取父组件放入全局context中的参数类型

     ```js
     static contextTypes={
         title:PropTypes.string
     }
     ```

  2. 在子组件需要的地方获取全局参数： this.context.全局属性名

     ```js
     this.context.title
     ```

## 3. 自己动手编写redux-准备

Redux：全局的状态管理。

模拟Redux步骤：

1. 声明一个全局状态

   ```js
   let appState={
       title:'xx
   }
   ```

2. 定义一个全局渲染方法

   ```js
   const renderApp=(state)=>{
       renderScreen(state.title)
   }
   
   const renderScren=(title)=>{
   // 1)获取页面元素
   	const screenEl = document.querySelector('screen');
   // 2)对页面元素进行修改
   	screenEl.innerHTML = title;
   }
   ```

3. 全局初始化

   ```js
   renderApp(appState)
   ```

4. 提供修改状态方法：对按钮进行监听，修改状态

   ```js
   document.querySelector('button').addEventListener('click',()=>{
       appState.tite='hahaha'
   })
   ```

5. 重新渲染

   ```js
   renderApp(appState)
   ```

当前问题：

1. 模块（组件）间需要共享的数据是直接暴露在全局的
2. 全局的状态依旧可以直接修改，会导致不可预料的结果

## 4. 通过createStore函数管理状态

1. 定义一个createStore的函数，来管理全局状态数据

   ```js
   const createStore = ()=>{
       // 1) 初始化数据
       let state={
           title: 'xx'
       }
       // 2) 给外部提供获取数据的方法
       const getState = ()=> state;
       // 3) 提供一个dispatch方法，修改数据
       const dispath = action=>{
           // 3.1) 对操作类型进行判断
           switch (action.type){
               case 'Update': 
                   state.title=action.text;
                   break;
               case 'Undo':
                   break;
               default:   
           }
       }
       // 4) 暴露获取数据&修改数据的方法
       return { getStore , dispatch }
   }
   ```

2. 使用createStore函数来创建数据的管理对象

   ```js
   const store=createStore()
   ```

3. 定义一个全局渲染方法

   ```js
   const renderApp=(state)=>{
       renderScreen(state.title)
   }
   
   const renderScren=(title)=>{
   // 1)获取页面元素
   	const screenEl = document.querySelector('screen');
   // 2)对页面元素进行修改
   	screenEl.innerHTML = title;
   }
   ```

4. 全局初始化

   ```js
   renderApp(store.getState())
   ```

5. 修改状态

   ```js
   document.querySelector('button').addEventListener('click',()=>{
   	store.dispath({type:'Update'})
   })
   ```

6. 重新渲染

   ```js
   renderApp(store.getState())
   ```

当前问题：

1. 在createStore组件中，dispatch函数的操作代码写死在了内部，这样不利于扩展.

   解决：把dispatch函数的执行方法抽离出去，在创建store时，动态传入。

## 5. 使用纯函数来管理状态

1. 对状态的修改，交给纯函数

   ```js
   let changeState = (state, action)=>{
           switch (action.type){
               case 'Update': 
                   state.title=action.text;
                   break;
               case 'Undo':
                   break;
               default:   
           }
   }
   ```

2. 定义一个createStore的函数，来管理全局状态数据，传入状态修改函数

   ```js
   const createStore = ( changeState )=>{
       // 1) 初始化数据
       let state={
           title: 'xx'
       }
       // 2) 给外部提供获取数据的方法
       const getState = ()=> state;
       // 3) 提供一个dispatch方法，修改数据
       const dispath = action => changeState(state,action)
       // 4) 暴露获取数据&修改数据的方法
       return { getStore , dispatch }
   }
   ```

3. 全局渲染方法

4. 使用createStore函数来创建数据的管理对象

   ```js
   const store=createStore( changeState )
   ```

5. 全局初始化

6. 修改状态

7. 重新渲染

当前问题：

1. 每次修改状态后还需手动渲染页面，能不能自动化？

   解决：把状态修改后的操作，交给订阅方法，把需要做的渲染操作添加到订阅中，会在状态修改后自动完成渲染操作。

## 6. 使用订阅函数来解放双手

1. 对状态的修改，交给纯函数

2. 定义一个createStore的函数，来管理全局状态数据，传入状态修改函数

   ```js
   const createStore = ( changeState )=>{
       // 1) 初始化数据
       let state={
           title: 'xx'
       }
       	// 4.1) 声明监听数组
       let listeners = [];
       // 2) 给外部提供获取数据的方法
       const getState = ()=> state;
       // 3) 提供一个dispatch方法，修改数据
       const dispath = action => {
       	// 3.1) 修改数据
           // 5）将返回的新state，赋值给state
           state=changeState(state,action);
       	// 3.2) 调用所有监听
           listeners.forEach(listener=>listener());
       }
       // 4) 监听&订阅
       	// 4.2) 提供一个‘订阅’方法，对特定状态修改进行相应
       const subscribe=listener=>{
           listeners.push(listener)
       }
       
       // 5) 暴露获取数据&修改数据的方法
       return { getStore, dispatch, subscribe }
   }
   ```

3. 全局渲染方法

4. 使用createStore函数来创建数据的管理对象

5. 当状态发生改变时，执行重新渲染函数

   ```js
   store.subscribe(()=>{
       // 重新渲染函数调用
       renderApp(store.getState())
   })
   ```

6. 全局初始化

7. 修改状态

当前问题：

1. 每次修改会触发批量更新，有一部分是无用功，严重的性能问题。

   解决：修改判断标准，能够识别状态内容的变化，调用对应的方法。在每次渲染前，对渲染的内容做一次判断，区分新老状态的差别，对渲染进行细粒度控制。

## 7. 完成渲染优化

1. 对状态的修改，交给纯函数

   ```js
   let changeState = (state, action)=>{
           switch (action.type){
               case 'Update': 
               	// 返回一个新状态，与旧state无关
               	return {
               		...state,
                       title: action.text
               	}
               case 'Undo':
                   break;
               default:   
           }
   }
   ```

2. 定义一个createStore的函数，来管理全局状态数据，传入状态修改函数

   ```js
   const createStore = ( changeState )=>{
       let state={
           title: 'xx'
       }
       let listeners = [];
       const getState = ()=> state;
       const dispath = action => {
           // 将返回的新state，赋值给state
           state=changeState(state,action);
           listeners.forEach(listener=>listener());
       }
       const subscribe=listener=>{
           listeners.push(listener)
       }
       
       return { getStore, dispatch, subscribe }
   }
   ```

3. 全局渲染方法

   ```js
   const renderApp=(newState,oldState={})=>{
       // 如果新老状态一致，则不需要重新渲染。
       if(newState===oldState) return;
       renderScreen(newState.title,oldState.title)
   }
   
   const renderScren=(newTitle,oldTitle)=>{
       // 如果新老title一致，则不需要重新渲染
       if(newTitle====oldTitle) return;
   	const screenEl = document.querySelector('screen');
   	screenEl.innerHTML = title;
   }
   ```

4. 使用createStore函数来创建数据的管理对象

5. 存储旧状态

   ```js
   let oldState=store.getState();
   ```

6. 当状态发生改变时，执行重新渲染函数

   ```js
   store.subscribe(()=>{
       // 获取新状态
       const newState=store.getState();
       // 重新渲染函数调用,传入新老状态
       renderApp(newState,oldState)
       // 新状态用过之后就变成了老状态
       oldState=newState;
   })
   ```

7. 全局初始化

8. 修改状态