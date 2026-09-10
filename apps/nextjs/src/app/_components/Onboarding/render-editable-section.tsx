import { useEffect, useState } from 'react'

import type { OnboardingData } from '@farmers/validators'
import { t } from '@farmers/language/i18next'
import { cn } from '@farmers/ui'
import { Button } from '@farmers/ui/button'
import { Input } from '@farmers/ui/input'

import Typography from '~/app/_components/typography'
import { FormAnimalStep } from './form-animal-step'

export const EditableSection = <T extends keyof OnboardingData>({
  section,
  value,
  updateFarmData,
}: {
  section: T
  value: OnboardingData[T]
  updateFarmData: (newData: Partial<OnboardingData>) => void
}) => {
  // const farmData = store.use((s) => s.onboarding)

  switch (section) {
    case 'location':
      return (
        <input
          type='text'
          value={value as OnboardingData['location']}
          onChange={(e) => updateFarmData({ location: e.target.value })}
          className='w-full rounded border p-2'
        />
      )

    case 'farmingType':
      // eslint-disable-next-line no-case-declarations
      const farmingType = value as OnboardingData['farmingType']
      return (
        <div className='flex gap-2'>
          {['🌱 organic', '🚜 conventional'].map((type) => (
            <Button
              key={type}
              onClick={() =>
                updateFarmData({
                  farmingType: type.includes('organic')
                    ? 'organic'
                    : 'conventional',
                })
              }
              variant={
                farmingType ===
                (type.includes('organic') ? 'organic' : 'conventional')
                  ? 'primary'
                  : 'outline'
              }
              className={cn({ 'text-white': farmingType === type })}
            >
              {type}
            </Button>
          ))}
        </div>
      )

    case 'farmName':
      return (
        <input
          type='text'
          value={value as OnboardingData['farmName']}
          onChange={(e) => updateFarmData({ farmName: e.target.value })}
          className='w-full rounded border p-2'
          placeholder={t('Onboarding.Step.Placeholder.EnterFarmName')}
        />
      )

    case 'farmSize':
      // eslint-disable-next-line no-case-declarations
      const farmSize = value as OnboardingData['farmSize']
      // eslint-disable-next-line no-case-declarations
      const [inputValue, setInputValue] = useState(
        farmSize === 0 ? '' : String(farmSize),
      )

      useEffect(() => {
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
          updateFarmData({ farmSize: parsed < 0 ? 0 : parsed })
        } else if (value === '') {
          updateFarmData({ farmSize: 0 })
        }
      }

      return (
        <div className='flex items-center gap-2'>
          <Input
            type='number'
            value={inputValue}
            onChange={handleInputChange}
            className='w-32 text-center'
            placeholder={t('Onboarding.Step.Label.HectarePlaceholder')}
          />
          <span className='text-gray-500'>ha</span>
        </div>
      )

    case 'animals':
      return (
        <div className='w-full'>
          <FormAnimalStep
            onChange={(newAnimals) => updateFarmData({ animals: newAnimals })}
          />
        </div>
      )

    default:
      return null
  }
}
