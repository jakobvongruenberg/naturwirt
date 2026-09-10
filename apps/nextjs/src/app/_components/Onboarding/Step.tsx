'use client'

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { t } from '@farmers/language/i18next'
import { routes } from '@farmers/shared/app/constants'
import { cn } from '@farmers/ui'
import { Spinner } from '@farmers/ui/spinner'

import { FormAnimalStep } from '~/app/_components/Onboarding/form-animal-step'
import { FormFarmNameStep } from '~/app/_components/Onboarding/form-farm-name-step'
import { FormFarmSizeStep } from '~/app/_components/Onboarding/form-farm-size-step'
import { FormFarmingTypeStep } from '~/app/_components/Onboarding/form-farm-type-step'
import { FormLocationStep } from '~/app/_components/Onboarding/form-location-step'
import { FormReviewStep } from '~/app/_components/Onboarding/form-review-step'
import { store } from '~/store/zustand'
import { api } from '~/trpc/react'
import { validateInput } from './input-validation'
import styles from './toast.module.css'

const stepVariant = {
  location: 'location',
  farmingType: 'farmingType',
  farmSize: 'farmSize',
  animals: 'animals',
  farmName: 'farmName',
  review: 'review',
} as const

type StepVariant = (typeof stepVariant)[keyof typeof stepVariant]

const stepComponents = {
  [stepVariant.location]: FormLocationStep,
  [stepVariant.farmingType]: FormFarmingTypeStep,
  [stepVariant.farmSize]: FormFarmSizeStep,
  [stepVariant.animals]: FormAnimalStep,
  [stepVariant.farmName]: FormFarmNameStep,
  [stepVariant.review]: FormReviewStep,
}

const Toast = ({ message }: { message: string }) => {
  return (
    <div className={styles.toast}>
      <span className='mr-2'>⚠️</span>
      {message}
    </div>
  )
}

export function MultiStepFormPage() {
  const { mutateAsync: upsertFarm } = api.user.upsertFarm.useMutation()
  const utils = api.useUtils()
  const router = useRouter()
  const searchParams = useSearchParams()
  const step = searchParams?.get('step')
  const [error, setError] = useState<string | null>(null)
  const [isAllSaved, setIsAllSaved] = useState(true)

  const navigateToNextStep = () => {
    const currentIndex = Object.keys(stepVariant).indexOf(step ?? 'location')
    const nextStep = Object.keys(stepVariant)[currentIndex + 1]
    if (nextStep) {
      if (
        validateInput(Object.keys(stepVariant)[currentIndex] ?? '', setError)
      ) {
        router.push(`?step=${nextStep}`)
      }
    } else if (step === 'review') {
      const farmData = store.get('onboarding')
      void upsertFarm({
        location: farmData.location,
        farmType: farmData.farmingType ?? 'conventional',
        farmSize: farmData.farmSize,
        animals: farmData.animals.animalTypes,
        name: farmData.farmName,
      }).then(() => {
        void utils.user.invalidate()
        router.push(routes.main.profile.index)
      })
    }
  }

  const navigateToPreviousStep = () => {
    const currentIndex = Object.keys(stepVariant).indexOf(step ?? 'location')
    const previousStep = Object.keys(stepVariant)[currentIndex - 1]
    if (previousStep) {
      setError(null)
      router.push(`${routes.main.onboarding}?step=${previousStep}`)
    }
  }

  const isFinalStep = step === 'review'

  if (!step || !(step in stepComponents)) {
    router.push(`${routes.main.onboarding}?step=location`)
    return <Spinner />
  }

  const StepComponent = stepComponents[step as StepVariant]

  return (
    <div className='flex min-h-screen flex-col pb-6'>
      <div className='flex-grow overflow-y-auto p-4 lg:p-6 '>
        <div className='mx-auto max-w-4xl'>
          {isFinalStep ? (
            <FormReviewStep onSaveStateChange={setIsAllSaved} />
          ) : (
            <StepComponent
              onNext={navigateToNextStep}
              onBack={navigateToPreviousStep}
            />
          )}
        </div>
      </div>

      <div className='sticky bottom-0 mt-auto border-t bg-white'>
        <div className='mx-auto flex max-w-4xl items-center justify-between px-4 py-4 lg:px-6 '>
          <button
            onClick={navigateToPreviousStep}
            disabled={isFinalStep && !isAllSaved}
            className={cn(
              'text-black transition-colors',
              isFinalStep && !isAllSaved
                ? 'text-gray-400'
                : 'hover:text-gray-700',
            )}
          >
            {`< ${t('Onboarding.Buttons.Back')}`}
          </button>
          {error && <Toast message={error} />}
          <button
            onClick={navigateToNextStep}
            disabled={isFinalStep && !isAllSaved}
            className={cn(
              'rounded-md px-4 py-2 text-white transition-colors',
              isFinalStep && !isAllSaved
                ? 'bg-gray-400'
                : 'bg-black hover:bg-gray-800',
            )}
          >
            {isFinalStep
              ? t('Onboarding.Label.CompleteProfile')
              : t('Onboarding.Buttons.Next')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MultiStepFormPage
