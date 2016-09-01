/**
 * 创建多层文件夹 异步
 * Created by fuhuixiang on 16-9-1.
 */

const fs   = require('fs'),
      path = require('path');

module.exports = (dirpath, callback)=> {
    mkdirs(dirpath, ()=> {
        callback();
    });
};

// 异步文件夹创建 递归方法
function mkdirs(dirpath, _callback) {
    fs.exists(dirpath, (exists)=> {
        if (exists) {
            _callback(dirpath);
        } else {
            //尝试创建父目录，然后再创建当前目录
            mkdirs(path.dirname(dirpath), ()=> {
                fs.mkdir(dirpath, _callback);
            });
        }
    });
}
