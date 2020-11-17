const {findVideos, findVideo} = require('./api');
const path = require('path');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const router = new Router();
const importFresh = require('import-fresh');
const DIST_DIR = path.resolve(__dirname, '../dist');
const {login, health, register} = require('./controllers');
const handleMongooseValidationError = require('./libs/validationErrors');

function middleware(app) {

  // const db = mongoose.connection;
  // db.on('error', console.error.bind(console, 'connection error:'));
  // db.once('open', function () {
    // console.log("we're connected!");
  // });

  app.use(bodyParser());

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      if (err.status) {
        ctx.status = err.status;
        ctx.body = {error: err.message};
      } else {
        console.error(err);
        ctx.status = 500;
        ctx.body = {error: 'Internal server error'};
      }
    }
  });

  router.post('/login', login);
  router.post('/register', handleMongooseValidationError, register);
  router.get('/health', health);

  router.get('/api/videos/:category', async (ctx, next) => {
    const jwToken = 'fake';
    const data = await findVideos(ctx.params.category, jwToken);
    ctx.body = data;

    await next();
  });

  router.get('/api/video/:slug', async (ctx, next) => {
    const jwToken = 'fake';
    const data = await findVideo(ctx.params.slug, jwToken);
    ctx.body = data;

    await next();
  });

  app.use(async (ctx, next) => {
    const clientStats = importFresh(path.resolve(DIST_DIR, 'stats.json'));
    const renderer = importFresh(path.resolve(DIST_DIR, 'serverRender.js'))
      .default;
    const render = renderer({clientStats});
    await render(ctx, next);
  });

  app.use(router.routes());
}

module.exports = middleware;
