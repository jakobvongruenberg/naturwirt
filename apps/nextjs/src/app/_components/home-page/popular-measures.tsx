'use client'

import MeasureCard from '~/app/_components/measure-card'
import { api } from '~/trpc/react'
import MeasureSkeleton from '../measure-card/skeleton'

export default function PopularMeasures() {
  const { data: allMeasures, isLoading } = api.measure.publishedView.useQuery()
  const popularMeasures = allMeasures?.slice(0, 6)
  return (
    // grid-rows-1 needed for the mobile layout
    <div className='grid grid-rows-1 gap-4 pb-6 sm:grid-cols-2 lg:grid-cols-3 lg:pb-14'>
      {isLoading
        ? Array.from({ length: 6 }).map((_, index) => (
            <MeasureSkeleton key={index} />
          ))
        : popularMeasures?.map((measure) => (
            <MeasureCard key={measure.id} measure={measure} />
          ))}
    </div>
  )
}
