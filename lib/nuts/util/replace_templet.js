/**
 * 字符串匹配插件, 支持传入正则式和函数对象以及字符串
 * Created by jonnyf on 16-7-12.
 */
'use strict';
const through = require('through2');

module.exports = (replaceObj, replaceStr)=> {
    let searchObj = {};
    if (typeof replaceObj === 'string') {
        searchObj[replaceObj] = replaceStr;
    } else {
        searchObj = replaceObj;
    }
    let keys     = Object.keys(searchObj),
        dataKeys = keys.map((v)=> {
            return new RegExp(v, "g");
        });

    return through.obj(function (file, enc, cb) {
        let src = file.contents.toString();

        keys.forEach((v, i)=> {
            src = src.replace(dataKeys[i], searchObj[v]);
        });

        file.contents = new Buffer(src);
        this.push(file);
        cb();
    });
};
