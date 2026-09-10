import type { StaticImport } from 'next/dist/shared/lib/get-img-props'
import type { ReactNode } from 'react'
import React from 'react'
import Image from 'next/image'
import { t } from 'i18next'

import { cn } from '@farmers/ui'

import Typography from './typography'

interface ListComponentProps {
  icon?: string | StaticImport
  title: string
  items?: string[]
  children?: ReactNode
  checkmark?: boolean
}

const ListComponent: React.FC<ListComponentProps> = ({
  icon,
  title,
  items = [],
  children,
  checkmark,
}) => {
  const filteredItems = items.filter(Boolean)

  return (
    <div className='flex items-start'>
      {icon ? (
        <div className='mr-5 flex-shrink-0'>
          <Image
            src={icon}
            alt=''
            className='h-12 w-12'
            width={48}
            height={48}
          />
        </div>
      ) : null}
      <div>
        <Typography type={icon ? 'h3' : 'h2'} className='mb-2'>
          {title}
        </Typography>
        {filteredItems.length === 0 && typeof children === 'undefined' && (
          <Typography type='p' className='text-stone-700'>
            {t('NotFound.Label.NoItems')}
          </Typography>
        )}
        {filteredItems.length === 1 && (
          <Typography type='p' className='text-stone-700'>
            {filteredItems[0]}
          </Typography>
        )}
        {filteredItems.length > 1 && (
          <ul className={cn('list-none space-y-4')}>
            {filteredItems.map((item, index) => (
              <Typography
                type='li'
                key={index}
                className='flex items-start space-x-0 text-stone-700'
              >
                <Image
                  src={
                    checkmark
                      ? '/images/icons/list-checkmark.svg'
                      : '/images/icons/list-bullet.svg'
                  }
                  alt=''
                  width={32}
                  height={32}
                  className={checkmark ? 'mr-4' : ''}
                />{' '}
                <span className='mt-[2px]'>{item}</span>
              </Typography>
            ))}
          </ul>
        )}
        {children}
      </div>
    </div>
  )
}

export default ListComponent
