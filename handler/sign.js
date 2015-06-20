var route = require('koa-route');

exports.routes =[
	route.get('/signin', signin),
	route.post('/signin', session),
	route.get('/signup', signup),
	route.get('/signout', signout)
];

function *signin () {
	this.body = yield this.render('signin');
}

function *session () {
	this.body = 'signin';
}

function *signup () {
	this.body = yield this.render('signup');
}

function *signout () {
	this.body = 'signout';
}