module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    "no-console": "off",
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    "comma-dangle": ["error", "never"] ,
    'max-len': 'off',
    "arrow-parens": [2, "as-needed"],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
