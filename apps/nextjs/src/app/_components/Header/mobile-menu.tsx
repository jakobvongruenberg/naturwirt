'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ListBulletIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Menu, X } from 'lucide-react'

import { t } from '@farmers/language/i18next'
import { routes } from '@farmers/shared/app/constants'
import { cn } from '@farmers/ui'

interface MenuItem {
  href: string
  icon: React.ElementType
  label: string
}

const menuItems: MenuItem[] = [
  {
    href: routes.main.browse,
    icon: MagnifyingGlassIcon,
    label: t('Navbar.Label.Browse'),
  },
  {
    href: routes.main.measures,
    icon: ListBulletIcon,
    label: t('HomePage.MyMeasures'),
  },
  // Add more menu items as needed
]

export const MobileMenuButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <>
      <button
        onClick={toggleMenu}
        className='text-gray-500 hover:text-gray-700'
      >
        <Menu size={24} />
      </button>
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-3/4 max-w-sm transform bg-white shadow-lg transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className='flex justify-end p-4'>
          <button
            onClick={toggleMenu}
            className='text-gray-500 hover:text-gray-700'
          >
            <X size={24} />
          </button>
        </div>
        <nav className='mt-8'>
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href} passHref>
              <button
                className={cn(
                  'flex w-full items-center px-6 py-4 text-lg',
                  pathname === item.href ? 'bg-gray-100' : '',
                )}
                onClick={toggleMenu}
              >
                <item.icon className='mr-4 h-6 w-6' />
                <span>{item.label}</span>
              </button>
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
