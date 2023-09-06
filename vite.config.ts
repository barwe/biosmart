import path from 'path'
import { defineConfig, loadEnv } from 'vite'

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
import { viteMockServe as mock } from 'vite-plugin-mock'

const api = () =>
  AutoImport({
    imports: [
      'vue',
      'vue-router',
      { 'vue-request': ['useRequest'] },
      { '@vueuse/core': ['watchOnce', 'onKeyStroke'] },
      {
        lodash: [
          'has',
          'keys',
          'values',
          'entries',
          'assign',
          'pick',
          'omit',
          'debounce',
          'isNil',
          'isEmpty',
          'cloneDeep',
        ],
      },
      { '@/store/site/breadcrumb': ['breadcrumb'] },
      { '@/composables/vue-ext': ['computableRef'] },
    ],
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

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [vue(), api(), components(), icons(), windicss(), mock()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '#': path.resolve(__dirname, 'src', 'pages'),
        $: path.resolve(__dirname, 'src', 'store'),
      },
    },
    server: {
      host: env.VITE_HOST!,
      port: parseInt(env.VITE_PORT!),
      proxy: {
        '/api': {
          target: env.VITE_BASE_API!,
          changeOrigin: true,
          rewrite: p => (env.VITE_REPLACE === 'false' ? p : p.replace(/^\/api/, '')),
        },
      },
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  }
})
