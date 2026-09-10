'use client'

import { useFormContext } from 'react-hook-form'

import { t } from '@farmers/language/i18next'
import { FormField, FormItem, FormLabel, FormMessage } from '@farmers/ui/form'
import { Input } from '@farmers/ui/input'

import Typography from '~/app/_components/typography'

const AreaDetermination = () => {
  const { control } = useFormContext()
  const placeholder = t('Measure.Placeholder.EnterValue')
  return (
    <div className='py-8'>
      <Typography type='large'>
        {t('Measure.Label.AreaDetermination')}
      </Typography>
      <Typography type='small' className='my-5 flex items-center text-[18px]'>
        {t('Measure.Label.AreaDeterminationDescription')}
      </Typography>
      <FormField
        control={control}
        name={`areaOptimization.maximumOperation`}
        render={({ field }) => (
          <FormItem className=''>
            <FormLabel>
              <Typography
                type='small'
                className='my-5 flex items-center text-[18px] font-bold'
              >
                {t('Measure.Label.MaximumOperation')}
              </Typography>
            </FormLabel>
            <Input
              className='h-[42px] w-[600px]'
              placeholder={placeholder}
              {...field}
            />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`areaOptimization.maximumArea`}
        render={({ field }) => (
          <FormItem className=''>
            <FormLabel>
              <Typography
                type='small'
                className='my-5 flex items-center text-[18px] font-bold'
              >
                {t('Measure.Label.MaximumArea')}
              </Typography>
            </FormLabel>
            <Input
              className='h-[42px] w-[600px]'
              placeholder={placeholder}
              {...field}
            />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`areaOptimization.minimumArea`}
        render={({ field }) => (
          <FormItem className=''>
            <FormLabel>
              <Typography
                type='small'
                className='my-5 flex items-center text-[18px] font-bold'
              >
                {t('Measure.Label.MinimumArea')}
              </Typography>
            </FormLabel>
            <Input
              className='h-[42px] w-[600px]'
              placeholder={placeholder}
              {...field}
            />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`areaOptimization.form`}
        render={({ field }) => (
          <FormItem className=''>
            <FormLabel>
              <Typography
                type='small'
                className='my-5 flex items-center text-[18px] font-bold'
              >
                {t('Measure.Label.Form')}
              </Typography>
            </FormLabel>
            <Input
              className='h-[42px] w-[600px]'
              placeholder={placeholder}
              {...field}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default AreaDetermination
