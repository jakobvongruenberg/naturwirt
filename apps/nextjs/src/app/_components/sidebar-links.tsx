'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Info, MoveLeft, Plus, User } from 'lucide-react'

import { t } from '@farmers/language/i18next'
import { routes, SIDEBAR_WIDTH_PX } from '@farmers/shared/app/constants'
import { cn } from '@farmers/ui'

import { SiteLogo } from '~/assets/images/site-logo'
import { VersionInfo } from './version-info'

export const SideBarLinks = () => {
  const pathname = usePathname()

  return (
    <div
      className='fixed bottom-0 left-0 top-0 h-screen flex-col overflow-auto bg-[#F9F5EE] pb-14 text-black dark:bg-gray-900 lg:flex'
      style={{ width: SIDEBAR_WIDTH_PX }}
    >
      <Link href={routes.main.index} className='p-4'>
        <SiteLogo />
      </Link>
      <ul className='flex h-full flex-col justify-between gap-y-1'>
        <div>
          <Link href={routes.admin.user}>
            <li
              className={cn(
                'flex flex-row items-center gap-4 px-3 py-2 text-base font-normal text-[#515151]',
                { 'font-bold': pathname?.includes('/users') },
              )}
            >
              <div className='w-fit rounded-full bg-[#1B3765] p-1'>
                <User color='white' />
              </div>
              {t('Admin.Navbar.Users')}
            </li>
          </Link>
          <Link href={routes.admin.measures}>
            <li
              className={cn(
                'flex flex-row items-center gap-4 px-3 py-2 text-base font-thin text-[#515151]',
                { 'font-bold': pathname === routes.admin.measures },
              )}
            >
              <div className='w-fit rounded-full bg-[#1B3765] p-1'>
                <Info color='white' />
              </div>
              {t('Admin.Navbar.Measures')}
            </li>
          </Link>
          <Link href={routes.admin.createMeasure}>
            <li
              className={cn(
                'flex flex-row items-center gap-4 px-3 py-2 text-base font-thin text-[#515151]',
                { 'font-bold': pathname === routes.admin.createMeasure },
              )}
            >
              <div className='w-fit rounded-full bg-[#1B3765] p-1'>
                <Plus color='white' />
              </div>
              {t('Admin.Navbar.CreateMeasure')}
            </li>
          </Link>
          <div className='bg-menu-gradient mx-auto mt-[10vh] h-[3px] w-[60%]'></div>
        </div>
        <Link href={routes.auth.signout}>
          <li
            className={cn(
              'flex flex-row items-center gap-4 px-3 py-2 text-base font-thin text-[#515151]',
            )}
          >
            <div className='w-fit rounded-full bg-[#1B3765] p-1'>
              <MoveLeft color='white' />
            </div>
            {t('Admin.Navbar.SignOut')}
          </li>
        </Link>
      </ul>
      <VersionInfo className='absolute bottom-1 self-center text-gray-500' />
    </div>
  )
}
