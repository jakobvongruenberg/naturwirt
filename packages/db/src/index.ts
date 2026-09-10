import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { env } from '@farmers/env'
import { getDatabaseNameFromUri } from '@farmers/shared/common/functions'

import {
  accounts,
  sessions,
  users,
  verification,
  verificationTokens,
} from './schema/auth'
import { farm } from './schema/farm'
import { measure } from './schema/measure'

export const schema = {
  accounts,
  sessions,
  users,
  verificationTokens,
  measure,
  farm,
  verification,
}

export { pgSqlTable as tableCreator } from './schema/_table'

export * from 'drizzle-orm'

const getDb = () => {
  const databaseUrl = env.DATABASE_URL
  if (!databaseUrl) throw new Error('DATABASE_URL is not defined')

  const databaseName = getDatabaseNameFromUri(databaseUrl)
  const useSsl =
    env.NODE_ENV === 'production' || (databaseName?.includes('_prod') ?? false)

  return drizzle(
    postgres(databaseUrl, { ssl: useSsl ? 'require' : undefined }),
    { schema },
  )
}

export type AppDb = ReturnType<typeof getDb>

// https://www.answeroverflow.com/m/1146224610002600067
declare global {
  // eslint-disable-next-line no-var
  var db: AppDb | null
}

let db: AppDb

export * from 'drizzle-orm'

if (env.NODE_ENV === 'production') {
  db = getDb()
} else {
  if (!global.db) global.db = getDb()
  db = global.db
}

export { db }
