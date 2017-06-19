const Router = require('koa-router')
, apiRouter = new Router({
	prefix: '/api'
})

apiRouter.get('/', function(ctx, next){
	ctx.saying = "Hello API!"
	ctx.body = ctx.saying
	next()
})

module.exports = apiRouter
