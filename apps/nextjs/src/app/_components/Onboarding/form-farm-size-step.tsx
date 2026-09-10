import React from 'react'

import { t } from '@farmers/language/i18next'
import { Input } from '@farmers/ui/input'

import Typography from '~/app/_components/typography'
import { store } from '~/store/zustand'

export const FormFarmSizeStep = () => {
  const farmSize = store.use((s) => s.onboarding.farmSize) ?? 0
  const [inputValue, setInputValue] = React.useState(
    farmSize === 0 ? '' : String(farmSize),
  )

  React.useEffect(() => {
    setInputValue(farmSize === 0 ? '' : String(farmSize))
  }, [farmSize])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    if (value.startsWith('-')) {
      value = value.replace(/^-+/, '')
    }
    setInputValue(value)
    const parsed = parseInt(value, 10)
    if (!isNaN(parsed)) {
      store.update({ onboarding: { farmSize: parsed < 0 ? 0 : parsed } })
    } else if (value === '') {
      store.update({ onboarding: { farmSize: 0 } })
    }
  }

  return (
    <div className='flex h-full flex-col items-stretch p-4 lg:p-6'>
      <Typography
        type='h2'
        className='mb-8 self-center text-center text-2xl font-bold text-gray-600 lg:text-left lg:text-3xl'
      >
        {t('Onboarding.Step.Label.HowBigIsYourFarm')}
      </Typography>
      <div className='mx-auto w-full'>
        <div className='mb-8 flex justify-center'>
          <div className='flex items-center gap-2'>
            <Input
              type='number'
              value={inputValue}
              onChange={handleInputChange}
              className='w-50 text-center text-lg lg:text-xl'
              placeholder={t('Onboarding.Step.Label.HectarePlaceholder')}
            />
            <span className='text-lg text-gray-500 lg:text-xl'>ha</span>
          </div>
        </div>
      </div>
    </div>
  )
}
