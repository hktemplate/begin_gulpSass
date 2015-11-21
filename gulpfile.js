/* File: gulpfile.js */

// grab our packages
var gulp   = require('gulp'),
    jshint = require('gulp-jshint');
    sass   = require('gulp-ruby-sass');
    concat = require('gulp-concat');
    gutil  = require('gulp-util');
    uglify = require('gulp-uglify');

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('source/script/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-css', function() {
  return sass('source/scss/**/*.scss')
    .pipe(gulp.dest('public/assets/css'));
});

gulp.task('build-js', function() {
  return gulp.src('source/script/**/*.js')
      .pipe(concat('bundle.js'))
      //only uglify if gulp is ran with '--type production'
      .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
    .pipe(gulp.dest('public/assets/script'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('source/script/**/*.js', ['jshint']);
  gulp.watch('source/scss/**/*.scss', ['build-css']);
});