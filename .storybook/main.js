const path = require('path');

/** @type {import('@storybook/core').} */
const config = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/react',
  webpackFinal: async config => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        '@': path.resolve(__dirname, '..', 'app')
      }
    }
  })
};

module.exports = config;
