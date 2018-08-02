const webpackConfig = require("../../webpack.config");
const browserSync   = require('./browserSync');
const config        = require("../gulpConfig");
const gulp          = require("gulp");
const webpack       = require("webpack");

gulp.task("webpack", () => {
  webpackConfig.mode = process.env.NODE_ENV;
  browserSync.reload();
  webpack(webpackConfig, (err, stats) => {
    // if error do something here such as gutil error
  });
});