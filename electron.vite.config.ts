// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import wasm from 'vite-plugin-wasm'
import worker from 'vite-plugin-worker'
// Utilities
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src/renderer/src')
      }
    },
    plugins: [
      vue(),
      wasm(),
      worker,
      vuetify({
        autoImport: true
      }),
      VueI18nPlugin({
        include: resolve(__dirname, './locales/**')
      })
    ],
    css: {
      preprocessorOptions: {
        scss: { additionalData: ` @import "@/styles/variables.scss";` }
      }
    },
    worker: {
      format: 'es'
    },
    assetsInclude: ['**/*.wasm']
  }
})
