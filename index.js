const Glue = require('glue');
const api = require('./api')


const manifest = {
  server: {
    host: 'localhost',
    port: 8112,
    routes: {
      cors: true,
    },
    router: {
      stripTrailingSlash: true,
    },
  },
  register: {
    plugins: [
      { plugin: api },
    ],
  },
};



const startServer = async () => {
  try {
    const server = await Glue.compose(manifest, { relativeTo: __dirname });
    await server.start();
    console.log(`SERVER: Server running at ${server.info.uri}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
