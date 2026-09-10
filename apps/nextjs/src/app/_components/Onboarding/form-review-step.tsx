import React, { useEffect, useState } from 'react'

import type { OnboardingData } from '@farmers/validators'
import { t } from '@farmers/language/i18next'

import { EditableSection } from '~/app/_components/Onboarding/render-editable-section'
import { ReviewSection } from '~/app/_components/Onboarding/review-section'
import Typography from '~/app/_components/typography'
import { store } from '~/store/zustand'
import { validateInput } from './input-validation'
import styles from './toast.module.css'

const Toast = ({ message }: { message: string }) => {
  return (
    <div className={styles.toast}>
      <span className='mr-2'>⚠️</span>
      {message}
    </div>
  )
}

interface FormReviewStepProps {
  onSaveStateChange?: (isAllSaved: boolean) => void
}

export const FormReviewStep: React.FC<FormReviewStepProps> = ({
  onSaveStateChange,
}) => {
  const farmData = store.use((s) => s.onboarding)
  const [editingSections, setEditingSections] = useState<
    (keyof OnboardingData)[]
  >([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Notify parent component about save state
    onSaveStateChange?.(editingSections.length === 0)
  }, [editingSections, onSaveStateChange])

  const handleEdit = (section: keyof OnboardingData) => {
    setEditingSections((sections) =>
      sections.includes(section)
        ? sections.filter((s) => s !== section)
        : [...sections, section],
    )
  }

  const handleSave = (section: keyof OnboardingData) => {
    if (validateInput(section, setError)) {
      setEditingSections((sections) => sections.filter((s) => s !== section))
      setError(null)
    }
  }

  const formatContent = <T extends keyof OnboardingData>(
    key: T,
    value: OnboardingData[T],
  ) => {
    let typedValue: OnboardingData['animals']
    switch (key) {
      case 'farmSize':
        return `${value as OnboardingData['farmSize']} ha`
      case 'animals':
        typedValue = value as OnboardingData['animals']
        if (typedValue?.hasAnimals) {
          const formattedAnimalTypes = typedValue.animalTypes.join(', ')
          return t('Onboarding.Step.Label.HasAnimalsLiveStockUnit', {
            animalTypes: formattedAnimalTypes,
            livestockUnit: typedValue.livestockUnit ?? 0,
          })
        } else {
          return t('Onboarding.Step.Label.NoAnimals')
        }
      case 'farmingType':
        return (
          (value as OnboardingData['farmingType']) ??
          t('Onboarding.Step.Label.NotSpecified')
        )
      case 'location':
        return (
          (value as OnboardingData['location']) ??
          t('Onboarding.Step.Label.NotSpecified')
        )
      case 'farmName':
        return (
          (value as OnboardingData['farmName']) ??
          t('Onboarding.Step.Label.NotSpecified')
        )
      default:
        throw new Error('Invalid key')
    }
  }

  const sections: { title: string; key: keyof OnboardingData }[] = [
    { title: t('Onboarding.Step.Label.Location'), key: 'location' },
    { title: t('Onboarding.Step.Label.FarmingType'), key: 'farmingType' },
    { title: t('Onboarding.Step.Label.FarmSize'), key: 'farmSize' },
    { title: t('Onboarding.Step.Label.Animals'), key: 'animals' },
    { title: t('Onboarding.Step.Label.FarmName'), key: 'farmName' },
  ]

  return (
    <div className='mx-auto flex h-full max-w-4xl flex-col items-stretch p-4 lg:p-6'>
      <Typography
        type='h2'
        className='mb-6 text-center text-2xl font-bold text-gray-600 lg:text-left lg:text-3xl'
      >
        {t('Onboarding.Step.Label.ReviewYourFarmDetails')}
      </Typography>
      {error && <Toast message={error} />}
      <div className='space-y-6'>
        {sections.map(({ title, key }) => (
          <ReviewSection
            key={key}
            title={title}
            content={formatContent(key, farmData[key])}
            isEditing={editingSections.includes(key)}
            onEdit={() => handleEdit(key)}
            onSave={() => handleSave(key)}
            editableContent={
              <EditableSection
                value={farmData[key]}
                section={key}
                updateFarmData={(newData: Partial<OnboardingData>) => {
                  const newOnboardingData: OnboardingData = {
                    ...farmData,
                    ...newData,
                  }
                  store.update({ onboarding: newOnboardingData })
                }}
              />
            }
          />
        ))}
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
