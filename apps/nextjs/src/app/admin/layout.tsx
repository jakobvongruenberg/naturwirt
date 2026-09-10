import React from 'react'

import { auth } from '@farmers/auth'
import { SIDEBAR_WIDTH_PX } from '@farmers/shared/app/constants'

import AccessRestricted from '~/app/_components/access-restricted'
import { SideBarLinks } from '~/app/_components/sidebar-links'

interface AdminProps {
  children: React.ReactNode
}

const Admin = async ({ children }: AdminProps) => {
  const session = await auth()
  const isAuthenticated = !!session?.user
  if (!isAuthenticated) {
    return <AccessRestricted session={session} />
  }
  return (
    <div style={{ paddingLeft: SIDEBAR_WIDTH_PX }}>
      <SideBarLinks />
      {children}
    </div>
  )
}

export default Admin
