const Sequelize = require('sequelize')

module.exports = seq => {
  return seq.define('users', {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: Sequelize.CHAR(80),
    },
    last_name: {
      type: Sequelize.CHAR(80),
    },
    lang: {
      type: Sequelize.CHAR(5),
    },
    country: {
      type: Sequelize.CHAR(2),
    }
  }, {
    underscored: true,
    tableName: 'users'
  })
}