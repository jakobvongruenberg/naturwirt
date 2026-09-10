import { create } from 'zustand'

import type { FilterState } from '@farmers/validators'

const useFilterStore = create<FilterState>((set) => ({
  valueRange: { min: 0, max: 1000 },
  effortLevel: 'Any',
  typeOfFarming: 'Any',
  landSettings: {
    'arable land': true,
    grassland: true,
    bog: true,
    woodland: true,
    special: true,
    other: true,
  },
  landSituation: {
    fixed: true,
    rotating: true,
    'whole farm': true,
  },
  animals: {
    hasAnimals: false,
    cows: false,
    pigs: false,
    poultry: false,
    sheep: false,
    goats: false,
    others: false,
  },
  subsidyProvider: {
    AUKM: true,
    ÖR: true,
    VNS: true,
    Private: true,
  },
  setValueRange: (min, max) => set({ valueRange: { min, max } }),
  setEffortLevel: (level) => set({ effortLevel: level }),
  setTypeOfFarming: (type) => set({ typeOfFarming: type }),
  setLandSettings: (settings) =>
    set((state) => ({
      landSettings: { ...state.landSettings, ...settings },
    })),
  setLandSituation: (situation) =>
    set((state) => ({
      landSituation: { ...state.landSituation, ...situation },
    })),
  setAnimals: (animals) =>
    set((state) => ({
      animals: { ...state.animals, ...animals },
    })),
  setSubsidyProvider: (provider) =>
    set((state) => ({
      subsidyProvider: { ...state.subsidyProvider, ...provider },
    })),
  resetFilters: () =>
    set({
      valueRange: { min: 10, max: 1000 },
      effortLevel: 'Any',
      typeOfFarming: 'Any',
      landSettings: {
        'arable land': true,
        grassland: true,
        bog: true,
        woodland: true,
        special: true,
        other: true,
      },
      landSituation: {
        fixed: true,
        rotating: true,
        'whole farm': true,
      },
      animals: {
        hasAnimals: false,
        cows: false,
        pigs: false,
        poultry: false,
        sheep: false,
        goats: false,
        others: false,
      },
      subsidyProvider: {
        AUKM: true,
        VNS: true,
        ÖR: true,
        Private: true,
      },
    }),
}))

export default useFilterStore
