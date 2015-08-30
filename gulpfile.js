var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('angularJS', function() {
    return gulp.src(mainBowerFiles('**/*.js'))
        .pipe(gulp.dest('public/dist/js'))
});

gulp.task('minify-css', function() {
    return gulp.src('assets/styles/*.css')
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('public/dist/css'));
});

gulp.task('normalizeCSS', function() {
    return gulp.src(mainBowerFiles('**/*.css'))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('assets/styles'))
});

gulp.task('compress', function() {
    return gulp.src('assets/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/js'));
});

gulp.task('default', function() {
        gulp.run('angularJS');
        gulp.run('normalizeCSS')
        gulp.run('minify-css');
        gulp.run('compress');
    }
);
