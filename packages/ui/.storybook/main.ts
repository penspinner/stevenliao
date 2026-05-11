import type { StorybookConfig } from '@storybook/react-vite'
import tailwindcss from '@tailwindcss/vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  async viteFinal(viteFinalConfig) {
    const { mergeConfig } = await import('vite')
    return mergeConfig(viteFinalConfig, {
      plugins: [tailwindcss()],
    })
  },

  addons: ['@storybook/addon-vitest'],
}

export default config
