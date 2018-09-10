---
title: Eslint
date: 2018-07-20 15:33:09
tags:  Eslint
---

# 1. 简介

Eslint目标是提供一个插件化的JS代码检测工具。可组装的JS和JSX检查工具。

通过配置一个json对象检测javascript代码规范。 

## 1.1 安装

全局安装：使 ESLint 适用于所有的项目。

```
npm install -g eslint    //安装
eslint --init            //设置配置文件
eslint yourfile.js       //运行ESLint
```

本地安装：让 ESLint 成为项目构建系统的一部分。

```
npm install eslint --save-dev             //安装
./node_modules/.bin/eslint --init         //设置配置文件
./node_modules/.bin/eslint yourfile.js    //在根目录运行ESLint
```

# 2. 配置

两种配置ESLint的方式：

1. JS文件中添加注释 - 使用 JavaScript 注释把配置信息直接嵌入到一个代码源文件中。
2. 配置文件 - .eslintrc.* , package.json中的eslintConfig字段，或通过命令行指定配置文件`eslint -c 配置文件 待检测文件`。行内配置 > 命令行 > 配置文件。根目录的.eslintrc文件优先级最高。



运行`eslint --init`后，会自动创建`.eslintrc`文件，此文件有默认规则。

```
{
    "rules": {
        "semi": ["error", "always"],     //一条名为semi的规则
        "quotes": ["error", "double"]    //另一条名为quotes的规则
    }
}
```

# 2.1 解析器选项

ESLint默认支持ES5语法，可覆盖配置支持其他版本和JSX。若要支持React需用eslint-plugin-react。

解析器选项使用parserOptions属性配置，可选项：

* ecmaVersion：设置ECMAScirpt版本。默认3，5，可选值：6,7,8,9,2015,2016,2017,2018。。。
* sourceType：可选值“script”，“module”
* ecmaFeature：额外的语言特性，对象
  * globalReturn：是否允许在全局作用于下使用return语句
  * impliedStrict：是否启用全局strict mode（ecmaVersion需是5以上）
  * jsx：是否启用JSX
  * experimentalObjectRestSpread：是否启用*实验性*的 [object rest/spread properties](https://github.com/sebmarkbage/ecmascript-rest-spread) 支持。不建议使用

```
   "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
```

## 2.2 解析器

ESLint默认使用Espree作为解析器。若要设置其他解析器，需满足以下需求：

1. 它必须是本地安装的一个 npm 模块。
2. 它必须有兼容 Esprima 的接口（它必须输出一个 `parse()` 方法）
3. 它必须产出兼容 Esprima 的 AST 和 token 对象。

以下解析器与ESLint兼容：

1. [Esprima](https://www.npmjs.com/package/esprima)
2. [Babel-ESLint](https://www.npmjs.com/package/babel-eslint) - 一个对[Babel](https://babeljs.io/)解析器的包装，使其能够与 ESLint 兼容。
3. [typescript-eslint-parser(实验)](https://www.npmjs.com/package/typescript-eslint-parser) - 一个把 TypeScript 转换为 ESTree 兼容格式的解析器，这样它就可以在 ESLint 中使用了。这样做的目的是通过 ESLint 来解析 TypeScript 文件（尽管不一定必须通过所有的 ESLint 规则）。

解析器通过parser属性设置：

```
"parser": "esprima"
```

## 2.3 环境

一个环境定义了一组预定义的全局变量。

环境可通过以下方式设置：

* 命令行： `--env`

* JS文件中设置注释： `/* eslint-env node,mocha */`

* 在配置文件中：

  ```
      "env": {
          "browser": true,
          "node": true
      }
  ```

* 在package.json中：

  ```
      "eslintConfig": {
          "env": {
              "browser": true,
              "node": true
          }
      }
  ```

可用的环境包括（可使用多个）：

- `browser` - 浏览器环境中的全局变量。
- `node` - Node.js 全局变量和 Node.js 作用域。
- `commonjs` - CommonJS 全局变量和 CommonJS 作用域 (用于 Browserify/WebPack 打包的只在浏览器中运行的代码)。
- `shared-node-browser` - Node.js 和 Browser 通用全局变量。
- `es6` - 启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 `ecmaVersion` 解析器选项为 6）。
- `worker` - Web Workers 全局变量。
- `amd` - 将 `require()` 和 `define()` 定义为像 [amd](https://github.com/amdjs/amdjs-api/wiki/AMD) 一样的全局变量。
- `mocha` - 添加所有的 Mocha 测试全局变量。
- `jasmine` - 添加所有的 Jasmine 版本 1.3 和 2.0 的测试全局变量。
- `jest` - Jest 全局变量。
- `phantomjs` - PhantomJS 全局变量。
- `protractor` - Protractor 全局变量。
- `qunit` - QUnit 全局变量。
- `jquery` - jQuery 全局变量。
- `prototypejs` - Prototype.js 全局变量。
- `shelljs` - ShellJS 全局变量。
- `meteor` - Meteor 全局变量。
- `mongo` - MongoDB 全局变量。
- `applescript` - AppleScript 全局变量。
- `nashorn` - Java 8 Nashorn 全局变量。
- `serviceworker` - Service Worker 全局变量。
- `atomtest` - Atom 测试全局变量。
- `embertest` - Ember 测试全局变量。
- `webextensions` - WebExtensions 全局变量。
- `greasemonkey` - GreaseMonkey 全局变量。

## 2.4 全局变量

当访问当前源文件内未定义的变量时，[no-undef](http://eslint.cn/docs/rules/no-undef) 规则将发出警告。如果你想在一个源文件里使用全局变量，推荐你在 ESLint 中定义这些全局变量，这样 ESLint 就不会发出警告了。 

全局变量可通过以下方式设置：

* JS文件中设置注释：

  ```
  /* global var1:false, var2:false */    //设置了两个全局变量且只读
  ```

* 在配置文件中设置：

  ```
      "globals": {
          "var1": true,    //可被重写
          "var2": false    //不可被重写
      }
      
  注意：要启用no-global-assign规则来禁止对原生对象或只读的全局变量进行修改。
  ```

## 2.5 插件

ESLint 支持使用第三方插件。在使用插件之前，你必须使用 npm 安装它。 全局安装的ESLint只能用全局安装的ESLint插件，本地的也只能用本地的。

通过配置文件设置：

```
    "plugins": [
        "plugin1",                 //插件名称可省略eslint-plugin-前缀
        "eslint-plugin-plugin2"
    ]
```

## 2.6 规则

规则有如下等级：

- `"off"` 或 `0` - 关闭规则
- `"warn"` 或 `1` - 开启规则，使用警告级别的错误：`warn` (不会导致程序退出)
- `"error"` 或 `2` - 开启规则，使用错误级别的错误：`error` (当被触发的时候，程序会退出)

可通过如下方式设置规则：

* 注释：

  ```
  /* eslint eqeqeq: "off", curly: "error" */
  /* eslint eqeqeq: 0, curly: 2 */
  /* eslint quotes: ["error", "double"], curly: 2 */   //若有额外的选项可用数组形式指定，数组的第一项总是规则等级
  ```

* 配置文件

  ```
      "rules": {
          "eqeqeq": "off",
          "curly": "error",
          "quotes": ["error", "double"]
      }
  ```

* 配置定义在插件中的一个规则的时候，你必须使用 `插件名/规则ID` 的形式。比如： 

  ```
      "plugins": [
          "plugin1"
      ],
      "rules": {
          "eqeqeq": "off",
          "curly": "error",
          "quotes": ["error", "double"],
          "plugin1/rule1": "error"       //来自plugin1的rule1规则。插件的名称要删掉eslint-plugin-前缀
      }
  ```

## 2.6 临时禁止规则

可通过注释方式临时禁止规则出现警告：

* 块注释

  ```
  /* eslint-disable */       //禁止所有规则
  alert('foo');
  /* eslint-enable */
  
  /* eslint-disable no-alert, no-console */     //禁止指定的规则
  alert('foo');
  console.log('bar');
  /* eslint-enable no-alert, no-console */
  ```

* 对整个文件启用或禁用警告

  ```
  /* eslint-disable no-alert */
  
  // Disables no-alert for the rest of the file
  alert('foo');
  ```

* 行注释

  ```
  alert('foo'); // eslint-disable-line
  
  // eslint-disable-next-line
  alert('foo');
  
  /* eslint-disable-next-line */
  alert('foo');
  
  alert('foo'); /* eslint-disable-line */
  ```

## 2.7 共享设置

共享设置将提供给每一个将被执行的规则。

通过配置文件的settings属性设置：

```
    "settings": {
        "sharedData": "Hello"
    }
```

# 3. 规则

规则的第一个值是错误级别，可选值：

- `"off"` or `0` - 关闭规则
- `"warn"` or `1` - 将规则视为一个警告（不会影响退出码）
- `"error"` or `2` - 将规则视为一个错误 (退出码为1)

你可以在配置文件中包含如下一行，开启默认规则（http://eslint.cn/docs/rules/）

```
"extends": "eslint:recommended"
```

# 4. JS Standard & ESLint 异同点

| 差异点 | JS Standard | ESLint |
| ------ | ----------- | ------ |
| 配置   | 无需配置    | 需配置("extends": "eslint:recommended"开启默认规则) |
| 自定义 | 不可修改 |可自定义配置|
| 自动格式化工具 | 有standard --fix | 有eslint --fix|
| 临时禁用规则 | 通过注释同ESLint | 通过注释|


|序号|规则|是否相同 |JS Standard | ESLint规则及默认情况 |
|-|------ | ----|----------- | ------ |------|
|1|缩进|否|两个空格|indent，默认4个空格|
|2|字符串引号|否|单引号(需转义字符除外)|quotes(可配单引号，双引号或反勾号)|
|3|未使用变量|是|禁止|no-unused-vars|
|4|关键字空格|否|关键字后需加空格|keyword-spacing，默认前后都需有空格|
|5|函数声明时()与函数名之间是否有空格|是|有|space-before-function-paren，默认有|
|6|=== or ==| 是|===|eqeqeq，===|
|7|字符串拼接操作符+之间是否有空格|否|有|space-infix-ops,有，且控制所有操作符|
|8|逗号前后空格|是|逗号后加空格|comma-spacing，默认前面不能有空格，后面必须加空格|
|9|else关键字与花括号在同一行|否|是|brace-style是，且控制所有控制语句或声明语句|
|10|多行IF语句的大括号能否省略|否|不能|
|11|异常处理中err参数|是|不能遗漏|handle-callback-err|
|12|全局变量是否要加上window前缀|否|要(document, console and navigator除外)|无|
|13|连续多行空行|否|不能超过1个空行|no-multiple-empty-lines，默认不能超过2个空行|
|14|三目运算的操作符位置|否|与后接代码处同一行|operator-linebreak，默认与前面的代码处同一行|
|15|var能否声明多个变量|否|不能|one-var，默认一个作用域只能有1个var/let/const|
|16|条件语句中的赋值语句用括号包起来|是|是|no-cond-assign|
|17|单行代码块{}与内容间是否有空格|是|有|block-spacing|
|18|变量和函数名统一用驼峰命名法|是|是|camelcase|
|19|是否允许对象字面量的拖尾逗号|是|不允许|comma-dangle，默认不允许|
|20|数组/对象字面量和变量声明中逗号的位置|是|行末|comma-style，默认行末|
|21|访问对象属性时，点号位置|否|与属性同一行|dot-location，默认与对象同一行|
|22|文件末尾留一空行|是|是|eol-last|
|23|函数调用时，函数名和开括号之间是否有空格|是|不允许|func-call-spacing|
|24|键值对中冒号周围的空格|是|键与：不能有空格，：与值必须有个空格|key-spacing|
|25|构造函数要以大写字母开头|是|是|new-cap|
|26|无参的构造函数调用时要带上括号|是|是|new-parens|
|27|getter&setter必须成对存在|是|是|accessor-pairs|
|28|子类的构造器中一定要调用 super|是|是|constructor-super|
|29|使用数组字面量而不是构造器|是|是|no-array-constructor|
|30|避免使用 arguments.callee 和 arguments.caller|是|是|no-caller|
|31|避免对类名重新赋值|是|是|no-class-assign|
|32|避免修改使用 const 声明的变量|是|是|no-const-assign|
|33|避免使用常量作为条件表达式的条件|否|是(循环除外)|no-constant-condition，条件和循环语句都不能用常量|
|34|正则中不要使用控制符|是|是|no-control-regex|
|35|不要使用 debugger|是|是|no-debugger|
|36|禁止删除变量|是|是|no-delete-var|
|37|禁止定义重复参数|是|是|no-dupe-args|
|38|类中不要定义重复的属性|是|是|no-dupe-class-members|
|39|对象字面量中不要定义重复的key|是|是|no-dupe-keys|
|40|switch 语句中不要定义重复的 case 分支|是|是|no-duplicate-case|
|41|禁止重复模块导入|是|是|no-duplicate-imports|
|42|正则中不要使用空字符|是|是|no-empty-character-class|
|43|不要解构空值|是|是|no-empty-pattern|
|44|不要使用 eval()|是|是|no-eval|
|45|catch 中不要对错误重新赋值|是|是|no-ex-assign|
|46|不要扩展原生对象|是|是|no-extend-native|
|47|避免多余的函数上下文绑定|是|是|no-extra-bind|
|48|避免不必要的布尔转换|是|是|no-extra-boolean-cast|
|49|不要使用多余的括号包裹函数|是|是|no-extra-parens|
|50|禁止case语句落空|是|是|no-fallthrough|
|51|不要省去小数点前面的0|是|是|no-floating-decimal|
|52|避免对声明过的函数重新赋值|是|是|no-func-assign|
|53|禁止对原生对象或只读的全局对象进行赋值|是|是|no-global-assign|
|54|禁止隐式的 eval()|是|是|no-implied-eval|
|55|禁止在嵌套的块中出现变量声明或 function 声明|是|是|no-inner-declarations|
|56|不要向 RegExp 构造器传入非法的正则表达式|是|是|no-invalid-regexp|
|57|禁止不规则的空白|是|是|no-irregular-whitespace|
|58|禁止使用 __iterator__|是|是|no-iterator|
|59|外部变量不要与对象属性重名|是|是|no-label-var|
|60|禁止使用标签语句|是|是|no-labels|
|61|禁止不必要的嵌套代码块|是|是|no-lone-blocks|
|62|禁止混用空格和制表符作为缩进|是|是|no-mixed-spaces-and-tabs|
|63|除了缩进，不要使用多个空格|是|是|no-multi-spaces|
|64|禁止多行字符串|是|是|no-multi-str|
|65|new 创建对象实例后需要赋值给变量|是|是|no-new|
|66|禁用function构造器|是|是|no-new-func|
|67|禁用Object构造器|是|是|no-new-object|
|68|禁止调用require时使用new操作符|是|是|no-new-require|
|69|禁止使用 new Symbal|是|是|no-new-symbol|
|70|禁止对StringNumber和Boolean使用new操作符|是|是|no-new-wrappers|
|71|禁止将Math、JSON和Reflect对象当作函数进行调用|是|是|"no-obj-calls": ["error"]|
|72|禁用八进制字面量|是|是|no-octal|
|73|禁止在字符串中使用八进制转义序列|是|是|no-octal-escape|
|74|禁止对 `__dirname` & `__filename` 进行字符串连接|是|是|no-path-concat|
|75|使用 getPrototypeOf 来替代 `__proto__`|是|是|no-proto|
|76|禁止多次声明同一变量|是|是|no-redeclare|
|77|禁止正则表达式字面量中出现多个空格|是|是|no-regex-spaces|
|78|return 语句中的赋值必需有括号包裹|是|是|no-return-assign|
|79|禁止自我赋值|是|是|no-self-assign|
|80|禁止自身比较|是|是|no-self-compare|
|81|禁用逗号操作符|是|是|no-sequences|
|82|禁止覆盖关键字|是|是|no-shadow-restricted-names|
|83|禁用稀疏数组|是|是|no-sparse-arrays|
|84|不要使用制表符|是|是|no-tabs|
|85|禁止在常规字符串中出现模板字面量占位符语法|是|是|no-template-curly-in-string|"no-template-curly-in-string": ["error"]|
|86|构造函数中使用 this 前请确保 super() 已调用|是|是|no-this-before-super|未配置|
|87|用 throw 抛错时，抛出 Error 对象而不是字符串|是|是|no-throw-literal|"no-throw-literal": ["error"]|
|88|行末不留空格|是|是|no-trailing-spaces|"no-trailing-spaces": ["error"]|
|89|禁止将变量初始化为 undefined|是|是|no-undef-init|"no-undef-init": ["error"]|
|90|循环语句中需更新循环变量|是|是|no-unmodified-loop-condition|"no-unmodified-loop-condition": ["error"]|
|91|简化可以简化的三元表达式|是 |是 |no-unneeded-ternary|"no-unneeded-ternary": ["error"]|
|92|return，throw，continue 和 break 后不要再跟代码|是|是|no-unreachable|"no-unreachable": ["error"]|
|93|finally 代码块中不要再改变程序执行流程|是|是|no-unsafe-finally|"no-unsafe-finally": ["error"]|
|94|关系运算符(in/instanceof)的左值不要做取反操作|是|是|no-unsafe-negation|"no-unsafe-negation": ["error"]|
|95|避免不必要的 .call() 和 .apply()|是|是|no-useless-call|"no-useless-call": ["error"]|
|96|避免使用不必要的计算值作对象属性|是|是|no-useless-computed-key|"no-useless-computed-key": ["error"]|
|97|禁止多余的构造器|是|是|no-useless-constructor|未配置|
|98|禁用不必要的转义|是|是|no-useless-escape|"no-useless-escape": ["error"]|
|99|禁止在import和export和解构赋值时将引用重命名为相同的名字|是|是|no-useless-rename|"no-useless-rename": ["error"]|
|100|同行中禁止对象和属性间有空白|是|是|no-whitespace-before-property|"no-whitespace-before-property": ["error"]|
|101|禁用with语句|是|是|no-with|"no-with": ["error"]|
|102|强制将对象的属性放在不同的行上|是|是|object-property-newline|未配置|
|103|代码块中避免多余空行|否|是|padded-blocks，默认需要空行|未配置|
|104|展开运算符和表达式之间不能有空格|是|是|rest-spread-spacing|"rest-spread-spacing": ["error", "never"]|
|105|分号后面需加上一个空格|是|是|semi-spacing|"semi-spacing": ["error"]|
|106|代码块{}前后需有个空格|是|是|space-before-blocks|未配置|
|107|圆括号与内容间不能有空格|是|是|space-in-parens|"space-in-parens": ["error"]|
|108|一元运算符后面跟一个空格|是|是|space-unary-ops|"space-unary-ops": ["error"]|
|109|注释首尾留空格|是|是|spaced-comment|"spaced-comment": ["error"]|
|110|模板字符串中变量前后不加空格|是|是|template-curly-spacing|"template-curly-spacing": ["error"]|
|111|要求使用 isNaN() 检查 NaN|是|是|use-isnan|"use-isnan": ["error"]|
|112|typeof只能和已有的数据类型作比较|是|是|valid-typeof|"valid-typeof": ["error"]|
|113|要求 IIFE 使用括号括起来|是|是|wrap-iife|未配置|
|114|`yield *` 中的 * 前后的空格|否|*前后都要有空格|yield-star-spacing，默认前面没有，后面有|"yield-star-spacing": ["error"]|
|115|禁止yoda条件|是|是|yoda|未配置|
|116|句尾是否使用分号|否|不要使用|semi，默认都要使用|semi: ["error", "always"]|
|117|不要使用 (, [, or ` 等作为一行的开始|否|是|no-unexpected-multiline，上一行有分号结尾就可以| "no-unexpected-multiline": ["error"]|

