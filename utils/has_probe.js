/**
 * 检测port是否被占用
 * Created by fuhuixiang on 2016-9-25.
 */
'use strict';

const net = require('net');

module.exports = (port, callback) => {
    let server     = net.createServer().listen(port),
        calledOnce = false;

    let timeoutRef = setTimeout(() => {
        calledOnce = true;
        callback(false)
    }, 2000);

    timeoutRef.unref();

    server.on('listening', () => {
        clearTimeout(timeoutRef);

        if (server) {
            server.close();
        }

        if (!calledOnce) {
            calledOnce = true;
            callback(true);
        }
    });

    server.on('error', (err) => {
        clearTimeout(timeoutRef);

        let result = true;
        if (err.code === 'EADDRINUSE') {
            result = false;
        }

        if (!calledOnce) {
            calledOnce = result;
            callback(result);
        }
    });
};
