'use strict'

const Router = require('koa-router')
, apiRouter = new Router({
	prefix: '/api',
})
, passport = require('../utils/passport')
, routeWrapper = require('./route_wrapper')
, spotsRoutes = require('./spots')
, graphqlValue = require('../utils/graphql')
, graphqlHTTP = require('koa-graphql')

apiRouter.all('/graphql', graphqlHTTP({
  schema: graphqlValue.spot,
  graphiql: true
}))
apiRouter.post('/login', async (ctx, next) => {
  return passport.authenticate('local', async (err, user) => {
    if(!user){
      ctx.status = 401
    } else {
      ctx.status = 200
      ctx.body = { user }
    }
  })(ctx, next)
})
apiRouter.get('/auth/facebook',
  passport.authenticate('facebook', {
    scope: [ 'email' ]
  })
)
apiRouter.get('/auth/facebook/callback', async (ctx, next) => {
  return passport.authenticate('facebook', {
    failureRedirect: '/login?failed_login=1',
    successRedirect: ctx.request.query.success || '/'
  })(ctx, next)
})

const routes = [
  {
    name: 'index',
    path: '/',
    controller: 'api/index',
    methods: ['get'],
    action: 'index'
  },
  {
    name: 'status',
    path: '/status',
    controller: 'api/index',
    methods: ['get'],
    action: 'status'
  }
]
.concat(spotsRoutes)

module.exports = (() => {
  routes.forEach(route => {
    return routeWrapper(apiRouter, route)
  })
  return apiRouter
})()
