import { createI18n } from 'vue-i18n'
import enUs from '@/locales/messages/en-US.json'
import esEs from '@/locales/messages/es-ES.json'
import enUsFormat from '@/locales/dateTimeFormats/en-US.json'
import esEsFormat from '@/locales/dateTimeFormats/es-ES.json'
import { en, es } from 'vuetify/locale'
import { defaultLanguage } from '@/configuration.json'

type MessageSchema = typeof esEs

// @ts-ignore No other way to type mutation
const getVueI18n = (language: string | undefined): Any => {
  return createI18n<[MessageSchema], 'en-US' | 'es-ES'>({
    locale: language,
    globalInjection: true,
    legacy: false,
    fallbackLocale: 'en-US',
    messages: {
      'es-ES': {
        // @ts-ignore the property exists
        $vuetify: es,
        ...esEs
      },
      'en-US': {
        // @ts-ignore the property exists
        $vuetify: en,
        ...enUs
      }
    },
    datetimeFormats: {
      // @ts-ignore not a type
      'es-ES': esEsFormat,
      // @ts-ignore not a type
      'en-US': enUsFormat
    }
  })
}

export default getVueI18n(defaultLanguage)
