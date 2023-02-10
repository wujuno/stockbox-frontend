const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const { createRequestHandler } = require('@remix-run/express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { v4: uuidV4, parse: parseUUID } = require('uuid');
const path = require('path');
const http = require('http');

const isDevEnv = process.env.NODE_ENV !== 'production';

const BUILD_DIR = path.join(process.cwd(), 'build');
const PORT = Number(process.env.PORT) || 3000;
const HOST = (isDevEnv ? '0.0.0.0' : process.env.HOST) || '0.0.0.0';

process.env.CACHE_UUID = uuidV4();
process.env.COOKIE_SECRET = process.env.NODE_ENV === 'production' ? Buffer.from(parseUUID(uuidV4())).toString('utf8').toUpperCase() : 'B015E55C3DA9408B9388A12FBF9D4EC8';
process.env.API_URL = isDevEnv ? `http://${process.env.HOST}:${process.env.BACKEND_PORT}` : '/';

const purgeRequireCache = () => {
  for (const key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
};

const allowHosts = isDevEnv ? ['localhost', '127.0.0.1'] : ['stockbox.kro.kr'];
const allowURLs = allowHosts.map(d => `${isDevEnv ? 'http' : 'https'}://${d}${isDevEnv ? `:${PORT}` : ''}`);

/** @type {import('helmet').HelmetOptions} */
const helmetOptions = {
  contentSecurityPolicy: {
    directives: {
      'script-src': [`'unsafe-inline'`, ...allowURLs],
      'connect-src': [...(process.env.NODE_ENV !== 'production' ? allowHosts.map(d => `ws://${d}:${require('./remix.config')?.devServerPort || 8002}`) : []), ...allowURLs]
    }
  },
  hidePoweredBy: !isDevEnv,
  referrerPolicy: false
};

const app = express();
const server = http.createServer(app);

app.use(helmet(helmetOptions));
app.use(compression());
app.use('/build', express.static('public/build', { immutable: true, maxAge: '1y' }));
app.use(express.static('public', { maxAge: '1h' }));
app.use(morgan('tiny'));

if (process.env.NODE_ENV !== 'production') {
  app.use('/api', createProxyMiddleware({ target: process.env.API_URL, changeOrigin: true }));
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

server.listen(PORT, HOST, () => console.log(`Express server listening on port ${PORT}`));
