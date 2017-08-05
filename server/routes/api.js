'use strict'

const Router = require('koa-router')
, apiRouter = new Router({
	prefix: '/api',
})
, routeWrapper = require('./route_wrapper')
, spotsRoutes = require('./spots')
, graphqlHTTP = require('koa-graphql')
, { buildSchema } = require('graphql')

const schema = buildSchema(`
  type Query {
    hello: String
  }
`)
const rootValue = {
  hello: () => `hey`
}

apiRouter.all('/graphql', graphqlHTTP({
  schema,
  rootValue,
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
