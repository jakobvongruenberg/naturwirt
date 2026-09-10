import { migrate as migrator } from 'drizzle-orm/postgres-js/migrator'

import { env } from '@farmers/env'
import { vercel } from '@farmers/shared/common/constants'
import { getDatabaseNameFromUri } from '@farmers/shared/common/functions'

import { db, sql } from '.'
import { createDatabaseIfNotExists } from './functions'
import { reset } from './reset'
import { seed } from './seed'

const databaseUrl = env.DATABASE_URL

const migrate = async () => {
  if (!databaseUrl) return

  const shouldReset =
    process.argv.includes('--reset') || vercel?.isPreviewDeployment
  const shouldSeed =
    process.argv.includes('--seed') || vercel?.isPreviewDeployment

  await createDatabaseIfNotExists(databaseUrl)
    .then(() => console.log('Database check/creation completed.'))
    .catch((err) => console.error('Failed to check/create database:', err))

  // Reduce logs to just warnings
  // https://stackoverflow.com/questions/3530767/disable-notices-in-psql-output
  await db.execute(sql`SET client_min_messages TO WARNING;`)

  // If we have arg `--reset` then we should reset the database
  if (shouldReset) {
    await reset()
  }

  const databaseName = getDatabaseNameFromUri(databaseUrl)

  console.log('Migrating database', databaseName, { shouldReset, shouldSeed })

  await migrator(db, {
    migrationsTable: `__drizzle_migrations_${databaseName}`,
    migrationsFolder: 'drizzle',
  })

  if (shouldSeed) {
    console.log('Seeding database')
    await seed()
  }
}

if (require.main === module) {
  void migrate()
    .then(() => console.log('Migration done'))
    .catch((e) => {
      console.log('Migration failed', e)
    })
    .finally(() => {
      process.exit()
    })
}
