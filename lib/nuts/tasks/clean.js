/**
 * 在最后一次的提交代码中自动过滤代码中的中文文件
 * 这个特性还在开发中，暂时仅仅删除开发中的css文件夹，删除中文文件的功能还未实现
 * Created by jonnyf on 2015-12-4.
 */

'use strict';

const controller = require('../controller'),
      delChinese = require('../util/get_dir_file');

controller.packages._core.task('clean', (cb) => {

    controller.packages._fs.exists('dev/', (exists) => {
        if (exists) {
            delChinese(controller.config.sourceDir);
            controller.packages._del(['dev/', '.sass-cache'], cb);
        } else {
            console.log('请检查参数,您所要清理的项目不存在！');
        }
    });
});
