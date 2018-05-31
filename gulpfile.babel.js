import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import browser from 'browser-sync';
import rimraf from 'rimraf';

const $ = plugins();

// Run the server and watch for file changes
gulp.task('build',
  gulp.series(clean, html, js, img, sass));

gulp.task('default',
  gulp.series('build', html, js, img, sass, serve, watch));


function clean(done) {
  rimraf('dist/*', done);
}

function sass() {
  return gulp.src('src/sass/*.scss')
    .pipe($.sass().on('error', $.sass.logError))
    .pipe(gulp.dest('./dist/css'));
}


function html() {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('./dist'));
}

function js() {
  return gulp.src('src/js/*.js')
    .pipe(gulp.dest('./dist/js'));
}

function img() {
  return gulp.src('src/img/*')
    .pipe(gulp.dest('./dist/img'));
}

function serve(done) {
  browser.init({
    server: {
      baseDir: './dist'
    }
  });
  done();
}

function watch() {
  gulp.watch('./src/sass/*.scss').on('all', gulp.series(sass, browser.reload));
  gulp.watch('./src/img/*').on('all', gulp.series(img, browser.reload));
  gulp.watch('./src/*.html').on('all', gulp.series(html, browser.reload));
  gulp.watch('./src/js/*.js').on('all', gulp.series(js, browser.reload));
}
