const gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
	concat = require('gulp-concat'),
	minify = require('gulp-minify'),
	browserSync = require('browser-sync').create();
	

gulp.task('styles', () => {
	return gulp.src('src/sass/style.sass')
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(autoprefixer({overrideBrowserslist:['> 0.1%'], cascade: false}))
		.pipe(concat('all.min.css'))
		.pipe(cleanCSS({level:1}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream())
});

gulp.task('scripts', () => {
	return gulp.src('src/js/main.js')
		.pipe(concat('main.js'))
		.pipe(minify({compress: true}))
		.pipe(gulp.dest('app/js'))
		.pipe(browserSync.stream())
});

gulp.task('browser-sync', () => {
	browserSync.init({
		 server: {
			  baseDir: "./app"
		 },
		 notify: false
	});
});

gulp.task('watch', () => {
	gulp.watch('src/sass/*.sass', gulp.series('styles'));
	gulp.watch('src/js/*.js', gulp.series('scripts'));
	gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.series(gulp.parallel('styles', 'scripts'), gulp.parallel('watch', 'browser-sync')));