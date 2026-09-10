/**
 * Run this seed with:
 * pnpm -F @farmers/db seed ./src/seed/auth.ts
 */
import { db } from '@farmers/db'
import { users } from '@farmers/db/schema/auth'

// Local fixture hash only — never seed production with these accounts.
const LOCAL_SEED_PASSWORD_HASH =
  '$2b$10$ALmqjO5lPUeZJ7ntUsPnceaAPE.vI0koh1RVujiGpxa3E.4gVAtF2'

const main = async () => {
  await db.insert(users).values({
    email: 'admin@example.com',
    password: LOCAL_SEED_PASSWORD_HASH,
  })
  await db.insert(users).values({
    email: 'admin2@example.com',
    password: LOCAL_SEED_PASSWORD_HASH,
  })
  await db.insert(users).values({
    email: 'dev@example.com',
    password: LOCAL_SEED_PASSWORD_HASH,
  })
  await db.insert(users).values({
    email: 'test@example.com',
    password: LOCAL_SEED_PASSWORD_HASH,
  })
}

void main()
