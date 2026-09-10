'use client'

import type { TFunction } from 'i18next'
import type { ReactNode } from 'react'
import { createContext, useContext, useEffect } from 'react'
import dayjs from 'dayjs'

import { DEFAULT_LANGUAGE } from '@farmers/shared/app/constants'

import type { SupportedLanguage } from './i18next'
import { i18next } from './i18next'
import { languageStore } from './store'

const IntlContext = createContext<{
  t: TFunction<'translation', undefined>
  language: SupportedLanguage
}>({
  t: i18next.t,
  language: DEFAULT_LANGUAGE,
})

export const useIntlContext = () => useContext(IntlContext)

export const IntlProvider = ({ children }: { children: ReactNode }) => {
  const language = languageStore.use((state) => state.language)
  // load the preferred language
  useEffect(() => {
    void i18next.changeLanguage(language)
    dayjs.locale(language)
  }, [language])

  return (
    <IntlContext.Provider value={{ t: i18next.getFixedT(language), language }}>
      {children}
    </IntlContext.Provider>
  )
}
