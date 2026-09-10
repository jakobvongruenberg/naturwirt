import { landOptions } from '@farmers/shared/app/constants'
import { isTruthy, onlyUnique } from '@farmers/shared/common/functions'

import { api } from '~/trpc/react'

export const useLocations = () => {
  const { data: measures } = api.measure.publishedView.useQuery()
  const measureLocations =
    measures
      ?.flatMap((measure) => measure.applicableLand?.split(','))
      ?.map((area) => area?.trim())
      .filter(isTruthy)
      .filter(onlyUnique) ?? []
  return {
    measureLocations,
    allLocations: [
      ...(measureLocations ?? []),
      ...landOptions.filter((lo) => !measureLocations.includes(lo)),
    ],
  }
}
