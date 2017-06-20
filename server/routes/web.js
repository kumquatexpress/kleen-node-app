'use strict'

const Router = require('koa-router')
, webRouter = new Router()

webRouter.get('/', function(ctx, next){
	ctx.body = 'Hello world!'
	next()
})

module.exports = webRouter
