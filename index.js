const Hapi=require('hapi');
const service = require('./service.js')

// Create a server with a host and port
const server=Hapi.server({
    host:'0.0.0.0',
    port:8132
});

// Add the route
server.route({
    method:'GET',
    path:'/',
    handler: async (request,h) => {
      const response = await service()
      return response
    }
});

// Start the server
const start =  async function() {

    try {
        await server.start();

    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();
