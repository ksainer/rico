const gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	browserSync = require('browser-sync').create();
	

gulp.task('styles', () => {
	return gulp.src('src/sass/style.sass')
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(autoprefixer({overrideBrowserslist:['> 0.1%'], cascade: false}))
		.pipe(concat('all.min.css'))
		.pipe(gulp.dest('app/css'))
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
	gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.series(gulp.parallel('styles'), gulp.parallel('watch', 'browser-sync')));