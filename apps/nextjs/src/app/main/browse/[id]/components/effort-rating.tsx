import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { env } from '@farmers/env'
import { t } from '@farmers/language/i18next'
import { cn } from '@farmers/ui'

import Typography from '~/app/_components/typography'
import InfoPopover from './info-popover'

interface EffortRatingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  effortLevel?: 'low' | 'medium' | 'high'
  measureTitle: string
  tooltip?: string
}

const EffortRatingCard: React.FC<EffortRatingCardProps> = ({
  effortLevel,
  measureTitle,
  className,
  ...rest
}) => {
  const getEffortDetails = () => {
    switch (effortLevel) {
      case 'low':
        return {
          icon: '/images/icons/bar-effort.svg',
          title: t('Browse.EffortRatingCard.LowEffort'),
          description: t('Browse.EffortRatingCard.LowEffortDescription'),
        }
      case 'medium':
        return {
          icon: '/images/icons/bar-effort-med.svg',
          title: t('Browse.EffortRatingCard.MediumEffort'),
          description: t('Browse.EffortRatingCard.MediumEffortDescription'),
        }
      case 'high':
      default:
        return {
          icon: '/images/icons/bar-effort-high.svg',
          title: t('Browse.EffortRatingCard.HighEffort'),
          description: t('Browse.EffortRatingCard.HighEffortDescription'),
        }
    }
  }

  const { icon, title, description } = getEffortDetails()

  return (
    <div
      className={cn(
        'w-full rounded-lg border border-[#D9D9D9] p-4 lg:px-[30px] lg:py-6',
        className,
      )}
      {...rest}
    >
      <div className='flex items-center gap-3 lg:gap-[20px]'>
        <Image
          src={icon}
          alt=''
          className='h-12 w-12 lg:h-16 lg:w-16'
          width={64}
          height={64}
        />
        <Typography type='h2' className='text-lg lg:text-2xl'>
          {title}
        </Typography>
      </div>
      <Typography
        type='p'
        className='mt-3 text-sm text-[#3C3C3C] lg:mt-4 lg:text-base'
      >
        {description}
      </Typography>
      <Link
        className='mt-4 flex items-center gap-2 hover:underline lg:mt-6 lg:gap-[10px]'
        href={`mailto:${encodeURIComponent(
          env.EMAIL_ADMIN_DESTINATIONS,
        )}?subject=${encodeURIComponent(`${measureTitle} - ${title}`)}`}
      >
        <Image
          src='/images/icons/comments.svg'
          alt='comments icon'
          className='h-6 w-6 lg:h-8 lg:w-8'
          width={32}
          height={32}
        />
        <Typography type='large' className='text-sm lg:text-base'>
          {t('Browse.EffortRatingCard.SuggestNewRating')}
        </Typography>
      </Link>
    </div>
  )
}

export default EffortRatingCard

export const EffortRating: React.FC<EffortRatingCardProps> = ({
  className,
  effortLevel,
  measureTitle: _measureTitle,
  tooltip,
  ...rest
}) => {
  const getEffortDetails = () => {
    switch (effortLevel) {
      case 'low':
        return {
          icon: '/images/icons/bar-effort.svg',
          label: t('Browse.EffortRating.Low'),
        }
      case 'medium':
        return {
          icon: '/images/icons/bar-effort-med.svg',
          label: t('Browse.EffortRating.Medium'),
        }
      case 'high':
      default:
        return {
          icon: '/images/icons/bar-effort-high.svg',
          label: t('Browse.EffortRating.High'),
        }
    }
  }

  const { icon, label } = getEffortDetails()

  return (
    <div
      className={cn(
        'grid grid-cols-[32px_1fr] items-center gap-2 lg:grid-cols-[40px_1fr] lg:gap-[10px]',
        className,
      )}
      {...rest}
    >
      <div className='relative h-8 w-8 lg:h-10 lg:w-10'>
        <Image
          src={icon}
          alt={`effort-${effortLevel}`}
          layout='fill'
          objectFit='contain'
        />
      </div>
      <div>
        <Typography type='small' className='text-xs text-[#646464] lg:text-sm'>
          {t('Browse.EffortRating.Effort')}
        </Typography>
        <div className='flex items-center gap-1'>
          <Typography type='large' className='font-semibold'>
            {label}
          </Typography>
          <InfoPopover description={tooltip ?? label} />
        </div>
      </div>
    </div>
  )
}
