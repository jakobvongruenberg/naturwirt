import { bigserial, integer, pgEnum, uuid, varchar } from 'drizzle-orm/pg-core'

import { pgSqlTable } from './_table'
import { users } from './auth'

export const typeOfFarmingEnum = pgEnum('type_of_farming', [
  'conventional',
  'organic',
])
export const animalTypeEnum = pgEnum('animal_type', [
  'cow',
  'pig',
  'poultry',
  'sheep',
  'goats',
  'others',
])

export type Animal = (typeof animalTypeEnum.enumValues)[number]

// export const subsidyProviderEnum = pgEnum('setting', [
//   'AUKM',
//   'ÖR',
//   'VNS',
//   'Private',
// ])

export const farm = pgSqlTable('farm', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: varchar('name').notNull(),
  farmSize: integer('farm_size').notNull(),
  farmType: typeOfFarmingEnum('type_of_farming')
    .notNull()
    .default('conventional'),
  location: varchar('location').notNull(),
  animals: animalTypeEnum('animal_type').array(),
  livestockUnit: integer('livestock_unit'),
})
