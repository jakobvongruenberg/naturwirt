'use server'

import { signIn } from '@farmers/auth'
import InvalidPayloadAuthError from '@farmers/shared/errors/InvalidPayloadAuthError'
import UserNotFoundAuthError from '@farmers/shared/errors/UserNotFoundAuthError'

import { api } from '~/trpc/server'

export async function signUpServerAction(params: {
  email: string
  password: string
}) {
  try {
    await api.auth.register({
      email: params.email,
      password: params.password,
    })
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
    } else if (
      error.message.toLocaleLowerCase().includes('user already exists')
    ) {
      return {
        error: 'This account already exists. Please try to sign into it',
      }
    } else {
      console.log('Error in authenticate', error)
      return { error: 'Something went wrong. Please contact administrator.' }
    }
  }
}
