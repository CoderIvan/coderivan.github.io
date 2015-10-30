var git = require('gift')

module.exports = function(repo, dest) {
	return new Promise(function(resolve, reject) {
		git.clone(repo, dest, function(err, Repo) {
			err ? reject(err) : resolve(Repo)
		})
	})
}

// module.exports('-b source -l -s .', './copy_source').then(function(Repo) {
// 	console.log('Test')
// })