import React from 'react'

import { t } from '@farmers/language/i18next'
import { Checkbox } from '@farmers/ui/checkbox'
import { FormControl, FormField, FormItem } from '@farmers/ui/form'

import Typography from '~/app/_components/typography'
import { useMeasureCreateFormContext } from '~/store/useFormState'

function PublishView() {
  const { control } = useMeasureCreateFormContext()
  return (
    <div className='py-8'>
      <Typography type='large'>{t('Measure.Label.PublishView')}</Typography>
      <Typography type='small' className='my-5 flex items-center text-[18px]'>
        {t('Measure.Label.PublishViewDescription')}
      </Typography>
      <div className='flex items-center gap-4'>
        <FormField
          control={control}
          name='isPublished'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex h-6 w-6 items-center justify-center'>
                  <Checkbox
                    className='h-6 w-6'
                    checked={field.value}
                    onCheckedChange={(val) => field.onChange(val)}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Typography type='small' className='text-[18px] font-normal'>
          {t('Measure.Label.MakeThisMeasurePublic')}
        </Typography>
      </div>
    </div>
  )
}

export default PublishView
