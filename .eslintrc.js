/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['@remix-run/eslint-config', '@remix-run/eslint-config/node', 'prettier/@typescript-eslint', 'prettier'],
  plugins: ['prettier'],
  rules: {
    '@typescript-eslint/consistent-type-imports': 'off'
  }
};
