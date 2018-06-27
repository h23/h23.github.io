---
title: npm
date: 2018-06-27 15:33:09
tags:
---

# npm简介

npm是软件注册表，包含超过600000个包（即，代码模块）。包的结构使您可以轻松跟踪依赖项和版本。

npm组成：

* **网站**：开发者查找包（package）、设置参数以及管理 npm 使用体验的主要途径 。
* **注册表**：巨大的数据库，保存了每个包（package）的信息。将开发者从繁琐的包管理工作（版本、依赖等）中解放出来，更加专注于功能的开发。
* **命令行工具**：通过命令行或终端运行。开发者通过 CLI 与 npm 打交道。

# 安装

在安装 Node 的时候，会连带一起安装 npm。

基础命令：

* `npm install npm -g `   更新到最新版本 
* `npm help `  查看 npm 命令列表 
* `npm -l `  查看各个命令的简单用法 
* `npm -v `  查看 npm 的版本 
* `npm config list -l `  查看 npm 的配置 

# 注册npm账号

`npm adduser` 根据提示输入用户名，密码和邮箱。注册完要验证邮箱。

```
常见错误：npm ERR! Unable to authenticate, need: Basic

解决：用户名被注册过了，换一个就好了。
```

# 上传包

1. 上传包之前需先登录账号。

   `npm login `登录

   `npm whoami` 查看当前登录的账号。

2. 在目标文件夹下初始化。

   `npm init` 根据提示输入相应信息。注意包名必须是唯一的。

   完成后会生成package.json文件。

3. 编写待上传的代码模块。

4. 创建readme.md简单说明下包的作用以及用法。

5. 发布

   `npm publish`

   ```
   常见错误：You do not have permission to publish 'somepackage'.Are you logged in as the corrent user? 
   
   解决：包名重复了，修改package.json中的name 。
   ```

   ```
   可以通过npm unpublish撤销发布，要等24小时候才能重新发布。
   ```

6. 发布成功后可在官网上找到刚发布的包。可通过`npm install 包名`安装测试。

7. 更新包后重新上传

   1. 更新版本号

      `npm version xx` 

   2. 重新发布

      `npm publish`