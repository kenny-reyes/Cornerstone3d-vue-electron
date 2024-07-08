import { loadFonts } from './webfontloader'
import useVuetify from './vuetify'
import vueI18n from './i18n'
import router from '@/router'
import Particles from '@tsparticles/vue3'
import { loadFull } from 'tsparticles'
import { Engine } from '@tsparticles/engine'
import { createPinia } from 'pinia'
import { toast, options } from './toastification'
// @ts-ignore none
import Vue3Resize from 'vue3-resize'

import type { App } from 'vue'

export function registerPlugins(app: App): void {
  loadFonts()
  app.use(createPinia())
  app.use(router)
  // @ts-ignore none
  app.use(Particles, {
    init: async (engine: Engine) => {
      await loadFull(engine)
    }
  })
  const i18n = vueI18n
  app.use(i18n)
  app.use(toast, options)
  app.use(useVuetify(i18n))
  app.use(Vue3Resize)
}
