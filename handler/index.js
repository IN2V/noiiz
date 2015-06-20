var route = require('koa-route');
var db = require('../lib/db');

exports.routes =[
	route.get('/', index),
];

function *index() {
	var hello = 'Halo, ';
	var row = yield db('SELECT "IN2V!" AS app');
	this.body = hello + row.app;
}