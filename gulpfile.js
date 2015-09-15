var gulp = require('gulp'),
    mainBowerFiles = require('main-bower-files'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    addsrc = require('gulp-add-src'),
    sass = require('gulp-sass'),
    exec = require('child_process').exec;
    ngAnnotate = require('gulp-ng-annotate'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    templateCache = require('gulp-angular-templatecache');

//****************************************************************
//JavaScripts section
gulp.task('scripts', function() {
    return gulp.src([
            'app/assets/*.js',
            'app/assets/angular-js/*.js',
            'app/assets/angular-js/config/*.js',
            'app/assets/angular-js/services/*.js',
            'app/assets/angular-js/controllers/*.js',
            'app/assets/generic-js/*.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(ngAnnotate())
        .pipe(jshint())
        // .pipe(jshint.reporter('default'))
        .pipe(concat('application.min.js'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('public/js'))
        .pipe(notify({ message: 'Script task complete' }));;
});

gulp.task('vendor-js', function() {
    return gulp.src(mainBowerFiles('**/*.js'))
        .pipe(plumber())
        .pipe(concat('vendors.min.js'))
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
gulp.task('styles', function() {
    return gulp.src([
            'app/assets/styles/*.scss',
            'app/assets/styles/*.css'])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('application.min.css'))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/css'))
        .pipe(notify({ message: 'Styles task complete' }));
});

//****************************************************************
//General section
// Vendors scripts and styles
gulp.task('vendors', ['vendor-css', 'vendor-js'], function () {
});

//****************************************************************
// watching scss/js/html files
gulp.task('watch', ['vendors', 'scripts', 'styles', 'template'], function() {
    gulp.watch('app/assets/styles/**/*.css', ['styles']);
    gulp.watch('app/assets/styles/**/*.scss', ['styles']);
    gulp.watch('app/assets/**/*.js', ['scripts']);
    gulp.watch('app/views/**/*.html', ['template']);
});

//****************************************************************
// Angular templates
gulp.task('template', function() {
    return gulp.src('app/views/**/*.html')
        .pipe(templateCache('templates.js', {standalone:true}))
        .pipe(gulp.dest('app/assets/angular-js'))
        .pipe(notify({ message: 'Template task complete' }));
});


//Default task
gulp.task('default', ['watch'], function() {
});

