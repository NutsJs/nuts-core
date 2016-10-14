/**
 * Created by fuhuixiang on 16-10-13.
 */
"use strict";
const fs         = require('fs'),
      path       = require('path'),
      async      = require('async'),
      configPath = path.resolve(process.cwd(), './test/test-create-config.json');

async.series([
    (callback)=> {
        let readStream = fs.createReadStream(configPath);
        readStream.pipe(fs.createWriteStream('./nuts.config.json'));
        readStream.on('end', ()=> {
            // 开始任务
            require('../../tasks/create')('test');
            callback(null, 'create');
        });
        readStream.on('error', ()=> {
            throw new Error('copy config file error');
        });
    }
], (err, results)=> {
    // 判断任务执行结果
    setTimeout(()=> {
        fs.exists(path.resolve(process.cwd(), './src/test/js/test.js'), (exists)=> {
            if (exists) {
                console.log('项目创建成功');
            } else {
                throw new Error('项目创建失败');
            }
            fs.unlinkSync('./nuts.config.json');
        });
    }, 3000);
});
