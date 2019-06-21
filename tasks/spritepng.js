"use strict";

const gulp = require('gulp'),
      $    = require('gulp-load-plugins')(),
      del  = require('del');

module.exports = (options) => {
    return gulp.series(function firstStep() {
        return gulp.src(options.srcSpr)
            .pipe($.spritesmith({
                imgName: 'sprite.png',
                cssName: '_sprite.scss',
                imgPath: options.imgPath,
				algorithm: 'top-down'
            }))
            .pipe(gulp.dest(options.destSpr));
    },function secondStep() {
        return gulp.src(options.src)
            .pipe(gulp.dest(options.dest));
    },function thirdStep() {
        return del(options.src);
    });
};