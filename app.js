var fs = require('fs');
var logger = require('koa-logger');
var koa = require('koa');
var app = koa();

//extend middleware

var bodyParser = require('koa-bodyparser');
var mongo = require('./lib/mongo');
var mysql = require('./lib/mysql');
var render = require('./lib/render');

// config

var config = require('./config/config');

// middleware

app.use(logger());
app.use(bodyParser());
app.use(render);
app.use(mongo(config.database.mongo));
app.use(mysql(config.database.mysql));

// handlers

var handlers = ['index', 'sign', 'vine'];

for (var h of handlers) {
	var routes = require('./handler/' + h).routes;
	for(var r of routes){
		app.use(r);
	}
};

// listen
/* 
	todo: use unix socket to nginx proxy_pass
	1. When the server process have been exit and then delete the .sock file √
	2. Use same nginx premission user start server process √
	3. Use cli extend argument transfer .sock file path to app.js

 */
var socket = config.socket

var exist = true;
try{
	fs.accessSync(socket);
}catch(err){
	if(err.code == 'ENOENT')
		exist = false;
}
if(exist)
	fs.unlink(socket);

app.listen(socket);
fs.chown(socket, 33, 33);
console.log('listening on socket: ' + socket);