#!/usr/bin/env node

"use strict";

const fs         = require('fs'),
      path       = require('path'),
      minimist   = require('minimist')(process.argv.slice(2)),
      configPath = path.resolve(process.cwd(), 'nuts.config.json');

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
        case 'include':
            require('../tasks/include')(name);
            break;
        case 'clean':
            require('../tasks/clean')(name);
            break;
        case 'dev':
            hasProject(name, ()=> {
                require('../tasks/dev')(name, port);
            });
            break;
        case 'build':
            hasProject(name, ()=> {
                require('../tasks/build')(name, ver);
            });
            break;
        default:
            console.log('没有这个任务!');
            break;
    }
    console.log(config);
}

/**
 * 判断项目是否正确
 * @param name
 * @param callback
 */
function hasProject(name, callback) {
    const config = require(path.resolve(process.cwd(), 'nuts.config.json'));
    fs.exists(`${config.sourceDir}/${name}`, (exists)=> {
        if (exists) {
            callback();
        } else {
            console.log('项目不存在');
        }
    });
}
