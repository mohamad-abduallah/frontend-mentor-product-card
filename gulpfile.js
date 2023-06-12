const  gulp = require('gulp'),
       concat = require('gulp-concat'),
       prefix = require('gulp-autoprefixer'),
       sass = require('gulp-sass')(require('sass')),
       sourcemaps = require('gulp-sourcemaps'),
       uglify = require('gulp-uglify'),
       notify = require("gulp-notify");

// CSS task
// {outputStyle: 'compressed'} add inside the sass() to pressure the code css
gulp.task('QR-code-css', function () {
    return gulp.src('project/sass/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefix({cascade: false}))
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/assets/style'))
        .pipe(notify('QR-code-css tag is done'))
});

// JS task
gulp.task('QR-code-js', function () {
    return gulp.src(['project/js/*.js', '!project/js/two.js']) // the tow.js file i don't want to add
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(notify('QR-code-js tag is done'))
});

//watch task
gulp.task('watch', function () {
    gulp.watch('project/sass/**/*.scss', gulp.series('QR-code-css'));
    gulp.watch('project/js/*.js', gulp.series('QR-code-js'));
})

gulp.task('default', gulp.parallel('watch'));
