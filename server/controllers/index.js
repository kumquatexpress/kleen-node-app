'use strict'

class IndexController {
  login({
    query: { failed_login }
  }) {
    if(failed_login){
      return 'Failed Login!'
    }
    return 'What'
  }
}

module.exports = new IndexController()
