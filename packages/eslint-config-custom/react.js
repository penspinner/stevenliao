/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: ['plugin:react/recommended', 'plugin:jsx-a11y/recommended', './base'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', 'jsx-a11y'],
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
