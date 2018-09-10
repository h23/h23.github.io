---
title: ES6+Babel
date: 2018-06-27 15:05:02
tags: ES6
---

## 1. 历史

ECMAScript和JavaScript

- ECMA是标准，JS是实现

- ECMAScript简称**ECMA或ES**

- 目前版本

  - 低级浏览器主要支持ES 3.1

  - 高级浏览器正在从ES 5过渡到ES 6

    

## 2. 兼容性

http://kangax.github.io/compat-table/es5/
http://kangax.github.io/compat-table/es6/

ES6(ES2015)支持的浏览器：IE10+、Chrome、FireFox、移动端、NodeJS



## 3. Babel

Babel是一个广泛使用的转码器，可以将ES6代码转为ES5代码，从而在现有环境执行。 

### 3.1 编译操作步骤：

- 在项目文件夹下初始化package.json 

```
npm init
npm init -y
```

- 安装babel-cli 和 es2015预设

```
npm install babel-cli --save-dev
npm install babel-preset-es2015 --save-dev  //es2015:转换成es5用到的插件集合
```

- 配置package.json，添加scripts

```
"scripts": {
    "build": "babel src -d lib"  //配置编译路径：src为原ES6目录，lib为编译后的ES5目录
 }
```

- 在根目录下创建.babelrc文件，配置presets

```
创建的文件名为.babelrc.
{
	"presets" : ["es2015"]
}
```

- 在src目录下创建JS文件，编写ES6代码
- 编译ES6代码

```
npm run build
```

编译好的代码在lib目录下。

### 3.2 预设

预设是一些插件的集合。预设可分成两类：按年份，按阶段。

- 按年份: 已经批准的，浏览器将要实现的功能 e.g. babel-preset-es2015 

- 按阶段：没有被批准的功能 

  每个提案有5个阶段 ：

  - stage-0 稻草人阶段， 就是一个想法 
  - stage-1 建议阶段，值得去努力 
  - stage-2 草案阶段， 初始的细节描述 
  - stage-3 候选阶段，草案基本完成，浏览器厂商实验性的实现 
  - stage-4 完成阶段，添加到下一年的版本中 

  前期阶段的插件大于后期阶段的插件 ，stage 0>stage 1>stage 2>stage 3 ，只安装一个就行 。

  如果没提供es2015相关的预设，阶段性的预设就不能用。

### 3.3 babel-polyfill

Babel默认只转换新的JS语法，而不转换新API。若想要使用新API，就必须使用babel-polyfill。

原理：将API用JS重写出来，那么旧浏览器就可以使用这个API了。 

操作步骤：

1. 安装： `npm install babel-polyfill --save--dev `
2. 安装完成后，`node_modules/babel-polyfill/dist `下面有`polyfill.min.js `
3. 引入`polyfill.min.js`文件，即可使用新API



## 4. ES6

### 4.1 变量声明

#### 4.1.1 原来的var的问题

1. 可以重复声明，后面的覆盖前面定义的。
2. 无法限制修改。
3. 没有块级作用域。

#### 4.1.2 let

1. 不能重复声明
2. 变量 可修改
3. 块级作用域变量 {}内的代码块
4. 不存在变量提升

#### 4.1.2 const

1. 不能重复声明
2. 常量 不可修改，修改会报错
3. 块级作用域变量
4. 不存在变量提升

**注意：**如果const一个对象，对象所包含的值是可以被修改的。只要对象所指向的地址没变就行。

### 4.2 解构赋值

解构允许使用模式匹配的方式进行绑定，并支持匹配数组和对象（或其他具备iterator接口的数据结构）。 

本质：利用数组/对象（或其他具备iterator接口的数据结构），批量定义并初始化变量。

1.针对具备iterator接口的数据结构。
2.左右两边结构必须一样。
3.声明和赋值不能分开(必须在一句话里完成)。

```
数组：按次序赋值
let [a,b,c]=[12,5,8];
console.log(a,b,c);                 ==>a=12,b=5,c=8

let [x, [y,z]] = [1, [2.1, 2.2]];   //嵌套赋值
console.log(x,y,z);                 ==>x=1,y=2.1,z=undefined

let [, , x] = [1, 2, 3];            //省略赋值
console.log(x);                     ==>x=3
```



```
对象：无序，按key赋值
let {c,a,b}={a: 12, b: 5, c: 8};
console.log(a,b,c);                 ==>a=12,b=5,c=8

let {name: myname, age: myage} = {name:'zfpx',age:8};
console.log(name,age,myname,myage); ==>name,age报错，myname=zfpx, myage=18
先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
```

### 4.3 默认值

在赋值或传参的时候可以使用默认值。

ES6 内部使用严格相等运算符（===），判断一个位置是否有值， 所以只有一个数组成员严格等于undefined，默认值才会生效。

```
赋值：
let [a = "a", b = "b", c =new Error('C必须指定')] = [1, , 3];
console.log(a, b, c);        ==>a=1, b="b", c=3

传参：
function ajax ({method = "get", data}) {
    console.log(arguments);  ==>{method: "post",data: {"name": "zfpx"}}
}
ajax({
    method: "post",
    data: {"name": "zfpx"}
});
```

### 4.4 扩展操作符

把...放在数组前面可以把一个数组进行展开。

#### 4.4.1 展开数组

```
let arr=[1,2,3];    ==>...arr =1,2,3
```

#### 4.2.2 替代concat

```
var arr1 = [1, 3];
var arr2 = [3, 5];
var arr3 = arr1.concat(arr2);
var arr4 = [...arr1, ...arr2];
console.log(arr3,arr4);  ==> arr3===arr4
```

#### 4.4.3 不定参数Rest

```
function show(a, b, ...args){}
show(1,2,43,5,2)  ==>...args=43,5,2

Rest Parameter必须是最后一个
```

### 4.5 字符串

#### 4.5.1 新方法

  1.includes()：判断是否包含字符串，包含则返回true

```
const str = 'hahay'
console.log(str.includes('y')) // true

可接受第二个参数，表示开始搜索的位置
```

  2.repeat(): 获取字符串重复n次，将原字符串重复n次 

```
const str = 'he'
console.log(str.repeat(3)) // 'hehehe'
```

  3.startsWith() 和 endsWith():  判断是否以给定文本开始或者结束

```
const str =  'hello world!'
console.log(str.startsWith('hello')) // true
console.log(str.endsWith('!')) // true

startsWith可接受第二个参数，表示开始搜索的位置
endsWith可接受第二个参数，表示从开始到第n个字符，是否以xx结束
```

#### 4.5.2 模板字符串

**模板字符串：**用反引号包含，其中的变量用`${}`括起来。

作用：

- 字符串连接，将表达式嵌入字符串中进行拼接。

```
const name = 'lux'
console.log(`hello ${name}`)   ==>hello lux
```

- 折行：所有模板字符串的空格和换行，都是被保留的 

```
const template = `<div>
    <span>hello world</span>
</div>`
```

### 4.6 函数

#### 4.6.1 箭头函数

箭头函数简化了函数的的定义方式，一般以 "=>" 操作符左边为输入的参数，而右边则是进行的操作以及返回的值`inputs=>output` 。

```
函数
var foo=function 名字(){
}

箭头函数
let foo=()=>{
}
1. 如果只有一个参数，()可以省
2. 如果只有一个return，{}可以省
let foo=a=>a+1;
foo(2);    //3
```

特点：

1. 不需要 `function` 关键字来创建函数
2. 箭头函数可以替换函数表达式，但是不能替换函数声明
3. 箭头函数与包裹它的代码共享相同的`this`对象.
4. 如果箭头函数在其他函数的内部，它也将共享该函数的`arguments`变量。 

#### 4.6.2 函数名字

ES6给函数添加了一个`name`属性 。

```
var desc = function descname(){}
console.log(desc.name); ==>descname
```

### 4.7 数组：

#### 4.7.1 Array.from()

将一个数组或者类数组变成数组,并返回该数组。

```
let newArr = Array.from(document.querySelectorAll("*"));
```

#### 4.7.2 Array.of()

功能与new Array()类似。单个参数时有差别:

```
let a=new Array(5);  ==>a=[,,,,]
let b=Array.of(5);   ==>b=[5]
```

#### 4.7.3 find()

返回第一个符合条件的数组元素。无则返回undefined

```
arr.find((value,index,array)=>条件);
```

#### 4.7.4 findIndex()

返回第一个符合条件的数组元素的索引。无则返回-1

```
arr.find((value,index,array)=>条件);

[1, 5, 10, 15].find(a=>a>9)  // 2
```

#### 4.7.5 map()

对数组的每个元素执行一次回调函数。返回处理结果。映射  一个对一个

```
var result = arr.map(function(item){ //item即数组元素
    return item*2;
})

let result = arr.map(item=>item*2);
```

#### 4.7.6 reduce()

汇总   一堆出来一个

 算个总数，平均数

```
总数计算：
let result=arr.reduce(function (tmp, item, index){
    //tmp 中间值
    //item 数组元素
    //index 数组元素索引
    return tmp+item;
});

平均数计算：
let result=arr.reduce(function (tmp, item, index){
	if(index!=arr.length-1){ //不是最后一次
		return tmp+item;
	}else{                    //最后一次
		return (tmp+item)/arr.length;
	}
});
```

#### 4.7.7 filter()

通过回调函数的返回值判断是否留下数组元素值。ture->留下

```
留下可被3整除的数：
let result=arr.filter(item=>{
   if(item%3==0){
     return true;
   }else{
     return false;
   }
});
```

#### 4.7.8 forEach()

循环(迭代)

```
arr.forEach((item,index)=>{
    //item 数组元素
    //index 数组元素索引
    alert(index+': '+item);
});
```

#### 4.7.9 fill()

`arr.fill(newItem,startIndex,endIndex)`   将[startIndex,endIndex)之间的数组元素用newItem代替。

```
[0, 0, 0].fill(7, 1, 2); // => [0,7,7] 
```

### 4.8 Symbol

Symbol是ES6中的一种新的原始数据类型，表示独一无二的值 。

不能使用new，会报错。

```
let s = Symbol();
typeof s              // "symbol"

可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
let s1 = Symbol('foo');
let s2 = Symbol('bar');
s1                    // Symbol(foo)
s2                    // Symbol(bar)
相同参数的Symbol函数的返回值是不相等的。
let s1 = Symbol('foo');
let s2 = Symbol('foo');
s1 === s2              // false

注意：
Symbol 值不能与其他类型的值进行运算，会报错。
Symbol 值可以显式转为字符串。
Symbol 值也可以转为布尔值，但是不能转为数值。
```

#### 4.8.1 作为属性名的Symbol

Symbol 值作为对象属性名时，不能用点运算符。 

```
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};
```

### 4.9 集合

#### 4.9.1 Set

一个`Set`是一堆东西的集合,`Set`有点像数组,不过跟数组不一样的是，`Set`里面不能有重复的内容。key和value一样。

```
1. Set() 构造函数，用来生成Set数据结构。
const s =new Set();

2. Set()可接受一个数组（或具有iterable接口的其他数据结构）作为参数，初始化。
const set = new Set([1,2,3,4]);
const set = new Set(document.querySelectorAll('div'));
```

##### 4.9.1.1 set方法

- 操作方法

  - set.add(value)： 添加set元素，并返回set结构本身。重复值不会被添加。

    内部用===判断两值是否相同（差别NaN等于自身）。

    `s.add(1).add(2).add(2);  `返回本身则可链式操作

  - set.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。

    s.delete(2);

  - set.has(value)：返回一个布尔值，表示该值是否为Set的成员。

    s.has(1)   ==>true

    s.has(2)   ==>false

  - set.clear()：清除所有成员，没有返回值。

- 遍历方法：遍历顺序就是插入顺序。

  - set.keys()：返回键名的遍历器，行为与values()一致

  - set.values()：返回键值的遍历器，行为与keys()一致

  - set.entries()：返回键值对的遍历器  

  - set.forEach()：使用回调函数遍历每个成员

    set实例默认可遍历，默认遍历器生成函数就是values()。

    Set.prototype[Symbol.iterator] === Set.prototype.values

```
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()/set.values()/set) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]

set = new Set([1, 4, 9]);
set.forEach((value, key，set) => console.log(key + ' : ' + value))
// 1 : 1
// 4 : 4
// 9 : 9
```

##### 4.9.1.2 set属性

```
Set.prototype.constructor：构造函数，默认就是Set函数。
Set.prototype.size：返回Set实例的成员总数。

```

##### 4.9.1.3 其他

Array.from()可以将 Set 结构转为数组。 

```
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);
```

去除数组重复成员 :

```
function dedupe(array) {
  return Array.from(new Set(array));  //方法1
  return [...new Set(array)];         //方法2
}

dedupe([1, 1, 2, 3]) // [1, 2, 3]
```

交集，并集和差集

```
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```

#### 4.9.2 Map

Object本质上是键值对的集合（“字符串-值”的对应），键只能是字符串。

Map也是键值对的集合（“值-值”的对应），键可以是任意类型。

key用===对比，但NaN等于NaN。若key是对象，则比较的是内存地址。key的排列顺序是按添加顺序进行排列的。

构造函数：

```
const m = new Map();
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);
```

##### 4.9.2.1 map方法&属性

```
操作方法：
1. map.set(key,value) 添加map成员，返回map本身，可链式操作。
2. map.get(key) 有则返回value，无则返回undefined。
3. map.has(key)
4. map.delete(key)
5. map.clear()

遍历方法：
6. map.keys()
7. map.values()
8. map.entries()
9. map.forEach(function(key,value,map){})

属性：
10. map.size
```

### 4.10 对象的扩展

#### 4.10.1 对象初始化简写

```
1.键值对重名时，可简写成如下：
function people(name, age) {
	return {
		name,   ==>name:name
		age     ==>age:age
	};
}

2.添加方法，可简写成如下：
const people = {
	name: 'lux',
	getName () {    ==>getName:function(){...}
		console.log(this.name)
	}
}

```

#### 4.10.2 Object.assign()

把多个对象的属性复制到一个对象中。第一个参数是复制的对象,从第二个参数开始往后,都是复制的源对象。浅复制

```
const objA = { name: 'cc', age: 18 }
const objB = { address: 'beijing' }
const objC = {} // 这个为目标对象
const obj = Object.assign(objC, objA, objB)

console.log(objC) // { name: 'cc', age: 18, address: 'beijing' }
console.log(obj) // { name: 'cc', age: 18, address: 'beijing' }

```

#### 4.10.3 Object.is()

对比两个值是否相等。与===类似，差别：一是`+0`不等于`-0`，二是`NaN`等于自身。 

```
console.log(Object.is(NaN,NaN));   //true
console.log(Object.is(-0,0));      //false

console.log(NaN===NaN);            //false
console.log(-0===0);               //true

```

### 4.11 Classes

类只是一个语法糖，通过class关键字让语法更接近传统的面向对象模式，本质上还是基于原型的。 

构造函数类ES5写法:

```
function User(name,pass){
    this.name=name;
    this.pass=pass;
}
User.prototype.showName=function(){
    alert(this.name);
}
var a=new User("h23",12434);
a.showName();

```

ES6写法:

```
class User{
    construtor(name,pass){
        this.name=name;
        this.pass=pass
    }
    
    showName(){
        alert(this.name);
    }
}

```

#### 4.11.1 继承

ES5写法：

```
function VipUser(name, pass, level){
	User.call(this, name, pass);       //属性继承
	this.level=level;
}

VipUser.prototype=new User();           //方法继承
VipUser.prototype.constructor=VipUser;  //重新指定constructor
VipUser.prototype.showLevel=function (){
	alert(this.level);
};

```

ES6写法：

```
class VipUser extends User{    //extends已实现方法的继承
    construtor(name,pass,level){
        super(name,pass);      //属性继承
        this.level=level;
    }
    showLevel(){
        alert(this.level);
    }
}

```

#### 4.11.2 get与set

getter可用来获取属性，setter可用来设置属性。

```
class Person {
    constructor(){
        this.hobbies = [];
    }
    set hobby(hobby){
        this.hobbies.push(hobby);
    }
    get hobby(){
        return this.hobbies;
    }
}
let person = new Person();
person.hobby = 'basketball';
person.hobby = 'football';
console.log(person.hobby);  //["basketball", "football"]

```

#### 4.11.3 静态方法

**静态方法**：不需要实例化类就能使用的方法。

```
class Person {
   static add(a,b){
       return a+b;
   }
}
console.log(Person.add(1,2));

```

#### 4.11.4 super关键字

super指向当前对象的原型对象。只能用在对象的方法之中，用在其他地方都会报错。 

JavaScript 引擎内部，`super.foo`等同于`Object.getPrototypeOf(this).foo`（属性）或`Object.getPrototypeOf(this).foo.call(this)`（方法）。 

#### 4.11.5 Object.setPrototypeOf()

设置一个对象的prototype对象，返回参数对象本身。

```
// 格式
Object.setPrototypeOf(object, prototype)

// 例子
let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);

proto.y = 20;
proto.z = 40;

obj.x // 10
obj.y // 20
obj.z // 40

```

#### 4.11.6 Object.getPrototypeOf()

读取一个对象的原型对象。

```
Object.getPrototypeOf(obj);

```

### 4.12 Iterator迭代器

**数据集合**：数组，对象，Map，Set。

**Iterator**：是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作。这种遍历操作是依次处理该数据结构的所有成员。

作用：

1. 为各种数据结构提供一个统一的，简便的访问接口。
2. 使得数据结构的成员能按某种次序排列。
3. 用于for...of循环（for…in 遍历每一个属性名称,而 for…of遍历每一个属性值 ）

具备iterator接口的数据结构可进行以下操作：

- 解构赋值
- 扩展运算符
- for of循环

#### 4.12.1 部署接口

##### 4.12.1.1 原生接口

有三类结构生来就具有Iterator接口：数组、类数组对象、Map和Set结构。 凡是具有 Symbol.iterator 属性的数据结构都具有 Iterator 接口。

```
const arr = [1, 2, 3];
const itArr = arr[Symbol.iterator]();
itArr.next();

```

##### 4.12.1.2 接口函数

```
const arr = [1, 2, 3];

function iterator(arr){
  let index = 0;  //创建一个指针对象，指向起始位置。
  return {
    next: function (){ //每次调用next方法，则将指针指向下一个数据结构成员。直到指向数据结构的结束位置。
      return index < arr.length ? 
      {value: arr[index++], done: false} :
      {value: undefined, done: true};
      //value是当前成员的值，done是布尔值表示遍历是否结束。
    }
  }
}

const it = iterator(arr);

console.log(it.next());  ==>value=1,done=false
console.log(it.next());  ==>value=2,done=false
console.log(it.next());  ==>value=3,done=false
console.log(it.next());  ==>value=undefined,done=true

```

##### 4.12.1.3 对象接口

给一个对象部署iterator接口，其实就是对该对象做一种线性转换。

```
let obj = {
    data: [ 'hello', 'world' ],
    [Symbol.iterator]() {
        const self = this;
        let index = 0;
        return {
            next() {
                if (index < self.data.length) {
                    return {
                        value: self.data[index++],
                        done: false
                    };
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
    }
};

```

#### 4.12.2 for...of

`for...of`允许你遍历可迭代的数据结构，比如数组、字符串、映射、集合等，`for...of`可以替代另外两种循环语句`for...in`和`forEach()`。

```
for (variable of iterable) {
	statement 
}
//variable：每个迭代的属性值
//iterable：一个具有可枚举属性并且可以迭代的对象

```

```
遍历数组：
const iterable=["mini","max","middle"];
for(const value of iterable){
    console.log(value);
}
==>mini
==>max
==>middle
```

```
遍历Map:
const iterable = new Map([['one', 1], ['two', 2]]); 
for (const [key, value] of iterable) { 
	console.log(`Key: ${key} and Value: ${value}`); 
} 
==> Key: one and Value: 1 
==> Key: two and Value: 2
```

### 4.13 生成器(Generator)

Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。 

解释：

1. Generator 函数是一个状态机，封装了多个内部状态。 
2. 执行 Generator 函数会返回一个遍历器对象。也就是说，Generator 函数还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。 
3. Generator 函数与普通函数的差别：
   - function关键字与函数名之间有个星号。
   - 函数内部使用yield表达式，定义不同的内部状态。
   - 调用generator函数后，并不执行，而是返回一个指向内部状态的指针对象（即遍历器对象）。
   - 调用遍历器对象的next()，使得指针移向下一个状态（下一个yield或return结束）。换言之，Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。 

```
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
var hw = helloWorldGenerator();
hw.next()    ==>{ value: 'hello', done: false }
hw.next()    ==>{ value: 'world', done: false }
hw.next()    ==>{ value: 'ending', done: true }
hw.next()    ==>{ value: undefined, done: true }
```

#### 4.13.1 yield表达式

遍历器对象的next方法的运行逻辑：

1. 遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
2. 下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式。
3. 如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。
4. 如果该函数没有return语句，则返回的对象的value属性值为undefined。

yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。

yield表达式如果用在另一个表达式之中，必须放在圆括号里面。

yield表达式 用作函数参数 或放在赋值表达式的右边，可以不加括号。 

#### 4.13.2 next方法的参数

next方法的参数表示上一个yield表达式的返回值。

```
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```

