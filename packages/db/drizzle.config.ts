import type { Config } from 'drizzle-kit'

import { env } from '@farmers/env'

const uri = env.DATABASE_URL
if (!uri) throw new Error('DATABASE_URL is not defined')

export default {
  schema: './src/schema',
  dialect: 'postgresql',
  dbCredentials: { url: uri },
  tablesFilter: ['farmers_*'],
  out: '../db/drizzle',
} satisfies Config
