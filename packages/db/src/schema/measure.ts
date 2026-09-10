import {
  bigserial,
  boolean,
  integer,
  json,
  jsonb,
  pgEnum,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

import { pgSqlTable } from './_table'

export interface ApplicationStep {
  stepNumber: number
  description: string
  url?: string
}

export interface AreaOptimization {
  maximumOperation?: string
  maximumArea?: string
  minimumArea?: string
  form?: string
}

export interface Contact {
  name: string
  email: string
  phone: string
}

export interface Surcharge {
  name: string
  description: string
  value: number
  type: 'conventional' | 'organic' | 'default'
}

export interface KeyDate {
  type: (typeof keyDateTypeEnum.enumValues)[number]
  description: string
  keydate: string
  topField: string
  bottomField: string
}

// ENUMS
export const effortEnum = pgEnum('effort', ['high', 'medium', 'low'])
export const typeOfFarmingEnum = pgEnum('type_of_farming', [
  'conventional',
  'organic',
])
export const keyDateTypeEnum = pgEnum('key_date_type', ['by', 'from'])
export const situationEnum = pgEnum('situation', [
  'rotating',
  'whole farm',
  'fixed',
])
export const settingEnum = pgEnum('setting', [
  'arable land',
  'grassland',
  'bog',
  'woodland',
  'special',
  'other',
])

export const subsidyProviderEnum = pgEnum('subsidy_provider', [
  'AUKM',
  'ÖR',
  'VNS',
  'Private',
])

export const measure = pgSqlTable('measure', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  measureIdentifier: text('measure_identifier').notNull().unique(),
  measureTitleLong: text('measure_title_long').notNull(),
  measureTitleShort: text('measure_title_short').notNull(),
  programTitle: varchar('program_title', { length: 255 }).notNull(),
  publicationDate: timestamp('publication_date', { mode: 'date' }).notNull(),
  publicationSource: varchar('publication_source', { length: 255 }).notNull(),
  publicationSourceLabel: varchar('publication_source_label', { length: 255 }),
  applicationDate: timestamp('application_date', { mode: 'date' }).notNull(),
  applicableLand: text('applicable_land'),
  applicableKreis: text('applicable_kreis'),
  subsidyValue: integer('subsidy_value'),
  subsidyValueConventional: integer('subsidy_value_conventional'),
  subsidyValueOrganic: integer('subsidy_value_organic'),
  // https://github.com/drizzle-team/drizzle-orm/issues/724
  surcharges: json('surcharges').$type<Surcharge[]>(),
  includeWarning: boolean('include_warning'),
  providerEmail: text('provider_email'),
  providerPhoneNumber: text('provider_phone_number'),
  renewable: boolean('renewable').notNull().default(false),
  renewableToolTip: text('renewable_tool_tip'),
  effort: effortEnum('effort').notNull(),
  effortToolTip: text('effort_tool_tip'),
  duration: integer('duration').notNull(),
  durationToolTip: text('duration_tool_tip'),
  setting: settingEnum('setting').notNull(),
  settingToolTip: text('setting_tool_tip'),
  situation: situationEnum('situation').notNull(),
  situationToolTip: text('situation_tool_tip'),
  whatsInvolved: text('whats_involved').notNull(),
  cultivationConditions: text('cultivation_conditions').array().notNull(),
  plantProtectionMeasures: text('plant_protection_measures').array(),
  fertilizer: text('fertilizer').array(),
  keyBenefits: text('key_benefits').array(),
  keyDates: jsonb('key_dates').$type<KeyDate[]>(),
  areaOptimization: jsonb('area_optimization').$type<AreaOptimization>(),
  combinations: boolean('combinations').notNull(),
  combinationsDescription: text('combinations_description'),
  applicationSteps: jsonb('application_steps')
    .$type<ApplicationStep[]>()
    .notNull(),
  applicationDescription: text('application_description'),
  availableCombination: text('available_combination'),
  dateCreated: timestamp('date_created').notNull().defaultNow(),
  dateUpdated: timestamp('date_updated'),
  totalAmount: integer('total_amount').notNull(),
  typeOfFarming: typeOfFarmingEnum('type_of_farming')
    .notNull()
    .default('conventional'),
  contacts: jsonb('contacts').$type<Contact[]>(),
  notes: text('notes'),
  zipcode: text('zipcodes'),
  isPublished: boolean('publish_view').notNull().default(false),
})
