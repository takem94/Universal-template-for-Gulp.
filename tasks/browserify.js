"use strict";

const gulp         = require('gulp'),
      source       = require('vinyl-source-stream'),
      browserify   = require('browserify');

module.exports = (options) => {
    return () => {
        return browserify(options.src)
            .bundle()
            .pipe(source(options.map))
            .pipe(gulp.dest(options.dest))
    };
};