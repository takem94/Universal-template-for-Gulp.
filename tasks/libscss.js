"use strict";

const gulp       = require('gulp'),
      del        = require('del'),
      $          = require('gulp-load-plugins')();

module.exports = (options) => {
    return gulp.series(function clearLibsCss() {
            return del(options.dest + '*.css');
       }, function concatLibsCss() {
            return gulp.src(options.css + '**/*.css')
                .pipe($.concat('libs.css'))
                .pipe($.cleanCss())
                .pipe($.rename({ suffix: options.suffix }))
                .pipe(gulp.dest(options.dest));
        }
    )
};