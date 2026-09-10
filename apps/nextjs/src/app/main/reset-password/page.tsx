'use client'

import { Suspense } from 'react'

import { SpinnerFullPage } from '@farmers/ui/spinner'

import { ResetPasswordComponent } from './reset-password-component'

export default function ResetPasswordLayout() {
  return (
    <Suspense fallback={<SpinnerFullPage />}>
      <ResetPasswordComponent />
    </Suspense>
  )
}
