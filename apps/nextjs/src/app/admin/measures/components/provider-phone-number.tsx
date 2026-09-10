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

const ProviderPhoneNumber = () => {
  const { control } = useMeasureCreateFormContext()

  const label = t('Measure.Label.ProviderPhoneNumber')
  const description = t('Measure.Label.ProviderPhoneNumberDescription')
  const placeholder = t('Measure.Placeholder.EnterPhoneNumber')

  return (
    <FormField
      control={control}
      name='providerPhoneNumber'
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

export default ProviderPhoneNumber
