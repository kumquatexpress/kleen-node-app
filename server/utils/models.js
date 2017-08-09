'use strict'
const Sequelize = require('sequelize')
, _ = require('lodash')
, config = require(`${__dirname}/../../config`)
, glob = require('glob')
, redis = require('./redis')
, logger = require('./logger')
, sequelize = new Sequelize(
  config.mysql.DATABASE,
  config.mysql.USER,
  config.mysql.PASSWORD,
  {
    host: config.mysql.HOST,
    dialect: 'mysql',
    pool: {
      max: 16,
      min: 0,
      idle: 10000
    }
  })

class RedisSequelizeAdapter {
  constructor({ namespace, ttl=600}){
    this.namespace = namespace
    this.ttl_val = ttl
  }

  getKey(key){
    return this.namespace ? `${this.namespace}:key` : key
  }

  set(key, value){
    return redis.set(this.getKey(key), JSON.stringify(value), 'EX', this.ttl_val)
  }

  get(key){
    return redis.get(this.getKey(key))
      .then(val => {
        if(!val){
          return undefined
        }
        try {
          return JSON.parse(val)
        } catch (err) {
          logger.warn(`Error getting ${key} from cache`, err)
          return undefined
        }
      })
  }

  del(key){
    return redis.del(this.getKey(key))
  }
}

const sequelizeCache = require('sequelize-transparent-cache')
const { withCache } = sequelizeCache(new RedisSequelizeAdapter({
  namespace: 's',
  ttl: 600
}))
const models = {}

glob.sync(`${__dirname}/../types/models/*.js`).forEach(file => {
  const modelName = _.take(_.takeRight(file.split('/'), 1)[0].split('.'), 1)[0]
  models[modelName] = withCache(require(file)(sequelize))
})

module.exports = models
