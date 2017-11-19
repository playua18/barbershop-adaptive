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
  run = require('run-sequence'),
  svgstore = require('gulp-svgstore'),
  svgmin = require('gulp-svgmin'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglifyjs'),
  changed = require('gulp-changed'),
  realFavicon = require('gulp-real-favicon'),
  fs = require('fs');

gulp.task('less', function() {
  return gulp.src('app/less/style.less')
    .pipe(changed('app/css'))
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
      cascade: true
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('css-style', ['less'], function() {
  return gulp.src(['!app/css/*.min.css', 'app/css/*.css'])
    .pipe(cssnano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('app/css'));
});

gulp.task('img', function() {
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

gulp.task('symbols', function() {
  return gulp.src(['app/img/icons/*.svg'])
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('symbols.svg'))
    .pipe(gulp.dest('app/img'));
});

gulp.task('scripts', function() {
  return gulp.src([
      'app/js/*.js', '!app/js/*.min.js', '!app/js/portfolio.js', '!app/js/news.js'
    ])
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    // .pipe(concat('main.js'))
    // .pipe(concat('news.min.js'))
    // .pipe(concat('portfolio.min.js'))
    .pipe(gulp.dest('app/js'));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });
});

gulp.task('clean', function() {
  return del.sync('dist');
});

gulp.task('clear', function() {
  return cache.clearAll();
});

gulp.task('watch', ['browser-sync', 'css-style'], function() {
  gulp.watch('app/less/**/*.less', ['less']);
  gulp.watch('app/*html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', function(fn) {

  run('clean', 'img', 'less', fn);

  var buildCss = gulp.src('app/css/**/*')
    .pipe(gulp.dest('dist/css'));

  var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

  var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'));

  var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));

});



var FAVICON_DATA_FILE = 'faviconData.json';
gulp.task('generate-favicon', function(done) {
  realFavicon.generateFavicon({
    masterPicture: 'app/img/origin-favicon.svg',
    dest: 'app/img/favicons',
    iconsPath: '/',
    design: {
      ios: {
        pictureAspect: 'noChange',
        assets: {
          ios6AndPriorIcons: false,
          ios7AndLaterIcons: false,
          precomposedIcons: false,
          declareOnlyDefaultIcon: true
        }
      },
      desktopBrowser: {},
      windows: {
        pictureAspect: 'noChange',
        backgroundColor: '#603cba',
        onConflict: 'override',
        assets: {
          windows80Ie10Tile: false,
          windows10Ie11EdgeTiles: {
            small: false,
            medium: true,
            big: false,
            rectangle: false
          }
        }
      },
      androidChrome: {
        pictureAspect: 'noChange',
        themeColor: '#ffffff',
        manifest: {
          display: 'standalone',
          orientation: 'notSet',
          onConflict: 'override',
          declared: true
        },
        assets: {
          legacyIcon: false,
          lowResolutionIcons: false
        }
      },
      safariPinnedTab: {
        pictureAspect: 'silhouette',
        themeColor: '#5bbad5'
      }
    },
    settings: {
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false
    },
    markupFile: FAVICON_DATA_FILE
  }, function() {
    done();
  });
});
gulp.task('inject-favicon-markups', function() {
  return gulp.src(['app/*.html'])
    .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
    .pipe(gulp.dest('app'));
});
gulp.task('check-for-favicon-update', function(done) {
  var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
  realFavicon.checkForUpdates(currentVersion, function(err) {
    if (err) {
      throw err;
    }
  });
});
