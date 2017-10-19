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
, http = require('http')
, wsRouter = require('./server/routes/websocket')

const app = new Koa()
logger.stream = {
  write: function(message, encoding){
    logger.info(message)
  }
}
app.keys = ['12ABSf3845ajdsljl9aZ']
// encode and decode session functions
const decode = (sess) => {
  return JSON.parse(new Buffer(sess, 'base64').toString('utf-8'))
}
// middleware layers
app.use(session(app, {
  signed: true,
  decode,
}))
app.use(
  cors({
    origin: 'http://192.168.99.100',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true,
  })
)
// our auth flows live here
app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser())
app.use(
  morgan(`:url :status :response-time ms - :res[content-length]`,
    { "stream": logger.stream })
)
app.use(serve(__dirname + '/public'))

// initialize the api
app.use(apiRouter.routes())
app.use(apiRouter.allowedMethods())
app.on('api_error', (err, ctx) =>
  logger.warn('api error', err)
)
// initialize the client
app.use(webRouter.routes())
app.use(webRouter.allowedMethods())
// initalize the websocket
const server = http.createServer(app.callback());
wsRouter(server, decode)
// start it up
app.listen(3000)