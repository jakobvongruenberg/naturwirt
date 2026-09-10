// File: auth.ts (or auth.js)

import type { Adapter } from '@auth/core/adapters'
import type { PgDatabase } from 'drizzle-orm/pg-core'
import { and, eq } from 'drizzle-orm'

import { schema } from '@farmers/db'

// Drizzle Adapter
export function MDPGDrizzleAdapter(
  client: InstanceType<typeof PgDatabase>,
): Adapter {
  const { users, accounts, sessions, verificationTokens } = schema

  return {
    async createUser(data) {
      try {
        const user = await client
          .insert(users)
          .values({ ...data, id: crypto.randomUUID() })
          .returning()
          .then((res) => res[0]!)
        console.log('User created:', user)
        return user
      } catch (error) {
        console.error('Error creating user:', error)
        throw error
      }
    },
    async getUser(id) {
      try {
        const user = await client
          .select()
          .from(users)
          .where(eq(users.id, id))
          .then((res) => res[0] ?? null)
        console.log('User retrieved:', user)
        return user
      } catch (error) {
        console.error('Error getting user:', error)
        return null
      }
    },
    async getUserByEmail(email) {
      try {
        const user = await client
          .select()
          .from(users)
          .where(eq(users.email, email))
          .then((res) => res[0] ?? null)
        console.log('User retrieved by email:', user)
        return user
      } catch (error) {
        console.error('Error getting user by email:', error)
        return null
      }
    },
    async createSession(data) {
      try {
        const session = await client
          .insert(sessions)
          .values(data)
          .returning()
          .then((res) => res[0]!)
        console.log('Session created:', session)
        return session
      } catch (error) {
        console.error('Error creating session:', error)
        throw error
      }
    },
    async getSessionAndUser(sessionToken) {
      try {
        const result = await client
          .select({
            session: sessions,
            user: users,
          })
          .from(sessions)
          .where(eq(sessions.sessionToken, sessionToken))
          .innerJoin(users, eq(users.id, sessions.userId))
          .then((res) => res[0] ?? null)
        console.log('Session and user retrieved:', result)
        return result
      } catch (error) {
        console.error('Error getting session and user:', error)
        return null
      }
    },
    async updateUser(data) {
      if (!data.id) {
        throw new Error('No user id.')
      }
      try {
        const updatedUser = await client
          .update(users)
          .set(data)
          .where(eq(users.id, data.id))
          .returning()
          .then((res) => res[0]!)
        console.log('User updated:', updatedUser)
        return updatedUser
      } catch (error) {
        console.error('Error updating user:', error)
        throw error
      }
    },
    async updateSession(data) {
      try {
        const updatedSession = await client
          .update(sessions)
          .set(data)
          .where(eq(sessions.sessionToken, data.sessionToken))
          .returning()
          .then((res) => res[0])
        console.log('Session updated:', updatedSession)
        return updatedSession
      } catch (error) {
        console.error('Error updating session:', error)
        return null
      }
    },
    async linkAccount(account) {
      const linkedAccount = await client
        .insert(accounts)
        .values(account)
        .returning()
        .then((res) => ({
          ...res[0],
          type: res[0]?.type,
        }))
      console.log('Account linked:', linkedAccount)
    },
    async getUserByAccount(account) {
      try {
        const dbAccount = await client
          .select()
          .from(accounts)
          .where(
            and(
              eq(accounts.providerAccountId, account.providerAccountId),
              eq(accounts.provider, account.provider),
            ),
          )
          .leftJoin(users, eq(accounts.userId, users.id))
          .then((res) => res[0] ?? null)
        console.log('User retrieved by account:', dbAccount?.user)
        return dbAccount?.user ?? null
      } catch (error) {
        console.error('Error getting user by account:', error)
        return null
      }
    },
    async deleteSession(sessionToken) {
      try {
        const session = await client
          .delete(sessions)
          .where(eq(sessions.sessionToken, sessionToken))
          .returning()
          .then((res) => res[0] ?? null)
        console.log('Session deleted:', session)
        return session
      } catch (error) {
        console.error('Error deleting session:', error)
        return null
      }
    },
    async createVerificationToken(token) {
      try {
        const verificationToken = await client
          .insert(verificationTokens)
          .values(token)
          .returning()
          .then((res) => res[0])
        console.log('Verification token created:', verificationToken)
        return verificationToken
      } catch (error) {
        console.error('Error creating verification token:', error)
        throw error
      }
    },
    async useVerificationToken(token) {
      try {
        const verificationToken = await client
          .delete(verificationTokens)
          .where(
            and(
              eq(verificationTokens.identifier, token.identifier),
              eq(verificationTokens.token, token.token),
            ),
          )
          .returning()
          .then((res) => res[0] ?? null)
        console.log('Verification token used:', verificationToken)
        return verificationToken
      } catch (error) {
        console.error('Error using verification token:', error)
        throw new Error('No verification token found.')
      }
    },
    async deleteUser(userId) {
      try {
        const deletedUser = await client
          .delete(users)
          .where(eq(users.id, userId))
          .returning()
          .then((res) => res[0] ?? null)
        console.log('User deleted:', deletedUser)
        return deletedUser
      } catch (error) {
        console.error('Error deleting user:', error)
        throw error
      }
    },
    async unlinkAccount(account) {
      try {
        const unlinkedAccount = await client
          .delete(accounts)
          .where(
            and(
              eq(accounts.providerAccountId, account.providerAccountId),
              eq(accounts.provider, account.provider),
            ),
          )
          .returning()
          .then((res) => res[0]!)
        console.log('Account unlinked:', unlinkedAccount)
      } catch (error) {
        console.error('Error unlinking account:', error)
        throw error
      }
    },
  }
}
