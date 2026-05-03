import localesPlugin from '@react-aria/optimize-locales-plugin'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    include: ['personal-site'],
  },
  plugins: [
    tailwindcss(),
    reactRouter(),
    { ...localesPlugin.vite({ locales: [] }), enforce: 'pre' },
  ],
  ssr: {
    external: ['personal-site'],
  },
})
