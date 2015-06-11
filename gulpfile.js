'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');

var paths = {
    backend: './server.js',
    build: {
        html: './static/',
        js: './static/js/',
        css: './static/css/',
        images: './static/css/images/'
    },
    src: {
        html: './src/index.html',
        js: './src/js/main.js',
        style: './src/style/style.less',
        images: './src/style/images/*.*'
    },
    watch: {
        html: './src/index.html',
        js: './src/js/**/*.js',
        style: './src/style/style.less'
    }
};

var browserSyncConfig = {
    proxy: 'localhost:9000',
};

gulp.task('default', ['frontend', 'serve', 'watch']);

gulp.task('frontend', ['less', 'images', 'js'], function () {
    var resources = gulp.src([paths.build.css + '*.css', paths.build.js + '*.js'], {read: false});

    gulp.src(paths.src.html)
        .pipe(
            plugins.inject(resources, {
                addRootSlash: false,
                ignorePath: '/static/'
            })
        )
        .pipe(gulp.dest(paths.build.html));
});

gulp.task('less', function () {
    return gulp.src(paths.src.style)
        .pipe(plugins.less())
        .pipe(gulp.dest(paths.build.css))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function () {
    return browserify(paths.src.js, {debug: true})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(paths.build.js))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('images', function () {
    gulp.src(paths.src.images)
        .pipe(gulp.dest(paths.build.images))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function(){
    plugins.watch([paths.watch.js], function() {
        gulp.start('js');
    });
    plugins.watch([paths.watch.style], function() {
        gulp.start('less');
    });
    plugins.watch([paths.watch.html], function() {
        gulp.start('frontend');
    });
});

gulp.task('serve', ['backend'], function () {
    browserSync.init(browserSyncConfig);
});

gulp.task('backend', function () {
    plugins.nodemon({
        script: paths.backend
    });
});
