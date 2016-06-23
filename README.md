# Gulp By Path

Transform file grouped in streams by path. 

## Installation

```
npm i gulp-by-path --save
```

## Usage

```js

var gulp = require('gulp');
var gulpByPath = require('gulp-by-path');
var gulpExtend = require('gulp-extend');

gulp.task('build', function () {
  return gulp.src(['./src/folder1/*.json', './src/folder2/*.json'])
  .pipe(gulpByPath(function (filename) {
    return gulpExtend(filename); // return simple transform stream.
  }))
  .pipe(gulp.dest('./dist');
});

```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

23.06.2016 Init

## Credits

Alexey Bondarenko (alexeybondarenko@me.com)

## License

MIT
