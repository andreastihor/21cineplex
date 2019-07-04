const Hapi=require('hapi');
const handleLineEvent = require('./handler')
const lineService = require('./lineService')
// Create a server with a host and port
const server=Hapi.server({
    host:'localhost',
    port:8132
});

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }
  return handleLineEvent(event)
}
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


server.route({
  path : "/",
  method : "POST",
  handler : (req,res) => {
    return req.payload.events.map(event => {
       return handleEvent(event);
     });
  }
})

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

(async function() {
  await start();
  await lineService.resetMovie()
})()
