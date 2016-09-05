/**
 * 在最后一次的提交代码中自动过滤代码中的中文文件
 * 这个特性还在开发中，暂时仅仅删除开发中的css文件夹，删除中文文件的功能还未实现
 * Created by jonnyf on 2015-12-4.
 */

'use strict';

const fs         = require('fs'),
      controller = require('../controller'),
      delChinese = require('../util/get_dir_file');

controller.packages._core.task('clean', (cb) => {

    let flag      = false,
        cleanDirs = controller.arguments()._name,
        defDirs   = ['dev', '.sass-cache', 'dist'];

    try {
        cleanDirs = cleanDirs.split(',')
    } catch (e) {
        cleanDirs = defDirs;
    }

    fs.readdirSync('./').forEach((v)=> {
        if (cleanDirs.includes(v)) {
            flag = true;
        }
    });
    if (flag) {
        controller.packages._del(cleanDirs, cb);
        delChinese(controller.config.sourceDir, (err, files)=> {
            for (let i = 0; i < files.length; i++) {
                if (files[i].match(/[\u4E00-\u9FA5\uF900-\uFA2D]/)) {
                    fs.unlinkSync(files[i]);
                }
            }
            if (typeof err !== null) {
                console.log('项目清理完成！');
            } else {
                console.log(err);
            }
        });
    } else {
        console.log('请检查参数,您所要清理的项目不存在！');
    }
});
