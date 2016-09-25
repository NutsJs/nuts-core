/**
 * 本地开发服务器
 * Created by fuhuixiang on 2016-9-25.
 */
"use strict";

const path          = require('path'),
      connectPlugin = require('gulp-connect'),
      qrCodePlugin  = require('qrcode-terminal'),
      probe         = require('../utils/has_probe'),
      getSelfIP     = require('../utils/get_ip_address'),
      config        = require(path.resolve(process.cwd(), 'nuts.config.json'));

module.exports = (option, callback)=> {
    let {port, proName} = option;

    probe(port, (exists) => {
        if (exists) {
            connectPlugin.server({
                root: `${config.devDir}/${proName}`,
                port: port,
                host: getSelfIP(),
                livereload: true
            });
            qrCodePlugin.generate(`http://${getSelfIP()}:${port}`);
            callback();
        } else {
            console.log('端口被占用');
        }
    });
};
