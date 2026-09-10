import { NextResponse } from 'next/server'

import withAdmin from '~/middleware/withAdmin'
import withJwt from '~/middleware/withJwt'

export function defaultMiddleware() {
  return NextResponse.next()
}
export default withAdmin(withJwt(defaultMiddleware))

export const config = {
  matcher: ['/admin/:path*', '/main/:path*'],
}
