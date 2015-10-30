var md = require('markdown-it')({
	html: true,
	linkify: true,
	typographer: true,
});
var result = md.render('# markdown-it rulezz!');
console.log(result)