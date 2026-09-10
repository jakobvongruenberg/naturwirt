import React, { useCallback } from 'react'

import type { Animal } from '@farmers/validators'
import { animalTypeEnum } from '@farmers/db/schema/farm'
import { t } from '@farmers/language/i18next'
import { cn } from '@farmers/ui'
import { Button } from '@farmers/ui/button'
import { Checkbox } from '@farmers/ui/checkbox'
import { Input } from '@farmers/ui/input'

import Typography from '~/app/_components/typography'
import { store } from '~/store/zustand'

interface Animals {
  hasAnimals: boolean
  animalTypes: Animal[]
  livestockUnit: number | undefined
}

interface FormAnimalStepProps {
  onChange?: (animals: Animals) => void
  onNext?: () => void
  onBack?: () => void
}

const animalToLabel: Record<Animal, string> = {
  cow: 'Kühe',
  pig: 'Schweine',
  poultry: 'Geflügel',
  sheep: 'Schafe',
  goats: 'Ziegen',
  others: 'Andere',
}

export const FormAnimalStep: React.FC<FormAnimalStepProps> = ({ onChange }) => {
  const animals = store.use((s) => s.onboarding.animals)

  const updateStore = useCallback(
    (updater: (prevAnimals: Animals) => Partial<Animals>) => {
      store.update({
        onboarding: {
          animals: updater(animals),
        },
      })

      store.useBoundStore.setState((state) => {
        const updatedAnimals = {
          ...state.onboarding.animals,
          ...updater(state.onboarding.animals),
        }
        if (onChange) {
          onChange(updatedAnimals)
        }
        return {
          ...state,
          onboarding: {
            ...state.onboarding,
            animals: updatedAnimals,
          },
        }
      })
    },
    [animals, onChange],
  )

  const handleAnimalSelection = useCallback(
    (hasAnimals: boolean) => {
      updateStore((prev) => ({
        hasAnimals,
        animalTypes: hasAnimals ? prev.animalTypes : [],
      }))
    },
    [updateStore],
  )

  const handleAnimalTypeToggle = useCallback(
    (type: Animal) => {
      store.useBoundStore.setState((state) => {
        const currentAnimalTypes = state.onboarding.animals.animalTypes || []
        const newAnimalTypes = currentAnimalTypes.includes(type)
          ? currentAnimalTypes.filter((t) => t !== type)
          : [...currentAnimalTypes, type]

        return {
          onboarding: {
            ...state.onboarding,
            animals: {
              ...state.onboarding.animals,
              animalTypes: newAnimalTypes,
              // Don't set to false if there are no animals (jarring UX)
              ...(newAnimalTypes.length > 0 ? { hasAnimals: true } : {}),
            },
          },
        }
      })

      if (onChange) {
        const state = store.useBoundStore.getState()
        onChange(state.onboarding.animals)
      }
    },
    [onChange],
  )

  // Input logic for livestockUnit (like farm size input)
  const [inputValue, setInputValue] = React.useState(
    animals.livestockUnit === undefined || animals.livestockUnit === 0
      ? ''
      : String(animals.livestockUnit),
  )
  React.useEffect(() => {
    setInputValue(
      animals.livestockUnit === undefined || animals.livestockUnit === 0
        ? ''
        : String(animals.livestockUnit),
    )
  }, [animals.livestockUnit])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    if (value.startsWith('-')) {
      value = value.replace(/^-+/, '')
    }
    setInputValue(value)
    const parsed = parseInt(value, 10)
    if (!isNaN(parsed)) {
      updateStore(() => ({ livestockUnit: parsed < 0 ? 0 : parsed }))
    } else if (value === '') {
      updateStore(() => ({ livestockUnit: 0 }))
    }
  }

  return (
    <div className='mx-auto flex h-full max-w-4xl flex-col place-items-center p-4 lg:p-6'>
      <Typography
        type='h2'
        className='mb-6 text-center text-2xl font-bold text-gray-600 lg:text-3xl'
      >
        {t('Onboarding.Step.Label.DoYouHaveAnimals')}
      </Typography>
      <div className='mb-8 flex w-full flex-col gap-4 lg:flex-row'>
        <Button
          variant={animals.hasAnimals ? 'primary' : 'outline'}
          onClick={() => handleAnimalSelection(true)}
          className={cn('flex-1', {
            'text-white': animals.hasAnimals,
          })}
        >
          {t('Onboarding.Step.Button.YesIHaveSome')}
        </Button>
        <Button
          variant={!animals.hasAnimals ? 'primary' : 'outline'}
          onClick={() => handleAnimalSelection(false)}
          className={cn('flex-1', {
            'text-white': !animals.hasAnimals,
          })}
        >
          {t('Onboarding.Step.Button.OnlyPlants')}
        </Button>
      </div>
      {animals.hasAnimals && (
        <>
          <Typography
            type='h3'
            className='mb-2 text-center text-xl font-bold text-gray-600 lg:text-left lg:text-2xl'
          >
            {t('Onboarding.Step.Label.WhichTypeOfAnimals')}
          </Typography>
          <Typography
            type='small'
            className='mb-4 text-center text-gray-600 lg:text-left'
          >
            {t('Onboarding.Step.Label.PickAtLeastOne')}
          </Typography>
          <div className='mb-8 grid w-full grid-cols-1 gap-4 lg:grid-cols-3'>
            {animalTypeEnum.enumValues.map((type) => (
              <div
                key={type}
                className='flex items-center space-x-2 rounded-md p-3 lg:bg-gray-100 lg:bg-transparent'
              >
                <Checkbox
                  id={type}
                  checked={animals.animalTypes.includes(type)}
                  onCheckedChange={() => handleAnimalTypeToggle(type)}
                />
                <label
                  htmlFor={type}
                  className='cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  {animalToLabel[type]}
                </label>
              </div>
            ))}
          </div>
          <Typography
            type='h3'
            className='mb-4 text-center text-xl font-bold text-gray-600 lg:text-left lg:text-2xl'
          >
            {t(
              'Onboarding.Step.Label.WhatIsYourRoughageConsumingLivestockUnit',
            )}
          </Typography>
          <div className='mx-auto w-full lg:max-w-md'>
            <div className='mb-4 flex justify-center'>
              <div className='flex items-center gap-2'>
                <Input
                  type='number'
                  value={inputValue}
                  onChange={handleInputChange}
                  className='w-50 text-center text-lg'
                  placeholder={t(
                    'Onboarding.Step.Label.HectarePlaceholder',
                    '0',
                  )}
                />
                <span className='text-lg text-gray-500'>RGV</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
