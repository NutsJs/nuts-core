/**
 * 开启开发环境的任务
 * Created by jonnyf on 15-12-6.
 */

const controller = require('../controller'),
      defName    = require('../util/get_def_name'),
      webConfig  = controller.webpackConfig('dev');
let devDirList = [];

controller.packages._core.task('dev', ['server'], ()=> {
    let proName = controller.arguments()._name || defName(),
        devDir  = `${controller.config.sourceDir}/${proName}`,
        outDir  = `${controller.config.devDir}/${proName}`,
        scssDir = `${devDir}/scss`,
        jsDir   = `${devDir}/js`;

    //初始化函数
    (()=> {
        controller.packages._fs.exists(devDir, (exists)=> {
            if (exists) {
                devDirList = controller.packages._fs.readdirSync(devDir);
                if (devDirList.indexOf('scss') != -1) {
                    compassSass(`${scssDir}/*.scss`, `${outDir}/css`);
                } else {
                    console.log('scss路径不存在');
                }

                if (devDirList.indexOf('js') != -1) {
                    es6ToEs5(`${jsDir}/*.js`, `${outDir}/js`, controller.config.activity ? proName.split('/')[1] : proName);
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
            } else {
                console.log('项目不存在');
            }
        });
    })();

    controller.packages._core.watch([`${scssDir}/*.scss`, `${jsDir}/*.js`, `${devDir}/*.html`], ()=> {
        //监控样式表是否改动
        if (devDirList.indexOf('scss') != -1) {
            compassSass(`${scssDir}/*.scss`, `${outDir}/css`);
        }

        //监控js代码是否改变
        es6ToEs5(`${jsDir}/*.js`, `${outDir}/js`, controller.config.activity ? proName.split('/')[1] : proName);

        // 监控静态文件是否变更
        compassFile(`${devDir}/*.html`, outDir);
    });
});

/**
 * 对项目中的scss文件进行编译
 * @param input
 * @param output
 */
function compassSass(input, output) {
    controller.packages._core.src(input)
        .pipe(controller.packages._plumber())
        .pipe(controller.packages._compass({
            includePaths: controller.config.sassLib
        }))
        .pipe(controller.packages._connect.reload())
        .pipe(controller.packages._core.dest(output));
}

/**
 * 更具项目来判断是否进行es6的转换
 * @param input
 * @param output
 * @param proName
 */
function es6ToEs5(input, output, proName) {
    controller.packages._core.src(input)
        .pipe(controller.packages._plumber())
        .pipe(controller.packages._wpStream(webConfig))
        .pipe(controller.packages._rename(`${proName}.min.js`))
        .pipe(controller.packages._replace('@@androidVer', controller.config.androidVer))
        .pipe(controller.packages._connect.reload())
        .pipe(controller.packages._core.dest(output));
}

/**
 * 静态文件的编译
 * @param input
 * @param output
 */
function compassFile(input, output) {
    controller.packages._core.src(input)
        .pipe(controller.packages._plumber())
        .pipe(controller.packages._connect.reload())
        .pipe(controller.packages._core.dest(output));
}
