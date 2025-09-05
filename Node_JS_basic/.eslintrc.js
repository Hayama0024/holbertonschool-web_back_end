// .eslintrc.js
module.exports = {
    env: {
      browser: false,
      es2021: true,
      node: true,
      jest: true,
    },
    extends: ['airbnb-base'],
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module', // ES6 import/export を通す（CJS の require もOK）
    },
    rules: {
      'no-console': 'off',
      'no-useless-catch': 'off',
      'no-underscore-dangle': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'linebreak-style': 'off'
    },
  };
  