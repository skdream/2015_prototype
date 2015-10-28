var gulp = require('gulp'),
  uglify = require('gulp-uglify');

gulp.task('default', function(){
  gulp.src('./js/test.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/h.js'));
});