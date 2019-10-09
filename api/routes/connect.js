const controller = require('../controller/service')
module.exports = [
  {
    method: 'get',
    path: '/',
    config: {
      handler : (req,h) => {
        return "test complete"
      },
      // validate : {
      //   payload: {
      //   },
    },
    },

]
