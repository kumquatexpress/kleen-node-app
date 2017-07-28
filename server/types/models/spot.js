const Sequelize = require('sequelize')

module.exports = seq => {
  return seq.define('spots', {
    name: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: Sequelize.TEXT,
    },
    location: {
      type: Sequelize.GEOMETRY('POINT', 4326),
    }
  }, {
    underscored: true,
    tableName: 'spots',
    indexes: [
      {
        fields: ['location']
      }
    ]
  })
}