'use client'

import { t } from '@farmers/language/i18next'
import { FormField } from '@farmers/ui/form'

import FormDatePicker from '~/app/_components/date-picker'
import { useMeasureCreateFormContext } from '~/store/useFormState'

const PublicationDate = () => {
  const { control } = useMeasureCreateFormContext()

  const label = t('Measure.Label.PublicationDate')
  const description = t('Measure.Label.PublicationDateDescription')
  const noSelectionMessage = t('Measure.Label.NoSelection')

  return (
    <FormField
      control={control}
      name='publicationDate'
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

export default PublicationDate
