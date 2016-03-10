var gulp = require('gulp');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var mincss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');

var onError = function(err) {
    notify.onError({
                title: "Gulp",
                subtitle: "Failure!",
                message: "Error: <%= error.message %>",
                sound: "Beep"
            })(err);

    this.emit('end');
};

var srcFiles = {
    sass: ['./assets/sass/style.scss'],
    sassAll: ['./assets/sass/**/*.scss']
};

var targetPaths = {
    css: './assets/css'
};

gulp.task('css', function() {
    return gulp.src(srcFiles.sass)
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(mincss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(targetPaths.css))
        .pipe(notify({
            title: 'Gulp',
            subtitle: 'Success',
            message: 'CSS files created',
            sound: "Pop"
        }));
});

gulp.task('watch-sass', function() {
    gulp.watch(srcFiles.sassAll, ['css']);
});

gulp.task('default', ['css']);