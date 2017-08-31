'use strict'

const Koa = require('koa')
, morgan = require('koa-morgan')
, cors = require('koa-cors')
, bodyParser = require('koa-bodyparser')
, apiRouter = require('./server/routes/api')
, webRouter = require('./server/routes/web')
, session = require('koa-session')
, passport = require('./server/utils/passport')
, logger = require('./server/utils/logger')
, serve = require('koa-static')
, config = require('./config')

const app = new Koa()

logger.stream = {
  write: function(message, encoding){
    logger.info(message)
  }
}
app.keys = ['12ABSf3845ajdsljl9aZ']
app.use(session(app))
app.use(
  cors({
    origin: 'http://192.168.99.100',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true,
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser())
app.use(
  morgan(`:url :status :response-time ms - :res[content-length]`,
    { "stream": logger.stream })
)
app.use(serve(__dirname + '/public'))
app.use(apiRouter.routes())
app.use(apiRouter.allowedMethods())

app.use(webRouter.routes())
app.use(webRouter.allowedMethods())

app.on('api_error', (err, ctx) =>
  logger.warn('api error', err)
)
app.listen(3000)