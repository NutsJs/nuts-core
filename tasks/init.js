/**
 * init 命令创建配置文件
 * Created by fuhuixiang on 2016-9-23.
 */
"use strict";

const fs = require('fs');
const configData = {
    "serverPort": 2333,

    "sourceDir": "src",

    "distDir": "dist",

    "staticDir": "static",

    "name": "example",

    "author": "jonnyf",

    "devDir": "dev",

    "needCDN": true,

    "staticURL": "http://cdn.jonnyf.com/duobao",

    "replaceStr": 120,

    "sassLib": []
};

module.exports = (configPath)=> {
    fs.writeFile(configPath, JSON.stringify(configData, null, 4), (err)=> {
        if (err) {
            console.log(err);
        } else {
            console.log('配置文件创建成功！！！');
        }
    });
};
