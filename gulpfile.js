// 引入 gulp 
var gulp = require('gulp');
var del = require('del');

// 引入组件
var jshint = require('gulp-jshint'),
    os = require('os'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    changed = require('gulp-changed'),
    plumber = require('gulp-plumber'),
    gulpOpen = require('gulp-open'),
    connect = require('gulp-connect'),
    minifyCSS =require('gulp-minify-css');

var browserSync = require('browser-sync').create();
var host = {
    path: 'app',
    port: 3000,
    html: ''
};
var browser = os.platform() === 'linux' ? 'Google chrome' : (
    os.platform() === 'darwin' ? 'Google chrome' : (
        os.platform() === 'win32' ? 'chrome' : 'firefox'));
var pkg = require('./package.json');

// 组件构建bundle
gulp.task('copy-bundle', function() {
    gulp.src([
            './src/static/lib/sm.min.css',
        ])
        .pipe(plumber())
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('./app/static/css'));

    gulp.src([
      './bower_components/zepto/zepto.min.js',
      './src/static/lib/sm.min.js',
        ])
        .pipe(plumber())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./app/static/js'));
});

// 启动服务
gulp.task('connect', function() {
    console.log('connect------------');
    connect.server({
        root: host.path,
        port: host.port,
        livereload: true
    });
});

gulp.task('copy-image', function() {
  gulp.src('./src/img/*')
    .pipe(plumber())
    .pipe(gulp.dest('./app/static/img'));
});

gulp.task('open', function(done) {
    gulp.src('')
        .pipe(gulpOpen({
            app: browser,
            uri: 'http://localhost:3000'
        }))
        .on('end', done);
});


// gulp.task('browser-sync', function() {
//     browserSync.init({
//         proxy: "http://localhost:3000"
//     });
// });

// gulp.task('serve', function () {
//     browserSync.init({
//         proxy: "http://localhost:3000/"
//     });

//     gulp.watch('./src/**/*.html').on('change', browserSync.reload);
// });


// 合并，压缩文件
gulp.task('script', function() {
    gulp.src('./src/static/js/*')
        .pipe(plumber())
        // .pipe(concat('all.js'))
        .pipe(gulp.dest('./app/static/js/'));
        // .pipe(rename('all.min.js'))
        // .pipe(uglify())
        // .pipe(gulp.dest('./app/static/js'))
        // .pipe(connect.reload());
});

gulp.task('template', function() {
    gulp.src('./src/*.html')
        .pipe(plumber())
        .pipe(gulp.dest('./app'))
        .pipe(connect.reload());
});

gulp.task('css',function(){
	gulp.src('./src/static/css/*.css')
		.pipe(plumber())
		.pipe(concat('all.css'))
		.pipe(gulp.dest('./app/static/css'))
		.pipe(rename('all.min.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('./app/static/css'))
		.pipe(connect.reload());
})

gulp.task('copy-data', function() {
  gulp.src('./src/static/data/*.json')
    .pipe(plumber())
    .pipe(gulp.dest('./app/static/data'));
});

// 默认任务
gulp.task('default', function() {
    gulp.run('dist', 'watch');
});

gulp.task('watch', function() {
    gulp.watch('./src/static/js/*', ['script']);
    gulp.watch('./src/static/css/*.css', ['css']);
    gulp.watch('./src/*.html', ['template']);
});

gulp.task('dist', [
    'script',
    'copy-bundle',
    'template',
    'copy-image',
    'css',
    'copy-data'
]);


gulp.task('dev', [
    'connect',
    'dist',
    'watch'
    // 'open'
]);
