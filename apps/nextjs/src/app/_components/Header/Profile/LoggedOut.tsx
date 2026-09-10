'use client'

import type { ComponentProps } from 'react'

import { t } from '@farmers/language/i18next'
import { cn } from '@farmers/ui'
import { Button } from '@farmers/ui/button'

import { AUTH, ModalStore } from '~/store/modal'

export default function LoggedOut({
  className,
  ...rest
}: ComponentProps<'div'>) {
  const handleLoginClick = () =>
    ModalStore.update({ open: true, type: AUTH, options: { type: 'login' } })
  const handleSignUpClick = () =>
    ModalStore.update({ open: true, type: AUTH, options: { type: 'signup' } })

  return (
    <div className={cn('flex gap-[10px] lg:gap-[20px]', className)} {...rest}>
      <Button
        type='button'
        onClick={handleLoginClick}
        className='h-auto rounded-[8px] border-[1px] border-black bg-white px-[10px] py-[5px] text-[16px] leading-[20px] text-black shadow-none hover:bg-white lg:px-[20px] lg:py-[10px] lg:text-[22px] lg:leading-[24px]'
      >
        {t('HomePage.Login')}
      </Button>
      <Button
        type='button'
        onClick={handleSignUpClick}
        className='h-auto rounded-[8px] px-[10px] py-[5px] text-[16px] leading-[20px] text-white shadow-none hover:bg-black lg:px-[20px] lg:py-[10px] lg:text-[22px] lg:leading-[24px]'
      >
        {t('HomePage.SignUp')}
      </Button>
    </div>
  )
}
