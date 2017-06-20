'use strict'

const Promise = require('bluebird')
, config = require('../../config.js')
, redis = require('thunk-redis')
, redisClient = redis.createClient(
	`${config.redis.HOST}:${config.redis.PORT}`,
	{
		usePromise: true,
		database: 1
	},
)

module.exports = redisClient
