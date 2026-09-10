import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

import type { MeasureStatusEnum } from '@farmers/db/schema/auth'
import type {
  Animal,
  animalTypeEnum,
  typeOfFarmingEnum,
} from '@farmers/db/schema/farm'
import type {
  ApplicationStep,
  AreaOptimization,
  Contact,
  KeyDate,
  subsidyProviderEnum,
  Surcharge,
} from '@farmers/db/schema/measure'
import { UserMeasuresSchema, users } from '@farmers/db/schema/auth'
import { farm } from '@farmers/db/schema/farm'
import {
  effortEnum,
  keyDateTypeEnum,
  measure,
  settingEnum,
  situationEnum,
} from '@farmers/db/schema/measure'
import { t } from '@farmers/language/i18next'
import { z } from '@farmers/shared/common/zod'

// USER SCHEMA
export const UserSelectSchema = createSelectSchema(users)
export const UserInsertSchema = createInsertSchema(users).extend({
  userMeasures: UserMeasuresSchema.optional(),
})

// AUTH SCHEMA
export const EmailAuthSchema = UserInsertSchema.pick({
  email: true,
}).extend({
  email: z.string().email(),
})

// SEARCH SCHEMA
export const SearchSelectSchema = z.object({
  search: z.string().optional(),
})

// SIGNUP SCHEMA
export const SignupSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, {
      message: t('Validator.index.Label.PasswordMustBeAtLeast8Characters'),
    }),
    confirmPassword: z
      .string()
      .min(8, t('Validator.index.Label.PasswordMustBeAtLeast8Characters')),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: t('Validator.index.Label.Required') }),
    }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: t('Validator.index.Label.PasswordsDoNotMatch'),
    path: ['confirmPassword'],
  })

export type SignupSchemaType = z.infer<typeof SignupSchema>

// LOGIN SCHEMA
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>

export const MeasureSelectSchema = createSelectSchema(measure, {
  // Special line to resolve Drizzle Type issue - https://github.com/drizzle-team/drizzle-orm/issues/1110#issuecomment-2146906193
  surcharges: (s) =>
    s.surcharges as unknown as z.ZodArray<z.ZodSchema<Surcharge>>,
  keyDates: (s) => s.keyDates as unknown as z.ZodArray<z.ZodSchema<KeyDate>>,
  areaOptimization: (s) =>
    s.areaOptimization as unknown as z.ZodSchema<AreaOptimization>,
  contacts: (s) => s.contacts as unknown as z.ZodArray<z.ZodSchema<Contact>>,
  applicationSteps: (s) =>
    s.applicationSteps as unknown as z.ZodArray<z.ZodSchema<ApplicationStep>>,
  cultivationConditions: (s) =>
    s.cultivationConditions as unknown as z.ZodArray<
      typeof s.cultivationConditions,
      'many'
    >,
  plantProtectionMeasures: (s) =>
    s.plantProtectionMeasures as unknown as z.ZodArray<
      typeof s.plantProtectionMeasures,
      'many'
    >,
  fertilizer: (s) =>
    s.fertilizer as unknown as z.ZodArray<typeof s.fertilizer, 'many'>,
  keyBenefits: (s) =>
    s.keyBenefits as unknown as z.ZodArray<typeof s.keyBenefits, 'many'>,
})
export type MeasureSelectSchemaType = z.infer<typeof MeasureSelectSchema>

export const MeasureInsertSchema = createInsertSchema(measure, {
  id: (s) => s.id.optional(), // This field is auto-generated, so it's optional for inserts
  measureIdentifier: (s) =>
    s.measureIdentifier.min(
      1,
      t('Validator.index.Label.MeasureIdentifierRequired'),
    ),
  programTitle: (s) =>
    s.programTitle.regex(
      // [A-Za-z0-9] does not match umlauts (ä, ö, ü) or special characters
      /^\S{1,4} - \S{1,4}$/,
      t('Validator.index.Label.ProgramTitleFormat'),
    ),
  measureTitleLong: (s) =>
    s.measureTitleLong.min(
      1,
      t('Validator.index.Label.MeasureTitleLongRequired'),
    ),
  measureTitleShort: (s) =>
    s.measureTitleShort.min(
      1,
      t('Validator.index.Label.MeasureTitleShortRequired'),
    ),
  publicationDate: (s) =>
    s.publicationDate.refine((data) => data instanceof Date, {
      message: t('Validator.index.Label.PublicationDateRequired'),
    }),
  publicationSource: (s) =>
    s.publicationSource.min(
      1,
      t('Validator.index.Label.PublicationSourceRequired'),
    ),
  publicationSourceLabel: (s) => s.publicationSourceLabel.optional(),
  applicationDate: (s) =>
    s.applicationDate.refine((data) => data instanceof Date, {
      message: t('Validator.index.Label.ApplicationDateRequired'),
    }),
  subsidyValue: (s) => s.subsidyValue.int().optional(),
  subsidyValueConventional: (s) =>
    s.subsidyValueConventional
      .int()
      .positive(t('Validator.index.Label.ConventionalSubsidyPositiveInteger'))
      .optional(),
  subsidyValueOrganic: (s) =>
    s.subsidyValueOrganic
      .int()
      .positive(t('Validator.index.Label.OrganicSubsidyPositiveInteger'))
      .optional(),
  surcharges: z
    .array(
      z.object({
        name: z.string(),
        description: z.string(),
        value: z.number(),
        type: z.enum(['conventional', 'organic', 'default']),
      }),
    )
    .nullable(),
  includeWarning: (s) => s.includeWarning,
  providerEmail: (s) =>
    s.providerEmail.email(t('Validator.index.Label.InvalidEmail')).optional(),
  providerPhoneNumber: (s) =>
    s.providerPhoneNumber
      .regex(
        /^(?:(?:\+49|0049|0)[\s.-]?)?(?:([1-9]\d{1,4})[\s.-]?)?([0-9]{2,10})$/,
        t('Validator.index.Label.InvalidPhoneNumber'),
      )
      .optional(),
  effort: (s) =>
    s.effort.refine((data) => effortEnum.enumValues.includes(data), {
      message: t('Validator.index.Label.InvalidEffortValue'),
    }),
  effortToolTip: (s) =>
    s.effortToolTip.refine((data) => data.length > 0, {
      message: t('Validator.index.Label.EffortTooltipNotEmpty'),
    }),
  duration: (s) =>
    s.duration
      .int()
      .positive(t('Validator.index.Label.DurationPositiveInteger')),
  durationToolTip: (s) =>
    s.durationToolTip.refine((data) => data.length > 0, {
      message: t('Validator.index.Label.DurationTooltipNotEmpty'),
    }),
  setting: (s) =>
    s.setting.refine((data) => settingEnum.enumValues.includes(data), {
      message: t('Validator.index.Label.InvalidSettingValue'),
    }),
  settingToolTip: (s) =>
    s.settingToolTip.refine((data) => data.length > 0, {
      message: t('Validator.index.Label.SettingTooltipNotEmpty'),
    }),
  situation: (s) =>
    s.situation.refine((data) => situationEnum.enumValues.includes(data), {
      message: t('Validator.index.Label.SituationInvalid'),
    }),
  situationToolTip: (s) =>
    s.situationToolTip.refine((data) => data.length > 0, {
      message: t('Validator.index.Label.SituationTooltipNotEmpty'),
    }),
  whatsInvolved: (s) =>
    s.whatsInvolved.refine((data) => data.length > 0, {
      message: t('Validator.index.Label.WhatsInvolvedNotEmpty'),
    }),
  cultivationConditions: (s) =>
    (
      s.cultivationConditions as unknown as z.ZodArray<
        typeof s.cultivationConditions,
        'many'
      >
    ).refine((d) => d.filter(Boolean).length > 0, {
      message: t('Validator.index.Label.CultivationConditionsNotEmpty'),
    }),
  plantProtectionMeasures: (s) =>
    s.plantProtectionMeasures as unknown as z.ZodArray<
      typeof s.plantProtectionMeasures,
      'many'
    >,
  fertilizer: (s) =>
    s.fertilizer as unknown as z.ZodArray<typeof s.fertilizer, 'many'>,
  keyBenefits: (s) =>
    (
      s.keyBenefits as unknown as z.ZodArray<typeof s.keyBenefits, 'many'>
    ).refine((d) => d.filter(Boolean).length > 0, {
      message: t('Validator.index.Label.KeyBenefitsNotEmpty'),
    }),
  keyDates: z.array(
    z.object({
      type: z.enum(keyDateTypeEnum.enumValues),
      description: z.string(),
      keydate: z.string(),
      topField: z.string(),
      bottomField: z.string(),
    }),
  ),
  areaOptimization: z
    .object({
      maximumOperation: z.string().optional(),
      maximumArea: z.string().optional(),
      minimumArea: z.string().optional(),
      form: z.string().optional(),
    })
    .optional(),
  combinations: (s) => s.combinations,
  combinationsDescription: (s) =>
    s.combinationsDescription.refine((data) => data.length > 0, {
      message: t('Validator.index.Label.CombinationsDescriptionNotEmpty'),
    }),
  applicationSteps: z
    .array(
      z.object({
        stepNumber: z.number().int().positive(),
        description: z.string(),
        url: z.string().optional(),
      }),
    )
    .refine((steps) => steps.length > 0, {
      message: t('Validator.index.Label.AtleastOneApplicationStep'),
    }),
  applicationDescription: (s) =>
    s.applicationDescription.refine((data) => data.length > 0, {
      message: t('Validator.index.Label.ApplicationDescriptionNotEmpty'),
    }),
  availableCombination: (s) =>
    s.availableCombination.refine((data) => data.length > 0, {
      message: t('Validator.index.Label.AvailableCombinationNotEmpty'),
    }),
  dateCreated: (s) => s.dateCreated,
  dateUpdated: (s) => s.dateUpdated.optional(),
  totalAmount: (s) =>
    s.totalAmount
      .int()
      .positive(t('Validator.index.Label.TotalAmountPositiveInteger')),
  typeOfFarming: (s) => s.typeOfFarming.optional(),
  contacts: (s) => s.contacts as unknown as z.ZodArray<z.ZodSchema<Contact>>,
  // contacts: z.array(
  //   z.object({
  //     name: z.string(),
  //     email: z.string().email(),
  //     phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  //   }),
  // ),
  isPublished: (s) => s.isPublished,
})

export type MeasureInsertSchemaType = z.infer<typeof MeasureInsertSchema>

export const MeasureCreateFormSchema = MeasureInsertSchema.extend({
  subsidyValueTemp: z.object({
    hasOneValue: z.boolean(),
    hasMultipleValues: z.boolean(),
    addConventionalSurcharges: z.boolean().optional(),
    surchargesConventional: z
      .object({ description: z.string(), value: z.string(), name: z.string() })
      .array(),
    addOrganicSurcharges: z.boolean().optional(),
    surchargesOrganic: z
      .object({ description: z.string(), value: z.string(), name: z.string() })
      .array(),
    surchargesDefault: z
      .object({
        description: z.string(),
        value: z.string(),
        name: z.string(),
      })
      .array()
      .optional(),
    derivedSubsidyValue: z
      .number()
      .refine((data) => data !== undefined || data > 0, {
        message: t('Validator.index.Label.SubidyValueAtleastOne'),
      }),
  }),
  applicationStepsTemp: z.object({
    includeDescription: z.boolean().optional(),
  }),
  combinationTemp: z.object({
    combinationItems: z.string().array(),
  }),
  effortTemp: z.object({
    includesToolTip: z.boolean().optional(),
  }),
  durationTemp: z.object({
    includesToolTip: z.boolean().optional(),
  }),
  settingTemp: z.object({
    includesToolTip: z.boolean().optional(),
  }),
  situationTemp: z.object({
    includesToolTip: z.boolean().optional(),
  }),
})

export type MeasureCreateFormSchemaType = z.infer<
  typeof MeasureCreateFormSchema
>

export interface ValueRange {
  min: number
  max: number
}

export type LandSettings = Record<
  (typeof settingEnum.enumValues)[number],
  boolean
>

export type LandSettingsKey = (typeof settingEnum.enumValues)[number]

export type LandSituation = Record<
  (typeof situationEnum.enumValues)[number],
  boolean
>

export type SituationKey = (typeof situationEnum.enumValues)[number]

export type FarmTypeKey = (typeof typeOfFarmingEnum.enumValues)[number]

export type AnimalKey = (typeof animalTypeEnum.enumValues)[number]

export interface Animals {
  hasAnimals: boolean
  cows: boolean
  pigs: boolean
  poultry: boolean
  sheep: boolean
  goats: boolean
  others: boolean
}

export type SubsidyProvider = Record<
  (typeof subsidyProviderEnum.enumValues)[number],
  boolean
>

export interface FilterState {
  valueRange: ValueRange
  effortLevel: string
  typeOfFarming: string
  landSettings: LandSettings
  landSituation: LandSituation
  animals: Animals
  subsidyProvider: SubsidyProvider
  setValueRange: (min: number, max: number) => void
  setEffortLevel: (level: string) => void
  setTypeOfFarming: (type: string) => void
  setLandSettings: (settings: Partial<LandSettings>) => void
  setLandSituation: (situation: Partial<LandSituation>) => void
  setAnimals: (animals: Partial<Animals>) => void
  setSubsidyProvider: (provider: Partial<SubsidyProvider>) => void
  resetFilters: () => void
}

export { Animal }

export interface OnboardingData {
  location: string
  farmingType: 'organic' | 'conventional' | null
  farmSize: number
  animals: {
    hasAnimals: boolean
    animalTypes: Animal[]
    livestockUnit: number | undefined
  }
  farmName: string
  currentStep:
    | 'location'
    | 'farmingType'
    | 'farmSize'
    | 'animals'
    | 'farmName'
    | 'review'
    | null
}

export interface StepProps {
  onNext: () => void
  onBack: () => void
}
export interface FarmData {
  location: string
  farmingType: 'organic' | 'conventional' | null
  farmSize: number | undefined
  animals?: {
    hasAnimals: boolean
    animalTypes: string[]
    livestockUnit: number | undefined
  }
  farmName: string
}

export type FarmingType = 'organic' | 'conventional' | null
export interface DeleteAccoiuntModalProps {
  isOpen: boolean
  onClose: () => void
}
export interface ProfileFieldProps {
  label: string
  initialValue: string
  editing: boolean
  onEdit: () => void
  onSave: (value: string) => void
  type?: 'text' | 'password'
  edittable?: boolean
}

export interface NotificationItemProps {
  title: string
  explanation: string
}

export type Status = (typeof MeasureStatusEnum.enumValues)[number] | null
export type MeasureWithStatus = MeasureSelectSchemaType & {
  status: Status
}

// FARM SCHEMA
export const FarmSelectSchema = createSelectSchema(farm)
export const FarmInsertSchema = createInsertSchema(farm, {
  animals: (s) => s.animals as unknown as z.ZodArray<typeof s.animals, 'many'>,
}).omit({
  userId: true,
})

export type FarmInsertSchemaType = z.infer<typeof FarmInsertSchema>
export type FarmSelectSchemaType = z.infer<typeof FarmSelectSchema>
