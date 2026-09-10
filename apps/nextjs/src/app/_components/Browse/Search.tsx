'use client'

import { useRouter } from 'next/navigation'

import { useIntlContext } from '@farmers/language/intl-provider'
import {
  landOptions,
  routes,
  SEARCH_QUERY_PARAM,
} from '@farmers/shared/app/constants'

import { VirtualizedCombobox } from '../searchbar'

export default function Search() {
  const { t } = useIntlContext()
  const router = useRouter()

  return (
    <section className='relative overflow-hidden px-4 pt-[54px]  lg:px-0 lg:py-14'>
      <div className='absolute inset-0 flex items-center justify-center'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className='min-h-full min-w-full object-cover'
          src='/images/background.jpg'
          alt='german landscape'
        />
      </div>
      <div className='relative z-10 mx-auto mb-14 flex max-w-[90%] flex-col items-center justify-center gap-4 sm:mb-12 sm:max-w-[80%] md:max-w-[70%] lg:mb-[64px] lg:max-w-[684px]'>
        <h1 className='text-center text-2xl font-bold text-black sm:text-3xl lg:text-[32px]'>
          {t('Search.FindSubsidies')}
        </h1>
        <VirtualizedCombobox
          options={landOptions}
          onSelect={(item) => {
            router.push(
              `${routes.main.browse}?${SEARCH_QUERY_PARAM}=${encodeURIComponent(item ?? '')}`,
            )
          }}
        />
      </div>
    </section>
  )
}
