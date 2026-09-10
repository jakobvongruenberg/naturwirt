'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import type { OnboardingData } from '@farmers/validators'
import { t } from '@farmers/language/i18next'
import { routes } from '@farmers/shared/app/constants'
import { Button } from '@farmers/ui/button'

import { EditableSection } from '~/app/_components/Onboarding/render-editable-section'
import { ReviewSection } from '~/app/_components/Onboarding/review-section'
import Typography from '~/app/_components/typography'
import { api } from '~/trpc/react'

export const CrupdateFarm = ({
  farm,
}: {
  farm: OnboardingData & { id: number }
}) => {
  const router = useRouter()
  const { mutateAsync: updateFarm } = api.user.upsertFarm.useMutation()
  const { mutateAsync: deleteFarm } = api.user.deleteFarm.useMutation()
  const [placeholderFarm, setPlaceholderFarm] = useState(farm)
  const [editingSections, setEditingSections] = useState<
    (keyof OnboardingData)[]
  >([])

  useEffect(() => {
    setPlaceholderFarm(farm)
  }, [farm])

  const handleEdit = (section: keyof OnboardingData) => {
    setEditingSections((sections) =>
      sections.includes(section)
        ? sections.filter((s) => s !== section)
        : [...sections, section],
    )
  }

  const handleSave = (section: keyof OnboardingData) => {
    setEditingSections((sections) => sections.filter((s) => s !== section))
  }

  const handleDelete = () => {
    void deleteFarm({ id: farm.id }).then(() => {
      router.push(routes.main.profile.index)
    })
  }

  const formatContent = <T extends keyof OnboardingData>(
    key: T,
    value: OnboardingData[T],
  ) => {
    switch (key) {
      case 'farmSize':
        return `${value as OnboardingData['farmSize']} ha`
      case 'animals':
        // eslint-disable-next-line no-case-declarations
        const typedValue = value as OnboardingData['animals']
        return typedValue?.hasAnimals
          ? t('Onboarding.Step.Label.HasAnimalsLiveStockUnit', {
              animalTypes: typedValue?.animalTypes.join(', '),
              livestockUnit: typedValue.livestockUnit ?? 0,
            })
          : t('Onboarding.Step.Label.NoAnimals')
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
    <div className='mx-auto flex h-full max-w-3xl flex-col items-stretch p-6 pb-24'>
      <Typography type='h2' className='mb-4 font-bold text-gray-600'>
        {t('Onboarding.Step.Label.UpdateFarmDetails')}
      </Typography>
      {sections.map(({ title, key }) => (
        <ReviewSection
          key={key}
          title={title}
          content={formatContent(key, placeholderFarm[key])}
          isEditing={editingSections.includes(key)}
          onEdit={() => handleEdit(key)}
          onSave={() => {
            handleSave(key)
            void updateFarm({
              farmSize: placeholderFarm.farmSize,
              location: placeholderFarm.location,
              name: placeholderFarm.farmName,
              farmType: placeholderFarm.farmingType ?? undefined,
              animals: placeholderFarm.animals.animalTypes,
              id: placeholderFarm.id,
            })
          }}
          editableContent={
            <EditableSection
              key={`${placeholderFarm.id}-${key}`}
              value={placeholderFarm[key]}
              section={key}
              updateFarmData={(newData: Partial<OnboardingData>) => {
                setPlaceholderFarm((prev) => ({
                  ...prev,
                  ...newData,
                }))
              }}
            />
          }
        />
      ))}
      <Button
        className='mt-6 border border-destructive bg-transparent text-destructive shadow-sm hover:border-destructive/90 hover:bg-destructive/10'
        onClick={handleDelete}
      >
        {t('Measure.Button.Delete')}
      </Button>
    </div>
  )
}
