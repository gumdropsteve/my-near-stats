const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const { createPool } = require('slonik');
const routes = require('./routes');

const app = new Koa();
app.listen(process.env['PORT'] || 3000);
app.use(cors());

const index = new Router();

// Environment variable
const endpoints = process.env['ENDPOINT'].split(',').map(s => s.trim());
const connections = process.env['DB_CONNECTION'].split(',').map(s => s.trim());

if (endpoints.length === 0 || endpoints.length !== connections.length) {
  console.error('Invalid endpoint/connection configuration provided');
  process.exit(1);
}

endpoints.forEach((endpoint, i) => {
  const connection = connections[i];
  const router = new Router();

  console.log('Connection', connection);

  const pool = createPool(connection);

  routes.forEach(route => {
    router.get('/' + route.path, async (ctx, next) => {
      console.log('/' + route.path);
      console.log('Request', ctx.request);
      try {
        const result = await pool.connect(connection => {
          return connection.any(route.query(ctx.query));
        });
        console.log('Response', result);

        ctx.response.body = result;
      } catch (e) {
        console.log(e);
        ctx.response.status = 500;
      }
    });
  });

  process.on('exit', async () => {
    console.log('Ending pool ' + endpoint + '...');
    await pool.end();
    console.log('Ended pool ' + endpoint);
  });

  index.use('/' + endpoints[i], router.routes(), router.allowedMethods());
});

app.use(index.routes()).use(index.allowedMethods());

console.log('Waiting for requests...');
