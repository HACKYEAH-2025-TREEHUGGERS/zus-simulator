import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import optimizeLocales from '@react-aria/optimize-locales-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({ autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
    {
      ...optimizeLocales.vite({
        locales: ['pl-PL', 'en-US'],
      }),
      enforce: 'pre',
    },
  ],
  server: {
    port: 8080,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
