import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios'
import { toastInterface, options as toastOptions } from '@/plugins/toastification'
import vueI18n from '@/plugins/i18n'
import ToastTemplate from '@/components/toast/ToastTemplate.vue'
import { APIUrl } from '@/configuration.json'

const options: CreateAxiosDefaults = {
  baseURL: APIUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}

const httpCLient: AxiosInstance = axios.create(options)
const configureInterceptors = httpCLient.interceptors

configureInterceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      toastInterface.error(vueI18n.global.t('errors.communication.' + error.code))
    } else if (error.response.status !== undefined && error.response.status === 400) {
      ToastTemplate.props.title = vueI18n.global.t('errors.communication.' + error.response.status)
      ToastTemplate.props.detail = error.response.data.errors
      toastInterface.error(ToastTemplate, toastOptions)
    } else if (error.response.status === 401) {
      return Promise.reject(error)
    } else if (error.response.status !== undefined && error.response.status >= 300) {
      toastInterface.error(vueI18n.global.t('errors.communication.' + error.response.status))
    }
    return Promise.reject(error)
  }
)

export { httpCLient }
