import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'

import type {
  MeasureSelectSchemaType,
  OnboardingData,
} from '@farmers/validators'
import {
  settingEnum,
  situationEnum,
  subsidyProviderEnum,
} from '@farmers/db/schema/measure'
import { ZustandStore } from '@farmers/shared/common/classes'

import type { Filter } from './types'

export interface User {
  id: string
  email: string
}

export interface StoreState {
  measures: MeasureSelectSchemaType[]
  appliedFilter: Filter
  editingFilter: Filter
  onboarding: OnboardingData
  user: User | null
  activeTab: 'Shortlist' | 'Active' | 'Archived'
}

export const initialFilterValues: Filter = {
  valueRange: { min: 0, max: 0 },
  effortLevel: {
    low: false,
    medium: false,
    high: false,
  },
  typeOfFarming: null,
  landSettings: settingEnum.enumValues.reduce(
    (acc, value) => ({ ...acc, [value]: false }),
    {},
  ),
  landSituation: situationEnum.enumValues.reduce(
    (acc, value) => ({ ...acc, [value]: false }),
    {},
  ),
  animals: {
    hasAnimals: false,
    cows: false,
    pigs: false,
    poultry: false,
    sheep: false,
    goats: false,
    others: false,
  },
  subsidyProvider: subsidyProviderEnum.enumValues.reduce(
    (acc, value) => ({ ...acc, [value]: false }),
    {},
  ),
  location: '',
}

// This type needs to be inferred
const initialState = {
  measures: [] as MeasureSelectSchemaType[],
  activeTab: 'Shortlist' as 'Shortlist' | 'Active' | 'Archived',
  appliedFilter: cloneDeep(initialFilterValues),
  editingFilter: cloneDeep(initialFilterValues),
  onboarding: {
    location: '',
    farmingType: null as OnboardingData['farmingType'],
    farmSize: 0,
    animals: {
      hasAnimals: false,
      animalTypes: [],
      livestockUnit: 0,
    } as OnboardingData['animals'],
    farmName: '',
    currentStep: null as OnboardingData['currentStep'],
  } as OnboardingData,
  user: null as User | null,
}

export const store = new ZustandStore({
  initialState,
  persistOptions: {
    name: 'farmers-zustand',
    persistedKeys: ['activeTab', 'onboarding'],
    version: 1,
    getStorage: () => localStorage,
  },
})

// Add a type-safe setter for activeTab
export const setActiveTab = (tab: 'Shortlist' | 'Active' | 'Archived') => {
  store.set('activeTab', tab)
}

export const updateAppliedFilters = (appliedFilter: Partial<Filter>) => {
  store.update({
    appliedFilter,
  })
}

export const updateEditingFilters = (editingFilter: Partial<Filter>) => {
  store.update({
    editingFilter,
  })
}

export const resetAllFilters = () => {
  store.update({
    appliedFilter: cloneDeep(initialFilterValues),
    editingFilter: cloneDeep(initialFilterValues),
  })
}

export const isReset = () => {
  return !isEqual(initialFilterValues, store.get('appliedFilter'))
}
