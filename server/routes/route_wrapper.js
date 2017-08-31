'use strict'
const _ = require('lodash')
, ApiError = require('../types/api_error')
, logger = require('../utils/logger')

const checkAndSetDefaults = (checks, paramsToCheck) => {
  return _.reduce(checks, (acc, check, _arg) => {
    const {type: _type, required: _required, default: _default} = check

    let arg = paramsToCheck[_arg]
    if(!arg){
      if(_required){
        throw new ApiError(`Parameter ${_arg} is required.`)
      }
      acc[_arg] = _default
      return acc
    }

    switch(_type){
      case 'number':
        arg = Number(arg)
        if(isNaN(arg)){
          throw new ApiError(`Parameter ${_arg} must be of type ${_type} is not a number.`)
        }
        break
      case 'boolean':
        if(arg === 'false'){
          arg = false
        }
        arg = Boolean(arg)
        break
    }
    if(typeof(arg) !== _type){
      throw new ApiError(`Parameter ${_arg} must be of type ${_type} but is of type ${typeof(arg)}.`)
    }
    acc[_arg] = arg
    return acc
  }, {})
}

module.exports = (router, {
  path, controller, action, methods,
  args: { query, body, headers, params } = {}
}) => {
  const func = async (ctx, next) => {
    try {
      const args = {
        query: checkAndSetDefaults(query, ctx.request.query),
        body: checkAndSetDefaults(body, ctx.request.body),
        headers: checkAndSetDefaults(headers, ctx.headers),
        params: checkAndSetDefaults(params, ctx.params),
        additional: {
          ip: ctx.request.ip
        }
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
