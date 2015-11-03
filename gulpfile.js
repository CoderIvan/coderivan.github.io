var gulp = require('gulp')
var markdown = require('gulp-markdown')
var del = require('del')
var ghPages = require('gulp-gh-pages')
var glob = require('glob')
var path = require('path')
var fs = require('fs')
var mergeStream = require('merge-stream')

gulp.task('default', ['clean', 'generate_public', 'generate_archives_json'], function() {})

gulp.task('deploy', ['default'], function() {
	return gulp.src('./public/**').pipe(ghPages({
		branch: 'master'
	}))
})

gulp.task('generate_public', function() {
	return mergeStream([
		gulp.src(['app/**', '!app/views/archives/**']).pipe(gulp.dest('public/')),
		gulp.src('app/views/archives/**').pipe(markdown()).pipe(gulp.dest('public/views/archives/')),
		gulp.src('bower_components/**').pipe(gulp.dest('public/vender'))
	])
})

gulp.task('generate_archives_json', ['generate_public'], function() {
	var files = glob.sync('public/views/archives/*.html')
	var json = files.map(function(file) {
		return {
			title: path.basename(file, '.html')
		}
	})
	fs.writeFileSync('public/scripts/archives.json', JSON.stringify(json))
})

gulp.task('clean', function() {
	del.sync(['public'])
})
