/**
 * 在线上服务器上的部署命令
 * 这个命令不读取配置文件中的项目信息
 * 仅仅通过命令行的方式接收参数
 * Created by jonnyf on 2015-12-4.
 */

'use strict';

const controller = require('../controller'),
      getVersion = require('../util/get_now_version'),
      printMes   = require('../util/print_mesages'),
      taskIf     = require('../util/stream_if'),
      _config    = controller.config,
      pkg        = controller.packages;

pkg._core.task('build', () => {

    // 获取命令行中的参数
    let buildDir = controller.arguments()._name,
        buildVer = controller.arguments()._ver,
        devDir   = `${_config.sourceDir}/${buildDir}`;

    // 判断参数是否合法
    if (!!buildDir) {
        pkg._fs.exists(devDir, (exists) => {
            if (exists) {
                if (!!buildVer) {
                    console.log('正在部署的版本:' + buildVer);
                    outDist(buildDir, buildVer, devDir);
                } else {
                    getVersion(buildDir, (result) => {
                        console.log('正在部署的版本:' + result);
                        outDist(buildDir, result, devDir);
                    });
                }
            } else {
                console.log('警告！！！没有您要部署的项目！');
            }
        });
    } else {
        console.log('请输入需要部署的活动路径!');
        return null;
    }
});

/**
 * 通过命令行中的路径以及计算出最新版本号进行部署
 * @param buildDir
 * @param nowVersion
 * @param devDir
 */
function outDist(buildDir, nowVersion, devDir) {

    let distStaticDir = `${_config.distDir}/${_config.staticDir}/${buildDir}/${nowVersion}`,
        staticURL     = _config.needCDN ? _config.staticURL : `../${_config.staticDir}`,
        buildCDNDir   = `${staticURL}/${buildDir}/${nowVersion}`,
        buildName     = _config.activity ? buildDir.split('/')[1] : buildDir;

    // 部署html文件，并替换文件中的静态资源
    pkg._core.src(devDir + '/*.html')
        .pipe(printMes('html'))
        .pipe(pkg._replace('href="css/', `href="${buildCDNDir}/css/`))
        .pipe(pkg._replace('src="js/', `src="${buildCDNDir}/js/`))
        .pipe(pkg._replace('src="images/', `src="${buildCDNDir}/images/`))
        .pipe(pkg._core.dest(`${_config.distDir}/${buildDir}/`));

    // 部署并压缩javaScript脚本文件
    pkg._fs.readdir(`${devDir}/js`, (err)=> {
        if (err) {
            console.log('js路径不存在');
        } else {
            pkg._core.src(`${devDir}/js/*.js`)
                .pipe(pkg._plumber())
                .pipe(pkg._wpStream(controller.webpackConfig()))
                .pipe(pkg._rename(`${buildName}.min.js`))
                .pipe(taskIf(_config.needCDN, pkg._replace('../images/', `${buildCDNDir}/images/`)))
                .pipe(pkg._replace('*androidVer*', _config.androidVer))
                .pipe(pkg._replace('images/', `${buildCDNDir}/images/`))
                .pipe(printMes('javascript'))
                .pipe(pkg._core.dest(`${distStaticDir}/js/`));
        }
    });

    // 部署需要用到的图片，若没有图片则目录不存在
    pkg._core.src(`${devDir}/images/**/*.*`)
        .pipe(printMes('image'))
        .pipe(pkg._core.dest(`${distStaticDir}/images/`));

    // 部署需要用到的字体文件，若没有字体文件则目录不存在
    pkg._core.src(`${devDir}/font/*.*`)
        .pipe(printMes('font'))
        .pipe(pkg._core.dest(`${distStaticDir}/font/`));

    // 部署并压缩需要用到的样式表文件，并且替换样式表中的本地资源为CDN资源
    pkg._fs.readdir(`${devDir}/scss`, (err)=> {
        if (err) {
            console.log('scss路径不存在');
        } else {
            pkg._core.src(`${devDir}/scss/*.scss`)
                .pipe(printMes('css'))
                .pipe(pkg._plumber())
                .pipe(pkg._compass({
                    css: `${distStaticDir}/css`,
                    sass: `${devDir}/scss`,
                    image: `${devDir}/images`,
                    style: 'compressed'
                }))
                .pipe(taskIf(_config.needCDN, pkg._replace('../images/', `${buildCDNDir}/images/`)))
                .pipe(taskIf(_config.needCDN, pkg._replace('../font/', `${buildCDNDir}/font/`)))
                .pipe(pkg._core.dest(`${distStaticDir}/css/`));
        }
    });
    console.log('部署成功！！！');
}
