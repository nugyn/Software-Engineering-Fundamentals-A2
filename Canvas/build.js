var fs = require("fs");
var browserify = require("browserify");
browserify(["./src/js/main.js"])
  .transform("babelify", {presets: ["es2015", "react"]})
  .bundle()
  .pipe(fs.createWriteStream("public/dist/bundle.js"));


browserify(["./src/js/Controller.js"])
  .transform("babelify", {presets: ["es2015", "react"]})
  .bundle()
  .pipe(fs.createWriteStream("public/dist/controller.js"));