'use strict'
const _ = require('lodash')
, glob = require('glob')

const graphqlTypes = {}

glob.sync(`${__dirname}/../types/graphql/*.js`).forEach(file => {
  const typeName = _.take(_.takeRight(file.split('/'), 1)[0].split('.'), 1)[0]
  graphqlTypes[typeName] = require(file)
})

module.exports = graphqlTypes