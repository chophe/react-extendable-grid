var gulp = require('gulp');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var rename = require("gulp-rename");
var ts = require('gulp-typescript');
var gulpIgnore = require('gulp-ignore');

gulp.task('less', function() {
    return gulp.src('../themes/*.less')
        .pipe(less())
        .pipe(gulp.dest('../dist'));
});

gulp.task('themes', ['less'], function() {
    return gulp.src('../dist/*.css')
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('../dist'));
});

var tsProject = ts.createProject('../tsconfig.json', {
    typescript: require('typescript')
});
gulp.task('ts', function() {
    var tsResult = tsProject.src()
        .pipe(gulpIgnore.exclude("example/**/*.*"))
        .pipe(rename(function(path) {
            path.dirname = path.dirname.replace("src","");
        }))
        .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('../lib'));
});
