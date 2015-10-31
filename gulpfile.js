var gulp = require('gulp')
var markdown = require('gulp-markdown')

gulp.task('default', ['markdown_to_html'], function() {
	gulp.src('public/**')
		.pipe(gulp.dest('_dist'))
});

gulp.task('markdown_to_html', function() {
	return gulp.src('./_archives/**')
		.pipe(markdown())
		.pipe(gulp.dest('_dist/html/archives'))
})

gulp.start()
