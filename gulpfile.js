
const {
  src,
  dest,
  watch
} = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Static server
function bs() {
  serveSass();
  browserSync.init({
    server: {
      baseDir: "src"
    }
  });
  watch("src/*.html").on('change', browserSync.reload);
  watch("src/sass/**/*.sass", serveSass);
  watch("src/sass/**/*.scss", serveSass);
  watch("src/js/*.js").on('change', browserSync.reload);
}

function serveSass() {
  return src('src/sass/**/*.sass', 'src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('src/css'))
    .pipe(browserSync.stream());
}

exports.serve = bs;