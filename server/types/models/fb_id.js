const Sequelize = require('sequelize')
, _user = require('./user')

module.exports = seq => {
  const User = _user(seq)
  const FBID = seq.define('fb_ids', {
    fbid: {
      type: Sequelize.STRING(256),
      primaryKey: true,
    }
  }, {
    underscored: true,
    tableName: 'fb_ids'
  })
  FBID.User = FBID.belongsTo(User)
  return FBID
}
