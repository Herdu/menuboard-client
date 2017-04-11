/**
 * Created by matt on 11.04.17.
 */

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        open: 'external',
        host: 'localhost',
        proxy: 'localhost/menuboard-client'
    });

    gulp.watch("style/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("style/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("style/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
