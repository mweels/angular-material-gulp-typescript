var gulp = require('gulp');
var ts = require('gulp-typescript');
var clean = require('gulp-clean');
var server = require('gulp-develop-server');
var mocha = require('gulp-mocha');
var typescript = require("gulp-typescript");
var mainBowerFiles = require('main-bower-files');
var concat = require("gulp-concat");
var minify = require("gulp-minify");
var filter = require("gulp-filter");
var order = require("gulp-order");
var debug = require("gulp-debug");
var browserSync = require('browser-sync').create();

var serverTS = ["**/*.ts", "!node_modules/**", '!bin/**'];

gulp.task('ts', ['server_ts', 'client_ts']);

gulp.task('server_ts', ['clean'], function () {
    return gulp
        .src(serverTS, { base: './' })
        .pipe(ts({ module: 'commonjs', noImplicitAny: true }))
        .pipe(gulp.dest('./'));
});

gulp.task('client_ts', function () {
    return gulp
        .src(["./client/src/**/*.ts", "!node_modules/**", '!bin/**'], { base: './client/src' })
        .pipe(order([
            "client/src/app.ts",
            "**/*.ts"
        ]))
        .pipe(debug("s1"))
        .pipe(typescript({
            module: 'commonjs',
        })).js
        .pipe(debug("s2"))
        .pipe(order([
            "client/src/app.js",
            "**/*.js"
        ]))
        .pipe(debug("s3"))
        .pipe(concat('app.js'))
        .pipe(gulp.dest(__dirname + "/client/bin/"))

});


gulp.task('client_html', function (callback) {
     gulp
        .src(["**/*.html", "!node_modules/**", '!bin/**'], { base: './client/src' })
        .pipe(gulp.dest(__dirname + "/client/bin/"))
        callback();
});


gulp.task('clean', function () {
    return gulp
        .src([
            'app.js',
            '**/*.js',
            '**/*.js.map',
            '!client/bin/**',
            '!bower_components/**',
            '!node_modules/**',
            '!gulpfile.js',
            '!bin/**'
        ], { read: false })
        .pipe(clean())
});

gulp.task('load:fixtures', function (cb) {
    var load = require('./fixtures/load');
    return load.loadData(cb);
});

gulp.task('server:start', ['ts'], function () {

    browserSync.init(null, {
        server: {
            baseDir: __dirname + "/client/bin/"
        },
        port: 9000
    });
    
    gulp.watch(["./client/bin/**/*.html","./client/bin/**/*.js","./client/bin/*.css"]).on("change", browserSync.reload);

});

gulp.task('server:restart', ['ts'], function () {
    
});


gulp.task('default', ['server:start'], function () {
    gulp.watch(serverTS, ['server:restart'])
    gulp.watch(["./client/src/**/*.html"], ['client_html']);
    gulp.watch(["./client/src/css/*.css"], ['copycss']);
});


gulp.task('jscss', ['bower_js', 'bower_css']);

gulp.task('bower_js', function () {

    return gulp.src(mainBowerFiles())
        .pipe(filter('**/*.js'))
        .pipe(concat('lib.js'))
        .pipe(minify())
        .pipe(gulp.dest("client/bin"))

});


gulp.task('bower_css', ['copycss'], function () {

    return gulp.src(mainBowerFiles())
        .pipe(filter('**/*.css'))
        .pipe(concat('lib.css'))
        .pipe(gulp.dest("client/bin/"))

});

gulp.task('copycss', function () {

    console.log("copy css running..");


    return gulp.src(__dirname + "/client/src/css/*.css")
        .pipe(concat('app.css'))
        .pipe(gulp.dest(__dirname + '/client/bin/'))
});

gulp.task('test', ['ts', 'load:fixtures'], function () {
    return gulp
        .src('test/*.js', { read: false })
        // wait for dev server to start properly :(
        //.pipe(wait(600))
        .pipe(mocha())
        .once('error', function () {
            process.exit(1);
        })
        .once('end', function () {
            process.exit();
        });
});
