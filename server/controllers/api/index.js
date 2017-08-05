'use strict'
const Promise = require('bluebird')
, redis = require('../../utils/redis')
, mysql = require('../../utils/mysql')

class IndexController {
  index(args) {
    return { args }
  }
  async status() {
    const info = await Promise.props({
      redis: redis.info(),
      mysql: mysql.query(`SHOW STATUS LIKE 'Table%'`)
    })
    return { ip, info }
  }
}

module.exports = new IndexController()
