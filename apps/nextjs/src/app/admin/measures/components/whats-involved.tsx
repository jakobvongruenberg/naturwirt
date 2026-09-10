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

const WhatsInvolved = () => {
  const { control } = useMeasureCreateFormContext()

  const label = t('Measure.Label.WhatsInvolved')
  const description = t('Measure.Label.WhatsInvolvedDescription')
  const placeholder = t('Measure.Placeholder.EnterDescription')

  return (
    <FormField
      control={control}
      name='whatsInvolved'
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

export default WhatsInvolved
