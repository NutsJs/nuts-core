/**
 * 从初始化文件夹中复制出需要用到的html，scss和js文件
 * 这个命令只在初始化一个项目时使用，需要本地模板文件支持，其他同事请无视这条命令，谢谢！
 * Created by jonnyf on 15-12-1.
 */

'use strict';

const controller = require('../controller'),
      path       = require('path'),
      packages   = controller.packages,
      defname    = require('../util/get_def_name'),
      time       = require('../util/date_format');

packages._core.task('create', () => {

    let proName = controller.arguments()._name || defname(),
        devDir  = `${controller.config.sourceDir}/${proName}`,
        name    = controller.config.activity ? proName.split('/')[1] : proName;

    if (!!name) {
        controller.packages._fs.exists(devDir, (exists) => {
            if (exists) {
                console.log('警告！！！您要创建的项目已经存在！');
            } else {
                createProject('nuts/templets', devDir, name);
            }
        });
    } else {
        console.log('警告！！！这是一个需要完整路径的项目!');
    }
});

/**
 * 创建新项目的函数
 * @param templet
 * @param devDir   项目路径
 * @param name     项目名称
 */
function createProject(templet, devDir, name) {

    var letter_name = name.replace(/\_(\w)/g, (all, letter)=> {
        return letter.toUpperCase();
    });

    packages._core.src(`${templet}/index.html`)
        .pipe(packages._replace('@@main', name))
        .pipe(packages._core.dest(`${devDir}/`));

    packages._core.src(`${templet}/scss/main.scss`)
        .pipe(packages._rename(name + '.scss'))
        .pipe(packages._core.dest(`${devDir}/scss`));

    packages._core.src(`${templet}/js/main.tmpl`)
        .pipe(packages._replace({
            '@@project_name': name,
            '@@author': controller.config.author,
            '@@date': time,
            '@@project': letter_name.replace(/(\w)/, v=> v.toUpperCase()),
            '@@letter': letter_name
        }))
        .pipe(packages._rename(name + '.js'))
        .pipe(packages._core.dest(`${devDir}/js`));

    // 创建图片和字体文件夹
    packages._fs.mkdir(path.resolve(__dirname, `../../${devDir}/`), (err) => {
        if (err) {
            console.log(err);
        }
        packages._fs.mkdirSync(path.resolve(__dirname, `../../${devDir}/images`));
        packages._fs.mkdirSync(path.resolve(__dirname, `../../${devDir}/font`));
    });

    console.log(name + '项目创建完成！！！');
}
