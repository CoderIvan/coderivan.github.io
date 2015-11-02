var gulp = require('gulp')
var child_process = require('child_process')
var markdown = require('gulp-markdown')
var del = require('del')
var ghPages = require('gulp-gh-pages');

gulp.task('default', ['clean', 'checkout_markdown', 'markdown_to_html'], function() {
	gulp.src('app/**').pipe(gulp.dest('_public/'))
	gulp.src('bower_components/**/*').pipe(gulp.dest('_public/vender'))
})

gulp.task('deploy', ['default'], function() {
	return gulp.src('_public/**/*').pipe(ghPages())
})

gulp.task('clean', function() {
	del.sync(['_archives', '_public'])
})

gulp.task('checkout_markdown', function() {
	child_process.execSync('git clone -b source -l -s . _archives')
})

gulp.task('markdown_to_html', function() {
	return gulp.src('_archives/**')
		.pipe(markdown())
		.pipe(gulp.dest('_public/views/archives'))
})

gulp.start()
