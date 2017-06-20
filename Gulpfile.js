'use strict'

var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var watch = require('gulp-watch')
var nodemon = require('gulp-nodemon')

gulp.task('build-scripts', () => {
  return gulp.src(['./public/client/**/*.js'])
          .pipe(concat('scripts.js'))
          .pipe(rename('scripts.min.js'))
          .pipe(uglify())
          .pipe(gulp.dest('./public/dist/'))
})

gulp.task('watch-public', () => {
  gulp.watch(['public/client/'], ['build-scripts'])
})

gulp.task('develop', ['watch-public'], () => {
  gulp.start('build-scripts')
  nodemon({ 
    script: 'app.js',
    ext: 'js',
    env: { 'NODE_ENV': 'development' },
    ignore: [ 'public/dist/']
  })
  .on('restart', () => {
  	console.log('Gulp restarting server')
  })
})
