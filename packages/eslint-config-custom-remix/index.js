/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  env: {
    es2021: true,
  },
  extends: ['custom/react'],
  plugins: ['import'],
  overrides: [
    {
      files: [
        'app/routes/**/_route.tsx',
        'app/routes/**/index.tsx',
        'app/routes/*.tsx',
        'app/root.tsx',
        'app/entry.server.tsx',
      ],
      rules: {
        // The exception to this rule is when dealing with files that are meant to work
        // dependencies that are meant to work with default exports like Remix.
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['app/routes/**/*'],
      rules: {
        'unicorn/filename-case': ['error', { cases: { camelCase: true, kebabCase: true } }],
      },
    },
  ],
}
