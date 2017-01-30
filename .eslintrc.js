module.exports = {
    'extends': 'airbnb-base',
    'env': {
        'browser': true,
    },
    'rules': {
      'eqeqeq': 'off',
      'object-curly-spacing': ['error', 'never'],
      'no-underscore-dangle': ['error', {allowAfterThis: true}],
    }
};
