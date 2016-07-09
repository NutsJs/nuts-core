/**
 * 检测项目是否存在
 * Created by jonnyf on 2015-12-19.
 */

'use strict';

const fs     = require('fs'),
      config = require('../controller').config;

module.exports = (projectName, callback) => {
    fs.exists(`${config.sourceDir}/${projectName}`, (exists) => {
        if (exists) {
            callback();
        } else {
            console.log('项目不存在！请检查路径是否正确，或尝试使用 create 命令新建项目。');
            return false;
        }
    });
};
