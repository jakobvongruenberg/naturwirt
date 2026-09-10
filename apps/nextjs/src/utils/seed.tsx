import type { MeasureCreateFormSchemaType } from '@farmers/validators'
import { kreis, land } from '@farmers/shared/app/constants'
import { generateGermanPhoneNumber } from '@farmers/shared/app/functions'
import { dayjs } from '@farmers/shared/common/dayjs/index'
import { isTruthy } from '@farmers/shared/common/functions'

export const formDevValues: () => Partial<MeasureCreateFormSchemaType> =
  () => ({
    subsidyValueTemp: {
      isPublished: true,
      hasOneValue: false,
      hasMultipleValues: true,
      addConventionalSurcharges: true,
      surchargesConventional: [
        {
          name: 'Flowering undersow',
          description: 'Flowering undersow (description)',
          value: '450',
        },
        {
          name: 'Stubble fallow',
          description: 'Stubble fallow (description)',
          value: '130',
        },
      ],
      derivedSubsidyValue: Math.floor(Math.random() * 5000),
      addOrganicSurcharges: true,
      surchargesOrganic: [
        {
          name: 'Legumes',
          description: 'Legumes (description)',
          value: '60',
        },
        {
          name: 'Cover crops',
          description: 'Cover crops (description)',
          value: '40',
        },
        {
          name: 'Nitrogen fixers',
          description: 'Nitrogen fixers (description)',
          value: '50',
        },
      ],
      surchargesDefault: [],
      // areaOptimization: [
      //   {
      //     maximumOperation: '10 ha',
      //     maximumArea: 'No restrictions',
      //     minimumArea: '> 0.25 ha (at least 15 m at the widest point)',
      //     form: 'Stripe / area',
      //   },
      // ],
    },
    measureIdentifier: 'EXT_Cereal_Grain_Cultivation_2024',
    measureTitleLong: 'Extensive cereal/grain cultivation',
    measureTitleShort: 'Cereal/Grain Cultivation',
    programTitle: 'ÖR - AUKM',
    publicationDate: dayjs().subtract(10, 'day').toDate(),
    publicationSource:
      'https://www.lwk-niedersachsen.de/services/download.cfm?file=38796',
    applicationDate: dayjs().subtract(5, 'day').toDate(),
    // Get 1-3 random lands
    applicableLand: Array.from(Array(Math.ceil(Math.random() * 3)))
      .map(() => land[Math.floor(Math.random() * land.length)])
      .filter(isTruthy)
      .join(', '),
    applicableKreis: Array.from(Array(Math.ceil(Math.random() * 3)))
      .map(() => kreis[Math.floor(Math.random() * kreis.length)])
      .filter(isTruthy)
      .join(', '),
    surcharges: [],
    includeWarning: false,
    effort: 'low' as const,
    effortToolTip:
      'This rating is based on expert opinion and the experience of farmers using this platform.',
    duration: 5,
    durationToolTip: 'Duration of 5 years',
    setting: 'arable land',
    settingToolTip: 'Cultivation on arable land in Brandenburg',
    situation: 'rotating',
    situationToolTip:
      'The measure is bound to specific areas on the farm and can be rotated over the farm.',
    whatsInvolved:
      'Annual cultivation of cereals, cereal legumes, and grain mixtures with extensive production',
    cultivationConditions: ['Double seed row spacing', 'No irrigation'],
    plantProtectionMeasures: ['No specific measures required'],
    fertilizer: [
      'No chemical synthetic fertilisation',
      '50% organic fertilisation of the N requirement',
    ],
    keyBenefits: [
      'Conservation and promotion of habitats for insects and birds',
      'Promotion of breeding opportunities',
      'Reducing the impact of pesticides on soil organisms',
      'Protection of rare wild field herbs',
    ],
    keyDates: [
      {
        type: 'by',
        description: 'Spring sowing until 15 Apr',
        keydate: '2024-04-15',
        topField: '2024-04-15',
        bottomField: '2024-04-15',
      },
      {
        type: 'from',
        description: 'Harvest from 8 Aug',
        keydate: '2024-08-08',
        topField: '2024-08-08',
        bottomField: '2024-08-08',
      },
      {
        type: 'from',
        description: 'Tillage from 16 Sep',
        keydate: '2024-09-16',
        topField: '2024-09-16',
        bottomField: '2024-09-16',
      },
      {
        type: 'by',
        description: 'Autumn sowing until 15 Oct',
        keydate: '2024-10-15',
        topField: '2024-10-15',
        bottomField: '2024-10-15',
      },
    ],
    areaOptimization: {
      maximumOperation: '10 ha',
      maximumArea: 'No restrictions',
      minimumArea: '> 0.25 ha (at least 15 m at the widest point)',
      form: 'Stripe / area',
    },

    combinations: true,
    combinationsDescription:
      'Combinations available: Diverse cultures, Agroforestry, Natura 2000',
    combinationTemp: {
      combinationItems: ['Diverse cultures', 'Agroforestry', 'Natura 2000'],
    },
    applicationStepsTemp: {
      includeDescription: true,
    },
    applicationSteps: [
      {
        description: 'Apply on ANDI app',
        url: 'https://governmentandi.app',
        stepNumber: 1,
      },
      {
        description: 'Submit required documents',
        url: 'https://www.example.com',
        stepNumber: 2,
      },
    ],
    applicationDescription:
      'Initial applications for participation in the AUKM for the new funding period must be submitted via the ANDI app by May 15, 2024 at the latest, and the required application attachments must be submitted in writing to the Chamber of Agriculture (approval authority).',
    subsidyValueConventional: 1088,
    subsidyValueOrganic: 1250,
    providerEmail: 'info@lwk-niedersachsen.de',
    providerPhoneNumber: generateGermanPhoneNumber(),
    effortTemp: {
      includesToolTip: true,
    },
    durationTemp: {
      includesToolTip: true,
    },
    settingTemp: {
      includesToolTip: true,
    },
    situationTemp: {
      includesToolTip: true,
    },
  })
