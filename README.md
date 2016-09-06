# Nuts前端构建工具
[![npm](https://img.shields.io/npm/v/wishbao.svg?style=flat)](https://www.npmjs.com/package/wishbao)
[![npm](https://img.shields.io/npm/l/wishbao.svg?style=flat)](https://www.npmjs.com/package/wishbao)
[![npm](https://img.shields.io/npm/dt/wishbao.svg?style=flat)](https://www.npmjs.com/package/wishbao)

> 这是一个基于 gulp 的前端工程构建集合，包括了最常见的新建项目，开发项目和最后的编译发布项目。其中 JavaScript 支持 ES2015 的语法，CSS 部分采用 SCSS。


### 目录结构说明。

    --- dist 这个目录是线上编译出来的代码，属于最终用户访问的代码，不添加到git托管。
        --- 源码目录中对应的最终代码目录，仅仅只放html文件
        --- static 放置静态文件的地方，真实环境中为CDN的目录地址
    --- dev 开发模式下的目标文件夹。
    --- nuts 这个目录是gulp的任务和配置目录
        --- task 任务目录
        --- templets 基础文件目录，存放新建项目所需的模板
        --- util 工具目录
        --- controller.js 构建工具的入口文件
    --- src 源代码目录，所有的源代码都托管在这里
            --- test 具体的项目代码目录
    --- gulpfile.js 配置文件
    --- package.json 项目的依赖说明文件，可用于初始化项目和安装依赖包
    --- README.md 项目的说明文件
    
### 工具安装

> 初始化的时候执行以下命令安装必要的依赖

-	nodejs运行环境  
    * node >= 6.2.0 npm >= 3.8.9

```
    npm install -g n    
    n stable
```

-    通过 npm 进行安装

```
npm install wishbao
```

-   运行初始化命令

```
node node_module/wishbao index --release
```

-   修改配置文件

> 修改gulpfile.js.example为gulpfile.js，并填写CDN路径等配置内容到文件中。

### 如何部署代码？

#### 执行命令：

-   gulp build --dir xxx
    - 例如： gulp build --dir test
    - 如果需要编译出指定版本请在后面添加 --ver 参数
    - 例如： gulp build --dir test --ver 1.2.0
    - 服务器需要修改gulpfile文件中的配置信息为线上信息
    
#### 关于CDN：cdn根目录的子目录 cdn_dir/指向dist/static/
    * cdn 项目中包含的图片，字体，css和js文件都会部署到 CDN 目录中。
    * cdn 更新通过发布新版本进行更新。
    * 项目中的html文件不在缓存中！
    * 例子：http://cdn.jonyf.com/cdn_dir/test/1.1.1/css/test.css

### 开发环境说明：

#### 执行命令：

```
// 新建项目支持下划线的命名方式, 项目会按照驼峰命名的方式进行下划线的转换
gulp create --name xxxx  

gulp dev --name xxxx --port 2333

gulp clean

gulp include --name xxxx
```

* 安装之后修改配置文件之后就可以通过 create 命令来创建新的项目了。
* 项目默认监听端口号2333，在浏览器中打开 http://localhost:2333 即可看到当前项目页面，如果端口号冲突或者同时启动多个项目则在 dev 命令后面添加 --port 参数来动态修改端口号。
* 关于具体配置的内容，请查看配置文件中的说明。

### 更新日志 [CHANGELOG]

[CHANGELOG]: CHANGELOG.md
