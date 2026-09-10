'use client'

import Image from 'next/image'
import { useFieldArray, useWatch } from 'react-hook-form'

import { t } from '@farmers/language/i18next'
import { cn } from '@farmers/ui'
import { Button } from '@farmers/ui/button'
import { Checkbox } from '@farmers/ui/checkbox'
import { FormControl, FormField, FormItem, FormMessage } from '@farmers/ui/form'
import { Input } from '@farmers/ui/input'
import { Textarea } from '@farmers/ui/textarea'

import Typography from '~/app/_components/typography'
import { useMeasureCreateFormContext } from '~/store/useFormState'

const ApplicationSteps = () => {
  const {
    control,
    formState: { errors },
  } = useMeasureCreateFormContext()

  const label = t('Measure.Label.ApplicationSteps')
  const description = t('Measure.Label.ApplicationStepsDescription')
  const button = t('Measure.Button.AddApplicationStep')

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'applicationSteps',
  })

  const applicationDescription = useWatch({
    control,
    name: 'applicationStepsTemp.includeDescription',
  })

  const error = errors.applicationSteps?.message ?? ''

  return (
    <div className='py-8'>
      <Typography type='large'>{label}</Typography>
      <Typography type='small' className='my-5 flex items-center text-[18px]'>
        {description}
      </Typography>
      <ul className='list-decimal space-y-4 pl-5'>
        {fields.map((field, index) => (
          <li key={field.id} className=''>
            <div className='grid grid-cols-[1px_375px_1fr_84px] gap-4'>
              <div className='flex h-[42px] items-center  text-transparent'>
                .
              </div>
              <FormItem className=''>
                <div className='flex items-center'>
                  <FormField
                    control={control}
                    name={`applicationSteps.${index}.description`}
                    render={({ field }) => (
                      <Input
                        className='h-[42px]'
                        placeholder={t('Measure.Placeholder.Description')}
                        {...field}
                      />
                    )}
                  />
                </div>
                <FormMessage />
              </FormItem>
              <FormItem className=''>
                <div className='flex items-center'>
                  <FormField
                    control={control}
                    name={`applicationSteps.${index}.url`}
                    render={({ field }) => (
                      <Input
                        className='h-[42px]'
                        placeholder={t('Measure.Placeholder.PublicationSource')}
                        {...field}
                      />
                    )}
                  />
                </div>
                <FormMessage />
              </FormItem>
              {index > 0 && (
                <Button
                  type='button'
                  onClick={() => {
                    remove(index)
                  }}
                  className=''
                >
                  {t('Measure.Button.Remove')}
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <Button
        type='button'
        variant='ghost'
        onClick={() => {
          append({ description: '', url: '', stepNumber: fields.length + 1 })
        }}
        className='-ml-4 mt-4 flex items-center space-x-2'
      >
        <Image
          src={'/images/icons/Plus.svg'}
          alt={button}
          height={24}
          width={24}
        />
        <span className='italic text-[#9C9C9C]'>{button}</span>
      </Button>
      {error ? <FormMessage className='mt-2'>{error}</FormMessage> : null}
      <div className='flex items-end gap-4'>
        <FormField
          control={control}
          name={'applicationStepsTemp.includeDescription'}
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
        name={'applicationDescription'}
        render={({ field }) => (
          <FormItem
            className={cn({
              hidden: !applicationDescription,
            })}
          >
            <Textarea
              className='mt-5 px-4 py-2 text-[16px]'
              placeholder={t('Measure.Placeholder.Description')}
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

export default ApplicationSteps
