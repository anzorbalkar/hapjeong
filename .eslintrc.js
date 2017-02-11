module.exports = {
    'extends': 'airbnb-base',
    'env': {
        'browser': true,
    },
    'rules': {
      'eqeqeq': 'off',
      'object-curly-spacing': ['error', 'never'],
      'no-param-reassign': ["error", { "props": false }],
      'no-underscore-dangle': 'off',
    }
};
