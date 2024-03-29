require('dotenv').config();
const express = require('express');
const compression = require('compression');
// const helmet = require('helmet');
const morgan = require('morgan');
const { createRequestHandler } = require('@remix-run/express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { v4: uuidV4, parse: parseUUID } = require('uuid');
const timeout = require('connect-timeout');
const path = require('path');
const http = require('http');

// const daumPostCodeUrls = ['https://t1.daumcdn.net', 'https://postcode.map.daum.net'];

const isDevEnv = process.env.NODE_ENV !== 'production';

const BUILD_DIR = path.join(process.cwd(), 'build');
const PORT = Number(process.env.PORT) || 3000;

process.env.CACHE_UUID = uuidV4();

const purgeRequireCache = () => {
  for (const key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
};

// const allowHosts = isDevEnv ? ['localhost', '127.0.0.1'] : [process.env.HOST];
// const allowURLs = allowHosts.map(d => `${isDevEnv ? 'http' : 'https'}://${d}${isDevEnv ? `:${PORT}` : ''}`).concat(daumPostCodeUrls);

// /** @type {import('helmet').HelmetOptions} */
// const helmetOptions = {
//   crossOriginResourcePolicy: {
//     policy: 'cross-origin'
//   },
//   crossOriginEmbedderPolicy: false,
//   contentSecurityPolicy: {
//     directives: {
//       'script-src': [`'unsafe-inline'`, ...allowURLs],
//       'connect-src': [...(isDevEnv ? allowHosts.map(d => `ws://${d}:${require('./remix.config')?.devServerPort || 8002}`) : []), ...allowURLs],
//       'frame-src': daumPostCodeUrls
//     }
//   },
//   hidePoweredBy: !isDevEnv,
//   referrerPolicy: false
// };

const app = express();
const server = http.createServer(app);

// app.use(helmet(helmetOptions));
app.use(compression());
app.use(timeout('300s'));
app.use('/build', express.static('public/build', { immutable: true, maxAge: '1y' }));
app.use(express.static('public', { maxAge: '1h' }));
app.use(morgan('tiny'));

if (isDevEnv) {
  // app.use('/api/test2', createProxyMiddleware({ target: 'http://127.0.0.1:8081', changeOrigin: true }));
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.API_URL,
      changeOrigin: true,
      timeout: 300000,
      proxyTimeout: 300000
    })
  );
}

app.all(
  '*',
  isDevEnv
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

server.listen(PORT, '0.0.0.0', () => console.log(`Express server listening on port ${PORT}`));
