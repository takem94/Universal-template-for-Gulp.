"use strict";

const gulp       = require('gulp'),
      bowerFiles = require('main-bower-files'),
      del        = require('del'),
      $          = require('gulp-load-plugins')();

module.exports = (options) => {
    return gulp.series(function cleanLibs() {
        return del(options.dest);
    }, function Css() {
        return gulp.src(bowerFiles('**/*.css'))
            .pipe($.cached('bCss'))
            .pipe(gulp.dest(options.dest + '/src/css'))
            .pipe($.concat('libs.css'))
            .pipe($.minifyCss())
            .pipe($.rename({ suffix: options.suffix }))
            .pipe(gulp.dest(options.dest));
    }, function Js() {
        return gulp.src(bowerFiles('**/*.js'))
            .pipe($.cached('bJs'))
            .pipe(gulp.dest(options.dest + '/src/js'))
            .pipe($.concat('libs.js'))
            .pipe($.uglifyjs())
            .pipe($.rename({ suffix: options.suffix }))
            .pipe(gulp.dest(options.dest));
        }, function Fonts() {
        return gulp.src([
            './bower_components/bootstrap/fonts/*.{eot,svg,ttf,woff,woff2}',
            './bower_components/font-awesome/fonts/*.{eot,svg,ttf,woff,woff2}'
        ])
            .pipe($.cached('bFonts'))
            .pipe($.flatten())
            .pipe(gulp.dest(options.fonts));
        }
    )
};