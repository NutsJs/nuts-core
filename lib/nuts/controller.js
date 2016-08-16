/**
 * Created by jonnyf on 15-12-1.
 */

'use strict';

const fs       = require('fs'),
      webpack  = require('webpack'),
      minimist = require('minimist'),
      path     = require('path');

/**
 * 引入的所有第三方包,在这里进行统一的管理,方便后面引用的文件替换。
 */
exports.packages = {
    _fs: fs,
    _webpack: webpack,
    _wpStream: require('webpack-stream'),
    _connect: require('gulp-connect'),
    _plumber: require('gulp-plumber'),
    _replace: require('./util/replace_templet'),
    _compass: require('gulp-sass'),
    _rename: require('gulp-rename'),
    _core: require('gulp'),
    _qrCode: require('qrcode-terminal'),
    _del: require('del')
};

/**
 * 外部传入的配置文件
 */
exports.config = {};

/**
 * 通过命令行传入的参数,在这里进行缓存,方便后面调用。
 */
exports.arguments = ()=> {
    let inputArgv = minimist(process.argv.slice(2));
    return {
        _name: inputArgv.name || inputArgv.dir,
        _port: inputArgv.port,
        _clean: inputArgv.clean,
        _dev: inputArgv.dev,
        _build: inputArgv.build,
        _create: inputArgv.create,
        _ver: inputArgv.ver
    };
};

// webpack的配置文件,一般情况下不需要修改
exports.webpackConfig = (dev)=> {
    return {
        watch: false,
        module: {
            loaders: [
                {
                    test: /\.js$/, loader: 'babel-loader', exclude: './node_modules/',
                    query: {
                        presets: ['es2015']
                    }
                }
            ]
        },
        plugins: (dev == 'dev') ? [] : [new webpack.optimize.UglifyJsPlugin()]
    }
};

exports.run = ()=> {
    fs.readdirSync('./nuts/tasks/').forEach((files) => {
        if (/(\.(js)$)/i.test(path.extname(files))) {
            require('./tasks/' + files);
        }
    });
};
