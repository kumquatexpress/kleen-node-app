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
apiRouter.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/login?failed_login=1',
    successRedirect: '/'
  })
)
apiRouter.get('/auth/facebook',
  passport.authenticate('facebook', {
    scope: [ 'email' ]
  })
)
apiRouter.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login?failed_login=1',
    successRedirect: '/'
  })
)

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
