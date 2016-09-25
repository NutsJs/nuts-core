/**
 * 在最后一次的提交代码中自动过滤代码中的中文文件
 * Created by fuhuixiang on 2016-9-25.
 */
'use strict';

const fs         = require('fs'),
      del        = require('del'),
      path       = require('path'),
      delChinese = require('../utils/get_dir_file'),
      config     = require(path.resolve(process.cwd(), 'nuts.config.json'));

module.exports = (cleanDirs)=> {
    let flag    = false,
        defDirs = ['dev', '.sass-cache', 'dist'];

    try {
        cleanDirs = cleanDirs.split(',')
    } catch (e) {
        cleanDirs = defDirs;
    }

    fs.readdirSync(process.cwd()).forEach((v)=> {
        if (cleanDirs.includes(v)) {
            flag = true;
        }
    });

    if (flag) {
        _del(cleanDirs, cb);
        delChinese(config.sourceDir, (err, files)=> {
            files.forEach((v)=> {
                if (v.match(/[\u4E00-\u9FA5\uF900-\uFA2D]/)) {
                    fs.unlinkSync(v);
                }
            });
            if (typeof err !== null) {
                console.log('项目清理完成！');
            } else {
                console.log(err);
            }
        });
    } else {
        console.log('请检查参数,您所要清理的项目不存在！');
    }
};
