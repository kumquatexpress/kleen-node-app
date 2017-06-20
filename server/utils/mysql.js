const Promise = require('bluebird')
, mysql = require('mysql')
, config = require('../../config')

Promise.promisifyAll(require("mysql/lib/Connection").prototype)
Promise.promisifyAll(require("mysql/lib/Pool").prototype)

var pool  = mysql.createPool({
  host     : config.mysql.HOST,
  user     : config.mysql.USER,
  password : config.mysql.PASSWORD,
  database : config.mysql.DATABASE,
  connectionLimit: 16,
})

const _getConn = function() {
	return pool.getConnectionAsync().disposer(connection => {
  	connection.release()
	})
}

const query = function(_query, binds={}) {
	console.log('MYSQL:', _query, binds)
	return Promise.using(_getConn(), conn => {
		return conn.queryAsync(_query, binds)
	})
}

const startTransaction = function(fn){
	return Promise.using(_getConn(), conn => {
		return conn.query('START TRANSACTION')
			.then(() => {
				return fn(conn)
			})
			.then(() => {
				return conn.queryAsync('COMMIT')
			})
			.catch(err => {
				console.log("ERROR_TRANSACTION_MYSQL", err)
				conn.queryAsync('ROLLBACK')
			})
	})
}
 
module.exports = { query, startTransaction }
