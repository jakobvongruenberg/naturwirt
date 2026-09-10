'use server'

import { signOut } from '@farmers/auth'

export default async function action() {
  try {
    await signOut()
    return {
      success: true,
    }
  } catch (error) {
    return { error: 'Something went wrong. Please contact administrator.' }
  }
}
