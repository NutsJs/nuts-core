/**
 * init 命令创建配置文件
 * Created by fuhuixiang on 2016-9-23.
 */
"use strict";

const fs         = require('fs'),
      path       = require('path'),
      configData = require(path.resolve(__dirname, '../templates/nuts.json'));

// 本地配置信息
let nativeConfig = null;

module.exports = (configPath, argv = false)=> {

    try {
        // 通过 try catch 来判断当前项目下是否有配置文件，如果有则根据参数判断是否更新。
        nativeConfig = require(configPath);

        if (argv) {
            Object.keys(configData).forEach((v)=> {
                if (!nativeConfig.hasOwnProperty(v)) {
                    nativeConfig[v] = configData[v];
                }
            });
            fs.writeFile(configPath, JSON.stringify(nativeConfig, null, 4), (err)=> {
                if (err) {
                    console.log(err);
                } else {
                    console.log('配置文件更新成功！！！');
                }
            });
        } else {
            console.log('本地已有配置文件，如果需要更新请使用 --update 参数');
        }
    } catch (err) {
        fs.writeFile(configPath, JSON.stringify(configData, null, 4), (err)=> {
            if (err) {
                console.log(err);
            } else {
                console.log('配置文件创建成功！！！');
            }
        });
    }
};
