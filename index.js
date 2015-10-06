var fs = require('fs')
var postcss = require('postcss');

var data = {color: {white: "#ffffff"}}

var css = "body{ display: flex; color: $color.white; }"


var postcssJsonVars = postcss.plugin('jsonify', function (data) {
	var dataName = "data"
	return function (css) {
		css.walkDecls(function transformDecl(decl) {
			if( decl.value[0] == "$"){
				decl.value = eval("data."+decl.value.substr(1));
			}
		});
	};
});

var processor = postcss();

processor
	.use(postcssJsonVars(data))
	.process(css)
	.then(function(result) {
		console.log(result.css);
	});

module.exports = process;