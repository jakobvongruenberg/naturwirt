import React from 'react'

import { t } from '@farmers/language/i18next'

import { cn } from '.'

interface SpinnerProps {
  text?: string
  className?: string
}

export const Spinner: React.FC<SpinnerProps> = (props) => {
  return (
    <div
      className={cn(
        'text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white',
        props.className,
      )}
      role='status'
    >
      <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
        {props.text ?? t('Browse.Label.Loading')}
      </span>
    </div>
  )
}

export const SpinnerFullPage: React.FC = () => {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <Spinner />
    </div>
  )
}
