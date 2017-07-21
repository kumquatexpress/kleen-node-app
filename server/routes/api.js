'use strict'

const Router = require('koa-router')
, apiRouter = new Router({
	prefix: '/api',
})
, routeWrapper = require('./route_wrapper')

const routes = {
  index: {
    path: '/',
    controller: 'index',
    methods: ['get'],
    action: 'index'
  },
  example: {
    path: '/example',
    controller: 'index',
    methods: ['get', 'post'],
    action: 'example_args',
    args: {
      query: { a: 1, b: 2 },
      headers: {
        h1: 1, asdf: 'a'
      },
      body: { b1: 1 },
    },
  },
  error: {
    path: '/error',
    controller: 'index',
    methods: ['get', 'post'],
    action: 'example_error',
  },
}

module.exports = (() => {
  Object.values(routes).forEach(route => {
    return routeWrapper(apiRouter, route)
  })
  return apiRouter
})()
