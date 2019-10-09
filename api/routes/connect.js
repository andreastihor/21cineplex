const controller = require('../controller/service')
module.exports = [
  {
    method: 'get',
    path: '/',
    config: {
      handler : controller.test,
      // validate : {
      //   payload: {
      //   },
    },
    },

]
