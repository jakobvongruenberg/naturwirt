'use client'

import { useWatch } from 'react-hook-form'

import type { MeasureCreateFormSchemaType } from '@farmers/validators'
import { t } from '@farmers/language/i18next'
import { cn } from '@farmers/ui'
import { Checkbox } from '@farmers/ui/checkbox'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@farmers/ui/form'
import { Input } from '@farmers/ui/input'

import Typography from '~/app/_components/typography'
import { useMeasureCreateFormContext } from '~/store/useFormState'

const Duration = () => {
  const { control } = useMeasureCreateFormContext()

  const label = t('Measure.Label.Duration')
  const description = t('Measure.Label.DurationDescription')
  const placeholder = t('Measure.Placeholder.EnterValue')
  const tooltipPlaceholder = t('Measure.Placeholder.TooltipMessage')
  const tooltipLabel = t('Measure.Label.IncludeTooltip')

  const tooltipName = 'durationToolTip'

  const includesTooltipName = 'durationTemp.includesToolTip'
  const includeToolTip = useWatch<MeasureCreateFormSchemaType>({
    name: includesTooltipName,
  })

  return (
    <div className='py-8'>
      <FormField
        control={control}
        name='duration'
        render={({ field }) => (
          <FormItem>
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
              className='h-[42px] w-[250px]'
              placeholder={placeholder}
              {...field}
              value={field.value}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
            <FormMessage />
          </FormItem>
        )}
      />
      <div className='flex items-end gap-4'>
        <FormField
          control={control}
          name={includesTooltipName}
          render={({ field }) => (
            <FormControl>
              <Checkbox
                className='h-6 w-6'
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          )}
        />
        <Typography
          type='small'
          className='mt-5 flex items-center text-[18px] font-normal'
        >
          {tooltipLabel}
        </Typography>
      </div>
      <FormField
        control={control}
        name={tooltipName}
        render={({ field }) => (
          <FormItem
            className={cn({
              hidden: !includeToolTip,
            })}
          >
            <Input
              className='mt-5 h-[42px]'
              placeholder={tooltipPlaceholder}
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

export default Duration
