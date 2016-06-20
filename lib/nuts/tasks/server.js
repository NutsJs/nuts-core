/**
 * 本地开发服务器
 * Created by jonnyf on 15-12-1.
 */

'use strict';

const connect  = require('gulp-connect'),
      gulp     = require('gulp'),
      minimist = require('minimist'),
      qrCode   = require('qrcode-terminal'),
      probe    = require('../util/is_probe'),
      hasPro   = require('../util/has_project'),
      defname  = require('../util/get_def_name'),
      selfIP   = require('../util/get_ip_address'),
      config   = require('../main').config;

gulp.task('server', (cb) => {

    let port    = minimist(process.argv.slice(2)).port || config.serverPort,
        proName = minimist(process.argv.slice(2)).name || defname();

    probe(port, (bl, _pt) => {
        if (bl) {
            hasPro(proName, () => {
                connect.server({
                    root: config.sourceDir + '/' + proName,
                    port: _pt,
                    host: selfIP(),
                    livereload: true
                });
                qrCode.generate('http://' + selfIP() + ':' + _pt);
            });
        } else {
            console.log('端口被占用');
        }
    });

    // 如果 cb 不是 null 和 undefined，流程会被结束掉.
    cb();
});
