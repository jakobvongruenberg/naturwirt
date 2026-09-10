'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { useFieldArray } from 'react-hook-form'

import { t } from '@farmers/language/i18next'
import { Button } from '@farmers/ui/button'
import { FormField, FormItem, FormMessage } from '@farmers/ui/form'
import { Input } from '@farmers/ui/input'

import Typography from '~/app/_components/typography'
import { useMeasureCreateFormContext } from '~/store/useFormState'

const KeyDates = () => {
  const { control } = useMeasureCreateFormContext()

  const label = t('Measure.Label.KeyDates')
  const description = t('Measure.Label.KeyDatesDescription')
  const placeholder = t('Measure.Placeholder.EnterDescription')
  const button = t('Measure.Button.AddKeyDate')
  const name = 'keyDates'

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  })

  useEffect(() => {
    // only append if there are no fields
    if (fields.length === 0) {
      append({
        description: '',
        keydate: '',
        type: 'by',
        topField: '',
        bottomField: '',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only run at mount
  }, [])

  return (
    <div className='py-8'>
      <Typography type='large'>{label}</Typography>
      <Typography type='small' className='my-5 flex items-center text-[18px]'>
        {description}
      </Typography>
      <ul className='list-decimal space-y-4 pl-5'>
        {fields.map((field, index) => (
          <li key={field.id} className=''>
            <div className='flex gap-4'>
              <div className='flex h-[42px] items-center text-transparent'>
                .
              </div>
              <div className='flex w-full flex-col gap-2'>
                <div className='flex w-full gap-4'>
                  <FormField
                    control={control}
                    name={`${name}.${index}.topField`}
                    render={({ field }) => (
                      <FormItem className='w-1/2'>
                        <div className='flex flex-col'>
                          <div>
                            {t('Measure.Label.KeyDatesTopFieldDescription')}
                          </div>
                          <Input
                            className='h-[42px] w-full'
                            placeholder={placeholder}
                            {...field}
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`${name}.${index}.bottomField`}
                    render={({ field }) => (
                      <FormItem className='w-1/2'>
                        <div className='flex flex-col'>
                          <div>
                            {t('Measure.Label.KeyDatesBottomFieldDescription')}
                          </div>
                          <Input
                            className='h-[42px] w-full'
                            placeholder={placeholder}
                            {...field}
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <Button
                    type='button'
                    onClick={() => remove(index)}
                    className=''
                  >
                    {t('Measure.Button.Remove')}
                  </Button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Button
        type='button'
        variant='ghost'
        onClick={() =>
          append({
            description: '',
            keydate: '',
            type: 'by',
            topField: '',
            bottomField: '',
          })
        }
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

export default KeyDates
