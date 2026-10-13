/*
!   Gulp installation in Global
    ? node --version
    ? npx --version
    ? npm install --global gulp-cli

!   in the project terminal
    ? npm init -y
    ? npm install --save-dev gulp
        * --save-dev -> Installs a package as a development dependency.
        * --save -> Installs a package as a regular production dependency (need it in deployment).
    ? gulp --version


?   npm install --save-dev gulp-htmlmin
?   npm i gulp-css
?   npm install --save-dev gulp-concat
    * to Concatenates files into only one file
?   npm i gulp-clean-css
?   npm i gulp-sourcemaps
?   npm install --save-dev gulp-autoprefixer
?   npm install sass gulp-sass --save-dev

?-> Typescript
    ? npm install --global gulp-cli
    ? npm install gulp@4
    ? npm install gulp-typescript typescript@6
        * bec v7 of typescript doesn't supported
    ? npm install --save-dev gulp-uglify
        * minify js file

 */

const gulp = require("gulp"),
    htmlMin = require("gulp-htmlmin"),
    cssMin = require("gulp-css"),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass')(require('sass')),
    ts = require('gulp-typescript'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect');

gulp.task("hello", function (done) {
    console.log("Hello Gulp!");
    done();
});

// * HTML
gulp.task("html", function () {
    return gulp.src("./project/index.html")
        .pipe(htmlMin({ collapseWhitespace: true }))  //* { collapseWhitespace: true } -> this property minify html to a one line
        .pipe(gulp.dest("dist/"));
});

// * CSS
gulp.task("css", async function () {

    let autoprefixer = (await import("gulp-autoprefixer")).default;

    return gulp.src("./project/**/*.css")  //* ./project/css/style.css  -  /*.css -> any file - /**/*.css -> any file in any folder 
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(cssMin())
        .pipe(concat("styles.css"))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(sourcemaps.write("../maps"))
        .pipe(gulp.dest('dist/css'))
});

// * SASS
gulp.task("scss", async function () {
    return gulp.src("./project/**/*.scss")  //* ./project/css/style.css  -  /*.css -> any file - /**/*.css -> any file in any folder 
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat("sassStyles.css"))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(sourcemaps.write("../maps"))
        .pipe(gulp.dest('dist/css'))
});

// * Typescript
gulp.task("ts", async function () {
    return gulp.src("./project/**/*.ts")  //* ./project/css/style.css  -  /*.css -> any file - /**/*.css -> any file in any folder 
        .pipe(ts())
        .pipe(uglify())
        .pipe(concat("index.js"))
        .pipe(gulp.dest('dist/js'))
});

// * Liveserver

gulp.task('watch', function () {
    connect.server({
        root : "/dist",
        livereload : true
    });

    gulp.watch("./project/**/*.html" , gulp.series("html"));
    gulp.watch("./project/**/*.scss" , gulp.series("scss"));
    gulp.watch("./project/**/*.ts" , gulp.series("ts"));
});


gulp.task('default', gulp.series('watch'));