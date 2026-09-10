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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@farmers/ui/select'

import Typography from '~/app/_components/typography'
import { useMeasureCreateFormContext } from '~/store/useFormState'

const Effort = () => {
  const { control } = useMeasureCreateFormContext()

  const label = t('Measure.Label.Effort')
  const description = t('Measure.Label.EffortDescription')
  const placeholder = t('Measure.Placeholder.ChooseEffortLevel')
  const tooltipName = 'effortToolTip'

  const includesTooltipName = 'effortTemp.includesToolTip'
  const includeToolTip = useWatch<MeasureCreateFormSchemaType>({
    name: includesTooltipName,
  })

  const options = [
    { value: 'low', label: t('Browse.EffortRating.Low') },
    { value: 'medium', label: t('Browse.EffortRating.Medium') },
    { value: 'high', label: t('Browse.EffortRating.High') },
  ]

  return (
    <div className='py-8'>
      <FormField
        control={control}
        name='effort'
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
            <FormControl>
              <Select
                value={field.value}
                onValueChange={(val) => field.onChange(val)}
                key={field.value}
              >
                <SelectTrigger className='w-[250px]'>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent side='bottom' position='popper'>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
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
          {t('Measure.Label.IncludeTooltip')}
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
              placeholder={t('Measure.Placeholder.TooltipMessage')}
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

export default Effort
