/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  env: {
    es2021: true,
  },
  extends: ['plugin:prettier/recommended'],
  plugins: ['import', 'unicorn'],
  rules: {
    // I used to prefer default exports, but I've since learned the hard way that typos are too
    // easy to make with default exports. We also don't want anyone to intentionally rename the
    // default export because it makes it hard to do a project-wide keyword search.
    // E.g. `import MySillyComponent from 'component'
    'import/no-default-export': 'error',
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
      },
    ],
    // The 'sort-imports' rule works together with 'import/order' rule. We're using it to
    // sort the named imports while 'import/order' sorts lines by package.
    // e.g. `import { c, b } from 'package'` -> `import { b, c } from 'package'`
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    'unicorn/filename-case': ['error', { case: 'kebabCase' }],
  },
  overrides: [
    {
      files: ['**/*.js'],
      env: {
        commonjs: true,
        node: true,
      },
      extends: ['eslint:recommended'],
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      env: {
        es2020: true,
        node: true,
      },
      extends: ['plugin:@typescript-eslint/recommended'],
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/ban-ts-comment': [
          'error',
          {
            'ts-expect-error': 'allow-with-description',
            'ts-ignore': 'allow-with-description',
            'ts-nocheck': 'allow-with-description',
            'ts-check': 'allow-with-description',
          },
        ],
        // https://github.com/typescript-eslint/typescript-eslint/tree/master
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unnecessary-condition': 'error',
        '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
      },
    },
    {
      files: ['**/*.test.*'],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
}
