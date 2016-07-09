/**
 * Created by fuhuixiang on 16-7-8.
 */
'use strict';

const through2 = require('through2');

module.exports = function (condition, trueChild, falseChild) {
    if (!trueChild) {
        throw new Error('task-if: child action is required');
    }

    if (typeof condition === 'boolean') {
        // no need to evaluate the condition for each file
        // other benefit is it never loads the other stream
        return condition ? trueChild : (falseChild || through2.obj());
    }

    let stream = through.obj(function(file, enc, cb) {

        // 确保文件进去下一个插件
        this.push(file);
        // 告诉 stream 转换工作完成
        cb();
    });

    // 返回文件 stream
    return stream;
};
