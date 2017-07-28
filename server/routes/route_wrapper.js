'use strict'
const _ = require('lodash')
, ApiError = require('../types/api_error')

module.exports = (router, {
  path, controller, action, methods,
  args: { query, body, headers } = {}
}) => {
  const func = async (ctx, next) => {
    try {
      const args = {
        query: _.merge({}, query, _.pick(ctx.request.query, _.keys(query))),
        body: _.merge({}, body, _.pick(ctx.request.body, _.keys(body))),
        headers: _.merge({}, headers, _.pick(ctx.headers, _.keys(headers))),
        ip: ctx.request.ip,
      }
      ctx.body = await require(`../controllers/${controller}`)[action](args)
      next()
    } catch (e) {
      if (e instanceof ApiError) {
        ctx.status = e.code
        ctx.body = { message: e.message }
        ctx.app.emit('api_error', e, ctx)
      } else {
        throw e
      }
    }
  }
  return _.each(methods, m => {
    router[m](path, func)
  })
}
