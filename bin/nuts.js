#!/usr/bin/env node

"use strict";

const fs = require('fs');
const path = require('path');
const minimist = require('minimist')(process.argv.slice(2));
const configPath = path.resolve(process.cwd(), 'nuts.config.json');

fs.exists(configPath, (exists)=> {
    if (exists) {
        taskController(require(configPath));
    } else {
        console.log('未检测到配置文件，请先执行 init 命令创建配置文件');
    }
});

/**
 * 任务分发模块
 * @param config
 */
function taskController(config) {
    const taskName = minimist['_'][0];
    const {name, port, ver} = minimist;

    switch (taskName) {
        case 'create':
            require('../tasks/create')(name);
            break;
        case 'init':
            require('../tasks/init')(configPath);
            break;
        default:
            console.log('没有这个任务!');
            break;
    }
    console.log(config);
}
