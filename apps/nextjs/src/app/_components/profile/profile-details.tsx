'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon } from '@radix-ui/react-icons'

import { t } from '@farmers/language/i18next'
import { routes } from '@farmers/shared/app/constants'

import { ProfileField } from '~/app/_components/profile-field'
import Typography from '~/app/_components/typography'
import { ACCOUNT_DELETE, ModalStore } from '~/store/modal'
import { api } from '~/trpc/react'

interface EditingState {
  name: boolean
  email: boolean
  password: boolean
}

const ProfileDetails: React.FC = () => {
  const utils = api.useUtils()
  const { data: user } = api.user.getSelf.useQuery()
  const { mutateAsync: updateSelf } = api.user.updateSelf.useMutation()
  const [editing, setEditing] = useState<EditingState>({
    name: false,
    email: false,
    password: false,
  })
  const router = useRouter()

  const handleBack = () => {
    router.push(routes.main.profile.index)
  }

  const handleDeleteAccount = () => {
    ModalStore.update({ open: true, type: ACCOUNT_DELETE })
  }

  const handleEdit = (field: keyof EditingState, newState = true) => {
    setEditing((prev) => ({ ...prev, [field]: newState }))
  }

  return (
    <div className='mx-auto w-full max-w-2xl px-4 py-6 lg:px-8 lg:py-8'>
      <button className='mb-6 flex items-center lg:mb-8' onClick={handleBack}>
        <ArrowLeftIcon className='mr-2 h-5 w-5 lg:h-5 lg:w-5' />
        <Typography type='large' className='text-base lg:text-lg'>
          {t('Profile.Details.Button.BackToAccount')}
        </Typography>
      </button>

      <Typography type='h2' className='mb-6 text-2xl lg:text-3xl'>
        {t('Profile.Details.Label.MyProfile')}
      </Typography>

      <div className='mb-8 space-y-6'>
        <ProfileField
          label={t('Profile.Details.Label.Name')}
          initialValue={user?.name ?? ''}
          editing={editing.name}
          onEdit={() => handleEdit('name')}
          onSave={(value) => {
            void updateSelf({ name: value }).then(() => {
              void utils.user.getSelf.invalidate()
            })
            handleEdit('name', false)
          }}
        />
        <ProfileField
          label={t('Profile.Details.Label.Email')}
          initialValue={user?.email ?? ''}
          editing={editing.email}
          edittable={false}
          onEdit={() => handleEdit('email')}
          onSave={() => undefined}
        />
      </div>

      <button onClick={handleDeleteAccount} className='text-left'>
        <Typography
          type='small'
          className='text-sm text-red-500 underline lg:text-base'
        >
          {t('Profile.Details.Button.DeleteAccount')}
        </Typography>
      </button>
    </div>
  )
}

export default ProfileDetails
