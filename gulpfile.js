"use strict";

const      gulp = require('gulp'),
    browserSync = require('browser-sync');

let Src         = { Path: './src/' };           // Path to source project files
    Src.Spr     = Src.Path + 'img/SrcSprites/'; // Path to source sprites files
    Src.Sass    = Src.Path + 'sass/';           // Path to source sass files
    Src.Html    = Src.Path + '**/*.html';       // Path to source Html files
    Src.Fonts   = Src.Path + 'fonts/**';        // Path to source fonts files
    Src.Css     = Src.Path + 'css/';            // Path to source css files
    Src.Img     = Src.Path + 'img/';            // Path to source images files
    Src.Js      = Src.Path + 'js/';             // Path to source JS files

let Pub         = { Path: './dist/' };          // Path to build files
    Pub.Js      = Pub.Path + 'js/';             // Path to build js files
    Pub.Css     = Pub.Path + 'css/';            // Path to build css files
    Pub.Img     = Pub.Path + 'img/';            // Path to build img files

function requireTask(taskName, path, options) {
    options          = options || {};
    options.taskName = taskName;
    
    gulp.task(taskName, (callback) => {
        let task = require(path).call(this, options);

        return task(callback);
    });
}

requireTask('sprite:svg', './tasks/spritesvg', {
     src: Src.Spr + 'Svg/*.svg',
    dest: Src.Spr + 'Svg/tmp/',
     svg: Src.Spr + 'Svg/tmp/*.svg',
     img: Src.Img
});

requireTask('sprite:png', './tasks/spritepng', {
    src: Src.Path + 'sass/sprite.png',
    dest: Src.Img,
    srcSpr: Src.Spr + 'Png/**/*.png',
    destSpr: Src.Path + 'Sass/',
    imgPath: './../img/sprite.png'
});

requireTask('server', './tasks/server', {
    dir: 'src/',
    port: 8550
});

requireTask('babel', './tasks/babel', {
    src: [Src.Js + '**/*.js', 
        '!' + Src.Js + '_js/**', 
        '!' + Src.Js + '{*.min.js,main.js}'
    ],
    dest: Src.Js + '/_js'
});

requireTask('browserify', './tasks/browserify', {
    src: Src.Js + '_js/app.js' ,
    dest: Src.Js,
    map: 'main.js'
});

requireTask('uglify', './tasks/uglify', {
    src: Src.Js + 'main.js',
    dest: Src.Js
});

requireTask('sass', './tasks/sass', {
     src: Src.Sass + 'main.sass',
    dest: Src.Css, 
    browsers: ['last 4 version','ie 8-9']
});

requireTask('imgOptimize', './tasks/imgOptimize', {
    src: Src.Img + '**/*.{png,gif,svg}',
    filt: '!' + Src.Img + 'SrcSprites/**/*.*',
    base: Src.Img,
    dest: Pub.Img,
    srcJpg: Src.Img + '**/*.{jpg,jpeg}'
});

requireTask('minify', './tasks/minify', {
       src: [ Src.Css + '*.css','!' + Src.Css + '*.min.css'],
      dest: Src.Css,
    suffix: ".min"
});

requireTask('clean', './tasks/clean', {
    src: Pub.Path
});

requireTask('Trans', './tasks/Trans', {
    src: [
        Src.Fonts,
        Src.Html,
        Src.Js + 'main.min.{js,js.map}',
        Src.Path + 'libs/**'
    ],
    dest: Pub.Path,
    base: Src.Path
});

requireTask('uncss', './tasks/uncss', {
    src: [Src.Css + '*.css','!' + Src.Css + '*.min.css'],
    dest: Pub.Css,
    base: Src.Css,
    html: Src.Html,
    suffix: ".min"
});

requireTask('bower', './tasks/bower', {
    dest:  Src.Path + 'libs',
    fonts:  Src.Path + 'Fonts/',
    suffix: '.min'
});

requireTask('smartgrid', './tasks/smartgrid', {
    dest:  Src.Path + 'Sass'
});

requireTask('clearcached', './tasks/clearcached', {
});

requireTask('pug', './tasks/pug', {
    src:  Src.Path + 'Pug/*.pug',
    dest:  Src.Path
});

gulp.task('preload', gulp.series('smartgrid','sass','minify','bower','babel', 'browserify', 'uglify'));

gulp.task('build', gulp.series('clean', 'bower', 'sass', 'pug', 'uncss', 'imgOptimize', 'babel', 'browserify', 'uglify', 'Trans'));

gulp.task('watch', () => {
    gulp.watch(Src.Sass, gulp.series('sass','minify'));
    gulp.watch(Src.Css + '*.css').on('change', browserSync.reload);
    gulp.watch(Src.Html).on('change', browserSync.reload);
    gulp.watch(Src.Img).on('change', browserSync.reload);
    gulp.watch(Src.Spr + 'Svg/*.svg', gulp.series('sprite:svg')).on('change', browserSync.reload);
    gulp.watch(Src.Spr + 'Png/*.png', gulp.series('sprite:png')).on('change', browserSync.reload);
    gulp.watch('./bower.json', gulp.series('bower')).on('change', browserSync.reload);
    gulp.watch(Src.Path + 'pug/**/*.pug', gulp.series('pug'));
    gulp.watch([
        Src.Js + '**/*.js',
        '!' + Src.Js + 'main.js',
        '!' + Src.Js + 'main.min.js',
        '!' + Src.Js + '_js/**'
    ], gulp.series(
        'babel',
        'browserify',
        'uglify'
    )).on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('bower','server','watch'));