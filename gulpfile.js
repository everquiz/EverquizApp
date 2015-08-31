var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var addsrc = require('gulp-add-src');
var sass = require('gulp-sass');

gulp.task('minify-js', function() {
    return gulp.src(mainBowerFiles('**/*.js'))
        .pipe(addsrc.append([
            'assets/*.js',
            'assets/angular-js/*.js',
            'assets/angular-js/services/*.js',
            'assets/angular-js/controllers/*.js',
            'assets/angular-js/config/*.js',
            'assets/generic-js/*.js']))
        .pipe(concat('application.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public'));
});

gulp.task('minify-css', function() {
    return gulp.src(mainBowerFiles('**/*.css'))
        .pipe(addsrc.append([
            'assets/styles/*.scss',
            'assets/styles/*.css']))
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('application.min.css'))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('public'));
});

gulp.task('default', ['minify-css', 'minify-js'], function() {
    }
);