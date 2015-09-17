path = require 'path'
gulp = require 'gulp'
$run = require 'run-sequence'
rjs = require 'gulp-requirejs-optimize'
gutil = require 'gulp-util'
concat = require 'gulp-concat'
autoprefixer = require 'gulp-autoprefixer'

$ = require('gulp-load-plugins')({
    lazy: no
})

basePath = (file) ->
    return path.resolve() + '/' + file

publicPath = (file) ->
    return basePath('../public/' + file)

paths =
    scripts: [
        './coffee/**/*.coffee'
    ]
    styles: [
        './sass/**/*.scss'
    ]
    css: [
        './bower_components/semantic/dist/semantic.css'
        './css/style.css'
    ]

gulp.task 'copy-semantic', ->
    gulp.src('./bower_components/semantic/dist/themes/**/*')
        .pipe(gulp.dest(publicPath('css/themes')))

gulp.task 'coffee', ->
    gulp.src(paths.scripts)
    .pipe($.coffee(bare: yes).on('error', gutil.log))
    .pipe(gulp.dest('./'))
    .pipe($.size(showFiles: true))

gulp.task 'sass', ->
    gulp.src(paths.styles)
        .pipe($.sass(errLogToConsole: true))
        .pipe(autoprefixer({browsers: ['last 4 versions']}))
        .pipe($.size(showFiles: true))
        .pipe(gulp.dest('./css'))

gulp.task 'concat-css', ->
    gulp.src(paths.css)
        .pipe(concat({path: 'style.min.css'}))
        .pipe($.minifyCss(keepSpecialComments: 0, processImport: false))
        .pipe($.size(showFiles: true))
        .pipe(gulp.dest(publicPath('css')))

gulp.task 'rjs', ->
    gulp.src(paths.scripts)
        .pipe(rjs(
            baseUrl: './',
            name: 'toro/app',
            out: './app.min.js',
            mainConfigFile: './config.js',
            optimize: 'uglify2'
            #optimize: 'none'
        ))
        .pipe(gulp.dest(publicPath('js'))) # pipe it to the output DIR

gulp.task 'watch', ->
    gulp.watch(paths.scripts, ['coffee'])

gulp.task 'build', (callback) ->
    $run 'coffee', 'sass', 'rjs', 'concat-css', 'copy-semantic', callback
