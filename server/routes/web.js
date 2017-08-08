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
  login: {
    path: '/login',
    controller: 'index',
    methods: ['get'],
    action: 'login',
    args: {
      query: {
        failed_login: {
          type: 'boolean'
        }
      }
    }
  }
}

module.exports = (() => {
  Object.values(routes).forEach(route => {
    return routeWrapper(webRouter, route)
  })
  return webRouter
})()