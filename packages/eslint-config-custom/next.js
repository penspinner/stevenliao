/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: ['./base', 'next/core-web-vitals'],
  overrides: [
    {
      files: ['pages/**/*', 'app/routes/**/*'],
      rules: {
        // The exception to this rule is when dealing with files that are meant to work
        // dependencies that are meant to work with default exports like Remix.
        'import/no-default-export': 'off',
        'unicorn/filename-case': ['error', { cases: { camelCase: true, kebabCase: true } }],
      },
    },
  ],
}
