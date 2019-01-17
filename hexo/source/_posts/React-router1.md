---
title: React-router1
date: 2018-09-14 09:06:28
tags: React-router
---

# 1.基本概念

React Router包含3个包：

- react-router：提供所有核心组件，函数，整个路由
- **react-router-dom：运行在浏览器环境**
- react-router-native：运行RN环境

react-router-dom有3种基础组件： 

* router components
  *  `<BrowserRouter>` ：响应请求的服务器
     *  url：http://example.com/about
     *  使用HTML5的history API记录路由历史
  *  `<HashRouter>` ：静态文件的服务器
     *  url：http://example.com/#/about
     *  使用URL(window.location.hash)的hash部分来记录
     *  兼容老式浏览器
     *  Web 服务并不会解析 hash，也就是说 # 后的内容 Web 服务都会自动忽略，但是 JavaScript 是可以通过 window.location.hash 读取到的，读取到路径加以解析之后就可以响应不同路径的逻辑处理。
  *  Router组件会创建一个 history 对象，history 用来跟踪 URL, 当URL 发生变化时， Router的后代组件会重新渲染。
  *  Router组件只能有一个子元素。
* route matching components
  *  `<Route>`：通过`path` 属性和当前地址的 `pathname`实现路由匹配。
    * 路由渲染属性：
      * `component` 
      * `render`：需要传值时才使用。
      * `children` 
  * `<Switch>` ：非必需。 `<Switch>` 会遍历其所有的子 `<Route>` 元素，并仅渲染与当前地址匹配的第一个元素。
* navigation components
  *  `<Link>` ：会被转换成`<a>`
  * `<NavLink>` : 特殊类型的 `<Link>` ，有活跃状态（`to` 属性与当前地址匹配时）。
  *  `<Redirect>`：强制导航。当一个 `<Redirect>` 渲染时，它将使用它的 `to` 属性进行定向。

# 2. 简单示例

## 2.1 基本路由

```
// 1.安装下载react-router-dom

//app.js
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';  //2.引入相关router组件

const Home = () => (<div><h2>Home</h2></div>)
const Category = () => (<div><h2>Category</h2></div>)
const Products = () => (<div><h2>Products</h2></div>)

class App extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-light">
          <ul className="nav navbar-nav">
            <li><Link to="/">Homes</Link></li>            //3.将当前路径导航到‘/’
            <li><Link to="/category">Category</Link></li>
            <li><Link to="/products">Products</Link></li>
          </ul>
         </nav>
         
         <Route path="/" component={Home}/>              //4.当当前路径=path值时，显示Home组件
         <Route path="/category" component={Category}/>
         <Route path="/products" component={Products}/>
      </div>
    )
  }
}
```

## 2.2 嵌套路由

```
//1.在2.1的基础上，去掉app.js中的Category组件。

//2.新增Category.js
import React from 'react';
import { Link, Route } from 'react-router-dom';
const Category = ({ match }) => {          //传入math对象
return( 
    <div>
        <ul>
            <li><Link to={`${match.url}/shoes`}>Shoes</Link></li>
            <li><Link to={`${match.url}/boots`}>Boots</Link></li>
            <li><Link to={`${match.url}/footwear`}>Footwear</Link></li>
        </ul>
        <Route 
            path={`${match.path}/:name`}             //‘/:name’变量，匹配两个/之间的字符串
            render= {({match}) =>(<h3> {match.params.name} </h3>)} //通过match.params.name获得path中'/:name'变量匹配的字符串
         /> 
    </div>
  )
}
export default Category;
```

# 3. 组件详解

## 3.1 `<BrowserRouter>` & `<HashRouter>` 

`<BrowserRouter>`使用HTML的history API保持UI和URL的同步。

`<HashRouter>`使用 URL 的 hash 部分（即 window.location.hash ）保持UI和URL的同步。

基本写法：

```
<BrowserRouter>
	<App />
</BrowserRouter>
```

基本属性说明：

* basename: string - 所有地址的基本网址。
  * `basename="/calendar"` 结尾不能有斜线

##  3.2 `<Route>`

Route组件的作用：当前路径 与 path属性匹配时渲染相应组件。不匹配则渲染为空。

基本写法：

```
<Route exact path="/" component={Home}/>
<Route component={NotFound} />            //当路径不匹配path时显示NotFound组件，要放最后。404页面
```

基本属性说明：

* path： 用于标识路由匹配的URL的pathname/hash部分。
  * 当前路径===路由路径时，会生成一个match对象作为 props 中的一个 属性传递给被渲染的组件。包含关于URL和path的信息。
    - match.url：返回URL匹配部分的字符串。用来构建嵌套链接
    - match.path：返回路由路径字符串。用来构建嵌套路由
    - match.isExact：返回布尔值，当 URL 完全匹时，值为 true; 当 URL 部分匹配时，值为 false.
    - match.params：Route的 path 可以包含参数，例如 <Route path="/foo/:id" 包含一个参数 id。params就是用于从匹配的 URL 中解析出 path 中的参数，例如，当 URL = 'http://example.ocm/foo/1' 时，params= {id: 1}。 
* exact: 精确匹配路径。默认会显示所有匹配路径的组件。
* 渲染方法：
  - component: string 只有当位置匹配时才会渲染的 `React` 组件。
    - 渲染时会使用React.createElement创建新的react元素。每次都会创建一个新组件，而不是更新现有组件。
  - render：func 返回一个React元素。
    - 不会创建新react元素。
    - 方便地为待渲染组件传递额外的属性。
  - children: func返回一个React元素。
    - 不管路径是否匹配，children都会渲染。
    - 不匹配时，match=null

##  3.3 `<Switch>`

用于包裹Route组件，只有第一个匹配路径的子Route组件会被渲染。

## 3.4 `<Link>`

提供声明式的，可访问的导航。

基本写法：

```
<Link to="/about">About</Link>
```

基本属性说明：

* to: String - 链接到的地址
* replace: bool - 单击链接将替换历史堆栈中的当前入口，而不是添加新入口。

## 3.5 `<NavLink>`

特殊版本的`<Link>`，有active状态，并可设置active状态的样式。active状态：路径与route.path匹配时。

基本写法：

```
<NavLink to="/faq" activeClassName="selected">FAQs</NavLink>
```

基本属性说明：

- activeClassName: string - 指定active时的样式类
- activeStyle: object - 设置active时的样式。
- exact: bool - 仅在路径完全匹配时才应用active的类or样式。

## 3.6 `<Redirect>`

用于导航到一个新的地址。新地址会覆盖history 栈中的当前地址，类似服务器端（HTTP 3xx）的重定向。

基本写法：

```
<Redirect to="/dashboard"/>
```

基本属性说明：

- to: String - 重定向到的地址
- push: bool - 将新地址推入 history 中，而不是替换当前地址。

## 3.7 History

history对象用来记录当前路径（history.location）。

history对象的属性和方法：

- 属性：
  - length
  - location：当前位置。
    - `pathname` -URL 路径
    - `search` -URL 中的查询字符串
    - `hash` -URL 的哈希片段
    - `state` -  提供给例如使用 `push(path, state)` 操作将 location 放入堆栈时的特定 location 状态。只在浏览器和内存历史中可用。
- 方法：
  - push( path,[state] )
  - replace( path,[state] )
  - go( n )
  - goBack()
  - goForward()
  - block( prompt ) 阻止跳转

## 3.8 location

router在以下几处提供了location 对象：

- [Route component](https://react-router.docschina.org/web/api/Route/component) as `this.props.location`
- [Route render](https://react-router.docschina.org/web/api/Route/render-func) as `({ location }) => ()`
- [Route children](https://react-router.docschina.org/web/api/Route/children-func) as `({ location }) => ()`
- [withRouter](https://react-router.docschina.org/web/api/withRouter) as `this.props.location`

## 3.9 match

当路由路径和当前路径成功匹配，会生成match对象。match对象有更多关于URL和path的信息。这些信息可以通过它的属性获取，如下所示：

- match.url.返回URL匹配部分的字符串。对于创建嵌套的很有用。
- match.path.返回路由路径字符串 – 就是。将用来创建嵌套的。
- match.isExact.返回布尔值，如果准确（没有任何多余字符）匹配则返回true。
- match.params.返回一个对象包含Path-to-RegExp包从URL解析的键值对。

一个 `match` 对象中包涵了有关如何匹配 URL 的信息。

router在以下几处提供了 `match` 对象：

- [Route component](https://react-router.docschina.org/web/api/Route/component) 例如 `this.props.match`
- [Route render](https://react-router.docschina.org/web/api/Route/render-func) 例如 `({ match }) => ()`
- [Route children](https://react-router.docschina.org/web/api/Route/children-func) 例如 `({ match }) => ()`
- [withRouter](https://react-router.docschina.org/web/api/withRouter) 例如 `this.props.match`
- [matchPath](https://react-router.docschina.org/web/api/matchPath) 例如 返回值

## 3.10 `<Prompt>`

页面跳转前提示框，用户点击确定后才跳转。

属性：

* when: boolean值，true显示提示框
* message：func，提示返回值

```
<Prompt
    when={isBlocking}
    message={location =>
        `Are you sure you want to go to ${location.pathname}`
        }
/>
```

# 其他

## 后端路由

多页应用中，一个URL对应一个HTML页面，一个Web应用包含很多HTML页面，在多页应用中，页面路由控制由服务器端负责，这种路由方式称为**后端路由**。

多页应用中,每次页面切换都需要向服务器发送一次请求，页面使用到的静态资源也需要重新加载，存在一定的浪费。而且，页面的整体刷新对用户体验也有影响，因为不同页面间往往存在共同的部分，例如导航栏、侧边栏等，页面整体刷新也会导致共用部分的刷新。

在单面应用中，URL发生并不会向服务器发送新的请求，所以“逻辑页面”的路由只能由前端负责，这种路由方式称为**前端路由**。

前端的路由和后端的路由在实现技术上不一样，但是原理都是一样的。

从性能和用户体验的层面来比较的话，后端路由每次访问一个新页面的时候都要向服务器发送请求，然后服务器再响应请求，这个过程肯定会有延迟。而前端路由在访问一个新页面的时候仅仅是变换了一下路径而已，没有了网络延迟，对于用户体验来说会有相当大的提升。