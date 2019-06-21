"use strict";

const      gulp = require('gulp'),
    browserSync = require('browser-sync');

let Src         = { Path: './src/' };           // Path to source project files
    Src.Spr     = Src.Path + 'img/Sprites/'; 	// Path to sprites files
    Src.SprSrc  = Src.Spr + 'SrcSprites/'; 		// Path to source sprites files
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

// It's make big svg atlas with .scss rules from many single svg files.

requireTask('sprite:svg', './tasks/spritesvg', {
     src: Src.SprSrc + 'Svg/*.svg',
    dest: Src.SprSrc + 'Svg/tmp/',
     svg: Src.SprSrc + 'Svg/tmp/*.svg',
     img: Src.Spr
});

// It's make big png atlas with .scss rules from many single png files.

requireTask('sprite:png', './tasks/spritepng', {
    src: Src.Path + 'sass/sprite.png',
    dest: Src.Spr,
    srcSpr: Src.SprSrc + 'Png/**/*.png',
    destSpr: Src.Path + 'Sass/',
    imgPath: Src.Spr + 'sprite.png'
});

// It's using for start server with autoreload on changes.

requireTask('server', './tasks/server', {
    dir: 'src/',
    port: 8550
});

// Needed to transform JS files with new ES standards for old browsers with support ES 2015.
// Also making possible to using modules in JS code. 

requireTask('browserify', './tasks/browserify', {
    src: Src.Js + 'app.js',
    dest: Src.Js,
    map: 'main.js'
});

// Minify JS files.

requireTask('uglify', './tasks/uglify', {
    src: Src.Js + 'main.js',
    suffix: '.min',
    dest: Src.Js
});

// It's needed for compress all images files and move them to '/dist' directory.

requireTask('imgOptimize', './tasks/imgOptimize', {
    src: Src.Img + '**/*.{png, gif, svg}',
    srcMove: Src.Img + 'Sprites/*.svg',
    filt: ['!' + Src.Img + 'Sprites/SrcSprites/**/*.*', '!' + Src.Img + 'Sprites/*.svg'],
    base: Src.Img,
    dest: Pub.Img,
    srcJpg: Src.Img + '**/*.{jpg,jpeg}'
});

// Just minify all css files.

requireTask('minify', './tasks/minify', {
       src: [Src.Css + '*.css', '!' + Src.Css + '*.min.css'],
      dest: Src.Css,
    suffix: ".min"
});

// Delete directory 'dist'

requireTask('clean', './tasks/clean', {
    src: Pub.Path
});

// It's necessary for transfer all ready files in public/dist directory.

requireTask('Trans', './tasks/Trans', {
    src: [
        Src.Fonts,
        Src.Html,
        Src.Js + 'main.min.{js,js.map}',
        Src.Path + 'libs/*.min.*'
    ],
    dest: Pub.Path,
    base: Src.Path
});

// It's needed for clear all unused in html files css selectors.

requireTask('uncss', './tasks/uncss', {
    src: [Src.Css + '*.css','!' + Src.Css + '*.min.css'],
    dest: Pub.Css,
    base: Src.Css,
    html: Src.Html,
    suffix: ".min"
});

// Bower is deprecated.

/*
requireTask('bower', './tasks/bower', {
    dest:  Src.Path + 'libs',
    fonts:  Src.Path + 'Fonts/',
    suffix: '.min'
});
*/

// It's necessary to get all the .сss files in src/libs/src/css directory and merge it in one compressed file.
// Compressed file is located in src/libs/libs.min.css.

requireTask('libscss', './tasks/libscss', {
    dest:  Src.Path + 'libs/',
    suffix: '.min',
    css: Src.Path + 'libs/src/css/'
});

// It's necessary to get all the .js files in src/libs/src/js directory and merge it in one compressed file.
// Compressed file is located in src/libs/libs.min.js.

requireTask('libsjs', './tasks/libsjs', {
    dest:  Src.Path + 'libs/',
    suffix: '.min',
    js: Src.Path + 'libs/src/js/'
});

// Clearing all saved cache for files, which using in tasks.

requireTask('clearcached', './tasks/clearcached', {});

// Needed for compiling .pug files into .html files.

requireTask('pug', './tasks/pug', {
    src:  Src.Path + 'Pug/*.pug',
    dest:  Src.Path
});

// Needed for compiling .scss files into .css files.

requireTask('sass', './tasks/sass', {
     src: Src.Sass + 'main.scss',
    dest: Src.Css
});

gulp.task('preload', gulp.series('sass','minify', 'browserify','uglify'));

gulp.task('build', gulp.series('clean', 'sass', 'pug', 'libsjs', 'libscss', 'uncss', 'imgOptimize', 'browserify', 'uglify', 'Trans'));

gulp.task('watch', () => {
    gulp.watch(Src.Sass + '**/*.scss', gulp.series('sass','minify'));
    gulp.watch(Src.Css + '*.css').on('change', browserSync.reload);
    gulp.watch(Src.Path + 'libs/src/css/**/*.css', gulp.series('libscss')).on('change', browserSync.reload);
    gulp.watch(Src.Path + 'libs/src/js/**/*.js', gulp.series('libsjs')).on('change', browserSync.reload);
    gulp.watch(Src.Html).on('change', browserSync.reload);
    gulp.watch(Src.Img).on('change', browserSync.reload);
    gulp.watch(Src.SprSrc + 'Svg/*.svg', gulp.series('sprite:svg')).on('change', browserSync.reload);
    gulp.watch(Src.SprSrc + 'Png/*.png', gulp.series('sprite:png')).on('change', browserSync.reload);
    gulp.watch(Src.Path + 'pug/**/*.pug', gulp.series('pug'));
    gulp.watch([Src.Js + 'modules/**/*.js', Src.Js + 'app.js'], gulp.series('browserify'));
    gulp.watch(Src.Js + 'main.js', gulp.series('uglify'));
    gulp.watch(Src.Js + 'main.min.js').on('change', browserSync.reload);
    // gulp.watch('./bower.json', gulp.series('bower')).on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('server','watch'));