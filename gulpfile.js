var gulp = require('gulp');

var htmlmin = require('gulp-htmlmin');

var less = require('gulp-less');
var cssmin = require('gulp-cssmin');

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

var browserSync = require('browser-sync').create();
gulp.task('serve', ['pug','less','browserify'], function() {
	browserSync.init({
		server: './dev'
	});

	gulp.watch('src/**/*.pug', ['pug']);
	gulp.watch('src/css/**/*.less', ['less']);
	gulp.watch('src/js/**/*.js', ['browserify']);
});

// Pug -> HTML
var pug = require('gulp-pug');
gulp.task('pug', function () {
	return gulp.src('./src/**/*.pug')
	.pipe(gulp.dest('./server/views/.'))
	.pipe(browserSync.stream());
});

// Less -> CSS
var less = require('gulp-less');
gulp.task('less', function () {
	return gulp.src('./src/css/**/*.less')
	.pipe(less({}))
	.pipe(gulp.dest('./server/static/.'))
	.pipe(browserSync.stream());
});

// JS -> Bundled JS
gulp.task('browserify', function () {
	var b = browserify({
		entries: './src/js/index.js',
		debug: true
	}).transform(babelify);

	return b.bundle()
	.on('error', function(err) { console.log(err); this.emit('end'); })
	.pipe(source('teacam.js'))
	.pipe(buffer())
	.pipe(sourcemaps.init({ loadMaps: true }))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('./server/static/.'))
	.pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
