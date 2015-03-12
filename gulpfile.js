var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var karma = require('gulp-karma');
var notify = require('gulp-notify');

var output = 'jquery.phone-highlight.js';
var outputMin = 'jquery.phone-highlight.min.js';
var src = [
	'./src/intro.js',
	'./src/phone-highlight/defaults.js',
	'./src/phone-highlight/phone-highlight.js',
	'./src/phone-highlight/jquery-wrapper.js',
	'./src/outro.js'
];
var test = [
  './bower_components/jquery/dist/jquery.js',
  './src/phone-highlight/*.js', 
  './test/*_spec.js'
];

gulp.task('concat', function () {
	return gulp.src(src)
		.pipe(concat(output))
		.pipe(gulp.dest('./'));
});

gulp.task('uglify', function () {
	return gulp.src('./' + output)
		.pipe(uglify())
		.pipe(rename(outputMin))
		.pipe(gulp.dest('./'));
});

gulp.task('test', function () {
	return gulp.src(test)
	    .pipe(karma({
	    	configFile: 'karma.js',
	    	action: 'run'
	    }))
	    .on('error', notify.onError(function (error) {
	    	return "Tests faild: " + error.message;
      	}));
});

gulp.task('watch', function () {
	return gulp.src(test)
	    .pipe(karma({
	    	configFile: 'karma.js',
	    	action: 'watch'
	    }))
	    .on('error', notify.onError(function (error) {
	    	return "Tests faild: " + error.message;
      	}));
});

gulp.task('build', function () {
	runSequence('concat', 'test', 'uglify');
});

gulp.task('default', ['watch']);