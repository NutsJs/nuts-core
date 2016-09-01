/**
 * 本地开发服务器
 * Created by jonnyf on 15-12-1.
 */

'use strict';

const controller  = require('../controller'),
      probe       = require('../util/is_probe'),
      hasPro      = require('../util/has_project'),
      defaultName = require('../util/get_def_name'),
      selfIP      = require('../util/get_ip_address');

controller.packages._core.task('server', (cb) => {

    let port    = controller.arguments()._port || controller.config.serverPort,
        proName = controller.arguments()._name || defaultName();

    probe(port, (bl, _pt) => {
        if (bl) {
            hasPro(proName, () => {
                controller.packages._connect.server({
                    root: `${controller.config.devDir}/${proName}`,
                    port: _pt,
                    host: selfIP(),
                    livereload: true
                });
                controller.packages._qrCode.generate('http://' + selfIP() + ':' + _pt);
            });
        } else {
            console.log('端口被占用');
        }
    });

    // 如果 cb 不是 null 和 undefined，流程会被结束掉.
    cb();
});
