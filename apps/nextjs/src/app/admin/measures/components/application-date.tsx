'use client'

import { t } from '@farmers/language/i18next'
import { FormField } from '@farmers/ui/form'

import FormDatePicker from '~/app/_components/date-picker'
import { useMeasureCreateFormContext } from '~/store/useFormState'

const ApplicationDate = () => {
  const { control } = useMeasureCreateFormContext()

  const label = t('Measure.Label.ApplicationDate')
  const description = t('Measure.Label.ApplicationDateDescription')
  const noSelectionMessage = t('Measure.Label.NoSelection')

  return (
    <FormField
      control={control}
      name='applicationDate'
      render={({ field }) => (
        <div className='py-8'>
          <FormDatePicker
            field={field}
            label={label}
            description={description}
            noSelectionMessage={noSelectionMessage}
          />
        </div>
      )}
    />
  )
}

export default ApplicationDate
