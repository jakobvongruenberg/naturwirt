import type { ReactNode } from 'react'

import { cn } from '@farmers/ui'

export interface Typography {
  children: ReactNode
  type:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'p'
    | 'blockqoute'
    | 'large'
    | 'small'
    | 'muted'
    | 'li'
  className?: string
}

const commonClassName = 'text-black'
function Typography({ children, type, className }: Typography) {
  switch (type) {
    case 'h1':
      return (
        <h1
          className={cn(
            'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
            commonClassName,
            className,
          )}
        >
          {children}
        </h1>
      )
    case 'h2':
      return (
        <h2
          className={cn(
            'scroll-m-20 text-[40px] font-semibold tracking-tight first:mt-0',
            commonClassName,
            className,
          )}
        >
          {children}
        </h2>
      )

    case 'h3':
      return (
        <h3
          className={cn(
            'scroll-m-20 text-3xl text-[32px] font-semibold tracking-tight',
            commonClassName,
            className,
          )}
        >
          {children}
        </h3>
      )

    case 'h4':
      return (
        <h4
          className={cn(
            'scroll-m-20 text-xl font-semibold tracking-tight',
            commonClassName,
            className,
          )}
        >
          {children}
        </h4>
      )
    case 'blockqoute':
      return (
        <blockquote
          className={cn(
            'mt-6 border-l-2 pl-6 italic',
            commonClassName,
            className,
          )}
        >
          {children}
        </blockquote>
      )
    case 'large':
      return (
        <div
          className={cn('text-2xl font-semibold', commonClassName, className)}
        >
          {children}
        </div>
      )
    case 'small':
      return (
        <small
          className={cn('text-[16px] leading-none', commonClassName, className)}
        >
          {children}
        </small>
      )
    case 'muted':
      return (
        <p
          className={cn(
            'text-sm text-muted-foreground',
            commonClassName,
            className,
          )}
        >
          {children}
        </p>
      )
    case 'li':
      return (
        <li
          className={cn(
            'text-2xl font-normal leading-7 text-[##3C3C3C]',
            commonClassName,
            className,
          )}
        >
          {children}
        </li>
      )
    case 'p':
    default:
      return (
        <p
          className={cn(
            'text-2xl font-normal leading-7 text-[##3C3C3C]',
            commonClassName,
            className,
          )}
        >
          {children}
        </p>
      )
  }
}

export default Typography
