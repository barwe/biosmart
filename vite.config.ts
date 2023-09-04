import path from 'path'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
// https://github.com/unplugin/unplugin-vue-components
import AutoComponents from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
// https://github.com/unplugin/unplugin-icons
// https://icon-sets.iconify.design/
import icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
// https://windicss.org/
// https://github.com/windicss/vite-plugin-windicss
import windicss from 'vite-plugin-windicss'
// https://github.com/vbenjs/vite-plugin-mock
import { viteMockServe } from 'vite-plugin-mock'

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
    resolvers: [NaiveUiResolver(), IconsResolver()],
  })

const mock = () => viteMockServe({ enable: true, mockPath: 'mock', logger: true })

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), api(), components(), icons(), windicss(), mock()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '#': path.resolve(__dirname, 'src', 'pages'),
    },
  },
})
