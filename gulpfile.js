'use strict';

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    copy = require('gulp-copy'),
    gh_publish = require('gulp-gh-pages'),
    webserver = require('gulp-webserver'),
    typescript = require('gulp-typescript');

gulp.task('clean', function () {
    gulp.src(['public/js/**/*.js', 'dist/**/*']).pipe(clean())
});

gulp.task('scripts', function () {
    gulp.src('src/**/*.ts').pipe(typescript()).pipe(gulp.dest('public/js'));
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

gulp.task('serve', ['watch'], function () {
    gulp.src('public').pipe(webserver({
        livereload: true
    }));
});