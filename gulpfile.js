var path = require('path');
var gutil = require('gulp-util');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('gulp-buffer');
var uglify = require('gulp-uglify');
var babelify = require('babelify');
var browserify = require('browserify');

var BUILD_PATH = './build';
var SCRIPTS_PATH = BUILD_PATH + '/scripts';
var SOURCE_PATH = './src';
var ENTRY_FILE = SOURCE_PATH + '/list_view.js';
var OUTPUT_FILE = 'listview.js';

/**
 * Transforms ES2015 code into ES5 code.
 * Optionally: Creates a sourcemap file 'game.js.map' for debugging.
 *
 * In order to avoid copying Phaser and Static files on each build,
 * I've abstracted the build logic into a separate function. This way
 * two different tasks (build and fastBuild) can use the same logic
 * but have different task dependencies.
 */
function build() {

    return browserify({
        paths: [ path.join(__dirname, 'src') ],
        entries: ENTRY_FILE,
        debug: true
    })
    .transform(babelify)
    .bundle().on('error', function(error){
          gutil.log(gutil.colors.red('[Build Error]', error.message));
          this.emit('end');
    })
    .pipe(source(OUTPUT_FILE))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(SCRIPTS_PATH));
}

gulp.task('build', build);
gulp.task('default', ['build']);