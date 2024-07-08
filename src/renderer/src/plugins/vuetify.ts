import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import * as components from 'vuetify/components'
import * as labsComponents from 'vuetify/labs/components'
import { useI18n } from 'vue-i18n'
import config from '@/configuration.json'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useVuetify = (i18n: any): ReturnType<typeof createVuetify> => {
  return createVuetify({
    components: {
      ...components,
      ...labsComponents
    },
    locale: {
      adapter: createVueI18nAdapter({ i18n, useI18n })
    },
    theme: {
      themes: {
        ...config.themes
      },
      defaultTheme: config.defaultTheme
    },
    defaults: {
      VTextField: {
        variant: 'solo-filled',
        density: 'comfortable',
        color: 'accent',
        flat: true
      },
      VSelect: {
        variant: 'solo-filled',
        color: 'accent',
        density: 'comfortable',
        flat: true
      },
      VAutocomplete: {
        variant: 'solo-filled',
        color: 'accent',
        density: 'comfortable',
        flat: true
      },
      VBtn: {
        variant: 'outlined'
      }
    }
  })
}
export default useVuetify

