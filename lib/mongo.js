var mongodb = require('mongodb').MongoClient;

module.exports = mongo;

function mongo(config) {
	var config = config || {};
	var host = config.host || 'localhost';
	var port = config.port || 27017;
	var db = config.db;
	if (config.user && config.passwd) {
	  mongoUrl = 'mongodb://' + config.user + ':' + config.passwd + '@' + host + ':' + port;
	} else {
	  mongoUrl = 'mongodb://' + host + ':' + port;
	}
	if (db) {
	  mongoUrl += '/' + db;
	}
	var mongo;
	mongodb.connect(mongoUrl, function(err, database){
		if(err) throw err;
		mongo = database;
	});
	return function *(next) {
		mongo.users = mongo.collection('user');
		this.mongo = mongo;
		yield next;
	}
}

