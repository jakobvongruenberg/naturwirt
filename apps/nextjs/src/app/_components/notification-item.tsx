'use client'

import React from 'react'

import type { NotificationItemProps } from '@farmers/validators'
import { t } from '@farmers/language/i18next'
import { Switch } from '@farmers/ui/switch'
import { toast } from '@farmers/ui/toast'

import { api } from '~/trpc/react'
import Typography from './typography'

export const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  explanation,
}) => {
  const utils = api.useUtils()
  const { data: user } = api.user.getSelf.useQuery()
  const { mutateAsync: updateSelf } = api.user.updateSelf.useMutation()

  return (
    <div className='flex items-center justify-between border-b-2 py-6'>
      <div className='flex-grow'>
        <Typography type='p' className='font-semibold'>
          {title}
        </Typography>
        <Typography type='small' className='text-gray-500'>
          {explanation}
        </Typography>
      </div>
      <Switch
        checked={user?.notificationsEnabled ?? false}
        onCheckedChange={(checked) => {
          toast.success(t('Profile.Notification.Toast.Updated'))
          void updateSelf({ notificationsEnabled: checked }).then(() => {
            void utils.user.getSelf.invalidate()
          })
        }}
      />
    </div>
  )
}
