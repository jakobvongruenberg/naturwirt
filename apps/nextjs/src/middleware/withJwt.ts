import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { routes } from '@farmers/shared/app/constants'

import type { MiddlewareFactory } from './types'

const withJwt: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const res = await next(request, _next)

    const browserPageMatches = /main\/browse\/(?<page>[a-zA-Z0-9_-]+)/gim.exec(
      request.nextUrl.pathname,
    )

    const allowedRoutes = [
      routes.main.index,
      routes.main.browse,
      routes.main.privacy,
      routes.main.terms,
      routes.auth.forgotPassword,
      routes.auth.resetPassword,
    ] as string[]
    if (
      allowedRoutes.includes(request.nextUrl.pathname) ||
      browserPageMatches?.groups?.page
    ) {
      return res
    }

    const [cookieToken] = request.cookies
      .getAll()
      .filter((o) => o.name.indexOf('authjs.session-token') > -1)

    if (!cookieToken) {
      return NextResponse.redirect(
        new URL(`${routes.root.index}?reason=no-token`, request.url),
      )
    }

    return res
  }
}

export default withJwt
