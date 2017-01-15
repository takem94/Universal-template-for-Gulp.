"use strict";

const gulp         = require('gulp'),
      $            = require('gulp-load-plugins')();

module.exports = (options) => {
    return () => {
        return gulp.src( options.src )
            .pipe($.cached('babels'))
            .pipe($.babel({
                presets: ['es2015']
            }))
            .pipe(gulp.dest(options.dest));
    };
};