import Link from 'next/link'

import { routes } from '@farmers/shared/app/constants'

import { MobileLogo } from '~/assets/images/site-icon'
import { SiteLogo } from '~/assets/images/site-logo'
import { MobileMenuButton } from './Header/mobile-menu'
import { Navbar } from './Header/Navbar'
import { Profile } from './Header/Profile'

export const Header = () => {
  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 flex h-[48px] flex-row items-center justify-between border-b-[1px] border-[#D9D9D9] bg-white p-[20px] text-[22px] lg:h-[80px]`}
    >
      <div className='flex items-center'>
        <Link href={routes.main.index}>
          <div className='hidden lg:block'>
            <SiteLogo />
          </div>
          <div className='block lg:hidden'>
            <MobileLogo className='size-9' />
          </div>
        </Link>
        <div className='hidden lg:block'>
          <Navbar />
        </div>
      </div>
      <div className='flex flex-row items-center lg:mr-4'>
        <Profile iconProps={{ className: 'size-9' }} />
        <div className='ml-4 flex flex-row items-center lg:hidden'>
          <MobileMenuButton />
        </div>
      </div>
    </header>
  )
}
