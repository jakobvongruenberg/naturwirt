import type {
  FarmTypeKey,
  LandSettingsKey,
  SituationKey,
} from '@farmers/validators'
import { t } from '@farmers/language/i18next'

export const getLandSettingTranslation = (key: LandSettingsKey) => {
  switch (key) {
    case 'arable land':
      return t('FiltersBar.Buttons.ArableLand')
    case 'grassland':
      return t('FiltersBar.Buttons.Grassland')
    case 'bog':
      return t('FiltersBar.Buttons.Bog')
    case 'woodland':
      return t('FiltersBar.Buttons.Woodland')
    case 'special':
      return t('FiltersBar.Buttons.Special')
    case 'other':
      return t('FiltersBar.Buttons.Other')
    default:
      return ''
  }
}

export const getSituationTranslation = (key: SituationKey) => {
  switch (key) {
    case 'rotating':
      return t('FiltersBar.Buttons.Rotating')
    case 'whole farm':
      return t('FiltersBar.Buttons.WholeFarm')
    case 'fixed':
      return t('FiltersBar.Buttons.Fixed')
    default:
      return ''
  }
}

export const getFarmTypeTranslation = (key: FarmTypeKey) => {
  switch (key) {
    case 'conventional':
      return t('Measure.Label.Conventional')
    case 'organic':
      return t('Measure.Label.Organic')
    default:
      return t('Measure.Label.Any')
  }
}

// TODO: Add sheep and goats to the translation
// export const getAnimalTypeTranslation = (key: AnimalKey) => {
// 	switch (key) {
// 		case 'cow':
// 			return t('Onboarding.Step.Options.Cows')
// 		case 'pig':
// 			return t('Onboarding.Step.Options.Pigs')
// 		case 'poultry':
// 			return t('Onboarding.Step.Options.Poultry')
// 		case 'sheep_goats':
// 			return t('Onboarding.Step.Options.Sheep')
// 		case 'others':
// 			return t('Onboarding.Step.Options.Others')
// 		default:
// 			return ''
// 	}
// }
