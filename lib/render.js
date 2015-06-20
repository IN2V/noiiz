
/**
 * Module dependencies.
 */

var view = require('co-views');

// setup views mapping .html
// to the swig template engine

function *render(next) {
	var option = {
		map: { 
			html : 'swig',
			htm : 'swig'
		}
	}
	this.render = view('view', option);
	yield next;
}

module.exports = render;