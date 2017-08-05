'use strict'
const Promise = require('bluebird')
, models = require('../../utils/models')

class SpotsController {
  async index({
    query
  }) {
    const spots = await models.spot.findAll({ limit: 10 })
    return { spots }
  }

  async create({
    body: {
      description, latitude, longitude
    }
  }) {
    const spot = await models.spot.create({
      description,
      location: {
        type: 'Point',
        coordinates: [latitude, longitude]
      }
    })
    return { spot }
  }

  async delete({
    params: { spot_name }
  }) {
    const spot = await models.spot.destroy({
      where: {
        name: spot_name
      }
    })
    return { spot }
  }

  async update({
    body: {
      description, latitude, longitude, upsert
    },
    params: { spot_name }
  }) {
    const args = {
      description,
      location: {
        type: 'Point',
        coordinates: [latitude, longitude]
      }
    }
    let spot
    if(upsert){
      spot = await models.spot.upsert(args)
    } else {
      spot = await models.spot.update(args, {
        where: {
          name: spot_name
        }
      })
    }
    return { spot }
  }
}

module.exports = new SpotsController()
