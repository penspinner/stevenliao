import localesPlugin from '@react-aria/optimize-locales-plugin'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackStart(),
    nitro(),
    react(),
    { ...localesPlugin.vite({ locales: [] }), enforce: 'pre' },
  ],
  ssr: {
    external: ['personal-site'],
  },
})
