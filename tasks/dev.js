/**
 * 开启开发环境的任务
 * Created by fuhuixiang on 2016-9-25.
 */
"use strict";

const fs            = require('fs'),
      path          = require('path'),
      task          = require('gulp'),
      server        = require('./server'),
      sassPlugin    = require('gulp-sass'),
      connectPlugin = require('gulp-connect'),
      renamePlugin  = require('gulp-rename'),
      streamPlugin  = require('webpack-stream'),
      replacePlugin = require('gulp-replace-pro'),
      webConfig     = require('../utils/get_wp_config')('dev'),
      config        = require(path.resolve(process.cwd(), 'nuts.config.json'));
let devDirList = [];

module.exports = (proName, port)=> {

    let devDir  = `${config.sourceDir}/${proName}`,
        outDir  = `${config.devDir}/${proName}`,
        scssDir = `${devDir}/scss`,
        jsDir   = `${devDir}/js`;

    server({name: proName, port: port}, ()=> {
        //初始化函数
        devDirList = fs.readdirSync(devDir);
        if (devDirList.indexOf('scss') != -1) {
            compassSass(`${scssDir}/*.scss`, `${outDir}/css`);
        } else {
            console.log('scss路径不存在');
        }

        if (devDirList.indexOf('js') != -1) {
            es6ToEs5(`${jsDir}/*.js`, `${outDir}/js`, path.basename(proName));
        } else {
            console.log('js路径不存在');
        }
        if (devDirList.indexOf('images') != -1) {
            compassFile(`${devDir}/images/**/*.*`, `${outDir}/images`);
        } else {
            console.log('图片路径不存在');
        }

        if (devDirList.indexOf('font') != -1) {
            compassFile(`${devDir}/font/*.*`, `${outDir}/font`);
        } else {
            console.log('字体路径不存在');
        }
        compassFile(`${devDir}/*.html`, outDir);

        task.watch([`${scssDir}/*.scss`, `${jsDir}/*.js`, `${devDir}/*.html`], ()=> {
            //监控样式表是否改动
            if (devDirList.indexOf('scss') != -1) {
                compassSass(`${scssDir}/*.scss`, `${outDir}/css`);
            }

            //监控js代码是否改变
            es6ToEs5(`${jsDir}/*.js`, `${outDir}/js`, path.basename(proName));

            // 监控静态文件是否变更
            compassFile(`${devDir}/*.html`, outDir);
        });
    });
};

/**
 * 对项目中的 scss 文件进行编译
 * @param input
 * @param output
 */
function compassSass(input, output) {
    task.src(input)
    // .pipe(controller.packages._plumber())
        .pipe(sassPlugin({
            includePaths: config.sassLib
        }))
        .pipe(connectPlugin.reload())
        .pipe(task.dest(output));
}

/**
 * 更具项目来判断是否进行es6的转换
 * @param input
 * @param output
 * @param proName
 */
function es6ToEs5(input, output, proName) {
    task.src(input)
    // .pipe(controller.packages._plumber())
        .pipe(streamPlugin(webConfig))
        .pipe(renamePlugin(`${proName}.min.js`))
        .pipe(replacePlugin('@@replace', config.replaceStr || ''))
        .pipe(connectPlugin.reload())
        .pipe(task.dest(output));
}

/**
 * 静态文件的编译
 * @param input
 * @param output
 */
function compassFile(input, output) {
    task.src(input)
    // .pipe(controller.packages._plumber())
        .pipe(connectPlugin.reload())
        .pipe(task.dest(output));
}
