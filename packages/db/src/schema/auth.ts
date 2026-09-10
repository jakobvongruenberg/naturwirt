import { sql } from 'drizzle-orm'
import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  primaryKey,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

import { z } from '@farmers/shared/common/zod'

import { pgSqlTable } from './_table'

export const UserRoleEnum = pgEnum('user_role', ['admin', 'user'])
export const MeasureStatusEnum = pgEnum('measure_status', [
  'active',
  'shortlisted',
  'archived',
])
export const UserMeasuresSchema = z.record(
  z.object({
    status: z.enum(MeasureStatusEnum.enumValues).nullish(),
    privateNotes: z.string().nullish(),
    dateStartedYYYY_MM_DD: z.string().nullish(),
  }),
)

export type UserMeasuresType = z.infer<typeof UserMeasuresSchema>

export const users = pgSqlTable('user', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  name: text('name'),
  role: UserRoleEnum('role').notNull().default('user'),
  email: text('email').notNull(),
  password: text('password'),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  image: text('image'),
  notificationsEnabled: boolean('notifications_enabled').default(true),
  userMeasures: jsonb('user_measures').$type<UserMeasuresType>(),
})

export const accounts = pgSqlTable(
  'account',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type')
      .$type<'oauth' | 'oidc' | 'email' | 'webauthn'>()
      .notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('provider_account_id').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
)

export const sessions = pgSqlTable('session', {
  sessionToken: text('session_token').notNull().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const verificationTokens = pgSqlTable(
  'verification_token',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
)

export const verification = pgSqlTable('verification', {
  id: uuid('id')
    .default(sql`gen_random_uuid()`)
    .primaryKey()
    .notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expires_at', {
    mode: 'date',
    precision: 3,
  }).default(sql`CURRENT_TIMESTAMP(3) + INTERVAL '2 months'`),
  usedAt: timestamp('used_at', {
    mode: 'date',
    precision: 3,
  }),
  createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).default(
    sql`CURRENT_TIMESTAMP(3)`,
  ),
  updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).default(
    sql`CURRENT_TIMESTAMP(3)`,
  ),
})
