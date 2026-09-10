'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Loader } from 'lucide-react'

import type { Session } from '@farmers/auth'
import type { Role } from '@farmers/shared/app/types'
import { t } from '@farmers/language/i18next'
import { routes } from '@farmers/shared/app/constants'
import { Button } from '@farmers/ui/button'
import { Spinner } from '@farmers/ui/spinner'

import signout from '~/app/_actions/signout_server_action'

const AccessRestricted = (params?: {
  session?: Session | null
  loading?: boolean
  empty?: boolean
  access?: Role
  message?: string
}) => {
  const session = params?.session
  const [isSignoutLoading, setIsSignoutLoading] = useState<boolean>(false)
  if (params?.empty) return null

  const onSignOut = async () => {
    try {
      setIsSignoutLoading(true)
      await signout().then(() => {
        window.location.reload()
      })

      setIsSignoutLoading(false)
    } catch (error) {
      console.log(
        'error in signout',
        error instanceof Error ? error.message : error,
      )
      setIsSignoutLoading(false)
    }
  }

  return (
    <div className='bg-custom-gradient flex h-screen items-center justify-center'>
      <div className='flex w-3/5 flex-col items-center justify-center rounded-lg bg-[#D56A6A] p-4 shadow-xl shadow-black/30 lg:w-1/3 xl:w-1/5'>
        <div className='mb-5 flex flex-row gap-4 text-center text-xl font-bold text-white'>
          {params?.loading
            ? t('AccessRestricted.Message.CheckingAccess')
            : t('AccessRestricted.Message.AccessRestricted')}
        </div>
        {params?.loading ? (
          <Spinner />
        ) : (
          <div className='flex flex-col items-center gap-4 text-base text-white'>
            <div className='text-center'>
              {t('AccessRestricted.Message.NoPrivileges')}
            </div>
            {session?.user ? (
              <>
                <div className='items-center gap-2'>
                  {t('AccessRestricted.Message.LoggedInAs', {
                    email: session.user.email,
                  })}
                </div>
                <Button onClick={onSignOut} className='bg-gray-500'>
                  {isSignoutLoading && <Loader className='animate-spin' />}
                  <p className='text-white'>
                    {t('AccessRestricted.Button.SignOut')}
                  </p>
                </Button>
              </>
            ) : (
              <div className='flex w-full flex-col gap-2 px-5'>
                <Link href='mailto:admin@farmers.com'>
                  <Button className='w-full shadow-lg shadow-black/20'>
                    {t('AccessRestricted.Button.ReachOut')}
                  </Button>
                </Link>
                <Link href={routes.auth.signin}>
                  <Button className='w-full shadow-lg shadow-black/20'>
                    {t('AccessRestricted.Button.SignIn')}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AccessRestricted
