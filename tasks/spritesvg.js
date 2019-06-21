"use strict";

const gulp = require('gulp'),
	  del  = require('del'),
	  $    = require('gulp-load-plugins')();
	  
module.exports = (options) => {
	return gulp.series(function firstStep() {
		return del(options.dest);
	},function secondStep(){
		return gulp.src(options.src)
            .pipe($.imagemin())
			.pipe($.svgSprite({
				mode: {
					symbol: {
						sprite: "../sprite-svg.svg",
						render: {
							scss: {
								dest:'../../../../../../sass/_sprite-svg.scss',
								template: './src/sass/templates/_sprite_template.scss'
								}
							}
						}
					}
				})
			)
			.pipe(gulp.dest(options.dest));
	},function thirdStep() {
		return gulp.src(options.svg)
			.pipe(gulp.dest(options.img))
	},function fourStep() {
		return del(options.dest);
	});
};