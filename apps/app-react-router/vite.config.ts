import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    include: ['@heroicons/react', 'clsx', 'personal-site'],
  },
  plugins: [tailwindcss(), reactRouter()],
  ssr: {
    external: ['personal-site'],
  },
})
