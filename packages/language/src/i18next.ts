import i18next from 'i18next'
import { zodI18nMap } from 'zod-i18n-map'
import zodDe from 'zod-i18n-map/locales/de/zod.json'
// Import your language translation files
import zodEn from 'zod-i18n-map/locales/en/zod.json'

import { DEFAULT_LANGUAGE } from '@farmers/shared/app/constants'
import { z } from '@farmers/shared/common/zod'

import de from './localizations/de'
import en from './localizations/en'

export type SupportedLanguage = 'en' | 'de'

export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: 'English',
  de: 'German',
}

export const resources = {
  en: { translation: en, zod: zodEn },
  de: { translation: de, zod: zodDe },
}

const LOG = false

void i18next.init({
  resources,
  debug: process.env.NEXT_PUBLIC_DEV_MODE === 'true' && LOG,
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
})
z.setErrorMap(zodI18nMap)
export { z }

export const t = i18next.t
// const t: typeof i18next.t = (...params) => {
//   return i18next.t(...params)
// }
export { i18next }

// https://www.i18next.com/overview/typescript
declare module 'i18next' {
  interface CustomTypeOptions {
    resources: (typeof resources)[typeof DEFAULT_LANGUAGE]
  }
}
