module.exports = {
  plugins: ['@typescript-eslint/eslint-plugin', "prettier"],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  "rules": {
    "prettier/prettier": "error"
  }
}
