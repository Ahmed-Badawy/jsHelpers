


var fileinclude = require('gulp-file-include'),
  gulp = require('gulp');
var rename = require("gulp-rename");

gulp.task('fileinclude', function() {
  gulp.src(['./src/_include.js'])
    .pipe(fileinclude())
    .pipe(rename("jsHelpers.js"))
    .pipe(gulp.dest('./'));
});



gulp.task('default',['fileinclude','watcher'],function(){});

gulp.task('watcher',function(){
	gulp.watch('./src/**/*.js',['fileinclude']);
	return false;			
});