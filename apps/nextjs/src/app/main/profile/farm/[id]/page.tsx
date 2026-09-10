import type { OnboardingData } from '@farmers/validators'

import { CrupdateFarm } from '~/app/_components/crupdate-farm'
import Typography from '~/app/_components/typography'
import { api } from '~/trpc/server'

const FarmPage = async ({ params: { id } }: { params: { id: string } }) => {
  const farmData = await api.user.getOwnFarm({
    id: parseInt(id, 10),
  })

  const farm = farmData
    ? {
        id: farmData.id,
        location: farmData.location,
        farmingType: farmData.farmType,
        farmSize: farmData.farmSize,
        animals: {
          hasAnimals: !!farmData.animals?.length,
          animalTypes: farmData.animals ?? [],
          livestockUnit: farmData.livestockUnit ?? undefined,
        },
        farmName: farmData.name,
        currentStep: null as OnboardingData['currentStep'],
      }
    : null

  if (!farm) {
    return <Typography type={'small'}>No farm found</Typography>
  }
  return <CrupdateFarm farm={farm} />
}

export default FarmPage
