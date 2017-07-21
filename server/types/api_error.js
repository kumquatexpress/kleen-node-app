'use strict'

class ApiError extends Error {
  constructor(message, code=409){
    super()
    this.message = message
    this.code = code
  }
  code() {
    return this.code
  }
  message() {
    return this.message || 'Unimplemented API error message'
  }
}

module.exports = ApiError
