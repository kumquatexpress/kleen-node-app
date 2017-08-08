'use strict'

const Koa = require('koa')
, morgan = require('koa-morgan')
, winston = require('winston')
, app = new Koa()
, bodyParser = require('koa-bodyparser')
, apiRouter = require('./server/routes/api')
, webRouter = require('./server/routes/web')
, session = require('koa-session')
, config = require('./config')
, passport = require('./server/utils/passport')
, logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: config.log.FILE,
      handleExceptions: true,
      json: true,
      maxsize: config.log.SIZE,
      maxFiles: config.log.NUM_FILES,
      colorize: false,
      timestamp: true,
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
      timestamp: true,
    })
  ],
  exitOnError: false,
})

logger.stream = {
  write: function(message, encoding){
    logger.info(message)
  }
}
app.keys = ['12ABSf3845ajdsljl9aZ']
app.use(session({}, app))

app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser())
app.use(morgan('combined', { "stream": logger.stream }))

app.use(apiRouter.routes())
app.use(apiRouter.allowedMethods())

app.use(webRouter.routes())
app.use(webRouter.allowedMethods())

app.on('api_error', (err, ctx) =>
  logger.warn('api error', err)
)
app.listen(3000)