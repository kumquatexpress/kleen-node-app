'use strict'

const Router = require('koa-router')
, apiRouter = new Router({
	prefix: '/api',
})
, pg = require('../utils/postgres')
, mysql = require('../utils/mysql')
	
apiRouter.get('/', async (ctx, next) => {
	ctx.body = "Hello API!"
	next()
})

module.exports = apiRouter
