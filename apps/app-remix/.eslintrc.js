module.exports = {
  root: true,
  extends: ['custom/remix-react'],
  overrides: [
    {
      files: ['vitest.config.ts'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
}
