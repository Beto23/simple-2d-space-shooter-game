
const gulp          = require('gulp');
const ts            = require("gulp-typescript");
const pug           = require('gulp-pug');
const sass          = require('gulp-sass');
const browserify    = require('gulp-browserify');
const autoprefixer  = require('gulp-autoprefixer');
const browserSync   = require('browser-sync').create();

// compile typescript
gulp.task('ts', function(){
    return gulp.src('src/app.ts')
        .pipe(ts())
        .pipe(browserify())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

// Compile pug
gulp.task('pug', function(){
    return gulp.src('src/index.pug')
        .pipe(pug())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

// Compile Sass
gulp.task('sass', function(){
    return gulp.src(['src/app.scss'])
        .pipe(sass({
            outputStyle: 'expended',
            sourceComments: true
        }))
        .pipe(autoprefixer({
            versions: ['last 2 browsers']
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());        
});

// Watch & serve
gulp.task('serve', ['pug','ts', 'sass'], function(){
    browserSync.init({
        server: "dist"
    });

    gulp.watch(['src/**/*.scss'], ['sass']);
    gulp.watch(['src/**/*.ts'], ['ts']);
    gulp.watch(['src/**/*.pug'], ['pug']);
    gulp.watch(['src/index.pug']).on('change', browserSync.reload);
});

// Default task
gulp.task('default', ['serve']);
