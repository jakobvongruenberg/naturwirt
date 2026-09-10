import { store } from '~/store/zustand'

export const validateInput = (
  currentIndex: string,
  setError: (error: string | null) => void,
) => {
  switch (currentIndex) {
    case 'location':
      if (!store.get('onboarding').location) {
        setError('Location is required')
        return false
      }
      break
    case 'farmingType':
      if (!store.get('onboarding').farmingType) {
        setError('Farming type is required')
        return false
      }
      break
    case 'animals':
      if (store.get('onboarding').animals.hasAnimals) {
        if (store.get('onboarding').animals.animalTypes.length === 0) {
          setError('At least one animal is required')
          return false
        }
      }
      break
    case 'farmName':
      if (!store.get('onboarding').farmName) {
        setError('Farm name is required')
        return false
      }
      break
    default:
      break
  }
  setError(null)
  return true
}
