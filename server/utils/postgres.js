'use strict'

const Promise = require('bluebird')
, pg = require('pg')
, config = require('../../config')

const pool = new pg.Pool({
  database: config.postgres.DATABASE,
  host: config.postgres.HOST,
  port: config.postgres.PORT,
  password: config.postgres.PASSWORD,
  max: 32,
  idleTimeoutMillis: 10000,
})
pool.on('error', function (err, client) {
  console.error('ERROR_IDLE_CLIENT', err.message, err.stack)
})

module.exports = {
  query: (_query, binds=[]) => {
    console.log('QUERY:', _query, binds)
    return pool.query(_query, binds)
  },
  connect: pool.connect
}
