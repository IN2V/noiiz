var route = require('koa-route');

exports.routes =[
	route.get('/', index),
];

function *index() {
	var hello = 'Halo, index';
	this.body = hello;
}