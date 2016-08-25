# 更新记录


> 以下带有 [update] 前缀的为不兼容更新，需要注意。而带有 [fix] 前缀的更新为异常修复，建议尽快更新。

## 2.1.1

* [fix] 修复在活动类页面时 include 命令失效的问题。
* 新增了 include 命令的帮助命令,具体可查看 --help 命令。

## 2.1.0

* [update] 新增了 include 命令,通过这个命令可以将 image 文件夹下的图片方便的引入到 scss 文件中。

## 2.0.0

* [fix]    修正了在src 文件不存在时执行 create 命令报错的问题
* [update] 移除了之前使用的compass 编译工具，替换成了 node-sass 来进行 scss 文件的编译
* [update] 移除了多余默认的 scss 库，替换成了我自己的 nuts-scss 库来作为compass 的替代。
* [update] 更新了配置文件，从而可以通过修改配置文件来进行 scss 库的配置