'use strict'
const ApiError = require('../types/api_error')

class IndexController {
  index(args) {
    return 'Hello API!'
  }

  example_args({ query, body, headers}) {
    return { query, body, headers }
  }

  example_error(args) {
    throw new ApiError("whoops")
  }
}

module.exports = new IndexController()
