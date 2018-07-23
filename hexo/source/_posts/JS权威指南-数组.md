---
title: JS权威指南-数组
date: 2018-07-23 16:53:53
tags:
---

# 1. 基础

{% asset_img array.png %}

# 2. 创建数组

通过以下方式创建数组：

- 数组直接量。数组直接量的语法允许有可选的结尾逗号，故`[,,]`只有两个元素而非三个。
- 调用构造函数Array()：
  - new Array()
  - new Array(数组长度)
  - new Array(元素1，元素2。。。)

# 3. 元素的读写

通过[]访问数组的元素。
所有的索引都是属性名，但只有0~2^32-2之间的整数属性名才是索引。
当使用正确的索引时，数组会自动维护length属性。
查询不存在的属性时，不会报错==》undefined

# 4. 稀疏数组

稀疏数组就是包含从0开始的不连续索引的数组。

创建稀疏数组的方式：

- Array()构造函数指定length
- 指定数组索引值大于当前length
- delete操作符

当在数组直接量中省略值时不会创建稀疏数组，省略的元素在数组中是存在的，其值为undefined。

# 5. 数组长度

length属性使数组区别于常规的对象。
如果为数组元素赋值，它的索引i大于或等于现有数组长度时，length=i+1.
将length设置为小于当前长度的非负整数n时，在数组中索引值大于或等于n的元素将被删除。

# 6. 添加、删除元素

元素添加：

- 为新索引赋值
- push()向数组末尾添加元素
- unshift()向数组首部插入元素

元素删除：

- delete，效果等同于赋值为delete。数组length不变
- pop() 删除末尾元素，length-1，返回被删除元素
- shift() 删除首部元素，length-1，返回被删除元素

# 7. 数组遍历

遍历数组方式：

- for循环
- for in循环：如果数组同时拥有对象属性和数组属性，返回的属性名很可能是按照创建的顺序而非数值的大小顺序。因此最好不要使用for in遍历数组。
- ES5: forEach()

# 8. 多维数组

JS不支持真正的多维数组，但可以用数组的数组来近似。可通过使用两次[]来访问数组的数组中的元素。

# 9. 数组方法

- arr.join()：将数组中所有元素转化为字符串并拼接在一起，返回生成字符串。
- arr.reverse()：将数组中的元素颠倒顺序，返回逆序的数组。
- arr.sort()：将数组中的元素排序并返回排序后的数组。
  - 不传参数时，以字母表顺序排序。
  - 传入比较函数时：当比较函数返回一个小于0的数字，比较函数的第一个参数在前。
- arr.concat(arr2)：拼接数组，返回新数组。
- arr.slice(start Index, end Index)：返回指定的数组片段。[start Index,end Index) 可为负数。
- arr.splice()：在数组中插入或删除元素的通用方法。
  - arr.splice(操作起始索引, 要删除的元素个数, 要插入的元素)
- push()&pop()
- unshift()&shift()
- toString()&toLocaleString()

# 10. ES5中的数组方法

- forEach(function(数组元素，元素索引，数组本身){}): 遍历数组，对每个元素执行一次回调函数。
- map(function(数组元素，元素索引，数组本身){})：基本同forEach。差别：map的回调函数需要有return，map会返回新数组。
- filter(function(数组元素，元素索引，数组本身){}):返回符合条件的新数组。会跳过稀疏数组中缺少的元素。
- every(function(数组元素，元素索引，数组本身){})：逻辑判定，所有元素都满足条件返回true。
- some(function(数组元素，元素索引，数组本身){})：逻辑判定，有一个元素满足条件返回true。
- indexOf() & lastIndexOf()

# 11. 数组类型

检测未知对象是否为数组：

- ES5: Array.isArray(x)
- ES3: Object.proptotype.toString.call(x) === "[object Array]"