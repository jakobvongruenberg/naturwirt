'use client'

import Image from 'next/image'
import { useFieldArray } from 'react-hook-form'

import { t } from '@farmers/language/i18next'
import { Button } from '@farmers/ui/button'
import { Checkbox } from '@farmers/ui/checkbox'
import { FormField, FormMessage } from '@farmers/ui/form'
import { Input } from '@farmers/ui/input'

import Typography from '~/app/_components/typography'
import { useMeasureCreateFormContext } from '~/store/useFormState'

const Combinations = () => {
  const { control, watch } = useMeasureCreateFormContext()
  const label = t('Measure.Label.Combination')
  const description = t('Measure.Label.CombinationDescription')
  const placeholder = t('Measure.Placeholder.EnterIdentifier')
  const button = t('Measure.Button.AddCombination')

  const { fields, append, remove } = useFieldArray({
    control,
    //@ts-expect-error -- TS doesn't like useFieldArray on array of strings https://react-hook-form.com/docs/usefieldarray
    name: 'combinationTemp.combinationItems',
  })

  const combinations = watch('combinations')

  return (
    <div className='py-8'>
      <Typography type='large'>{label}</Typography>
      <Typography
        type='small'
        className='mb-2 mt-5 flex items-center text-[18px]'
      >
        {description}
      </Typography>
      <FormField
        control={control}
        name={`combinations`}
        render={({ field }) => (
          <>
            <div className='flex items-center gap-4'>
              <Checkbox
                checked={field.value === false}
                onCheckedChange={(checked) =>
                  field.onChange(checked ? false : true)
                }
                className='h-6 w-6'
              />
              <Typography
                type='small'
                className='flex items-center text-[18px] font-normal'
              >
                {t('Measure.Options.Combination.No')}
              </Typography>
            </div>
            <div className='mt-4 flex items-center gap-4'>
              <Checkbox
                checked={field.value === true}
                onCheckedChange={(checked) =>
                  field.onChange(checked ? true : false)
                }
                className='h-6 w-6'
              />
              <Typography
                type='small'
                className='flex items-center text-[18px] font-normal'
              >
                {t('Measure.Options.Combination.Yes')}
              </Typography>
            </div>

            <FormMessage className='mt-4' />
          </>
        )}
      />
      {combinations && (
        <div>
          <Typography
            type='small'
            className='mb-2 mt-2 flex items-center text-[18px] font-semibold'
          >
            {`Enter the Unique Identifier of the available combination(s)`}
          </Typography>
          <ul className='mt-4 list-none space-y-4'>
            {fields.map((_, index) => (
              <li key={index}>
                <div className='flex items-center'>
                  <FormField
                    control={control}
                    name={`combinationTemp.combinationItems.${index}`}
                    render={({ field }) => (
                      <Input
                        className='h-[42px] w-[700px]'
                        placeholder={placeholder}
                        {...field}
                      />
                    )}
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
              </li>
            ))}
          </ul>
          <Button
            type='button'
            variant='ghost'
            // @ts-expect-error -- TS doesn't like useFieldArray on array of strings https://react-hook-form.com/docs/usefieldarray
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
      )}
    </div>
  )
}

export default Combinations
