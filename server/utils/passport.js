'use strict'
const passport = require('koa-passport')
, passport_facebook = require('passport-facebook').Strategy
, config = require('../../config')
, User = require('./models').user
, FBID = require('./models').fb_id

const FacebookStrategy = new passport_facebook({
  clientID: '653525334855870',
  clientSecret: 'a142dbaf60301e77a1e045a87632719f',
  callbackURL: 'http://192.168.99.100/api/auth/facebook/callback'
}, (access, refresh, profile, cb) => {
  FBID.find({
    where: { fbid: profile.id }
  }, {
    include: [ FBID.User ]
  }).then(fbUser => {
    if(!fbUser){
      const [first_name, last_name] = profile.displayName.split(" ")
      FBID.create({
        fbid: profile.id,
        user: {
          first_name,
          last_name
        }
      }, {
        include: [ FBID.User ]
      }).then(_fbUser => {
        cb(null, _fbUser.user)
      })
    } else {
      User.findById(fbUser.user_id).then(user => {
        cb(null, user)
      })
    }
  })
})

passport.use(FacebookStrategy)
passport.serializeUser(function(user, done) {
  done(null, user.id)
})
passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch(err) {
    done(err)
  }
})

module.exports = passport
