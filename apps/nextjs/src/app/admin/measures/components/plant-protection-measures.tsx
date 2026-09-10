'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import PlusIcon from 'public/images/icons/Plus.svg'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { t } from '@farmers/language/i18next'
import { Button } from '@farmers/ui/button'
import { FormField, FormItem, FormMessage } from '@farmers/ui/form'
import { Input } from '@farmers/ui/input'

import Typography from '~/app/_components/typography'

const PlantProtectionMeasures = () => {
  const { control } = useFormContext()

  const label = t('Measure.Label.PlantProtectionMeasures')
  const description = t('Measure.Label.PlantProtectionMeasuresDescription')
  const placeholder = t('Measure.Placeholder.EnterRestriction')
  const button = t('Measure.Button.AddRestriction')
  const name = 'plantProtectionMeasures'

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  })

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
                  <FormMessage />
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
        <Image src={PlusIcon as string} alt={button} height={24} width={24} />
        <span className='italic text-[#9C9C9C]'>{button}</span>
      </Button>
    </div>
  )
}

export default PlantProtectionMeasures
