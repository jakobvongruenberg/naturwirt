import { Suspense } from 'react'

import { SpinnerFullPage } from '@farmers/ui/spinner'

import BrowsePage from '~/app/_components/Browse/browse-page'

const Browse = () => {
  return (
    <Suspense fallback={<SpinnerFullPage />}>
      <BrowsePage />
    </Suspense>
  )
}

export default Browse
