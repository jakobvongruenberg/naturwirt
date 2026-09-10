'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { t } from '@farmers/language/i18next'
import { Button } from '@farmers/ui/button'
import { FormField, FormItem, FormMessage } from '@farmers/ui/form'
import { Input } from '@farmers/ui/input'

import Typography from '~/app/_components/typography'

const CultivationConditions = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const label = t('Measure.Label.CultivationConditions')
  const description = t('Measure.Label.CultivationConditionsDescription')
  const placeholder = t('Measure.Placeholder.EnterCondition')
  const button = t('Measure.Button.AddCondition')
  const name = 'cultivationConditions'

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  })

  const error = errors[name]?.root?.message as string

  useEffect(() => {
    append('')
  }, [append])

  return (
    <div className='py-8'>
      <Typography type='large'>{label}</Typography>
      <Typography type='small' className='my-5 flex items-center text-[18px]'>
        {description}
      </Typography>
      <ul className='list-[upper-alpha] space-y-4 pl-5'>
        {fields.map((field, index) => (
          <li key={field.id}>
            <FormField
              control={control}
              name={`${name}.${index}`}
              render={({ field }) => (
                <FormItem className='ml-4'>
                  <div className='flex items-center'>
                    <Input
                      className='h-[42px] w-[300px]'
                      placeholder={placeholder}
                      {...field}
                    />
                    {index > 0 && (
                      <Button
                        type='button'
                        onClick={() => remove(index)}
                        className='ml-4'
                      >
                        {t('Measure.Button.Remove')}
                      </Button>
                    )}
                  </div>
                  {error ? (
                    <FormMessage className='mt-4'>{error}</FormMessage>
                  ) : null}
                </FormItem>
              )}
            />
          </li>
        ))}
      </ul>
      <Button
        type='button'
        variant='ghost'
        onClick={() => append('')}
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
    </div>
  )
}

export default CultivationConditions
