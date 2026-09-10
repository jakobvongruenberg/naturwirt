'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeftIcon } from '@radix-ui/react-icons'

import { t } from '@farmers/language/i18next'
import { routes } from '@farmers/shared/app/constants'

import { NotificationItem } from '~/app/_components/notification-item'
import Typography from '~/app/_components/typography'

const Notifications = () => {
  const router = useRouter()

  const handleBack = () => {
    router.push(routes.main.profile.index)
  }

  return (
    <div className='mx-auto max-w-2xl px-4 py-6 lg:px-8 lg:py-8'>
      <button className='mb-6 flex items-center lg:mb-8' onClick={handleBack}>
        <ArrowLeftIcon className='mr-2 h-5 w-5 lg:h-5 lg:w-5' />
        <Typography type='large' className='text-base lg:text-lg'>
          {t('Profile.Details.Button.BackToAccount')}
        </Typography>
      </button>

      <div className='flex flex-col'>
        <Typography type='h2' className='mb-4 text-2xl lg:mb-6 lg:text-3xl'>
          {t('Profile.Notification.Label.Notifications')}
        </Typography>

        <div className='space-y-4'>
          <NotificationItem
            title={t('Profile.Notification.Label.EmailNotifications')}
            explanation={t('Profile.Notification.Label.ReceiveEmails')}
          />
        </div>
      </div>
    </div>
  )
}

export default Notifications
