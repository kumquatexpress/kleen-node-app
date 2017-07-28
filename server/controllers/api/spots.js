'use strict'
const Promise = require('bluebird')
, models = require('../../utils/models')

class SpotsController {
  async index({query, body, headers, ip}) {
    const spots = await models.spot.findAll({ limit: 10 })
    return { spots }
  }
  async create({query, body, headers, ip}) {
    const spot = models.spot.create({
      description: 'hello'
    })
    return { spot }
  }
}

module.exports = new SpotsController()
