module.exports = {
  extends: ['airbnb-base'],
  plugins: ['import'],
  env: {
    node: true,
  },
  overrides: [
    {
      files: ['*'],
      rules: {
        'no-underscore-dangle': 'off',
      },
    },
  ],
};
