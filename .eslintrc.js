module.exports = {
  env: {
    es2021: true,
    node: true,
    'jest/globals': true
  },
  extends: [
    'airbnb-base',
    'plugin:import/typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'jest'
  ],
  rules: {
    'max-len': 0,
    'import/extensions': 0
  },
};
