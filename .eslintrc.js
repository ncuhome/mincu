module.exports = {
  plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-tsdoc'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'tsdoc/syntax': 'warn',
  },
}
