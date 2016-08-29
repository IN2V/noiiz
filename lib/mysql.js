var mysqldb = require('mysql');

module.exports = mysql;

function mysql(config){
	return function *(next) {
		this.db = mysql.createPool(config);
		yield next;
	}
}

mysql.createConnection = function(opts){
	var connection = mysqldb.createConnection(opts);
	return new PromiseConnection(connection);
}

mysql.createPool = function(opts){
	var pool = mysqldb.createPool(opts);
	return new PromiseConnection(pool);
}

var PromiseConnection = function (connection){
	this.connection = connection;
}

PromiseConnection.prototype.query = function *(sql, values) {
	var connection = this.connection;
	var defer = Promise.defer();
		connection.query(sql, values, function(err, results, fields) {
		if(results){
			defer.resolve(results);
		}else{
			defer.reject(err);
		}
		connection.end();
	});
	return defer.promise;
}