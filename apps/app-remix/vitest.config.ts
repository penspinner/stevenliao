/// <reference types="vitest" />
import { resolve } from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': resolve('./app'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  test: {
    environment: 'happy-dom',
    setupFiles: './vitest.setup.ts',
    include: ['**/*.test.tsx', '**/*.test.ts'],
  },
})
