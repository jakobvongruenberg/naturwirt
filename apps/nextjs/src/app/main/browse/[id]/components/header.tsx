import { Suspense } from 'react'
import Link from 'next/link'
import { ChevronLeftIcon } from '@radix-ui/react-icons'

import { t } from '@farmers/language/i18next'
import { routes } from '@farmers/shared/app/constants'
import { Button } from '@farmers/ui/button'
import { SpinnerFullPage } from '@farmers/ui/spinner'

import ShareLinkButton from '~/app/_components/ShareLinkButton'
import Typography from '~/app/_components/typography'

export const MeasureHeader = () => {
  return (
    <div className='relative w-full'>
      <div className='container mx-auto max-w-screen-lg px-4 py-2 lg:py-8'>
        <div className='flex w-full items-center justify-between'>
          <Link href={routes.main.browse}>
            <Button variant='ghost' className='flex items-center'>
              <ChevronLeftIcon className='mr-2 h-5 w-5 lg:h-5 lg:w-5' />
              <Typography type='large' className='text-base lg:text-2xl'>
                {t('Navbar.Buttons.BackToSearch')}
              </Typography>
            </Button>
          </Link>
          <div className='lg:hidden'>
            <Suspense fallback={<SpinnerFullPage />}>
              <ShareLinkButton />
            </Suspense>
          </div>
        </div>
      </div>
      <div className='hidden lg:absolute lg:right-4 lg:top-1/2 lg:flex lg:-translate-y-1/2 lg:transform'>
        <Suspense fallback={<SpinnerFullPage />}>
          <ShareLinkButton />
        </Suspense>
      </div>
    </div>
  )
}
