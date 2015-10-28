var gulp = require('gulp');

//压缩js代码
var uglify = require('gulp-uglify');


gulp.task('default', function() {
    gulp.src('./js/test.js')
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});