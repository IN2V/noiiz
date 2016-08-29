var view = require('co-views');

module.exports = render;

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