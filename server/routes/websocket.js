'use strict'

const WebSocket = require('ws')
, cookie = require('cookie')
, util = require('../utils/helpers')

module.exports = (server, decode) => {
  const wss = new WebSocket.Server({
    server
  })

  wss.on('connection', (ws, req) => {
    ws.send(`see connection from ${ws}`)
    // try to find the logged in user from cookie
    const userId = util.tryCatch(() => {
      const cookies = cookie.parse(req.headers.cookie)
      , sess = decode(cookies['koa:sess'])

      return sess.passport.user
    }, () => {
      return null
    })
    // end here and disconnect if no user found
    if (!userId) {
      ws.send('You are not logged in.')
      ws.terminate()
      return
    }
    ws.send(`Welcome, user ${userId}!`)

    ws.on('message', (message) => {
      console.log('received: %s', message)
    })
  })

  server.listen(8080, () => {
    console.log('Websocket server listening on %d',
      server.address().port)
  })
  return wss
}
