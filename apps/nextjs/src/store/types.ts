import type { settingEnum } from '@farmers/db/schema/measure'
import type {
  LandSettings,
  LandSituation,
  SubsidyProvider,
} from '@farmers/validators'

interface ValueRange {
  min: number
  max: number
}

export interface Animals {
  hasAnimals: boolean
  cows: boolean
  pigs: boolean
  poultry: boolean
  sheep: boolean
  goats: boolean
  others: boolean
}
export interface Effort {
  low: boolean
  medium: boolean
  high: boolean
}

export type Setting = (typeof settingEnum.enumValues)[number]

export type Situation = 'rotating' | 'whole farm' | 'fixed'

export interface Filter {
  valueRange: ValueRange
  effortLevel: Effort
  typeOfFarming: 'any' | 'conventional' | 'organic' | null
  landSettings: Partial<LandSettings>
  landSituation: Partial<LandSituation>
  animals: Animals
  subsidyProvider: Partial<SubsidyProvider>
  location: string
  //   setValueRange: (min: number, max: number) => void
  //   setEffortLevel: (level: 'low' | 'medium' | 'high') => void
  //   setTypeOfFarming: (type: 'any' | 'conventional' | 'organic') => void
  //   setLandSettings: (settings: Partial<LandSettings>) => void
  //   setLandSituation: (situation: Partial<LandSituation>) => void
  //   setAnimals: (animals: Partial<Animals>) => void
  //   setSubsidyProvider: (provider: Partial<SubsidyProvider>) => void
  //   resetFilters: () => void
}
export interface StepProps {
  onNext: () => void
  onBack: () => void
}
