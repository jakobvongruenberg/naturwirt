import { DEFAULT_LANGUAGE } from '@farmers/shared/app/constants'
import { ZustandStore } from '@farmers/shared/common/classes'

import type { SupportedLanguage } from './i18next'

// This type needs to be inferred
const initialState = {
  language: DEFAULT_LANGUAGE as SupportedLanguage,
}

export const languageStore = new ZustandStore({
  initialState,
  persistOptions: {
    name: 'farmers-language',
    persistedKeys: ['language'],
    version: 1,
    getStorage: () => localStorage,
  },
})
