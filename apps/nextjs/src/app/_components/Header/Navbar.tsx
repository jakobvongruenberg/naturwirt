'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  // CalendarIcn,
  ListBulletIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons'
import { useSession } from 'next-auth/react'

import { t } from '@farmers/language/i18next'
import { routes } from '@farmers/shared/app/constants'
import { cn } from '@farmers/ui'
import { Command, CommandItem } from '@farmers/ui/command'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@farmers/ui/navigation-menu'

import { AUTH, ModalStore } from '~/store/modal'

export function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const isBrowse = pathname === routes.main.browse
  const isMeasures = pathname === routes.main.measures
  return (
    <NavigationMenu className='ml-[30px]'>
      <NavigationMenuList className='gap-[30px]'>
        <NavigationMenuItem>
          <Link href={routes.main.browse} passHref>
            <Command>
              <CommandItem className='!cursor-pointer !bg-transparent'>
                <MagnifyingGlassIcon
                  color={!isBrowse ? '#00000088' : undefined}
                  className='mr-2 h-[32px] w-[32px]'
                />
                <span
                  className={cn('text-[22px]', {
                    'text-black/50': !isBrowse,
                  })}
                >
                  {t('Navbar.Label.Browse')}
                </span>
              </CommandItem>
            </Command>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href={routes.main.measures}
            passHref
            onClick={(e) => {
              if (!session?.user) {
                e.preventDefault()
                ModalStore.update({
                  open: true,
                  type: AUTH,
                })
              }
            }}
          >
            <Command>
              <CommandItem className='!cursor-pointer !bg-transparent'>
                <ListBulletIcon
                  color={!isMeasures ? '#00000088' : undefined}
                  className={cn('mr-2 h-[32px] w-[32px]')}
                />
                <span
                  className={cn('text-[22px]', {
                    'text-black/50': !isMeasures,
                  })}
                >
                  {t('HomePage.MyMeasures')}
                </span>
              </CommandItem>
            </Command>
          </Link>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <Link href={routes.main.planner} passHref>
            <Command>
              <CommandItem className='!cursor-pointer !bg-transparent'>
                <CalendarIcon className='mr-2 h-[32px] w-[32px]' />
                <span className='text-[22px]'>My Planner</span>
              </CommandItem>
            </Command>
          </Link>
        </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
