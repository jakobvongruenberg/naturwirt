import { t } from '@farmers/language/i18next'

import Typography from '~/app/_components/typography'
import { useLocations } from '~/hooks/use-locations'
import { store } from '~/store/zustand'
import { VirtualizedCombobox } from '../searchbar'

export const FormLocationStep = () => {
  const storedLocation = store.use((s) => s.onboarding.location)
  const { allLocations: measureLocations } = useLocations()

  return (
    <div className='flex h-full flex-col items-center px-4 py-6 lg:px-6'>
      <Typography
        type='h2'
        className='mb-6 text-center text-2xl text-gray-600 lg:text-left lg:text-3xl'
      >
        {t('Onboarding.Step.Label.WhereFarmLocated')}
      </Typography>
      <div className='w-full max-w-md'>
        <VirtualizedCombobox
          options={measureLocations}
          value={storedLocation}
          onSelect={(item) => {
            store.update({
              onboarding: {
                location: item,
              },
            })
          }}
          searchPlaceholder={t('Browse.Label.Location')}
        />
      </div>
    </div>
  )
}
