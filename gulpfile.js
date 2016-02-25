'use strict';

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    copy = require('gulp-copy'),
    gh_publish = require('gulp-gh-pages'),
    typescript = require('gulp-typescript');

gulp.task('clean', function () {
    gulp.src(['public/js/**/*.js', 'dist/**/*']).pipe(clean())
});

gulp.task('scripts', function () {
    return gulp.src('src/**/*.ts').pipe(typescript()).pipe(gulp.dest('public/js'));
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('default', ['scripts']);

gulp.task('dist', ['scripts'], function () {
    gulp.src('public/**/*').pipe(copy('dist', {prefix: 1}));
});

gulp.task('gh-publish', ['dist'], function () {
    gulp.src('dist/**/*').pipe(gh_publish());
});
