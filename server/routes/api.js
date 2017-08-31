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

const _authFunc = function(strat){
  return async (ctx, next) => {
    return passport.authenticate(strat, async (err, user) => {
      if(!user){
        ctx.status = 401
      } else {
        ctx.status = 200
        ctx.body = user
        return ctx.login(user)
      }
    })(ctx, next)
  }
}

apiRouter.all('/graphql', graphqlHTTP({
  schema: graphqlValue.spot,
  graphiql: true
}))

apiRouter.post('/login', _authFunc('local'))
apiRouter.post('/auth/facebook', _authFunc('facebook-token'))
apiRouter.get('/auth/facebook',
  passport.authenticate('facebook', {
    scope: [ 'email' ]
  })
)
apiRouter.get('/auth/facebook/callback', _authFunc('facebook'))

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
