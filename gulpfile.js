var gulp = require('gulp')
var markdown = require('gulp-markdown')
var del = require('del')
var ghPages = require('gulp-gh-pages')
var glob = require('glob')
var path = require('path')
var fs = require('fs')
var mergeStream = require('merge-stream')
var connect = require('gulp-connect')

gulp.task('default', ['generate', 'watch'], function() {})

gulp.task('deploy', ['generate'], function() {
	return gulp.src('./public/**').pipe(ghPages({
		branch: 'master'
	}))
})

gulp.task('watch', ['generate'], function() {
	connect.server({
		port: 8080,
		root: 'public',
		livereload: true
	})
	return gulp.watch(['./app/**'], ['generate', 'reload'])
})

gulp.task('reload', ['generate'], function() {
	gulp.src('./public/**').pipe(connect.reload())
})

gulp.task('generate', ['clean', 'generate_public', 'generate_archives_json'])

gulp.task('clean', function(cb) {
	return del(['public/**'], {
		force: true
	})
})

gulp.task('generate_public', ['clean'], function() {
	return mergeStream([
		gulp.src(['app/**', '!app/views/archives/**']).pipe(gulp.dest('public/')),
		gulp.src('app/views/archives/**').pipe(markdown()).pipe(gulp.dest('public/views/archives/')),
		gulp.src('bower_components/**').pipe(gulp.dest('public/vender'))
	])
})

gulp.task('generate_archives_json', ['clean', 'generate_public'], function(cb) {
	glob('public/views/archives/*.html', function(err, files) {
		if (err) {
			return cb(err)
		}
		var json = files.map(function(file) {
			return {
				title: path.basename(file, '.html')
			}
		})
		fs.writeFile('public/scripts/archives.json', JSON.stringify(json), cb)
	})
})
