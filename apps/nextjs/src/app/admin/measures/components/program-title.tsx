'use client'

import { t } from '@farmers/language/i18next'
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@farmers/ui/form'
import { Input } from '@farmers/ui/input'

import Typography from '~/app/_components/typography'
import { useMeasureCreateFormContext } from '~/store/useFormState'

const ProgramTitle = () => {
  const { control } = useMeasureCreateFormContext()

  const label = t('Measure.Label.ProgramTitle')
  const description = t('Measure.Label.ProgramTitleDescription')
  const placeholder1 = t('Measure.Placeholder.ProgramTitle1')
  const placeholder2 = t('Measure.Placeholder.ProgramTitle2')

  return (
    <FormField
      control={control}
      name='programTitle'
      render={({ field }) => {
        const [section1, section2] = field.value?.split(' - ') ?? ['', '']

        return (
          <FormItem className='py-8'>
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
            <div className='flex items-center gap-2'>
              <Input
                className='h-[42px] w-[160px]'
                placeholder={placeholder1}
                value={section1}
                onChange={(e) => {
                  const value = e.target.value.trim()

                  field.onChange(`${value} - ${section2}`)
                }}
              />
              <Typography
                type='small'
                className='flex items-center text-[18px]'
              >
                -
              </Typography>
              <Input
                className='h-[42px] w-[160px]'
                placeholder={placeholder2}
                value={section2}
                onChange={(e) => {
                  const value = e.target.value.trim()

                  field.onChange(`${section1} - ${value}`)
                }}
              />
            </div>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export default ProgramTitle
