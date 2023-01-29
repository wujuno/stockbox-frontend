const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const { createRequestHandler } = require('@remix-run/express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { v4: uuidV4 } = require('uuid');
const path = require('path');

process.env.CACHE_UUID = uuidV4();

const purgeRequireCache = () => {
  for (const key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
};

const BUILD_DIR = path.join(process.cwd(), 'build');
const PORT = Number(process.env.PORT) || 3000;

const app = express();

app.disable('x-powered-by');

app.use(compression());
app.use(
  '/build',
  express.static('public/build', { immutable: true, maxAge: '1y' })
);
app.use(express.static('public', { maxAge: '1h' }));
app.use(morgan('tiny'));

if (process.env.NODE_ENV !== 'production') {
  app.use(
    '/api',
    createProxyMiddleware({ target: process.env.API_URL, changeOrigin: true })
  );
}

app.all(
  '*',
  process.env.NODE_ENV === 'development'
    ? (req, res, next) => {
        purgeRequireCache();

        return createRequestHandler({
          build: require(BUILD_DIR),
          mode: process.env.NODE_ENV
        })(req, res, next);
      }
    : createRequestHandler({
        build: require(BUILD_DIR),
        mode: process.env.NODE_ENV
      })
);

app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`));
