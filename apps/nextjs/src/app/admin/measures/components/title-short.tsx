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

const TitleShort = () => {
  const { control } = useMeasureCreateFormContext()

  return (
    <FormField
      control={control}
      name='measureTitleShort'
      render={({ field }) => (
        <FormItem className='py-8'>
          <FormLabel>
            <Typography type='large'>
              {t('Measure.Label.MeasureTitleShort')}
            </Typography>
          </FormLabel>
          <FormDescription>
            <Typography
              type='small'
              className='my-5 flex items-center text-[18px]'
            >
              {t('Measure.Label.MeasureTitleShortDescription')}
            </Typography>
          </FormDescription>
          <Input
            className='h-[42px]'
            placeholder={t('Measure.Placeholder.EnterTitle')}
            {...field}
            maxLength={60}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default TitleShort
