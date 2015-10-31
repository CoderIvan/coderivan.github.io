var fs = require('fs')

var md = require('markdown-it')({
	html: true,
	linkify: true,
	typographer: true,
})

module.exports = function(dest_source) {
	return utils.readdir(dest_source).then(function(files) {
		return Promise.all(files.filter(function(file_name) {
			return !(file_name === '.git')
		}).map(function(file_name) {
			return utils.readFile(dest_source + '/' + file_name).then(function(buf) {
				return md.render(buf.toString())
			}).then(function(html) {
				var buf = new Buffer(html)
				var fd = dest_source + '_html' + '/' + file_name + '.html'
				return utils.appendFile(fd, buf, 0, buf.length)
			}))
		}))
	})
}

var utils = {}

;['readdir', 'readFile', 'appendFile'].forEach(function(func) {
	utils[func] = function() {
		var args = Array.prototype.slice.apply(arguments)
		return new Promise(function(resolve, reject) {
			args.push(function(err, files) {
				err ? reject(err) : resolve(files)
			})
			fs[func].apply(fs, args)
		})
	}
})


module.exports('../.source').then(function(datas) {
	console.log(datas)
}).catch(function(err) {
	console.error(err.stack || err)
})
