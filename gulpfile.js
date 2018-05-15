var gulp = require('gulp'),
  less = require('gulp-less'),
  browserSync = require('browser-sync'),
  plumber = require('gulp-plumber'),
  cssnano = require('gulp-cssnano'),
  rename = require('gulp-rename'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  del = require('del'),
  cache = require('gulp-cache'),
  autoprefixer = require('gulp-autoprefixer'),
  // run = require('run-sequence'),
  svgstore = require('gulp-svgstore'),
  svgmin = require('gulp-svgmin'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglifyjs'),
  changed = require('gulp-changed'),
  notify = require('gulp-notify');
// realFavicon = require('gulp-real-favicon'),
// fs = require('fs');

gulp.task('less', function () {
  return gulp.src('app/less/style.less')
    .pipe(changed('app/css'))
    .pipe(plumber({
      errorHandler: notify.onError(function (error) {
        return {
          title: 'Styles',
          message: error.message
        }
      })
    }))
    .pipe(less())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
      cascade: true
    }))
    .pipe(gulp.dest('app/css'))
});

gulp.task('css', ['less'], function () {
  return gulp.src(['!app/css/*.min.css', 'app/css/*.css'])
    .pipe(cssnano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('css-libs', function () {
  return gulp.src('app/less/libs.less') // Выбираем файл
    .pipe(less())
    .pipe(cssnano()) // Сжимаем
    .pipe(rename('libs.min.css')) // Добавляем суффикс .min
    .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

gulp.task('img', function () {
  return gulp.src('app/img/**/*')
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    })))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('symbols', function () {
  return gulp.src(['app/img/icons/*.svg'])
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('symbols.svg'))
    .pipe(gulp.dest('app/img'));
});

gulp.task('js', function () {
  return gulp.src([
    'app/js/*.js',
    '!app/js/*.min.js'
    // 'app/js/*.js', '!app/js/*.min.js', '!app/js/portfolio.js', '!app/js/news.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    // .pipe(concat('main.js'))
    // .pipe(concat('news.min.js'))
    // .pipe(concat('portfolio.min.js'))
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream: true})); // Обновляем JS на странице при изменении
});

gulp.task('js-libs', function () {
  return gulp.src([ // Берем все необходимые библиотеки
    'app/libs/jquery/dist/jquery.min.js', // Берем jQuery
    'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
    'app/libs/bxslider-4/dist/jquery.bxslider.min.js',
    // 'app/js/main.js' // Всегда в конце
  ])
    .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
    .pipe(uglify()) // Сжимаем JS файл
    .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

gulp.task('clean', function () {
  return del.sync('dist');
});

gulp.task('clear', function () {
  return cache.clearAll();
});

gulp.task('watch', ['browser-sync', 'css', 'css-libs', 'js', 'js-libs'], function () {
  gulp.watch('app/less/**/*.less', ['css']);
  gulp.watch('app/js/**/*.js', ['js']);
  gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('build', ['clean', 'clear', 'css',  'css-libs', 'js', 'js-libs', 'img'], function () {

  // run('clean', 'img', 'less', 'js' fn);

  var buildCss = gulp.src('app/css/**/*')
    .pipe(gulp.dest('dist/css'));

  var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

  // var buildFonts = gulp.app('app/img/**/*')
  //   .pipe(gulp.dest('dist/img'));

  var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'));

  var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));

});


// var FAVICON_DATA_FILE = 'faviconData.json';
// gulp.task('generate-favicon', function(done) {
//   realFavicon.generateFavicon({
//     masterPicture: 'app/img/origin-favicon.svg',
//     dest: 'app/img/favicons',
//     iconsPath: '/',
//     design: {
//       ios: {
//         pictureAspect: 'noChange',
//         assets: {
//           ios6AndPriorIcons: false,
//           ios7AndLaterIcons: false,
//           precomposedIcons: false,
//           declareOnlyDefaultIcon: true
//         }
//       },
//       desktopBrowser: {},
//       windows: {
//         pictureAspect: 'noChange',
//         backgroundColor: '#603cba',
//         onConflict: 'override',
//         assets: {
//           windows80Ie10Tile: false,
//           windows10Ie11EdgeTiles: {
//             small: false,
//             medium: true,
//             big: false,
//             rectangle: false
//           }
//         }
//       },
//       androidChrome: {
//         pictureAspect: 'noChange',
//         themeColor: '#ffffff',
//         manifest: {
//           display: 'standalone',
//           orientation: 'notSet',
//           onConflict: 'override',
//           declared: true
//         },
//         assets: {
//           legacyIcon: false,
//           lowResolutionIcons: false
//         }
//       },
//       safariPinnedTab: {
//         pictureAspect: 'silhouette',
//         themeColor: '#5bbad5'
//       }
//     },
//     settings: {
//       scalingAlgorithm: 'Mitchell',
//       errorOnImageTooSmall: false
//     },
//     markupFile: FAVICON_DATA_FILE
//   }, function() {
//     done();
//   });
// });
// gulp.task('inject-favicon-markups', function() {
//   return gulp.src(['app/*.html'])
//     .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
//     .pipe(gulp.dest('app'));
// });
// gulp.task('check-for-favicon-update', function(done) {
//   var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
//   realFavicon.checkForUpdates(currentVersion, function(err) {
//     if (err) {
//       throw err;
//     }
//   });
// });
