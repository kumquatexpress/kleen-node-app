'use strict'
const winston = require('winston')
, config = require(`${__dirname}/../../config`)

module.exports = new winston.Logger({
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