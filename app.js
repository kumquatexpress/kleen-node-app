const Koa = require('koa')
, app = new Koa()
, apiRouter = require('./server/routes/api')
, webRouter = require('./server/routes/web')

app.use(apiRouter.routes())
app.use(apiRouter.allowedMethods())

app.use(webRouter.routes())
app.use(webRouter.allowedMethods())

app.listen(3000)