var gulp = require('gulp'),
	concatCss = require('gulp-concat-css'),
	cleanCSS = require('gulp-clean-css'),
	uncss = require('gulp-uncss'),
	concat = require('gulp-concat'),
	uglyfly = require('gulp-uglyfly'),
	autoprefixer = require('gulp-autoprefixer'),
	server = require('gulp-server-livereload'),
	sass = require('gulp-sass');


gulp.task('sass',function(){
	return gulp.src(['sass/**/*.sass','sass/**/*.scss'])
	.pipe(sass({outputStyle: 'expanded'}).on('error',sass.logError))
	.pipe(autoprefixer({
            browsers: ['last 20 versions'],
            cascade: false
        }))
	.pipe(gulp.dest('css'))
	});

gulp.task('css', function () {
  	return gulp.src('css/**/*.css')
    .pipe(concatCss("styles/styles.min.css"))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(uncss({
            html: ['index.html']
        }))
    .pipe(gulp.dest('out/'));
	});

gulp.task('scripts', function() {
     return gulp.src(['js/*.js'])
    .pipe(concat('all.js'))
    .pipe(uglyfly())
    .pipe(gulp.dest('out/js/'));
	});


gulp.task('watch', function(){
	gulp.watch(['sass/**/*.sass','sass/**/*.scss'],['sass']);
	gulp.watch(['css/**/*.css'],['css']);
	gulp.watch(['js/*.js'],['scripts']);
	});