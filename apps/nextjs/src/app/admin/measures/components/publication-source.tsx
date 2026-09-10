'use client'

import { t } from '@farmers/language/i18next'
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@farmers/ui/form'
import { Input } from '@farmers/ui/input'

import Typography from '~/app/_components/typography'
import { useMeasureCreateFormContext } from '~/store/useFormState'

const PublicationSource = () => {
  const { control } = useMeasureCreateFormContext()

  const urlLabel = t('Measure.Label.PublicationSourceRequired')
  const urlDescription = t('Measure.Label.PublicationSourceDescription')
  const urlPlaceholder = t('Measure.Placeholder.PublicationSource')

  const labelLabel = t('Measure.Label.PublicationSourceLabel')
  const labelDescription = t('Measure.Label.PublicationSourceLabelDescription')
  const labelPlaceholder = t('Measure.Placeholder.PublicationSourceLabel')

  return (
    <div className='py-8'>
      <FormField
        control={control}
        name='publicationSource'
        render={({ field }) => (
          <FormItem className='mb-6'>
            <FormLabel>
              <Typography type='large'>{urlLabel}</Typography>
            </FormLabel>
            <FormDescription>
              <Typography
                type='small'
                className='my-5 flex items-center text-[18px]'
              >
                {urlDescription}
              </Typography>
            </FormDescription>
            <Input
              className='h-[42px]'
              placeholder={urlPlaceholder}
              {...field}
            />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name='publicationSourceLabel'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <Typography type='large'>{labelLabel}</Typography>
            </FormLabel>
            <FormDescription>
              <Typography
                type='small'
                className='my-5 flex items-center text-[18px]'
              >
                {labelDescription}
              </Typography>
            </FormDescription>
            <Input
              className='h-[42px]'
              placeholder={labelPlaceholder}
              {...field}
              value={field.value ?? ''}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default PublicationSource
