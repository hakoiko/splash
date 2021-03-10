module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    'standard',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: [
    'html',
    '@typescript-eslint',
    'vue'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    camelcase: 'off'
  }
}
