var gulp = require('gulp'),
    mainBowerFiles = require('main-bower-files'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    addsrc = require('gulp-add-src'),
    sass = require('gulp-sass'),
    exec = require('gulp-exec'),
    ngAnnotate = require('gulp-ng-annotate'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    jshint = require('gulp-jshint'),
    templateCache = require('gulp-angular-templatecache'),
    spawn = require('child_process').spawn,
    node;

//****************************************************************
//JavaScripts section
gulp.task('scripts', ['template'], function() {
    return gulp.src([
            'app/angular/**/*.js',
            'app/scripts/**/*.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(ngAnnotate())
        .pipe(jshint())
        // .pipe(jshint.reporter('default'))
        .pipe(concat('application.min.js'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('public/js'));
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
            'app/styles/**/*.scss',
            'app/styles/**/*.css'])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('application.min.css'))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/css'));
});

//****************************************************************
//General section
// Vendors scripts and styles
gulp.task('vendors', ['vendor-css', 'vendor-js'], function () {
});

//****************************************************************
// watching scss/js/html files
gulp.task('watch', ['vendors', 'scripts', 'styles', 'server'], function() {
    gulp.watch('app/styles/**/*.css', ['styles']);
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch([
        'app/scripts/**/*.js',
        'app/angular/**/*.js'
        ], ['scripts']);
    gulp.watch('app/angular/**/*.html', ['template']);
    gulp.watch([
        'config/*.js',
        'routes/*.js',
        'views/*.ejs',
        'app.js',
        'app/models/*.js'
        ], ['server']);
});

//****************************************************************
// Angular templates
gulp.task('template', function() {
    return gulp.src('app/angular/**/*.html')
        .pipe(templateCache('templates.js', {standalone:true}))
        .pipe(gulp.dest('app/angular'));
});

//****************************************************************
/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task('server', function() {
  if (node) node.kill()
  node = spawn('node', ['./bin/www'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
})

// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill()
})

//Default task
gulp.task('default', ['watch'], function() {
});

// heroku task
gulp.task('heroku:test', ['vendors', 'scripts', 'styles']);



