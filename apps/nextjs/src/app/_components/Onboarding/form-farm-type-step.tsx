import React from 'react'

import type { FarmingType } from '@farmers/validators'
import { t } from '@farmers/language/i18next'
import { cn } from '@farmers/ui'
import { Button } from '@farmers/ui/button'

import Typography from '~/app/_components/typography'
import { store } from '~/store/zustand'

export const FormFarmingTypeStep = () => {
  const selectedType = store.use((s) => s.onboarding.farmingType)
  const isConventional = selectedType === 'conventional'
  const isOrganic = selectedType === 'organic'

  const handleTypeSelection = (type: FarmingType) => {
    store.update({
      onboarding: { farmingType: type },
    })
  }

  return (
    <div className='flex h-full flex-col items-center p-4 lg:p-6'>
      <Typography
        type='h2'
        className='mb-4 text-center text-2xl font-bold text-gray-600 lg:text-left lg:text-3xl'
      >
        {t('Onboarding.Step.Label.WhichTypeOfFarmingAreYouCurrentlyOperating')}
      </Typography>
      <Typography
        type='p'
        className='mb-6 text-center text-sm text-gray-600 lg:text-left lg:text-base'
      >
        {t('Onboarding.Step.Label.YouCanChangeThisLater')}
      </Typography>
      <div className='flex w-full max-w-md flex-col gap-4 lg:flex-row'>
        <Button
          variant={isOrganic ? 'primary' : 'outline'}
          className='h-auto flex-1 py-4 text-base lg:text-lg'
          onClick={() => handleTypeSelection('organic')}
        >
          <span className='mr-2'>🌱</span>
          <Typography
            type='p'
            className={cn('font-semibold', { 'text-white': isOrganic })}
          >
            {t('Onboarding.Step.Button.Organic')}
          </Typography>
        </Button>
        <Button
          variant={isConventional ? 'primary' : 'outline'}
          className='h-auto flex-1 py-4 text-base lg:text-lg'
          onClick={() => handleTypeSelection('conventional')}
        >
          <span className='mr-2'>🚜</span>
          <Typography
            type='p'
            className={cn('font-semibold', { 'text-white': isConventional })}
          >
            {t('Onboarding.Step.Button.Conventional')}
          </Typography>
        </Button>
      </div>
    </div>
  )
}
