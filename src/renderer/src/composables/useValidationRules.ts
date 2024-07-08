import { ref, Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { appConstants } from '@/constants/appConstants'

type ValidationRule = (value: string) => boolean | string
type ValidationRules = {
  required: ValidationRule
  alphaNumeric: ValidationRule
  noFirstNumber: ValidationRule
  name: ValidationRule
  maxCounter: (max: number) => ValidationRule
  minCounter: (min: number) => ValidationRule
  email: ValidationRule
  password: ValidationRule
  confirmPassword(password: string): ValidationRule
}

export const useValidationRules = (): { rules: Ref<ValidationRules> } => {
  const { t } = useI18n({ useScope: 'global' })

  const rules: Ref<ValidationRules> = ref({
    required: (value: string): boolean | string => !!value || t('common.validation.required'),
    alphaNumeric: (value: string): boolean | string => {
      const regex = /^[a-zA-Z0-9]+$/
      if (!regex.test(value)) {
        return t('common.validation.alphaNumeric')
      }
      return true
    },
    noFirstNumber: (value: string): boolean | string => {
      const regex = /^[^0-9].*/
      if (!regex.test(value)) {
        return t('common.validation.noFirstNumber')
      }
      return true
    },
    name: (value: string): boolean | string => {
      const regex = /^$|^[a-zA-Z\s]+$/
      if (!regex.test(value)) {
        return t('common.validation.nameString')
      }
      return true
    },
    maxCounter:
      (max: number) =>
      (value: string): boolean | string =>
        (value || '').length <= max || t('common.validation.maxCharacters', { count: max }),
    minCounter:
      (min: number) =>
      (value: string): boolean | string =>
        (value || '').length >= min || t('common.validation.minCharacters', { count: min }),
    email: (value: string): boolean | string => {
      const regex = /^$|^([\w.%+-]+)@([\w-]+\.)+([a-zA-Z]{2,})$/
      if (!regex.test(value) && value !== '' && value) {
        return t('common.validation.email')
      }
      return true
    },
    password: (value: string): boolean | string => {
      const regex = new RegExp(appConstants.PASSWORD_REGEX)
      if (!regex.test(value)) {
        return t('common.validation.password')
      }
      return true
    },
    confirmPassword(password: string) {
      return (value: string): boolean | string => (value || '') === password || t('common.validation.confirmPassword')
    }
  })

  return { rules }
}
