import React from 'react'

import { t } from '@farmers/language/i18next'
import { Button } from '@farmers/ui/button'

import Typography from '~/app/_components/typography'

interface ReviewSectionProps {
  title: string
  content: string
  isEditing: boolean
  onEdit: () => void
  onSave: () => void
  editableContent: React.ReactNode
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  title,
  content,
  isEditing,
  onEdit,
  onSave,
  editableContent,
}) => {
  return (
    <div className='border-b py-4'>
      <div className='mb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between'>
        <Typography
          type='h3'
          className='mb-2 text-xl text-gray-600 lg:mb-0 lg:text-2xl'
        >
          {title}
        </Typography>
        {!isEditing ? (
          <Button
            onClick={onEdit}
            variant='link'
            className='self-start text-blue-500 lg:self-auto'
          >
            {t('Onboarding.Step.Button.Edit')}
          </Button>
        ) : (
          <Button
            onClick={onSave}
            variant='primary'
            className='self-start lg:self-auto'
          >
            {t('Onboarding.Step.Button.Save')}
          </Button>
        )}
      </div>
      {isEditing ? (
        <div className='w-full'>{editableContent}</div>
      ) : (
        <Typography
          type='p'
          className='mb-2 text-base text-gray-600 lg:text-lg'
        >
          {content}
        </Typography>
      )}
    </div>
  )
}
