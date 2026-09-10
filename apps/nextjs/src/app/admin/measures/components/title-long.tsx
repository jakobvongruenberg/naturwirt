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

const TitleLong = () => {
  const { control } = useMeasureCreateFormContext()
  const label = t('Measure.Label.MeasureTitleLong')
  const description = t('Measure.Label.MeasureTitleLongDescription')
  const placeholder = t('Measure.Placeholder.EnterLongTitle')
  return (
    <FormField
      control={control}
      name='measureTitleLong'
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
          <Input className='h-[42px]' placeholder={placeholder} {...field} />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default TitleLong
