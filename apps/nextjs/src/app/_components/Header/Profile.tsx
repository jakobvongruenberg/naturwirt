'use client'

import type { SVGProps } from 'react'
import { useSession } from 'next-auth/react'

import LoggedIn from '~/app/_components/Header/Profile/LoggedIn'
import LoggedOut from '~/app/_components/Header/Profile/LoggedOut'

export const Profile = (props: { iconProps: SVGProps<SVGSVGElement> }) => {
  const { data: session } = useSession()

  return (
    <div className='ml-auto flex'>
      {session ? <LoggedIn {...props} /> : <LoggedOut />}
    </div>
  )
}
