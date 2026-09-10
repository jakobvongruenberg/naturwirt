import bcryptjs from 'bcryptjs'

import { eq } from '@farmers/db'
import { users, verification } from '@farmers/db/schema/auth'
import { env } from '@farmers/env'
import { routes } from '@farmers/shared/app/constants'
import { dayjs } from '@farmers/shared/common/dayjs/index'
import { z } from '@farmers/shared/common/zod'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { mail, Templates } from './mail'

const HASH_SALT_ROUNDS = 10
const hashPassword = async (password: string): Promise<string> => {
  try {
    const hashedPassword = await bcryptjs.hash(password, HASH_SALT_ROUNDS)
    return hashedPassword
  } catch (error) {
    throw new Error('Error hashing password')
  }
}
export function getBaseUrl() {
  let url = `http://localhost:${env.PORT ?? 3000}`
  if (env.NEXT_PUBLIC_URL) {
    url = env.NEXT_PUBLIC_URL
  } else if (env.VERCEL_URL) {
    url = `https://${env.VERCEL_URL}`
  }
  return url
}
export const authRouter = createTRPCRouter({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session
  }),
  getSecretMessage: protectedProcedure.query(() => {
    // testing type validation of overridden next-auth Session in @farmers/auth package
    return 'you can see this secret message!'
  }),
  sendResetPasswordEmail: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async (opts) => {
      const db = opts.ctx.db
      const { email } = opts.input

      const [userData] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))

      if (!userData) {
        // Don't show that the email doesn't exist
        return {
          success: true,
        }
      }

      const [newVerification] = await db
        .insert(verification)
        .values({
          userId: userData.id,
        })
        .returning()

      if (!newVerification) {
        throw new Error('Failed to create verification')
      }

      const results = await mail.sendTemplateMessages(
        Templates.resetPasswordGerman,
        {
          to: email,
          resetLink: `${getBaseUrl()}${routes.auth.resetPassword}?token=${newVerification.id}`,
        },
      )

      console.log('sent reset password email to', email, results)

      return {
        success: true,
      }
    }),
  verifyToken: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async (opts) => {
      const db = opts.ctx.db
      const { token } = opts.input

      const [tokenVerification] = await db
        .select()
        .from(verification)
        .where(eq(verification.id, token))

      if (!tokenVerification) {
        return {
          success: false,
        }
      }

      // Check if token is expired
      if (dayjs(tokenVerification.expiresAt).isBefore(dayjs())) {
        return {
          success: false,
        }
      }

      // Check if token has been used
      if (dayjs(tokenVerification.usedAt).isBefore(dayjs())) {
        return {
          success: false,
        }
      }

      return {
        success: true,
      }
    }),
  resetPassword: publicProcedure
    .input(z.object({ token: z.string(), password: z.string().min(8) }))
    .mutation(async (opts) => {
      const db = opts.ctx.db
      const { token, password } = opts.input

      const hashedPassword = await hashPassword(password)

      const [tokenVerification] = await db
        .select()
        .from(verification)
        .where(eq(verification.id, token))

      if (!tokenVerification) {
        throw Error("Token expired or doesn't exist")
      }

      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.id, tokenVerification.userId))

      if (!existingUser) {
        throw Error("User doesn't exist")
      }

      await db
        .update(users)
        .set({ password: hashedPassword })
        .where(eq(users.id, tokenVerification.userId))

      // set token as used so it won't be used again
      if (tokenVerification) {
        await db
          .update(verification)
          .set({ usedAt: new Date() })
          .where(eq(verification.id, tokenVerification.id))
      }

      return {
        success: true,
      }
    }),
  sendForgotPasswordEmail: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async (opts) => {
      const db = opts.ctx.db
      const { email } = opts.input

      const [userData] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))

      if (!userData) {
        // Don't show that the email doesn't exist
        return { success: true }
      }

      const [newVerification] = await db
        .insert(verification)
        .values({
          userId: userData.id,
        })
        .returning()

      if (!newVerification) {
        throw new Error('Failed to create verification')
      }

      const resetLink = `${getBaseUrl()}${routes.auth.resetPassword}?token=${newVerification.id}`

      await mail.sendTemplateMessages(Templates.resetPasswordGerman, {
        to: email,
        resetLink,
      })

      return { success: true }
    }),
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
      }),
    )
    .mutation(async (opts) => {
      const db = opts.ctx.db
      const { email, password } = opts.input

      const hashedPassword = await bcryptjs.hash(password, HASH_SALT_ROUNDS)

      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      })

      if (existingUser) {
        throw Error('User already exist.')
      }

      const user = await db.insert(users).values({
        email,
        password: hashedPassword,
      })

      return user
    }),
})
