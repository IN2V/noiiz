var route = require('koa-route');
var crypto = require('crypto');

exports.routes =[
	route.get('/signin', signin),
	route.post('/signin', session),
	route.get('/signup', signup),
	route.post('/signup', session),
	route.get('/signout', signout)
];

function *signin () {
	this.body = yield this.render('signin');
}

function *session () {
	var body = this.request.body;
	var username = body.username;
	var password = crypto.createHash('sha1').update(body.password).digest('hex');
	this.mongo.collection('user').insert({
		username: username,
		password: password,
	});
	this.body = 'signin';
}

function *signup () {
	this.body = yield this.render('signup');
}

function *signout () {
	this.body = 'signout';
}