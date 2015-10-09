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
    spritesmith = require('gulp.spritesmith'),
    imagemin = require ('gulp-imagemin'),
    node;

//****************************************************************
//JavaScripts section
gulp.task('scripts', ['template'], function() {
    return gulp.src([
            'app/**/*.js',
            '!app/**/*Spec.js',
            'assets/scripts/**/*.js'])
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
//Image section
gulp.task('sprite', function() {
    var spriteData = gulp.src([
            'assets/images/icons/*.png',
            'assets/images/achievements/*.jpg',
            '!assets/images/icons/*.db'])
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: '_sprite.css',
            imgPath: '../i/sprite.png',
        }));

    spriteData.img.pipe(gulp.dest('assets/images'));
    spriteData.css.pipe(gulp.dest('assets/styles/inc'));
});

gulp.task('images', function() {
    return gulp.src([
            'assets/images/*',
            '!assets/images/**/*.db',
            '!assets/images/icons/',
            '!assets/images/achievements/'])
        .pipe(imagemin())
        .pipe(gulp.dest('public/i'));
});

//****************************************************************
//CSS section

//External fonts
gulp.task('font', function() {
	return gulp.src('assets/styles/font/*')
		.pipe(gulp.dest('public/font'));
});

//External styles
gulp.task('normalize', function() {
    return gulp.src(mainBowerFiles('**/*.css'))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/css'));
});

gulp.task('vendor-css', ['normalize', 'font'], function(){
});

//Custom styles
gulp.task('styles', function() {
    return gulp.src('assets/styles/main.scss')
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
gulp.task('watch', ['sprite', 'images', 'vendors', 'scripts', 'styles', 'server'], function() {
    gulp.watch('assets/styles/**/*.css', ['styles']);
    gulp.watch('assets/styles/**/*.scss', ['styles']);
    gulp.watch([
        'assets/scripts/**/*.js',
        'app/**/*.js'
        ], ['scripts']);
    gulp.watch('app/**/*.html', ['template']);
    gulp.watch([
        'server/**/*.js',
        'server/**/*.ejs'
        ], ['server']);
});

//****************************************************************
// Angular templates
gulp.task('template', function() {
    return gulp.src('app/**/*.html')
        .pipe(templateCache('templates.js', {standalone:true}))
        .pipe(gulp.dest('app'));
});

//****************************************************************
/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task('server', function() {
  if (node) node.kill()
  node = spawn('node', ['./server/bin/www'], {stdio: 'inherit'})
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
gulp.task('heroku:test', ['sprite', 'images', 'vendors', 'scripts', 'styles']);