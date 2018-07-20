const config          = require("../gulpConfig");
const gulp            = require("gulp");
const sass            = require("gulp-sass");
const sassLint        = require("gulp-sass-lint");
const sourcemaps      = require("gulp-sourcemaps");
const postcss         = require("gulp-postcss");
const autoprefixer    = require("autoprefixer");
const mqpacker        = require("css-mqpacker");
const gulpif          = require("gulp-if");
const plumber         = require("gulp-plumber");

let processors = [
  autoprefixer({
    cascade: false,
    browsers: ["last 4 versions"]
  }),
  mqpacker({
    sort: true
  })
];

gulp.task("sass", () => {
  return gulp
    .src([config.src.sass + "/*.{scss,sass}"])
    .pipe(
      plumber({
        handleError: (err) => {
          console.log(err);
          this.emit("end");
        }
      })
    )
    .pipe(
      sass({
        outputStyle: config.production() ? "compressed" : "expanded"
      })
    )
    .pipe(sassLint({
      options: {
        cacheConfig: true,
        configFile:  config.production() ? undefined : ".sass-lint.yml"
      }
    }))
    .pipe(gulpif(config.development(), sassLint.format()))
    .pipe(gulpif(config.development(), sassLint.failOnError()))
    .pipe(gulpif(config.development(), sourcemaps.init()))
    .pipe(postcss(processors))
    .pipe(gulpif(config.development(), sourcemaps.write()))
    .pipe(gulp.dest(config.dest.css));
});

gulp.task("sass:watch", () => {
  gulp.watch(config.src.sass + "/**/*.{sass,scss}", ["sass"]);
});
