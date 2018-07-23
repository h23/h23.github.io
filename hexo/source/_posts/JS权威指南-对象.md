---
title: JS权威指南-对象
date: 2018-07-23 16:54:21
tags:
---

# 1. 基础

{% asset_img object.png %}

# 2. 创建对象

可通过以下几种方式创建对象：

- 对象直接量
- 关键字new 构造函数
- ES5: Object.create(新对象的原型，xx) 
  - Object.create(null) 创建一个没有原型的新对象，该对象不继承任何属性和方法
  - Object.create(Object.prototype) 创建一个普通的空对象，和{}、new Object()一样

原型概念：

- 每个JS对象（除NULL）都和另一个对象（即原型）相关联。
- 通过对象直接量创建的对象都具有同一个原型对象==Object.prototype。
- 通过new创建的对象原型===构造函数.prototype（new Array()==Array.prototype）。
- 通过Object.create()创建的对象原型==第一个参数。
- Object.prototype没有原型对象。
- 所有内置构造函数（及大部分自定义的构造函数）都具有一个继承自Object.prototype的原型。

# 3. 属性的查询和设置

通过以下方式获取或设置对象的属性值：

- 点：右侧必须是属性名标识符
- 方括号：【】内必须是一个计算结果为字符串的表达式

```
ES3中，点运算符后的标识符不能是保留字。如果对象的属性名是保留字，必须通过方括号的形式来访问。
ES5放宽了此限制。
```

## 3.1 作为关联数组的对象

关联数组：通过字符串索引而不是数组索引。
通过点运算符访问属性时，属性名是一个标识符，程序无法修改。
通过方括号访问属性是，属性名用字符串表示，在程序运行时可以修改和创建他们。灵活。

## 3.2 继承

继承：对象的原型属性构成了一个链，通过这条链实现属性的继承。

1. 假设要查询对象O的属性x。
2. 如果O中不存在x，则将在O的原型对象中查询属性x。
3. 如果O的原型对象也没有x，则在原型对象的原型上查找。
4. 直到找到x或查找到一个原型是NULL的对象为止。

只有在查询属性时才会体会到继承的存在，设置属性和继承无关。
属性赋值操作先检查原型链，判断是否允许赋值操作。
属性赋值要么失败，要么创建一个属性，要么在原始对象中设置属性（有特例）。

## 3.3 属性访问错误

查询错误：

- 查询一个对象和原型链上都不存在的属性==>undefined
- 查询不存在的对象的属性==>报错
  - if(obj.xx)  obj.xx+=1;
  - obj.xx && obj.xx+=1;

设置错误：

- 只读属性
- 继承属性且只读
- 不是自有属性

# 4. 删除属性

通过delete运算符删除对象的属性。delete只是断开属性和宿主对象的联系，而不会去操作属性中的属性。在销毁对象的时候，要遍历属性中的属性，依次删除。
delete成功或无任何副作用时，返回true。
delete返回false的情况：

- delete不可配的属性
- delete全局对象、全局属性

# 5. 检测属性

通过以下方法判断属性是否存在对象中：

- in： “属性名” in obj==》存在返回true
- hasOwnProperty(): obj.hasOwnProperty(“属性名”)==》存在且是自有属性返回true
- propertyIsEnumerable(): obj.propertyIsEnumerable(“属性名”)==》存在且是自有属性且可枚举返回true
- !== :  obj.属性名 !== undefined (当obj存在属性但值为undefined时只能用in)

# 6. 枚举属性

通过以下方式遍历对象的属性：

- for in，存在的问题：许多实用工具库给Object.prototype添加了新的方法或属性，在ES5之前，这些方法或属性都是可枚举的，都会在for in循环中枚举出来。

  通过以下方法过滤上述属性：

  ```
  for (p in o){
      if (!o.hasOwnProperty(p)) continue;   //跳过继承的属性
  }
  
  for (p in o){
      if (typeof o[p] === "function") continue;   //跳过方法
  }
  ```

- ES5： Object.keys()返回对象中可枚举的自有属性的名称的数组。

- ES5： Object.getOwnPropertyNames()返回对象中所有自有属性的名称的数组。

# 7. 属性getter和setter

由getter和setter定义的属性称作存取器属性（accessor property），它不同于数据属性，数据属性只有一个简单的值。
当程序查询存取器属性的值时，调用getter方法。
当程序设置存取器属性的值时，调用setter方法。将赋值表达式右侧的值当作参数传入setter。
对象直接量定义存储器属性：

```
var obj={
    data_prop:value,       //数据属性
    get accessor_prop(){}, //存取器属性
    set accessor_prop(){}
}
```

# 8. 属性特性

除了包含名字和值之外，属性还包含一些标识它们可写，可枚举，和可配置的特性。

ES5中提供了查询和设置这些属性特性的API，这些API的作用：

- 给原型对象添加方法，并将它们设置成不可枚举，更像内置方法。
- 给对象定义不可修改或删除的属性，锁定对象。

数据类型的特性：值，可写性，可枚举性，可配置性。

存取器属性的特性：get, set, 可没举行，可配置性。

ES5中定义了一个**属性描述符**对象，代表上述特性。通过Object.getOwnPropertyDescriptor()获取。

```
Object.getOwnPropertyDescriptor({x:1},"x")  ==>{value:1,writable:true,enumerable:true,configurable:true}
```

通过Object.defineProperty()设置属性特性：

```
Object.defineProperty(
	obj,
	"x",
	{               //不必包含所有特性
        value:1,
        writable:true
	}
)
```

通过Object.defineProperties()设置多个属性的特性：

```
var p = Object.defineProperties(
	{},
	{
        x:{value:1,writable:true},
        r:{
            get:function(){},
            configurable:true
        }
	}

)
```

# 9. 对象的三个属性

## 9.1 原型属性

原型属性在实例对象创建之初就设置好了。

查询对象的原型：

- ES5： Object.getPrototypeOf(obj)
- ES3：obj.constructor.prototype

检测一个对象是否是另一个对象的原型：

```
p.isPrototypeOf(o) //检测p是否是o的原型
```

不推荐使用：`__proto__`属性可直接查询、设置对象的原型。

## 9.2 类属性

类属性是一个字符串，用来表示对象的类型信息。

可通过toString()查询类属性。但很多对象继承的toString()方法重写了，需通过`Object.prototype.toString.call(obj).slice(8,-1)`查询到类属性。

## 9.3 可扩展性

对象的可扩展性表示是否可以给对象添加新属性。

所有内置对象和自定义对象都是可扩展的，宿主对象的可扩展性是由JS引擎决定的。

ES5提供用来查询和设置对象可扩展性的函数：

- Object.preventExtensions(obj)： 将对象转换为不可扩展的。一旦转换成不可扩展，就无法转回可扩展的了。

  通过Object.isExtensible()判断对象是否是可扩展的。

- Object.seal(obj)： preventExtensions基础上，将对象的所有自有属性都设置为不可配置的。

  通过Object.isSealed()判断对象是否封闭。

- Object.freeze(obj)：  seal基础上，将自有的所有数据属性设置为只读。

  通过Object.isFrozen()判断对象是否冻结。

# 10. 序列化对象

对象序列化是指将对象的状态转换为字符串，也可将字符串还原为对象。

通过内置函数JSON.stringify() & JSON.parse() 序列化和还原对象。

# 11. 对象方法

- toString()
- toLocaleString()
- toJSON()
- vallueOf()