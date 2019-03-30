var fs = require("fs");
var browserify = require("browserify");
browserify(["./src/js/main.js"])
  .transform("babelify", {presets: ["es2015", "react"]})
  .bundle()
  .pipe(fs.createWriteStream("dist/bundle.js"));