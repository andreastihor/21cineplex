const Hapi=require('hapi');
const {GetAllSchedule, } = require('./service.js')
let constant = require('./constant')
// Create a server with a host and port
const server=Hapi.server({
    host:'localhost',
    port:8132
});
//
// // Add the route
// server.route({
//     method:'GET',
//     path:'/',
//     handler: async (request,h) => {
//       const response = await GetAllSchedule()
//       constant = response
//     }
// });

server.route({
  method : 'GET',
  path : '/cinemaList',
  handler : async(request,h) => {
    return Object.keys(constant)
  }
})

server.route({
  method : 'GET',
  path : '/movieList/{place}',
  handler : async(request,h) => {
    const x = request.params.place
    return constant[x]
  }
})

// Start the server
const start =  async function() {

    try {
        await server.start();
        const response = await GetAllSchedule()
        constant = response
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();
setInterval(async function()
{  const response = await GetAllSchedule()
  constant = response
}, 86400000 )
