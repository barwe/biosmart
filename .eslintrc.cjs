module.exports = {
  env: { browser: true, es2021: true },
  extends: 'plugin:vue/vue3-essential',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/multi-word-component-names': 0,
  },
}
