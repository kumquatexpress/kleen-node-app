'use strict'

const Router = require('koa-router')
, apiRouter = new Router({
	prefix: '/api',
})
, routeWrapper = require('./route_wrapper')
, spotsRoutes = require('./spots')
, graphqlValue = require('../utils/graphql')
, graphqlHTTP = require('koa-graphql')

apiRouter.all('/graphql', graphqlHTTP({
  schema: graphqlValue.spot,
  graphiql: true
}))

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
].concat(spotsRoutes)

module.exports = (() => {
  routes.forEach(route => {
    return routeWrapper(apiRouter, route)
  })
  return apiRouter
})()
