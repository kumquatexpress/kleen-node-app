'use strict'
const passport = require('koa-passport')
, passport_facebook = require('passport-facebook').Strategy
, passport_local = require('passport-local').Strategy
, passport_facebook_token = require('passport-facebook-token')
, config = require('../../config')
, {
  user: User, fb_id: FBID, email_id: EmailID
} = require('./models')

const deserializeUser = async function(id, done){
  try {
    const user = await User.cache().findById(id)
    done(null, user)
  } catch(err) {
    done(err)
  }
}

const _facebookAuthFunc = function(access, refresh, profile, cb){
  FBID.find({
    where: { fbid: profile.id }
  }, {
    include: [ FBID.User ]
  }).then(fbUser => {
    if(!fbUser){
      const [first_name, last_name] = profile.displayName.split(" ")
      FBID.cache().create({
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
      deserializeUser(fbUser.user_id, cb)
    }
  })
}

const FacebookTokenStrategy = new passport_facebook_token(
  {
    clientID: config.auth.FB.APP_ID,
    clientSecret: config.auth.FB.APP_SECRET,
  },
  _facebookAuthFunc
)

const FacebookStrategy = new passport_facebook(
  {
    clientID: config.auth.FB.APP_ID,
    clientSecret: config.auth.FB.APP_SECRET,
    callbackURL: `${config.app.protocol}${config.app.hostname}${config.auth.FB.CALLBACK_URL}`
  },
  _facebookAuthFunc
)

const LocalStrategy = new passport_local({
    usernameField: 'email'
  },
  (email, password, cb) => {
    EmailID.findById(email)
      .then(emailUser => {
        if(emailUser && emailUser.validPassword(password)){
          deserializeUser(emailUser.user_id, cb)
        } else {
          cb(null)
        }
      })
  }
)

passport.use(FacebookStrategy)
passport.use(LocalStrategy)
passport.use(FacebookTokenStrategy)
passport.serializeUser(function(user, done) {
  done(null, user.id)
})
passport.deserializeUser(deserializeUser)

module.exports = passport
