/**
 * Created by fuhuixiang on 16-10-13.
 */
"use strict";

const fs         = require('fs'),
      path       = require('path'),
      minimist   = require('minimist')(process.argv.slice(2)),
      configPath = path.resolve(process.cwd(), 'nuts.config.json');

fs.exists(configPath, (exists)=> {
    if (exists) {
        console.log('检测到配置文件，请继续');
    } else {
        console.log('未检测到配置文件，请先执行 init 命令创建配置文件');
    }
    return true;
});
