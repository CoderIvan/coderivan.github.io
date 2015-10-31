var git = require('gift')

module.exports = function(repo, dest) {
	return new Promise(function(resolve, reject) {
		git.clone(repo, dest, function(err, Repo) {
			err ? reject(err) : resolve(Repo)
		})
	})
}
