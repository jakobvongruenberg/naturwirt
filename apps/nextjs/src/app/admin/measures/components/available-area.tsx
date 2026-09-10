'use client'

import { t } from '@farmers/language/i18next'
import { kreis } from '@farmers/shared/app/constants'
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@farmers/ui/form'

import LocationSelector from '~/app/_components/location-selector'
import Typography from '~/app/_components/typography'
import { useMeasureCreateFormContext } from '~/store/useFormState'

export const AvailableLand = () => {
  const { control } = useMeasureCreateFormContext()

  const label = t('Measure.Label.AvailableLand')
  const description = t('Measure.Label.AvailableLandDescription')

  return (
    <FormField
      control={control}
      name='applicableLand'
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
          <LocationSelector
            value={field.value?.split(', ') ?? []}
            onValueChange={(val) => field.onChange(val.join(', '))}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export const AvailableKreis = () => {
  const { control } = useMeasureCreateFormContext()

  const label = t('Measure.Label.AvailableKreis')
  const description = t('Measure.Label.AvailableKreisDescription')

  return (
    <FormField
      control={control}
      name='applicableKreis'
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
          <LocationSelector
            value={field.value?.split(', ') ?? []}
            onValueChange={(val) => field.onChange(val.join(', '))}
            options={kreis}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
