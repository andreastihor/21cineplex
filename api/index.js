const routes = require('./routes');

module.exports.name = 'api';
module.exports.register = (server) => {
  routes.forEach(route => server.route(route));
  server.route({
    method: '*',
    path: '/{p*}',
    config : {
      handler : (request, h) => {
        return h.response('The page was not found').code(404);
      },
      auth : false,
    },
  });
};
