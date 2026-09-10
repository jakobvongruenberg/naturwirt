import { Suspense } from 'react'

import { SpinnerFullPage } from '@farmers/ui/spinner'

import Step from '~/app/_components/Onboarding/Step'

export default function Onboarding() {
  return (
    <Suspense fallback={<SpinnerFullPage />}>
      <Step />
    </Suspense>
  )
}
