/**
 * 获取 webpack 的配置文件,一般情况下不需要修改
 * Created by fuhuixiang on 2016-9-25.
 */
"use strict";

const webpack = require('webpack');

module.exports = (devType)=> {
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
        plugins: (devType == 'dev') ? [] : [new webpack.optimize.UglifyJsPlugin()]
    }
};
