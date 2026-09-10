'use client'

import Link from 'next/link'

import type { Session } from '@farmers/auth'
import type { Role } from '@farmers/shared/app/types'
import { t } from '@farmers/language/i18next'
import { routes } from '@farmers/shared/app/constants'
import { Spinner } from '@farmers/ui/spinner'

const NotFoundPage = (params?: {
  session?: Session | null
  loading?: boolean
  empty?: boolean
  access?: Role
}) => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='flex w-3/4 flex-col items-center justify-center rounded-lg bg-gray-600 p-10 shadow-lg lg:w-1/2 xl:w-1/3'>
        <div className='mb-5 flex flex-row gap-4 text-[40px] text-white'>
          Not Found (404)
          {t('NotFound.Label.NotFound')}
        </div>
        {params?.loading ? (
          <Spinner />
        ) : (
          <div className='flex flex-col items-center gap-4 text-[20px] text-white'>
            <div className='text-center'>
              {t('NotFound.Label.SorryWeCantSeemToFindThePageYoureLookingFor')}
            </div>
            <div className='items-center'>
              {t('NotFound.Label.IfYouBelieveThisIsAnError')}
              <span className='cursor-pointer text-[#02C194] underline'>
                <a href='mailto:admin@rheumote.com'>
                  {t('NotFound.Label.ReachOutToUs')}
                </a>
              </span>
            </div>

            <Link
              href={routes.main.index}
              className='cursor-pointer text-[#02C194] underline'
            >
              {t('NotFound.Button.ReturnHome')}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default NotFoundPage
