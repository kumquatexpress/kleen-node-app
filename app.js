'use strict'

import Koa from 'koa'
import morgan from 'koa-morgan'
import bodyParser from 'koa-bodyparser'
import apiRouter from './server/routes/api'
import webRouter from './server/routes/web'
import session from 'koa-session'
import passport from './server/utils/passport'
import logger from './server/utils/logger'
import serve from 'koa-static'

const app = new Koa()

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

app.use(serve(__dirname + '/public'))
app.use(apiRouter.routes())
app.use(apiRouter.allowedMethods())

app.use(webRouter.routes())
app.use(webRouter.allowedMethods())

app.on('api_error', (err, ctx) =>
  logger.warn('api error', err)
)
app.listen(3000)