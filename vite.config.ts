import path from 'path'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import AutoComponents from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

const api = () =>
  AutoImport({
    imports: ['vue', 'vue-router'],
    dts: 'src/types/auto-import.d.ts',
    eslintrc: {
      enabled: true,
      filepath: './auto-import.json',
      globalsPropValue: true,
    },
  })

const components = () =>
  AutoComponents({
    dts: 'src/types/auto-components.d.ts',
    resolvers: [NaiveUiResolver()],
  })

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), api(), components()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '#': path.resolve(__dirname, 'src', 'pages'),
    },
  },
})
