'use client'

import type { SVGProps } from 'react'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import { Languages, LogOut } from 'lucide-react'
import { useSession } from 'next-auth/react'

import { i18next, t } from '@farmers/language/i18next'
import { languageStore } from '@farmers/language/store'
import { routes } from '@farmers/shared/app/constants'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@farmers/ui/dropdown-menu'

import logout from '~/app/_actions/signout_server_action'
import ProfileIcon from '~/assets/images/profile-icon'
import { env } from '~/env'

export default function LoggedIn({
  iconProps,
}: {
  iconProps: SVGProps<SVGSVGElement>
}) {
  const router = useRouter()
  const { data: session } = useSession()
  const language = languageStore.use((state) => state.language)
  return (
    <div key={session?.user?.role ?? t('Navbar.Label.NoRole')}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className='cursor-pointer'>
          <div className='cursor-pointer'>
            <ProfileIcon {...iconProps} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56 cursor-pointer' align='end'>
          <DropdownMenuItem
            onClick={() => router.push(routes.main.profile.index)}
          >
            {t('Navbar.Label.MyAccount')}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(routes.main.profile.notifications)}
          >
            {t('Navbar.Label.NotificationSettings')}
          </DropdownMenuItem>
          {session?.user?.role === 'admin' ? (
            <DropdownMenuItem onClick={() => router.push(routes.admin.index)}>
              {t('Navbar.Label.AdminPortal')}
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuSeparator />
          {['dev', 'ci', 'local'].includes(env.NEXT_PUBLIC_CHANNEL) ? (
            <DropdownMenuItem
              onClick={() => {
                const newLanguage = language === 'en' ? 'de' : 'en'
                void i18next.changeLanguage(newLanguage)
                dayjs.locale(newLanguage)
                languageStore.set('language', newLanguage)
              }}
              className='cursor-pointer'
            >
              <Languages className='mr-2 h-4 w-4' />
              <span>DEV (Locale is {language})</span>
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => logout().then(() => window.location.reload())}
            className='cursor-pointer'
          >
            <LogOut className='mr-2 h-4 w-4' />
            <span>{t('Navbar.Label.Logout')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
