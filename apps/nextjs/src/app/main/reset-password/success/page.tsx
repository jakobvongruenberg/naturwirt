import Link from 'next/link'

import { routes } from '@farmers/shared/app/constants'

export default function SuccessPage() {
  return (
    <div className='flex h-screen min-h-screen w-full flex-col '>
      <div className='flex h-full w-full flex-col justify-start space-y-10'>
        <div className='flex flex-col space-y-2 pt-40 text-center'>
          <h1 className='mb-4 text-4xl font-bold'>
            Password Reset Successful!
          </h1>
          <p className='text-lg text-gray-600'>
            Your password has been successfully reset. Return to login page to
            sign in.
          </p>
        </div>
        <div className='flex flex-col gap-4 pt-10'>
          <Link
            href={routes.main.index}
            className='w-full text-green-500 hover:text-green-700'
          >
            <p className='w-full text-center text-sm'>Return to home</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
