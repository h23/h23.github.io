---
title: Git
date: 2018-09-20 16:29:31
tags: Git
---

## 1. 基础概念

**Git**： 分散型版本管理系统，是为版本管理而设计的软件。 

**版本管理**: 管理更新的历史记录。能够记录软件添加或更改源代码的过程，回滚到特定阶段，恢复误删除的文件等。 简单说就是用于管理多人协同开发项目的技术。 

**SVN与Git**：

- 原理上
  - Git直接记录文件快照，SVN每次记录哪些文件作了更新、更新哪些行的内容
  - Git 有本地仓库和远程仓库，SVN没有本地仓库
  - Git 大多数操作是本地执行，SVN操作几乎都需要连接网络
- 操作上
  - Git提交后保存在本地仓库，需要推到远程仓库；SVN提交后在远程仓库
  - Git有各种“反悔”命令，SVN几乎没有
  - Git有真正的branch，svn的branch其实是工作空间的副

**Git工作区**：工作目录、暂存区、资源库 、远程的git仓库 。

## 2. Git配置

 git config -l ： 查看现在的git环境详细配置

- 查看系统config： git config --system --list 
- 查看当前用户（global）配置： git config --global  --list 
- 查看当前仓库配置信息： git config --local  --list

 Git在$HOME目录中查找.gitconfig文件（一般位于C:\Documents and Settings\$USER下） ：

- /etc/gitconfig：包含了适用于系统所有用户和所有项目的值。 
- ~/.gitconfig：只适用于当前登录用户的配置。 
- 位于git项目目录中的.git/config：适用于特定git项目的配置。 

### 2.1 设置用户名与邮箱

每次Git提交都会使用到用户名和邮箱信息。 

```
git config --global user.name "xx" 
git config --global user.email xx@xx.com 
```

### 2.2 添加/删除配置项

```
git config [--local|--global|--system]  section.key value

git config [--local|--global|--system] --unset section.key
```

- [--local|--global|--system]  可选的
  - --local 项目级 
  - --global 当前用户级 
  - --system 系统级  
- section.key  区域下的键
- value 对应的值

### 2.3 其他配置项

```
git config --global color.ui true   #打开所有的默认终端着色
git config --global alias.ci commit   #别名 ci 是commit的别名
[alias]  
co = checkout  
ci = commit  
st = status  
pl = pull  
ps = push  
dt = difftool  
l = log --stat  
cp = cherry-pick  
ca = commit -a  
b = branch 

user.name  #用户名
user.email  #邮箱
core.editor  #文本编辑器  
merge.tool  #差异分析工具  
core.paper "less -N"  #配置显示方式  
color.diff true  #diff颜色配置  
alias.co checkout  #设置别名
git config user.name  #获得用户名
git config core.filemode false  #忽略修改权限的文件  
```

## 3. Git操作

### 3.1. 新建仓库

```
git init [project-name]
```

### 3.2. Clone仓库

```
git clone [url]
```

### 3.3. 文件操作

GIT不关心文件两个版本之间的具体差别，而是关心文件的整体是否有改变，若文件被改变，在添加提交时就生成文件新版本的快照，而判断文件整体是否改变的方法就是用SHA-1算法计算文件的校验和。 

#### 3.3.1 查看文件状态

文件的状态：

- **Untracked**: 未跟踪, 文件加入到git库, 不参与版本控制. 
  - 通过`git add`状态变为`Staged`. 
- **Unmodify**: 文件已经入库, 未修改
  - 如果它被修改, 而变为`Modified`. 
  - 如果使用`git rm`移出版本库, 则成为`Untracked`文件
- **Modified**: 文件已修改, 仅仅是修改, 并没有进行其他的操作. 
  - 通过`git add`进入暂存`staged`状态
  - 使用`git checkout` 则丢弃修改过, 返回到`unmodify`状态
- **Staged**: 暂存状态. 
  - 执行`git commit`则将修改同步到库中, 这时库中的文件和本地文件又变为一致, 文件为`Unmodify`状态. 
  - 执行`git reset HEAD filename`取消暂存, 文件状态为`Modified`

```
#查看指定文件状态
git status [filename]

#查看所有文件状态
git status
```

#### 3.3.2 添加文件与目录

工作区>暂存区：

```
添加指定文件到暂存区
git add [file1] [file2] ...

添加指定目录到暂存区，包括子目录
git add [dir]

添加当前目录的所有文件到暂存区
git add .
```

撤销add:

```
直接从暂存区删除文件，工作区则不做出改变
git rm --cached <file>

如果已经用add命令把文件加入stage了，就先需要从stage中撤销
git reset HEAD <file>...
```

移除文件：

```
移除所有未跟踪文件：一般会加上参数-df，-d表示包含目录，-f表示强制清除。
git clean [options] 

只从stage中删除，保留物理文件
git rm --cached readme.txt 

不但从stage中删除，同时删除物理文件
git rm readme.txt 

把a.txt改名为b.txt
git mv a.txt b.txt 
```

#### 3.3.3 文件修改后差异对比

```
查看文件修改后的差异
git diff [files]

比较暂存区的文件与之前已经提交过的文件
git diff --cached

比较repo与工作空间中的文件差异
git diff HEAD~n
```

