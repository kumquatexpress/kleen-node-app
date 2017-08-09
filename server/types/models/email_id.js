const Sequelize = require('sequelize')
, bcrypt = require('bcrypt-nodejs')
, _user = require('./user')

module.exports = seq => {
  const User = _user(seq)
  const emailID = seq.define('email_ids', {
    email: {
      type: Sequelize.STRING(256),
      primaryKey: true,
    },
    password: {
      type: Sequelize.STRING(256),
      allowNull: false,
    }
  }, {
    underscored: true,
    tableName: 'email_ids'
  })
  emailID.prototype.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
  }
  emailID.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
  }
  emailID.beforeCreate((emailUser, options) => {
    emailUser.password = emailUser.generateHash(emailUser.password)
  })
  emailID.User = emailID.belongsTo(User)
  return emailID
}
