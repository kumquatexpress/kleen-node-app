'use strict'
const Promise = require('bluebird')
, redis = require('../../utils/redis')
, mysql = require('../../utils/mysql')

class IndexController {
  index({query, body, headers, ip}) {
    return { message: 'Hello API!' }
  }
  async status({query, body, headers, ip}) {
    const info = await Promise.props({
      redis: redis.info(),
      mysql: mysql.query(`SHOW STATUS LIKE 'Table%'`)
    })
    return { ip, info }
  }
}

module.exports = new IndexController()
