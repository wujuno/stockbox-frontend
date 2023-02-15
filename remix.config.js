const { withEsbuildOverride } = require('remix-esbuild-override');

withEsbuildOverride((option, { isServer }) => ({
  ...option,
  drop: !isServer && process.env.NODE_ENV === 'production' ? ['console'] : option.drop
}));

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  devServerPort: 8002
};
