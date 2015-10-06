path = require 'path'
gulp = require 'gulp'
$run = require 'run-sequence'
rjs = require 'gulp-requirejs-optimize'
gutil = require 'gulp-util'
concat = require 'gulp-concat'
autoprefixer = require 'gulp-autoprefixer'
shell = require 'gulp-shell'

$ = require('gulp-load-plugins')({
    lazy: no
})

basePath = (file) ->
    return path.resolve() + '/' + file

publicPath = (file) ->
    base =  basePath('../../public/')

    if file
        return base + file
    else
        return base

paths =
    scripts: [
        './coffee/**/*.coffee'
    ]

    styles: [
        './sass/**/*.scss'
    ]

    css: [
        './bower_components/font-awesome/css/font-awesome.css'
        './bower_components/bootstrap/dist/css/bootstrap.css'
        './bower_components/lightbox2/dist/css/lightbox.css'
    ]

    copy: [
        ['./bower_components/font-awesome/fonts/*', publicPath('front/fonts')]
        ['./bower_components/lightbox2/dist/images/*', publicPath('front/images')]
    ]

gulp.task 'coffee', ->
    gulp.src(paths.scripts)
    .pipe($.coffee(bare: yes).on('error', gutil.log))
    .pipe(gulp.dest('./js'))
    .pipe($.size(showFiles: true))

gulp.task 'sass', ->
    gulp.src(paths.styles)
        .pipe($.sass(errLogToConsole: true))
        .pipe(autoprefixer({browsers: ['last 4 versions']}))
        .pipe($.rename('main.css'))
        .pipe($.size(showFiles: true))
        .pipe(gulp.dest('./css'))

gulp.task 'concat-css', ->
    gulp.src(paths.css)
        .pipe(concat({path: 'vendor.css'}))
        .pipe($.size(showFiles: true))
        .pipe(gulp.dest('./css'))

gulp.task 'cssmin', ->
    gulp.src(['./css/vendor.css', './css/main.css'])
        .pipe($.minifyCss(keepSpecialComments: 0, processImport: false))
        .pipe(concat({path: 'style.min.css'}))
        .pipe($.size(showFiles: true))
        .pipe(gulp.dest('./css'))

gulp.task 'rjs', ->
    gulp.src(paths.scripts)
        .pipe(rjs(
            baseUrl: './js',
            name: 'toro/app',
            out: 'app.min.js',
            mainConfigFile: './js/config.js',
            optimize: 'uglify2'
        ))
        .pipe(gulp.dest('./js'))

gulp.task 'copy', ->
    for file in paths.copy
        gulp.src(file[0])
            .pipe(gulp.dest(file[1]))

gulp.task 'clean', shell.task [
    'rm -rf ' + publicPath('front')
    'rm -rf ' + basePath('../front/images')
    'rm -rf ' + basePath('../front/fonts')
    'rm -rf ' + basePath('../front/css')
    'rm -rf ' + basePath('../front/js')
]

gulp.task 'public', shell.task [
    'mkdir -p ' + publicPath()
    'ln -sf ' + basePath('../front') + ' ' + publicPath('front')
]

gulp.task 'watch', ->
    gulp.watch(paths.styles, ['sass'])
    gulp.watch(paths.scripts, ['coffee'])

gulp.task 'dev', (callback) ->
    $run 'clean', 'coffee', 'sass', 'concat-css', 'public', 'copy', callback

gulp.task 'build', (callback) ->
    $run 'clean', 'coffee', 'sass', 'concat-css', 'rjs', 'cssmin', 'public', 'copy', callback
