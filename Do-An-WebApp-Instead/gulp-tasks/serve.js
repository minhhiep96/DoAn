'use strict'
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
// const del = require('del');


gulp.task('sass', function () {
    return gulp.src('src/assets/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: "Gulp error in " + err.plugin,
                    message: err.toString()
                })(err);
                gutil.beep();
            }
        }))
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('src/assets/css'))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function () {

    browserSync.init({
        port: 3000,
        server: "src",
        ghostMode: false,
        notify: false
    });

    // gulp.watch('./src/assets/scss/**/*.scss', gulp.series('sass'));
    // gulp.watch(['./src/assets/js/**/*.js', './**/*.html', './src/assets/css/**/*.css']).on('change', browserSync.reload);

    gulp.watch('src/assets/scss/**/*.scss', gulp.series['sass']);
    gulp.watch('src/assets/**/*.scss').on('change', browserSync.reload);
    gulp.watch('src/assets/**/*.html').on('change', browserSync.reload);
    gulp.watch('src/assets/**/*.css').on('change', browserSync.reload);

}));



gulp.task('sass:watch', function () {
    gulp.watch('src/assets/scss/**/*.scss');
});



// Static Server without watching scss files
gulp.task('serve:lite', function () {

    browserSync.init({
        server: "./",
        ghostMode: false,
        notify: false
    });

    gulp.watch('**/*.css').on('change', browserSync.reload);
    gulp.watch('**/*.html').on('change', browserSync.reload);
    gulp.watch('**/*.js').on('change', browserSync.reload);

});
