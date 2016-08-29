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

	return function *(next) {
		var mongo = yield mongodb.connect(mongoUrl);
		mongo.users = mongo.collection('user');
		this.mongo = mongo;
		yield next;
	}
}

