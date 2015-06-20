var mysql = require('mysql');
var config = require('../config/config');

function db(sql) {
	var start = new Date;
	var connection = mysql.createPool(config.database);
	var defer = Promise.defer();
		connection.query(sql, function(err, rows) {
		if(rows){
			defer.resolve(rows[0]);
		}else{
			defer.reject(err);
		}
		this.end();
	});
	return defer.promise;
}

module.exports = db;