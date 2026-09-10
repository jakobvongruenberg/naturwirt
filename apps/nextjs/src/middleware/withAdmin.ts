import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

import { routes } from '@farmers/shared/app/constants'

import type { MiddlewareFactory } from './types'

const withAdmin: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const res = await next(request, _next)

    if (!request.nextUrl.pathname.startsWith(routes.admin.index)) {
      return res
    }

    const [cookieToken] = request.cookies
      .getAll()
      .filter((o) => o.name.indexOf('authjs.session-token') > -1)

    const secret = process.env.AUTH_SECRET
    if (!secret) {
      throw new Error('AUTH_SECRET is not set')
    }

    if (!cookieToken) {
      return NextResponse.redirect(
        new URL(`${routes.root.index}?reason=no-cookie`, request.url),
      )
    }

    const payload = await getToken({
      req: request,
      secret,
      salt: cookieToken.name,
      cookieName: cookieToken.name,
    })

    if (payload?.role !== 'admin') {
      return NextResponse.redirect(
        new URL(`${routes.root.index}?reason=not-admin`, request.url),
      )
    }

    return res
  }
}

export default withAdmin
