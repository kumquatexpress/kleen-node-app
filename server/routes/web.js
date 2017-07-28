'use strict'

const Router = require('koa-router')
, webRouter = new Router()
, routeWrapper = require('./route_wrapper')

const routes = {
  index: {
    path: '/',
    controller: 'index',
    methods: ['get'],
    action: 'index'
  },
}

module.exports = (() => {
  Object.values(routes).forEach(route => {
    return routeWrapper(webRouter, route)
  })
  return webRouter
})()