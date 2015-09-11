var gulp = require('gulp'),
    mainBowerFiles = require('main-bower-files'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    addsrc = require('gulp-add-src'),
    sass = require('gulp-sass'),
    exec = require('child_process').exec;
    ngAnnotate = require('gulp-ng-annotate');
    //browserSync = require('browser-sync').create(),
    //watch = require('gulp-watch'),
    //plumber = require('gulp-plumber'),
    //jshint = require('gulp-jshint');

// watching scss/js/html files
gulp.task('watch', function() {
  gulp.watch('assets/styles/**/*.css', ['general-css']);
  gulp.watch('assets/styles/**/*.scss', ['general-css']);
  gulp.watch('assets/**/*.js', ['minify-js']);
});

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
        //.pipe(plumber())
        .pipe(ngAnnotate())
        //.pipe(jshint.reporter('default'))
        .pipe(concat('application.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});


//****************************************************************
//CSS section
//External styles
gulp.task('normalize', function() {
    return gulp.src(mainBowerFiles('**/*.css'))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/css'));
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
        .pipe(gulp.dest('public/css'));
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
gulp.task('default', ['watch'], function() {
});

