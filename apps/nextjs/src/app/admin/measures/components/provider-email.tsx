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

const ProviderEmail = () => {
  const { control } = useMeasureCreateFormContext()

  const label = t('Measure.Label.ProviderEmail')
  const description = t('Measure.Label.ProviderEmailDescription')
  const placeholder = t('Measure.Placeholder.EnterEmailAddress')

  return (
    <FormField
      control={control}
      name='providerEmail'
      render={({ field }) => (
        <FormItem className='py-8'>
          <FormLabel>
            <Typography type='large'>{label}</Typography>
          </FormLabel>
          <FormDescription>
            <Typography
              type='small'
              className='my-5 flex items-center text-[18px]'
            >
              {description}
            </Typography>
          </FormDescription>
          <Input
            className='h-[42px]'
            placeholder={placeholder}
            {...field}
            value={field.value ?? ''}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default ProviderEmail
