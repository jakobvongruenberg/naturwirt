import React from 'react'

import { t } from '@farmers/language/i18next'

import Typography from '~/app/_components/typography'
import { store } from '~/store/zustand'

interface FormFarmNameStepProps {
  onValidationChange?: (isValid: boolean) => void
}

export const FormFarmNameStep: React.FC<FormFarmNameStepProps> = () => {
  const farmName = store.use((s) => s.onboarding.farmName)

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    store.update({
      onboarding: {
        farmName: newValue,
      },
    })
  }

  return (
    <div className='mx-auto flex h-full w-full max-w-2xl flex-col p-4 lg:p-6'>
      <Typography
        type='h2'
        className='mb-6 text-center text-2xl font-bold text-gray-600 lg:text-4xl'
      >
        {t('Onboarding.Step.Label.WhatYouLikeToCallThisFarm')}
      </Typography>
      <div className='w-full'>
        <input
          type='text'
          value={farmName}
          onChange={handleNameChange}
          className={`w-full rounded-md border p-3 text-lg focus:outline-none focus:ring-2 lg:text-xl`}
          placeholder={t('Onboarding.Step.Placeholder.EnterFarmName')}
          required
        />
      </div>
    </div>
  )
}
