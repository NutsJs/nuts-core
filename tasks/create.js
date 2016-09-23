/**
 * 从初始化文件夹中复制出需要用到的html，scss和js文件
 * Created by fuhuixiang on 2016-9-23.
 */
"use strict";
const fs   = require('fs'),
      path = require('path');

module.exports = (projectName)=> {

    let devDir  = `${controller.config.sourceDir}/${proName}`;

    if (fs.existsSync(devDir)) {
        console.log('警告！！！您要创建的项目已经存在！');
    } else {
        let create = createProject(devDir, path.basename(projectName));
        create.next();
        console.log('HTML文件创建完成！！！');
        create.next();
        console.log('样式文件创建完成！！！');
        create.next();
        console.log('脚本文件创建完成！！！');
        if (create.next().done) {
            console.log(`${proName}项目创建完成！！！`);
        }
    }
};

/**
 * 创建新项目的函数
 * @param templet  模板路径
 * @param devDir   项目路径
 * @param name     项目名称
 */
function* createProject(devDir, name, templet = 'nuts/templets') {

    let letter_name = name.replace(/\_(\w)/g, (all, letter)=> {
        return letter.toUpperCase();
    });

    yield packages._core.src(`${templet}/index.html`)
        .pipe(packages._replace('@@main', name))
        .pipe(packages._core.dest(`${devDir}/`));

    yield packages._core.src(`${templet}/scss/main.scss`)
        .pipe(packages._rename(`${name}.scss`))
        .pipe(packages._core.dest(`${devDir}/scss`));

    yield packages._core.src(`${templet}/js/main.tmpl`)
        .pipe(packages._replace({
            '@@project_name': name,
            '@@author': controller.config.author,
            '@@date': time,
            '@@project': letter_name.replace(/(\w)/, v=> v.toUpperCase()),
            '@@letter': letter_name
        }))
        .pipe(packages._rename(`${name}.js`))
        .pipe(packages._core.dest(`${devDir}/js`));

    // 创建图片和字体文件夹
    return mkdirs(path.resolve(__dirname, `../../${devDir}/`), (dir)=> {
        fs.mkdirSync(`${dir}/images`);
        fs.mkdirSync(`${dir}/font`);
    });
}
