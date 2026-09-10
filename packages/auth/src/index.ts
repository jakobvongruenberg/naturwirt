import bcryptjs from 'bcryptjs'
import omit from 'lodash/omit'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import type { Role } from '@farmers/shared/app/types'
import { db, eq } from '@farmers/db'
import { users } from '@farmers/db/schema/auth'
import InvalidPayloadAuthError from '@farmers/shared/errors/InvalidPayloadAuthError'
import UserNotFoundAuthError from '@farmers/shared/errors/UserNotFoundAuthError'
import { LoginSchema } from '@farmers/validators'

import { MDPGDrizzleAdapter } from './MDPgDrizzleAdapter'

export type { Session } from 'next-auth'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: MDPGDrizzleAdapter(db),
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.role = user.role
      }
      return Promise.resolve(token)
    },
    async session({ session, token }) {
      const result = {
        ...session,
        user: {
          ...session.user,
          id: token.id as string | undefined,
          email: token.email as string | undefined,
          activeProviderId: token.activeProviderId as number | null,
          externalPatientId: token.externalPatientId as string | undefined,
          role: token.role as Role | undefined,
        },
      }
      return Promise.resolve(result)
    },
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const parsedCredentials = LoginSchema.safeParse(credentials)
          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data
            const [userRow] = await db
              .select()
              .from(users)
              .where(eq(users.email, email))
            if (!userRow) throw new UserNotFoundAuthError()
            const passwordsMatch = !userRow.password
              ? false
              : await bcryptjs.compare(password, userRow.password)
            if (passwordsMatch) {
              const user = {
                ...omit(userRow, 'password'),
              }
              return user
            }
          }
          console.error('Authentication failed')
          throw new InvalidPayloadAuthError()
        } catch (error) {
          console.error('Error in authorize function:', error)
          return null
        }
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
})
