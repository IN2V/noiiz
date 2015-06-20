var logger = require('koa-logger');
var koa = require('koa');
var app = koa();

//extend middleware

var render = require('./lib/render');


// middleware

app.use(logger());
app.use(render);

// route middleware

var handlers = ['index', 'sign'];
for (var h of handlers) {
	var routes = require('./handler/' + h).routes;
	for(var r of routes){
		app.use(r);
	}
};

// listen
var port = 8080;
app.listen(port);
console.log('listening on port ' + port);