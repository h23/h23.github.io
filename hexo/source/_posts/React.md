---
title: React
date: 2018-08-17 16:08:46
tags: React
---

# 1. 简介 

**React**用于构建用户界面的JS库。

特点：

- 声明式：为应用的每个状态设计视图，在数据改变时更新渲染界面。
- 组件化
- 一次学习，随处编写

# 2. 安装

创建react项目：单页面

```
npm install -g create-react-app    //安装环境
create-react-app my-app    //创建应用 应用名称my-app 最好使用正确的路径

cd my-app    
npm start  //开始使用
```

添加react到已有项目

```
npm init
npm install --save react react-dom
```

# 3. JSX简介

JSX用来声明React中的元素，是React.createElement()的语法糖。

- 必须声明React变量`import React from 'react'; `

- 推荐在JSX代码的外面包上小括号，防止自动插入分号的bug。

- 书写JSX时会带上换行和缩进，增强代码可读性。

- 单标签需在结尾加上/。

- JSX标签可相互嵌套。

- 基本语法规则：遇到HTML标签就用HTML规则解析，遇到代码块（{）就用JS规则解析。

  - 大写开头的JSX标签表示自定义react组件。会被编译成同名变量并引用。
  - 其余则是内置组件，如div, span。HTML原生标签。


## 3.1 在JSX中使用表达式

JSX中可包含任意JS表达式，注意表达式要包含在大括号中。

JSX本身也是一种表达式，可在if,for中使用，将它复制给变量，当作参数传入，作为返回值。

JS表达式：

- 原始表达式
  - this
  - 标识符引用
  - 字面量引用（若是数组则展开数组的所有成员）
  - 分组表达式 （）
- 复杂表达式
  - 属性访问表达式
  - 对象创建表达式
  - 函数表达式
  - 原始表达式+操作符

```
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);

页面显示：Hello, Harper Perez!
```

## 3.2 JSX属性

两种方式：

- 引号包括的字符串值属性
- 大括号包裹的JS表达式值属性

```
const element = <div tabIndex="0"></div>;
const element = <img src={user.avatarUrl}/>;
```

注意：

- 属性值默认为true，建议写全。

  ```
  以下两种是等价的：
  <MyTextBox autocomplete />
  <MyTextBox autocomplete={true} />
  ```

- 属性可扩展`...props`。

- 属性名要用驼峰式命名。

- 特殊属性名：class->className.

## 3.4 子代

在JSX开始和结束标签中的内容作为特殊的参数（props.children）传递。

类型：

- 字符串常量
  - JSX 会移除空行和开始与结尾处的空格 
  - 字符串常量内部的换行会被压缩成一个空格 
- JSX
- JS表达式 `{}`
- 函数

## 3.3 JSX代表Objects

Babel 转译器会把 JSX 转换成一个名为 React.createElement()的方法调用。 

下面两种代码的作用是完全相同的： 

```
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

React.createElement()创建出来的对象被称为react元素。是屏幕上看到的东西。react通过读取这些对象来构建DOM并保持数据内容一致。

# 4. 元素渲染

元素是构成React应用的最小单位。元素是构成组件的一个部分。

React元素 != 浏览器DOM元素，React DOM确保两种元素的数据内容一致。

## 4.1 将元素渲染到DOM中

1. 在HTML页面中添加一个根DOM节点。

   ```
   <div id="root"></div>     //此div中的所有内容都将由 React DOM 来管理
   ```

2. 将react元素渲染到根DOM节点中。

   ```
   const element = <h1>Hello, world</h1>;   //react元素
   ReactDOM.render(                         //通过ReactDOM.render(react元素,根DOM节点)方法实现渲染
     element,
     document.getElementById('root')        //根DOM节点
   );
   ```

## 4.2 更新元素渲染

React元素是不可变的，一个元素代表应用界面在某一时间点的样子。

目前更新界面的方式：创建一个新的元素，然后传入ReactDOM.render方法。

注意：在实际生产开发中，大多数React应用只会调用一次 `ReactDOM.render()`。 

React DOM只会更新渲染文本节点中发生变化的内容。React DOM首先会比较元素内容先后的不同，在渲染过程中只更新改变的部分。

基于React进行开发时所有的DOM构造都是通过虚拟DOM进行。每当数据变化时，React都会重新构建整个DOM树，然后React将当前整个DOM树和上一次的DOM树进行对比，得到DOM结构的区别。然后仅仅将需要变化的部分进行实际的浏览器DOM更新。而且React能够批处理虚拟DOM的刷新，在一个事件循环（Event Loop）内的两次数据变化会被合并。

# 5. 组件&Props

**组件**可以将UI切分成一些的独立的、可复用的部件，这样你就只需专注于构建每一个单独的部件。

**组件**从概念上看就像是**函数**，它可以接收任意的**输入值（称之为“props”）**，并返回一个需要在页面上展示的**React元素**。

## 5.1 定义组件

- 组件名首字母必须大写。
- 组件的返回值只能有**一个根元素**。

定义方式：

- 函数定义组件

  ```
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }
  ```

- 类定义组件

  ```
  class Welcome extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  }
  ```

## 5.2 组件渲染

React元素：DOM标签，自定义组件。

React渲染组件时，会将JSX属性作为单个对象传递给该组件，这个对象称之为props。

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;    //将{name="Sara"}传递给Welcome
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

## 5.3 组合组件

组件可以在输出中引用其他组件。

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

## 5.4 Props的只读性

**纯函数**不修改输入值。所有的React组件必须像纯函数那样使用它们的props。

## 5.5 检查组件属性

PropTypes包含一整套验证器，可用于确保你接收的数据是有效的。出于性能原因，propTypes只在开发模式下进行检查。 

```
import PropTypes from 'prop-types';       //引入PropTypes

class Greeting extends React.Component {  //创建自定义组件
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {                     //检查自定义组件的属性
  name: PropTypes.string
};
```

1. 限制单个子代

   ```
   import PropTypes from 'prop-types';
   
   class MyComponent extends React.Component {
     render() {
       // This must be exactly one element or it will warn.
       const children = this.props.children;
       return (
         <div>
           {children}
         </div>
       );
     }
   }
   
   MyComponent.propTypes = {
     children: PropTypes.element.isRequired  //只传递一个子代
   };
   ```

2. 定义props默认值

   ```
   class Greeting extends React.Component {
     render() {
       return (
         <h1>Hello, {this.props.name}</h1>
       );
     }
   }
   
   // 为属性指定默认值:
   Greeting.defaultProps = {
     name: 'Stranger'
   };
   
   // 渲染 "Hello, Stranger":
   ReactDOM.render(
     <Greeting />,
     document.getElementById('example')
   );
   ```

## 5.6 静态类型检查

大型项目建议用Flow和typeScript这样的静态类型检查器来代替propstype。在代码运行之前识别某些类型的问题。

### 5.6.1 Flow

Flow是一个针对 JavaScript 代码的静态类型检查器。 它可以让你使用特殊的类型语法来注释变量，函数和React组件，并尽早地发现错误。 

使用步骤：

- 将 Flow 添加到您的项目作为依赖项。

  ```
  yarn:
  yarn add --dev flow-bin    //安装最新版的 Flow
  yarn run flow init         //创建一个您需要提交的 Flow 配置文件
  
  npm:
  npm install --save-dev flow-bin
  npm run flow init
  
  在package.json的scripts中：
  "flow": "flow",
  ```

- 确保编译后的代码中去除了 Flow 语法。

  ```
  for babel:
  yarn: yarn add --dev babel-preset-flow
  npm: npm install --save-dev babel-preset-flow
  
  在.babelrc的presets中:
  ["flow"]
  
  注：Create React App已自动去除了Flow语法
  ```

- 添加了类型注释并运行 Flow 来检查它们。

  ```
  运行flow：
  yarn flow
  npm run flow
  
  添加flow类型注释：
  1.在待检查的文件顶部添加： //@flow
  ```

### 5.6.2 TypeScript

TypeScript 是一门由微软开发的编程语言。 它是 JavaScript 的一个类型超集，包含它自己的编译器。 作为一种类型化语言，Typescript 可以早在您的应用程序上线之前在构建时发现错误和错误。

使用步骤：

- 将 Typescript 添加为您的项目的依赖项

  ```
  yarn: yarn add --dev typescript
  npm: npm install --save-dev typescript
  
  在package.json的scripts中：
  "build": "tsc",
  ```

- 配置 TypeScript 编译器选项

  ```
  运行tsc --init生成tsconfig.json，在此文件中配置规则。
  。。。
  ```

- 使用正确的文件扩展名

  ```
  .ts 默认的文件扩展名
  .tsx 包含JSX的文件扩展名
  ```

- 为你使用的库添加定义

  ```
  yarn build
  npm run build
  如果你没有看到输出，这意味着它完全编译成功了。
  ```

# 6. State&生命周期

在类组件中，react使用state对象来存放组件的数据，state里的数据变化时，这个组件就会被重新渲染。

react中的数据流是单向的，自顶向下的。

有state属性的组件被称为有状态组件。

组件的数据存储在prop和state中：

| props                                                        | state                                                        |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 传入组件的参数，即外部传入组件内部的数据。父组件向子组件传递数据。 | 组件自己管理的数据                                           |
| 只读                                                         | 可变，通过this.setState()修改。                              |
| 只能通过外部组件传入新props来重新渲染子组件。                | this.setState()修改state后，react会重新调用render(),重新渲染组件 |

## 6.1 将函数转换为类

步骤：

1. 创建一个类，继承React.Component
2. 创建一个render()
3. 将函数体移动到render()中
4. 在render()中，使用this.props替换props
5. 删除剩余的空函数声明

## 6.2 为一个类添加局部状态

1. 在render()中，将this.props.xx替换为this.state.xx。

2. 为类组件添加一个constructor构造器，并在构造器中初始化state。只能在构造器中初始化this.state

3. 通过 this.setState({}/function, function) 修改state。

   第一个参数：对象或函数，只需传入需要更新的数据，不需要传入整个对象

   第二个参数：函数，在setState调用完并且组件开始重新渲染时调用，可用来监听渲染是否完成。

```
class Cl extends React.Component {
  constructor(props) {
    super(props);                     //调用父类的构造函数
    this.state = {date: new Date()};  //初始化state，在第一次render时，使用这个数据来渲染组件。
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toString()}.</h2>  //调用state
      </div>
    );
  }
}
```

## 6.3 将生命周期方法添加到类中

在具有许多组件的应用程序中，在销毁时释放组件所占用的资源非常重要。 我们可以在组件类上声明特殊的方法，当组件挂载或卸载时，来运行一些代码 。这些方法被称作生命周期钩子。 

```
componentDidMount() {}     //挂载：当组件输出到DOM后执行，建立定时器
componentWillUnmount() {}  //卸载：销毁组件时执行，关闭定时器
```

方法调用顺序：

1. 当组件被传递给ReactDOM.render() 时，react调用组件的构造函数。初始化this.state.

2. 调用组件的render()，更新DOM一匹配组件的渲染输出。

3. 当组件的输出插入到DOM时，react调用componentDidMount() 生命周期钩子。 

   在此方法中通过this.setState()更新state。

   更新state后，react知道状态已改变会重新调用render()重新渲染。

4. 当组件被移除出DOM时，react会调用componentWillUnmount()这个钩子函数。

# 7. 事件处理

React 元素的事件处理和 DOM元素的很相似。但是有一点语法上的不同。

```
<button onclick="activateLasers()">
  Activate Lasers
</button>

<button onClick={activateLasers}>    //1.React事件绑定属性的命名采用驼峰式写法，而不是小写
  Activate Lasers                    //2.如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM元素的写法)
</button>
```

1. 不能通过return false阻止默认行为。必须明确使用event.preventDefault()。

```
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);  //绑定事件处理函数中的this
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

## 7.1 向事件处理程序传递参数

两种方式：

```
1.通过箭头函数
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>

2.通过bind()
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
bind()注意：
*隐式传递event。
*事件处理函数中event要排在所传递参数的最后面。deleteRow(id,e)
```

注意：通过 `bind` 方式向监听函数传参，在类组件中定义的监听函数，事件对象 `e` 要排在所传递参数的后面。

# 8. 条件渲染

React 中的条件渲染使用 JavaScript 操作符 if 或 条件运算符 来创建表示当前状态的元素，然后让 React 根据它们来更新UI。

```
if (isLoggedIn) {
  return <UserGreeting />;
  }
  return <GuestGreeting />;
}
```

## 8.1 与运算符&&

在JS中`true && expression` 总是返回 `expression`，而 `false && expression` 总是返回 `false`。 

```
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>                                //当unreadMessages.length>0成立时，渲染<h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);

//Hello!
//You have 3 unread messages.
```

## 8.2 三目运算符

```
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

## 8.3 阻止组件渲染

通过render()返回null，实现组件隐藏。

组件的 render 方法返回 null 并不会影响该组件生命周期方法的回调。例如，`componentWillUpdate` 和 `componentDidUpdate` 依然可以被调用。 

# 9. 列表&keys

## 9.1 基础列表组件

```
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);

```

## 9.2 Keys

Keys可以在DOM中的某些元素被增加或删除的时候**帮助React识别哪些元素发生了变化**。 

元素的key只有在它和它的兄弟节点对比时才有意义。所以key只需在兄弟之间是唯一的，不需要是全局唯一的。

```
1.使用数据的id作为元素的key
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);

2.若无id，则使用数组索引作为key。如果列表可重新排序，不建议使用索引作为key
const todoItems = todos.map((todo, index) =>
  <li key={index}>
    {todo.text}
  </li>
);

```

```
function ListItem(props) {
  return <li>{props.value}</li>;   // 这里不需要指定key:
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}  value={number} />  //key应该在数组的上下文中被指定
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);

```

当你在map()的内部调用元素时，你最好随时记得为每一个元素加上一个独一无二的key。 

# 10. 表单

## 10.1 受控组件

**受控组件**通常react会构造一个处理提交表单并可访问用户输入表单数据的函数。

值由react控制的输入表单元素称为受控组件。

### 10.1.1 `<input>`

```
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

```

### 10.1.2` <textarea>`

React中\<textarea\>会用value属性来代替文本内容。则\<textarea\>\<input\>方式相同。

### 10.1.3 `<select>`

React中在\<select\>上用value属性来标识选中项。

```
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};     //初始选中项

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite La Croix flavor:
          <select value={this.state.value} onChange={this.handleChange}>  //通过value属性标识选中项
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

```

### 10.1.4 多输入

```
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value         //ES6,计算属性名
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}

```

## 10.2 非受控组件

非受控组件是表单的代替技术。e.g. \<input type="file"\>

有时使用受控组件可能很繁琐，因为您要为数据可能发生变化的每一种方式都编写一个事件处理程序，并通过一个组件来管理全部的状态。

非受控组件通过ref属性获取表单值。

```
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={(input) => this.input = input} />  //ref属性
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

```

### 10.2.1 默认值

在React的生命周期中，表单元素上的value属性将会覆盖DOM中的值。你可以通过defaultValue属性来设置默认值，而不是value。

```
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input
          defaultValue="Bob"           //初始默认是Bob,后续根据用户输入改变
          type="text"
          ref={(input) => this.input = input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

```

### 10.2.2 `<input type="file">`

在React中，`<input type="file" />` 始终是一个不受控制的组件，因为它的值只能由用户设置，而不是以编程方式设置。 

```
class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    alert(
      `Selected file - ${this.fileInput.files[0].name}`
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input
            type="file"
            ref={input => {
              this.fileInput = input;
            }}
          />

        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

ReactDOM.render(
  <FileInput />,
  document.getElementById('root')
);

```

# 11. Refs&DOM

Refs 提供了一种方式，用于访问在 render 方法中创建的 DOM 节点或 React 元素。 

在典型的 React 数据流中, props是父组件与子组件交互的唯一方式。 某些情况下你需要在典型数据流外强制修改子组件。 

使用Refs的情况：

- 处理焦点、文本选择或媒体控制。
- 触发强制动画。
- 集成第三方 DOM 库

如果可以通过声明式实现，则尽量避免使用 refs。 不要使用 refs 来更新组件。 

# 11. 状态提升

状态提升：几个组件需要共用状态数据时，可将这部分共享的状态提升到它们最近的父组件中管理。

在React应用中，对应任何可变数据理应只有一个单一“数据源”。

通常，状态都是首先添加在需要渲染数据的组件中。

此时，如果另一个组件也需要这些数据，你可以将数据提升至离它们最近的父组件中。

你应该在应用中保持 自上而下的数据流，而不是尝试在不同组件中同步状态。 

# 12. 组合 VS 继承

React 具有强大的组合模型，我们建议使用组合而不是继承来复用组件之间的代码。 

## 12.1 包含关系

对于不能提前知道自己的子组件是什么的组件，建议使用props.children属性将子元素直接传递到输出。

```
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">       //<FancyBorder>里的内容都将通过props.children传递给FancyBorder组件。
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}

```

# 13. React理念

React应用开发理念：

1. 已有一个JSON接口和原型图。

2. 把UI划分出组件层级并给它们命名。

3. 用react创建一个静态版本。

   - 创建能够复用其他组件的组件，通过props来传递数据。
   - 自顶向下或自底向上构建应用。
     - 简单例子中，自顶向下更容易
     - 大型项目中，自底向上更容易且在构建时有利于编写测试。
   - 完成以上步骤后，你会有一个用于呈现数据模型的可重用组件库（只有render方法）。

4. 定义UI状态的最小表示

   - 最小可变状态要点：不要重复。
   - 根据数据找出state，以下情况不是state：
     1. 它是通过 props 从父级传来的 
     2. 它随着时间推移不变 
     3. 你能够根据组件中任何其他的 state 或 props 把它计算出来 

5. 确定state应该位于哪里

   判断步骤：

   1. 确定每一个需要这个 state 来渲染的组件。
   2. 找到一个公共所有者组件(一个在层级上高于所有其他需要这个 state 的组件的组件)
   3. 这个公共所有者组件或另一个层级更高的组件应该拥有这个 state。
   4. 如果你没有找到可以拥有这个 state 的组件，创建一个仅用来保存状态的组件并把它加入比这个公共所有者组件层级更高的地方。

6. 添加反向数据流

   事件监听，发生改变时通过setState()改变状态。

# 参考

## 1. React

React是react库的入口，顶级API都在React这个全局变量上。

- 组件：你可以通过组件，将UI拆分成独立的可重用的模块。每个模块的逻辑也是独立的。

  通过React.Component或React.PureComponent来定义组件。

- React元素：建议使用JSX来描述UI。每个JSX都是调用React.createElement()的语法糖。

## 2. React.Component

React.Component是类组件的基类。

```
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

```

### 2.1 组件的生命周期

每个组件都有几个生命周期方法，可重写这些方法，在过程中的特定时间运行代码。

will前缀的方法：在事情发生之前被调用。

did前缀的方法：在事情发生后被调用。

#### 2.1.1 Mounting装载

当组件被创建并插入到DOM时，调用：

- constructor()
- componentWillMount()
- render()
- componentDidMount()

#### 2.1.2 Updating更新

改变props或state时触发更新事件。当重新渲染组件时调用：

- componentWillReceiveProps(object nextProps)已加载组件收到新的参数时调用 
- shouldComponentUpdate(object nextProps, object nextState)组件判断是否重新渲染时调用 
- componentWillUpdate(object nextProps, object nextState)
- render()
- componentDidUpdate(object prevProps, object prevState)

#### 2.1.3 Unmounting卸载

当组件从DOM中删除时，调用：

- componentWillUnmount()