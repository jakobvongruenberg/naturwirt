'use client'

import { useWatch } from 'react-hook-form'

import type { MeasureCreateFormSchemaType } from '@farmers/validators'
import { t } from '@farmers/language/i18next'
import { cn } from '@farmers/ui'
import { Checkbox } from '@farmers/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@farmers/ui/form'
import { Input } from '@farmers/ui/input'

import Typography from '~/app/_components/typography'
import { useMeasureCreateFormContext } from '~/store/useFormState'

const Renewable = () => {
  const { control } = useMeasureCreateFormContext()

  const description = t('Measure.Label.RenewableDescription')
  const tooltipName = 'renewableToolTip'
  const isRenewable = useWatch<MeasureCreateFormSchemaType>({
    name: 'renewable',
  })

  return (
    <div className='py-8'>
      <FormLabel>
        <Typography type='large'>{description}</Typography>
      </FormLabel>
      <div className='flex items-end gap-4 py-4'>
        <FormField
          control={control}
          name={'renewable'}
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
          {t('Measure.Label.Renewable')}
        </Typography>
      </div>
      <FormField
        control={control}
        name={tooltipName}
        render={({ field }) => (
          <FormItem
            className={cn({
              hidden: !isRenewable,
            })}
          >
            <FormLabel>
              <Typography type='small'>
                {t('Measure.Label.RenewableTooltipDescription')}
              </Typography>
            </FormLabel>
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

export default Renewable
