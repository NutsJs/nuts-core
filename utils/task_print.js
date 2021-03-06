/**
 * 自定义的gulp插件，用于在文件流中输出信息
 * @param opt
 * Created by fuhuixiang on 2016-9-25.
 */
'use strict';

module.exports = (opt) => {

    /**
     * 判断当前的文档流类型，并出出对应的信息
     */
    switch (opt) {
        case 'html':
            console.log('正在部署HTML...');
            break;
        case 'javascript':
            console.log('正在部署和压缩javascrpt...');
            break;
        case 'css':
            console.log('正在部署样式表...');
            break;
        case 'image':
            console.log('正在部署图片...');
            break;
        case 'font':
            console.log('正在部署字体...');
            break;
        default:
            return;
    }

    // 返回文件 stream
    return require('through2').obj(function (file, enc, cb) {

        // 确保文件进去下一个插件
        this.push(file);
        // 告诉 stream 转换工作完成
        cb();
    });
};
