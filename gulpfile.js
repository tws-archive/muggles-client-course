'use strict';

var gulp = require('gulp');
var refresh = require('gulp-livereload');
var livereload = require('tiny-lr');
var server = livereload();
var compiler = require('gulp-hogan-compile');

gulp.task('livereload-server', function () {
  server.listen(35729, function (err) {
    if (err) { return console.log(err); }
  });
});

gulp.task('templates', function() {
    gulp.src('app/views/**/*.html')
        .pipe(compiler('templates.js'))
        .pipe(gulp.dest('app/js/'));
});

gulp.task('css', function () {
  gulp.src('app/**/*.css').pipe(refresh(server));
});

gulp.task('js', function () {
  gulp.src('app/**/*.js').pipe(refresh(server));
});

gulp.task('default', function () {
  gulp.run('livereload-server');

  gulp.watch('app/**/*.css', function (event) {
    gulp.run('css');
  });

  gulp.watch('app/**/*.js', function (event) {
    gulp.run('js');
  });
});
