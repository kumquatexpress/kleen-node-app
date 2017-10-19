'use strict'

const tryCatch = function(tryFunc, onErr) {
  try {
    return tryFunc()
  } catch (e) {
    return onErr()
  }
}

module.exports = {
  tryCatch
}
