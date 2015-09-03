var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var addsrc = require('gulp-add-src');
var sass = require('gulp-sass');
var exec = require('child_process').exec;
var ngAnnotate = require('gulp-ng-annotate');

//****************************************************************
//JavaScripts section
gulp.task('minify-js', function() {
    return gulp.src(mainBowerFiles('**/*.js'))
        .pipe(addsrc.append([
            'assets/*.js',
            'assets/angular-js/*.js',
            'assets/angular-js/config/*.js',
            'assets/angular-js/services/*.js',
            'assets/angular-js/controllers/*.js',
            'assets/generic-js/*.js']))
        .pipe(concat('application.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});


//****************************************************************
//CSS section
//External styles
gulp.task('normalize', function() {
    return gulp.src(mainBowerFiles('**/*.css'))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/css/vendor'));
});

gulp.task('vendor-css', ['normalize'], function(){
});

//Custom styles
gulp.task('custom-css', function() {
    return gulp.src([
            'assets/styles/*.scss',
            'assets/styles/*.css'])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('application.min.css'))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/css/custom'));
});

//Prepare all styles
gulp.task('general-css', ['vendor-css', 'custom-css'], function() {
});

//****************************************************************
//General section
//Run server
gulp.task('server', ['general-css', 'minify-js'], function (cb) {
  exec('npm start', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

//Default task
gulp.task('default', ['server'], function() {
});

