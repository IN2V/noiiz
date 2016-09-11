var mysqldb = require('mysql');

module.exports = mysql;

function mysql(config){
	var db = mysql.createPool(config);
	
	return function *(next) {
		this.db = db;
		yield next;
	}
}

var PromiseConnection = function (connection){
	this.connection = connection;
}

mysql.createConnection = function(opts){
	var connection = mysqldb.createConnection(opts);
	return new PromiseConnection(connection);
}

mysql.createPool = function(opts){
	var pool = mysqldb.createPool(opts);
	var promisePool = {
		query: function (sql, values) {
			var defer = Promise.defer();
			pool.query(sql, values, function(err, results, fields) {
				if(results)
					defer.resolve(results);
				else
					defer.reject(err);
			});
			return defer.promise;
		},

		end: function() {
			var defer = Promise.defer();
			pool.end(function(err) {
			  if(err)
			    reject(err);
			  else
			    resolve();
			});
			return defer.promise;
		}
	}
	return promisePool;
}