const Sequelize = require('sequelize')
, Promise = require('bluebird')
, config = require(`${__dirname}/../config`)
, glob = require('glob')
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

glob.sync(`${__dirname}/../server/types/models/*.js`).forEach(file => {
  console.log("syncing model", file)
  require(file)(sequelize)
})

sequelize.sync().then(() => {
  process.exit(0)
}).catch(err => {
  console.log("err", err)
  process.exit(1)
})
