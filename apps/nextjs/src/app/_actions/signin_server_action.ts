'use server'

import { signIn } from '@farmers/auth'
import InvalidPayloadAuthError from '@farmers/shared/errors/InvalidPayloadAuthError'
import UserNotFoundAuthError from '@farmers/shared/errors/UserNotFoundAuthError'

export async function signInServerAction(params: {
  email: string
  password: string
}) {
  try {
    await signIn('credentials', {
      email: params.email,
      password: params.password,
      redirect: false,
    })
    return {
      success: true,
    }
  } catch (error) {
    if (!(error instanceof Error)) {
      console.log('Error in authenticate', error)
      return { error: 'Something went wrong. Please contact administrator.' }
    }

    if (
      error instanceof InvalidPayloadAuthError ||
      error instanceof UserNotFoundAuthError
    ) {
      return { error: 'You have entered an invalid username or password' }
    } else {
      console.log('Error in authenticate', error)
      return { error: 'Something went wrong. Please contact administrator.' }
    }
  }
}
