var gulp = require('gulp'),
  less = require('gulp-less'),
  browserSync = require('browser-sync'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglifyjs'),
  csso = require('gulp-csso'),
  rename = require('gulp-rename'),
  del = require('del'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  cache = require('gulp-cache'),
  autoprefixer = require('gulp-autoprefixer'),
  notify = require('gulp-notify'),
  plumber = require('gulp-plumber');
  // run 		 = require('run-sequence'),
  // changed = require('gulp-changed'),

gulp.task('css', function () {
  return gulp.src('app/less/style.less')
  // .pipe(changed('app/css'))
    .pipe(plumber({
      errorHandler: notify.onError(function (error) {
        return {
          title: 'css',
          message: error.message
        }
      })
    }))
    .pipe(less())
    .pipe(autoprefixer(['last 10 versions', '> 1%'], {cascade: true}))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('app/css'))
    .pipe(csso())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('css-libs', function () {
  return gulp.src([
    'app/libs/normalize.min.css',
    'app/libs/bxslider-4/dist/jquery.bxslider.min.css'
  ])
    .pipe(concat('libs.min.css'))
    .pipe(csso())
    .pipe(gulp.dest('app/css'));
});

gulp.task('js', function () {
  return gulp.src([
    'app/js/*.js',
    '!app/js/main.min.js',
    '!app/js/libs.min.js'
  ])
    .pipe(plumber({
      errorHandler: notify.onError(function (error) {
        return {
          title: 'js',
          message: error.message
        }
      })
    }))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('js-libs', function () {
  return gulp.src([
    'app/libs/jquery/dist/jquery.min.js',
    'app/libs/bxslider-4/dist/jquery.bxslider.min.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

gulp.task('img', function () {
  return gulp.src('app/img/**/*')
    .pipe(cache(imagemin({ // with cache
      // .pipe(imagemin({ // uglify without cache
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))/**/)
    .pipe(gulp.dest('dist/img'));
});

gulp.task('browser-sync', function () { // create task browser-sync
  browserSync.init({ // use browserSync
    server: { // server parameters
      baseDir: 'app' // dir for server
    },
    notify: false // disabled notify
  });
});

gulp.task('watch', ['browser-sync', 'css-libs', 'css', 'js-libs', 'js'], function () {
  gulp.watch('app/less/**/*.less', ['css']); // looking for less files in less-dir
  gulp.watch('app/*.html', browserSync.reload); // looking for html files in base-dir
  gulp.watch('app/js/*.js', ['js']); // looking for js files in js-dir
  gulp.watch('app/**/*.php', browserSync.reload); // looking for php files
  // gulp.watch('app/php/*.php', browserSync.reload);
});

gulp.task('build', ['clean', 'clear', 'css-libs', 'css', 'js-libs', 'js'], function () {

// gulp.task('build', function(fn) {
  // run('clean', 'clear', 'img', 'less', 'js', fn);

  var buildCss = gulp.src([ // move CSS to production
    'app/css/*.css',
    '!app/css/libs.css'
  ])
    .pipe(gulp.dest('dist/css'))

  var buildHtml = gulp.src('app/*.html') // move html to production
    .pipe(gulp.dest('dist'))

  var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))

  var buildImg = gulp.src('app/img/**/*')
    .pipe(gulp.dest('dist/img'))

  var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'))

  var buildPhp = gulp.src('app/php/**/*') // move php scripts to production
    .pipe(gulp.dest('dist/php'))

  var buildPhtml = gulp.src('app/*.php') // move php pages to production
    .pipe(gulp.dest('dist'))

});

gulp.task('clean', function () {
  return del.sync('dist'); // del 'dist' dir before build project
});

gulp.task('clear', function (callback) {
  return cache.clearAll();
});

gulp.task('default', ['watch']);
