/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['@remix-run/eslint-config', '@remix-run/eslint-config/node', 'prettier', 'plugin:storybook/recommended'],
  plugins: ['prettier'],
  rules: {
    '@typescript-eslint/consistent-type-imports': 'off',
    'prettier/prettier': 'error',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off'
  }
};