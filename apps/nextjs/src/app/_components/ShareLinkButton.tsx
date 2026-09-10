'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { usePathname, useSearchParams } from 'next/navigation'

import { t } from '@farmers/language/i18next'
import { Button } from '@farmers/ui/button'
import { Input } from '@farmers/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@farmers/ui/popover'

import Typography from './typography'

const ShareLinkButton: React.FC = () => {
  const [copied, setCopied] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const queryString = searchParams?.toString()
  const link = `${window.location.origin}${pathname}${queryString ? `?${queryString}` : ''}`

  const handleCopy = () => {
    void navigator.clipboard.writeText(link).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-10 items-center space-x-2 px-2 text-base font-semibold lg:h-[42px] lg:px-2.5 lg:text-[22px]'
        >
          <Image
            src='/images/icons/share.svg'
            alt=''
            width={24}
            height={24}
            className='lg:h-8 lg:w-8'
          />
          <span className='hidden lg:inline'>{t('Navbar.Buttons.Share')}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[90vw] max-w-[400px] p-4 lg:w-[400px] lg:px-5 lg:py-6'>
        <Typography
          type='large'
          className='mb-2 text-lg lg:mb-3 lg:text-[20px]'
        >
          {t('Navbar.Buttons.Share')}
        </Typography>
        <Input
          value={link}
          className='h-10 px-3 text-sm lg:h-[51px] lg:px-4 lg:text-base'
          readOnly
        />
        <Button
          onClick={handleCopy}
          variant='primary'
          className='mt-3 h-10 w-full text-base lg:mt-4 lg:h-[48px] lg:text-[20px]'
        >
          {copied ? (
            <>
              <Image
                src='/images/icons/done.svg'
                alt=''
                width={20}
                height={20}
                className='mr-2 lg:h-6 lg:w-6'
              />
              {t('Navbar.Buttons.Copied')}
            </>
          ) : (
            t('Navbar.Buttons.Copy')
          )}
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default ShareLinkButton
