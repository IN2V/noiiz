var route = require('koa-route');

exports.routes =[
	route.get('/vine', vine),
	route.get('/users', users),
];

function *vine() {
	/* all nodes */ 
	var hello = 'Halo, vine';
	var db = this.db;
	var row = yield db.query('SELECT * FROM user');
	this.body = row;
}

function *into() {
	var hello = 'Halo, into';
	this.body = hello;
}

function *users() {
	var users = this.mongo.users;
	var result = yield users.find().toArray();
	this.body = result;
}