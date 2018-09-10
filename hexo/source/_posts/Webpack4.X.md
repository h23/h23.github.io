---
title: Webpack4.X
date: 2018-08-03 08:47:22
tags: Webpack
---

# 1. Webpack介绍

webpack是javascript的静态模块打包器。递归的构建依赖关系图（包含应用程序需要的每个模块 ），然后将所有模块打包成一个或多个bundle。
webpack 会把我们项目中使用到的多个代码模块（可以是不同文件类型），打包构建成项目运行仅需要的几个静态文件。可以在打包构建的过程中做很多事情。

webpack作用：

1. 打包（依赖，把多个文件打包成一个JS文件，好处：减少服务器压力、带宽）
2. 转化（eg：less、sass、ts）需要loader
3. 优化（SPA越来越盛行，前端项目复杂度高，webpack可以对项目进行优化）

webpack构成：

1. 入口
2. 出口
3. loader
4. plugins
5. devServer
6. mode

webpack安装：webpack webpack-cli

mode:

- 开发环境：平时编写代码的环境
- 生产环境：项目开发完毕，部署上线

  ```
  webpack --mode devlopment
  webpack --mode production  自动压缩文件
  ```

# 2. Webpack基本配置

webpack配置文件：webpack.config.js(默认)，webpack配置采用commonJS规范。
配置文件整体：

```
module.exports={
    entry:{},     //入口配置*
    output:{},    //出口配置*
    modules:{},   //module.rules loader
    plugins:[],   //插件，一般用于生产环境
    devServer:{}   //开发服务器
}
```

```
entry:'src/index.js'   //单入口文件
```

```
output:{
    path：__dirname+'/dist'  //path必须是绝对路径。__dirname代表当前配置文件所在的绝对路径。是webpack提供的。
    filename：'bundle.js'   //
}

path的另一种写法：
	path:path.resolve(__dirname,'dist')  //需要先引入path(const path=require('path')node系统模块自带)，resolve方法可以看成是拼接的作用。
```

自定义配置文件名称：

```
webpack --config 配置文件名称
```

npm script:

```
script:{
    'build':'webpack --config xx.js'
}

通过npm run build 运行webpack --config xx.js。
```

# 3. 多入口、多出

多入口：

```
entry:['src/index.js','src/index2.js']  //按照顺序依次打包到出口文件。
```

多出口：

```
entry:{
    index:'src/index.js',     //多出口需要不同的名称，通过入口文件的属性名传名称
    index2:'src/index2.js'
}
output:{
    path:path.resolve(__dirname,'dist'),
    filename：'[name].bundle.js'  //[name]代表入口文件的属性名
}
```

# 4. 服务器、热更新

devServer：

1. 下载 webpack-dev-server
2. 使用

   ```
     devServer:{	
      	contenBase:path.resolve(__dirname,'dist'), //设置服务器访问的基本目录
       host:'localhost',                          //服务器IP地址
       port:'8090',                               //服务器端口
       open:true  //自动打开页面
     }
   ```

   > 如果安装某个模块的依赖出错，可删除node_modules，在重新安装。
   >
   > > 删除node_modules，通过linux命令`rm rf xxx`

热更新：

```
const webpack=require('webpack');  //webpack自带插件

devServer:{	
    hot:true   //热更新
}
plugins:[
    new wepback.HotModuleReplacementPlugin()
]
```

npm script:

```
'dev':'webpack-dev-server'
```

# 5. loader

loaders:  在webpack里面是一个很重要功能，是加载器、转化器。
比如: less/scss 转成css；ES7 8转低版本；jsx转JS
loader可有以下几种写法：

```
1. use:['xxx-loader','xxx-loader']
2. loader:['xxx-loader','xxx-loader']
3. use:[
        {loader:'style-loader'},
        {loader:'css-loader'}
    ]
```

## 5.1 处理css文件

style-loader & css-loader

1. 安装

   ```
   cnpm i style-loader css-loader -D
   ```

2. 配置

   ```
   	module:{
   		rules:[
   			{
   				test:/\.css$/,
   				use:['style-loader','css-loader']  //先由css-loader处理后，在交给style-loader处理
   			}
   		]
   	}
   ```

## 5.2 处理图片

url-loader & file-loader

1. 安装

   ```
   cnpm i file-loader url-loader -D
   ```

2. 配置

   ```
   {
       test:/\.(png|jpg|gif)$/,
       use:[{
           loader:'url-loader',
           options:{
               limit:50，             //当图片大于设置的limit值时，分离出来。
               outputPath:'images'    //图片打包后的输出路径，在output.path的基础上。
               }
       }]
   }
   ```

## 5.3 分离CSS

extract-text-webpack-plugin

1. 安装

   ```
   cnpm i extract-text-webpack-plugin -D		webpack3.x
   
   cnpm i extract-text-webpack-plugin@next -D	webpack4.x
   ```

2. 配置

   ```
   在plugins里面应用:
   	new ExtractTextPlugin(提取出去的路径)
   在loader里配置：
   	use:ExtractTextPlugin.extract({
   	    fallback:'style-loader',    //回滚处理
   	    use:'css-loader',
   	    publicPath:'../'            //解决css背景图，路径问题。引入图片的路径
   	})
   ```

## 5.4 处理less

1. 安装

   ```
   cnpm i less less-loader -D
   ```

2. 配置

   ```
   {
       test:/.less$/,
       use:['style-loader','css-loader','less-loader']	
   }
   ```

3. 分离

   ```
   {
       test:/.less$/,
       use:ExtractTextPlugin.extract({
           fallback:'style-loader',
           use:['css-loader','less-loader']
       	})
   }
   ```

## 5. 处理sass

1. 安装

```
  cnpm i node-sass sass-loader -D
```

1. 配置

```
  {
    test:/\.(sass|scss)$/,
    use:['style-loader','css-loader','sass-loader']
  }
```

1. 分离

```
  {
     test:/.(sass|scss)$/,
     use:ExtractTextPlugin.extract({
          fallback:'style-loader',
          use:['css-loader','sass-loader']
        })
   }
```

## 5.6 autoprefixer

postCss	预处理器，专门处理css平台。autoprefixer自动添加前缀。

1. 安装

   ```
   cnpm i postcss-loader autoprefixer -D
   ```

2. postCss配置

   ```
   准备 postcss.config.js   配置postCss:
   module.exports ={
   	plugins:[
   		require('autoprefixer')
   	]
   };
   ```

3. loader配置

   ```
   use:[
       {loader:'style-loader'},
       {loader:'css-loader'},
       {loader:'postcss-loader'}
   ]
   ```

4. 提取

   ```
   use:ExtractTextPlugin.extract({
       fallback:'style-loader',
       use:['css-loader','postcss-loader'],
       publicPath:'../' //解决css背景图，路径问题
   })
   ```

## 5.7 babel

babel作用：

- babel用来编译js
- ESnext转化
- jsx

### 5.7.1 处理ESnext

babel-core	bable-loader    babel-preset-env

1. 下载

   ```
   cnpm i babel-loader babel-core babel-preset-env -D
   ```

2. 配置

   ```
   {
       test:/\.(js|jsx)$/,
       use:['babel-loader'],
       exclude:/node_modules/   //不处理node_modules下的js、jsx
   }
   ```

3. babelrc配置

   ```
   .babelrc配置文件：
   {
       "presets":[
           "env"
       ]
   }
   
   ```

### 5.7.2 处理jsx,React 环境

1. 安装

   ```
   cnpm i babel-preset-react react react-dom -D
   
   ```

2. 配置

   ```
   .babelrc配置文件：
   {
       "presets":[
           "env","react"
       ]
   }
   
   ```

# 6. 插件

## 6.1 html-webpack-plugin

自动生成HTML文件：html-webpack-plugin

1. 安装 npm i html-webpack-plugin -D  (依赖webpack & webpack-cli，本地需安装)

2. 引入

   ```
   webpack.config.js  顶部
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   ```

3. 配置调用

   ```
   plugins:[
       new HtmlWebpackPlugin({
       	template:'src/index.html',  //html模板
       	title：'xxx',   //需要在模板中引用<%= htmlWebpackPlugin.options.title%>
       	hash:true    //生成链接消除缓存，html自动引入script的src最后加hash
       	minify:{    //压缩输出
               collapseWhitespace:true   //折叠空白区域
       	}
       })
   ]
   
   生成多个页面：
       new HtmlWebpackPlugin({  //new两次
       	filename:'index.html'   //以filename区分开
       	template:'src/index.html', 
       	title：'xxx' 
       	}
       }),
       new HtmlWebpackPlugin({
       	filename:'index2.html'
       	template:'src/index.html', 
       	title：'xxx' 
       	}
       })
   多页面分别引入自己的js：
   	new HtmlWebpackPlugin({  
   		chunks：['入口文件属性名']，  //通过chunks
       	filename:'index.html' ，  
       	template:'src/index.html', 
       	title：'xxx' 
       	}
       }),
       new HtmlWebpackPlugin({
       	chunks：['入口文件属性名']，
       	filename:'index2.html'
       	template:'src/index.html', 
       	title：'xxx' 
       	}
       })
   
   ```

## 6.2 clean-webpack-plugin

删除某些东西

1. 安装
2. 引入
3. 调用

   ```
   new CleanWebpackPlugin(['dist'])   //清除dist目录
   
   ```

## 6.3 uglifyjs-webpack-plugin

打包完以后肯定需要压缩上线:
	如何压缩:
	1. webpack4.x
		--mode production
	2. 之前版本
		uglifyjs-webpack-plugin

```
	a). cnpm i uglifyjs-webpack-plugin -D
	b). const uglify = require('xxx);
	c). new ugliufy()

```

## 6.4 purifycss-webpack

Purifycss

1. 下载

   ```
   cnpm i purifycss-webpack purify-css -D
   
   ```

2. 引入插件

   ```
   const PurifyCssWebpack = rewquire('purifycss-webpack');
   
   ```

3. glob-用于扫描路径

   ```
   cnpm i glob -D
   
   ```

4. plugins配置

   ```
   new PurifyCssWebpack({
   	paths:glob.sync(path.join(__dirname, 'src/*.html')) //扫描指定路径中的HTML文件，根据<link>对比查看，删掉没用到的或冗余的css配置。
   })
   
   ```

## 6.5 copy-webpack-plugin

将不需要webpack处理的静态资源，原样输出到指定目录下。

1. 下载

   ```
   cnpm i copy-webpack-plugin -D
   
   
   ```

2. 引入

   ```
   const CopyWebpackPlugin = require('copy-webpack-plugin');
   
   
   ```

3. 配置

   ```
   	plugins:[
   		new CopyWebpackPlugin([{
   			from:path.resolve(__dirname, 'src/assets'),  //将此目录下的文件
   			to:'./public'                                //输出到此目录
   		}])
   	]
   
   
   ```

# 7. SourceMap

上线后调试代码。F12中source里能看到源码。

- webpack4.x 开启调试:

  --mode development  

- webpack3.x之前:  开启sourcemap

  ```
  devtool:'source-map',
  
  ```

# 8. 使用第三库

通过ProvidePlugin和 import直接引入区别:

1. import引入之后，无论你在代码中是否使用jquery，打包后，都会打进去，这样其实产生大量的冗余js
2. Provideplugin, 只有你在使用到此库，才会打包

两种方式：

- import引入

  1. 下载

     ```
     cnpm i jquery -S
     
     ```

  2. 然后引入

     ```
     import $ from 'jquery'
     
     ```

- ProvidePlugin 

  1. 配置

     ```
     const webpack = require('webpack');
     
     在plugins里面使用:
     new webpack.ProvidePlugin({
         $:'jquery'
         ....
     })
     ```