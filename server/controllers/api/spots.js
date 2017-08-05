'use strict'
const Promise = require('bluebird')
, models = require('../../utils/models')
, Sequelize = require('sequelize')

class SpotsController {
  async index({
    query: {
      latitude, longitude, radius, address, limit = 10
    }
  }) {
    let where
    if(latitude && longitude && radius){
      where = Sequelize.where(
        Sequelize.fn(
          'Distance',
          Sequelize.literal(
            `Point(${latitude}, ${longitude})`
          ),
          Sequelize.col('location')
        ),
        '<',
        radius
      )
    }
    const spots = await models.spot.findAll({
      where,
      limit
    })
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
