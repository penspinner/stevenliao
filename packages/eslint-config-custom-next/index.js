/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: ['next/core-web-vitals', 'custom/react'],
  plugins: ['import'],
  overrides: [
    {
      files: ['app/**/*.tsx', 'app/**/*.ts'],
      rules: {
        // The exception to this rule is when dealing with files that are meant to work
        // dependencies that are meant to work with default exports.
        'import/no-default-export': 'off',
        'unicorn/filename-case': ['error', { cases: { camelCase: true, kebabCase: true } }],
      },
    },
  ],
}
