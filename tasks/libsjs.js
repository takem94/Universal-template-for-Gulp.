"use strict";

const gulp       = require('gulp'),
      del        = require('del'),
      $          = require('gulp-load-plugins')();

module.exports = (options) => {
    return gulp.series(function clearLibsJs() {
            return del(options.dest + '*.js');
       },function concatLibsJs() {
            return gulp.src(options.js + '**/*.js')
                .pipe($.concat('libs.js'))
                .pipe($.uglify())
                .pipe($.rename({ suffix: options.suffix }))
                .pipe(gulp.dest(options.dest));
        }
    )
};