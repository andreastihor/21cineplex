const Joi = require('joi');
const controller = require('../controller/report')
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

    {
      method: 'GET',
      path: "/region",
      config: {
        handler : controller.getRegion,

      },
    },
    {
      method: 'GET',
      path: "/cinema",
      config: {
        handler : controller.getCinemaList,
        validate : {
          query: {
            region : Joi.string().required(),
          },
        }
      },
    },

]
