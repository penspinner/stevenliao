/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
  root: true,
  // parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./apps/*/tsconfig.json', './packages/*/tsconfig.json'],
  },
}
