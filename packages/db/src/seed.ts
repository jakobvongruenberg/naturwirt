import { faker } from '@faker-js/faker'
import { eq } from 'drizzle-orm'

import { env } from '@farmers/env'
import { kreis, land } from '@farmers/shared/app/constants'
import {
  generateGermanPhoneNumber,
  makeStringGermanUrlSafe,
} from '@farmers/shared/app/functions'
import { dayjs } from '@farmers/shared/common/dayjs/index'

import type { UserMeasuresType } from './schema/auth'
import { db, schema } from '.'
import { MeasureStatusEnum } from './schema/auth'
import { animalTypeEnum, farm, typeOfFarmingEnum } from './schema/farm'
import { keyDateTypeEnum, settingEnum } from './schema/measure'

const { accounts, measure, sessions, users, verificationTokens } = schema

// Local fixture hash only — never seed production with these accounts.
const LOCAL_SEED_PASSWORD_HASH =
  '$2b$10$ALmqjO5lPUeZJ7ntUsPnceaAPE.vI0koh1RVujiGpxa3E.4gVAtF2'

if (!('DATABASE_URL' in env)) {
  throw new Error('DATABASE_URL not found on env')
}

const _reseedFromScratch = async (params?: { skipDelete?: boolean }) => {
  console.log('Seed start', { skipDelete: params?.skipDelete })

  if (!params?.skipDelete) {
    await db.delete(accounts)
    await db.delete(measure)
    await db.delete(sessions)
    await db.delete(users)
    await db.delete(verificationTokens)
  }

  // Seed measures
  const measureIds: string[] = []
  const arrayItems = Array.from(Array(10))

  for (const _ of arrayItems) {
    const hasSubsidyValue = faker.datatype.boolean()
    const subsidyValue = hasSubsidyValue
      ? faker.number.int({ min: 100, max: 3000 })
      : 0 // Set to 0 if hasSubsidyValue is false

    const subsidyValueConventional = !hasSubsidyValue
      ? faker.number.int({ min: 100, max: 3000 })
      : 0 // Set to 0 if hasSubsidyValue is true

    const subsidyValueOrganic = !hasSubsidyValue
      ? faker.number.int({ min: 100, max: 3000 })
      : 0 // Set to 0 if hasSubsidyValue is true

    const programTitle = `${faker.helpers.arrayElement(['ÖR', 'AUKM', 'GHI'])} - ${faker.helpers.arrayElement(
      ['ÖR2', 'AN2', 'PQR'],
    )}`
    const measureTitleShort = faker.lorem.words(3)
    const measureId = makeStringGermanUrlSafe(
      `${programTitle ?? ''} ${measureTitleShort ?? ''} ${new Date().getFullYear()}`,
    )
    measureIds.push(measureId)
    const newMeasure: typeof measure.$inferInsert = {
      measureIdentifier: measureId,
      measureTitleLong: faker.lorem.sentence(),
      measureTitleShort,
      programTitle,
      publicationDate: faker.date.past(),
      publicationSource: faker.internet.url(),
      applicationDate: faker.date.future(),
      applicableLand: faker.helpers
        .arrayElements(land, { min: 1, max: 3 })
        .join(', '),
      applicableKreis: faker.helpers
        .arrayElements(kreis, { min: 1, max: 3 })
        .join(', '),
      subsidyValue,
      subsidyValueConventional,
      subsidyValueOrganic,
      surcharges: [
        {
          name: faker.lorem.words(),
          description: faker.lorem.words(3),
          value: faker.number.int({ min: 1, max: 100 }),
          type: 'organic',
        },
        {
          name: faker.lorem.words(),
          description: faker.lorem.words(3),
          value: faker.number.int({ min: 1, max: 100 }),
          type: 'conventional',
        },
        {
          name: faker.lorem.words(),
          description: faker.lorem.words(3),
          value: faker.number.int({ min: 1, max: 100 }),
          type: 'organic',
        },
        {
          name: faker.lorem.words(),
          description: faker.lorem.words(3),
          value: faker.number.int({ min: 1, max: 100 }),
          type: 'conventional',
        },
        {
          name: faker.lorem.words(),
          description: faker.lorem.words(3),
          value: faker.number.int({ min: 1, max: 100 }),
          type: 'organic',
        },
        {
          name: faker.lorem.words(),
          description: faker.lorem.words(3),
          value: faker.number.int({ min: 1, max: 100 }),
          type: 'conventional',
        },
        {
          name: faker.lorem.words(),
          description: faker.lorem.words(3),
          value: faker.number.int({ min: 1, max: 100 }),
          type: 'organic',
        },
        {
          name: faker.lorem.words(),
          description: faker.lorem.words(3),
          value: faker.number.int({ min: 1, max: 100 }),
          type: 'conventional',
        },
      ],
      includeWarning: faker.datatype.boolean(),
      providerEmail: faker.internet.email(),
      providerPhoneNumber: generateGermanPhoneNumber(),
      effort: faker.helpers.arrayElement(['high', 'medium', 'low']),
      effortToolTip: faker.lorem.sentence(),
      duration: faker.number.int({ min: 1, max: 12 }),
      durationToolTip: faker.lorem.sentence(),
      setting: faker.helpers.arrayElement(settingEnum.enumValues),
      settingToolTip: faker.lorem.sentence(),
      situation: faker.helpers.arrayElement([
        'rotating',
        'whole farm',
        'fixed',
      ]),
      situationToolTip: faker.lorem.sentence(),
      whatsInvolved: faker.lorem.paragraph(),
      cultivationConditions: [faker.lorem.sentence(), faker.lorem.sentence()],
      plantProtectionMeasures: [faker.lorem.sentence(), faker.lorem.sentence()],
      fertilizer: [faker.lorem.sentence()],
      keyBenefits: [faker.lorem.sentence(), faker.lorem.sentence()],
      keyDates: [
        {
          type: faker.helpers.arrayElement(keyDateTypeEnum.enumValues),
          description: faker.lorem.sentence(),
          keydate: dayjs(faker.date.future()).format('YYYY-MM-DD'),
          topField: dayjs(faker.date.future()).format('YYYY-MM-DD'),
          bottomField: faker.lorem.sentence(),
        },
        {
          type: faker.helpers.arrayElement(keyDateTypeEnum.enumValues),
          description: faker.lorem.sentence(),
          keydate: dayjs(faker.date.future()).format('YYYY-MM-DD'),
          topField: dayjs(faker.date.future()).format('YYYY-MM-DD'),
          bottomField: faker.lorem.sentence(),
        },
      ],
      areaOptimization: {
        maximumOperation: faker.number.int({ min: 1, max: 100 }).toString(),
        maximumArea: faker.number.int({ min: 1, max: 100 }).toString(),
        minimumArea: faker.number.int({ min: 1, max: 100 }).toString(),
        form: faker.lorem.sentence(),
      },
      combinations: faker.datatype.boolean(),
      combinationsDescription: faker.lorem.sentence(),
      applicationSteps: [
        {
          stepNumber: 1,
          description: `${faker.lorem.sentence()}, https://${faker.internet.domainName()}.${faker.internet.domainSuffix()}`,
        },
        {
          stepNumber: 2,
          description: `${faker.lorem.sentence()}, https://${faker.internet.domainName()}.${faker.internet.domainSuffix()}`,
        },
      ],
      applicationDescription: faker.lorem.paragraph(),
      availableCombination: faker.lorem.sentence(),
      dateCreated: faker.date.past(),
      dateUpdated: faker.date.recent(),
      totalAmount: faker.number.int({ min: 1, max: 100 }),
      typeOfFarming: faker.helpers.arrayElement(['conventional', 'organic']),
      contacts: [
        {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
        },
        {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
        },
      ],
      notes: faker.lorem.paragraph(),
      zipcode: faker.location.zipCode(),
      isPublished: faker.datatype.boolean(),
    }
    await db.insert(measure).values(newMeasure)
  }

  const createFarm = () => {
    const hasAnimals = faker.datatype.boolean()
    return {
      name: faker.company.name(),
      farmSize: faker.number.int({ min: 1, max: 100 }),
      farmType: faker.helpers.arrayElement(typeOfFarmingEnum.enumValues),
      location: faker.location.city(),
      animals: hasAnimals
        ? faker.helpers.arrayElements(animalTypeEnum.enumValues)
        : [],
      livestockUnit: hasAnimals ? faker.number.int({ min: 1, max: 100 }) : 0,
    }
  }

  // Function to create a user with random measures
  const createUserWithMeasures = (email: string, role: 'admin' | 'user') => {
    const userMeasures: UserMeasuresType = {}
    const numberOfMeasures = faker.number.int({ min: 1, max: 5 })
    for (let i = 0; i < numberOfMeasures; i++) {
      const measureId = faker.helpers.arrayElement(measureIds)
      userMeasures[measureId] = {
        privateNotes: Math.random() > 0.5 ? faker.lorem.sentence() : null,
        status: faker.helpers.arrayElement(MeasureStatusEnum.enumValues),
      }
    }

    return {
      email,
      password: LOCAL_SEED_PASSWORD_HASH,
      role,
      userMeasures,
      name: faker.person.fullName(),
      notificationsEnabled: faker.datatype.boolean(),
    }
  }

  // Seed users with measures
  const [user1] = await db
    .insert(users)
    .values(createUserWithMeasures('admin@example.com', 'admin'))
    .returning()
  const [user2] = await db
    .insert(users)
    .values(createUserWithMeasures('admin2@example.com', 'admin'))
    .returning()
  const [_user3] = await db
    .insert(users)
    .values(createUserWithMeasures('dev@example.com', 'admin'))
    .returning()
  const [user4] = await db
    .insert(users)
    .values(createUserWithMeasures('test@example.com', 'admin'))
    .returning()
  const [user5] = await db
    .insert(users)
    .values(createUserWithMeasures('user@example.com', 'user'))
    .returning()

  // Seed farms
  user1 && (await db.insert(farm).values({ ...createFarm(), userId: user1.id }))
  user1 && (await db.insert(farm).values({ ...createFarm(), userId: user1.id }))

  user2 && (await db.insert(farm).values({ ...createFarm(), userId: user2.id }))
  user2 && (await db.insert(farm).values({ ...createFarm(), userId: user2.id }))
  user2 && (await db.insert(farm).values({ ...createFarm(), userId: user2.id }))

  //none for 3

  user4 && (await db.insert(farm).values({ ...createFarm(), userId: user4.id }))
  user4 && (await db.insert(farm).values({ ...createFarm(), userId: user4.id }))

  user5 && (await db.insert(farm).values({ ...createFarm(), userId: user5.id }))
  user5 && (await db.insert(farm).values({ ...createFarm(), userId: user5.id }))
  user5 && (await db.insert(farm).values({ ...createFarm(), userId: user5.id }))
}

export const seed = async () => {
  // Check args for what to exclude

  // don't run it, but show it
  await _reseedFromScratch()

  //await reformatKeyDates()
  //await updateGrassland()
}

export const updateGrassland = async () => {
  const measures = await db.select().from(measure)

  for (const m of measures) {
    const setting = m.setting as string
    if (setting === 'permanent grassland' || setting === 'pasture land') {
      await db
        .update(measure)
        .set({ setting: 'grassland' })
        .where(eq(schema.measure.id, m.id))
    }
  }
}

export const reformatKeyDates = async () => {
  // Get all measures from the database
  const measures = await db.select().from(measure)

  // Update each measure's key dates
  for (const m of measures) {
    if (m.keyDates && m.keyDates.length > 0) {
      // Map each key date to include topField and bottomField
      const updatedKeyDates = m.keyDates.map((keyDate) => ({
        ...keyDate,
        topField: keyDate.keydate, // Copy keydate to topField
        bottomField: keyDate.description, // Copy description to bottomField
      }))

      // Update the measure with the modified key dates
      await db
        .update(measure)
        .set({ keyDates: updatedKeyDates })
        .where(eq(schema.measure.id, m.id))

      console.log(`Updated key dates for measure ID: ${m.id}`)
    }
  }

  console.log('All measures updated successfully')
}

// function to turn any array into batches of arrays
function _makeBatches<T>(arr: T[], options?: { batchSize?: number }): T[][] {
  return arr.reduce((acc, item, idx) => {
    if (idx % (options?.batchSize ?? 1) === 0) {
      acc.push([])
    }
    acc[acc.length - 1]?.push(item)
    return acc
  }, [] as T[][])
}

if (require.main === module) {
  void seed()
    .then(() => console.log('Seed done'))
    .catch((e) => {
      console.log('Seed failed', e)
    })
    .finally(() => {
      process.exit()
    })
}
