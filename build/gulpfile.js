var gulp = require('gulp');
var less = require('gulp-less');
var print = require('gulp-print');
var cssmin = require('gulp-cssmin');
var rename = require("gulp-rename");

gulp.task('less', function() {
    return gulp.src('../themes/*.less')
        .pipe(less())
        .pipe(gulp.dest('../dist'));
});

gulp.task('themes', ['less'], function() {
    return gulp.src('../dist/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('../dist'));
});
