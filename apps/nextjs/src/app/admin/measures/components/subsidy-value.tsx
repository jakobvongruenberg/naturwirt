'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useFieldArray, useWatch } from 'react-hook-form'

import type { MeasureCreateFormSchemaType } from '@farmers/validators'
import { t } from '@farmers/language/i18next'
import { cn } from '@farmers/ui'
import { Button } from '@farmers/ui/button'
import { Checkbox } from '@farmers/ui/checkbox'
import { FormControl, FormField, FormItem, FormMessage } from '@farmers/ui/form'
import { Input } from '@farmers/ui/input'

import Typography from '~/app/_components/typography'
import { useMeasureCreateFormContext } from '~/store/useFormState'

const SubsidyValue = () => {
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useMeasureCreateFormContext()
  const hasOneValue = useWatch<MeasureCreateFormSchemaType>({
    name: 'subsidyValueTemp.hasOneValue',
  })
  const multipleValues = useWatch<MeasureCreateFormSchemaType>({
    name: 'subsidyValueTemp.hasMultipleValues',
  })

  const addConventionalSurcharges = useWatch<MeasureCreateFormSchemaType>({
    name: 'subsidyValueTemp.addConventionalSurcharges',
  })
  const addOrganicSurcharges = useWatch<MeasureCreateFormSchemaType>({
    name: 'subsidyValueTemp.addOrganicSurcharges',
  })

  const {
    fields: conventionalFields,
    append: conventionalAppend,
    remove: conventionalRemove,
  } = useFieldArray({
    control,
    name: 'subsidyValueTemp.surchargesConventional',
  })
  const {
    fields: organicFields,
    append: organicAppend,
    remove: organicRemove,
  } = useFieldArray({
    control,
    name: 'subsidyValueTemp.surchargesOrganic',
  })

  useEffect(() => {
    if (conventionalFields.length === 0) {
      conventionalAppend({ description: '', value: '', name: '' })
    }
    if (organicFields.length === 0) {
      organicAppend({ description: '', value: '', name: '' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only run at mount
  }, [])

  return (
    <div className='py-8'>
      <Typography type='large'>{t('Measure.Label.SubsidyValue')}</Typography>
      <div className='my-5 space-y-4'>
        <Typography type='small' className='flex items-center text-[18px]'>
          {t('Measure.Label.SubsidyValueDescription')}
        </Typography>
        <div className='flex items-center gap-4'>
          <FormField
            control={control}
            name={`subsidyValueTemp.hasOneValue`}
            render={({ field }) => (
              <FormControl>
                <Checkbox
                  className='h-6 w-6'
                  checked={field.value}
                  onCheckedChange={(e) => {
                    if (!e) {
                      return
                    }
                    setValue('subsidyValueTemp.hasMultipleValues', !e)
                    setValue(
                      'subsidyValueTemp.derivedSubsidyValue',
                      getValues('subsidyValue') ??
                        (undefined as unknown as number),
                    )
                    return field.onChange(e)
                  }}
                />
              </FormControl>
            )}
          />
          <Typography
            type='small'
            className='flex items-center text-[18px] font-normal'
          >
            {t('Measure.Label.MeasureOneValue')}
          </Typography>
        </div>
        <div className='mt-4 flex items-center gap-4'>
          <FormField
            control={control}
            name={`subsidyValueTemp.hasMultipleValues`}
            render={({ field }) => (
              <FormControl>
                <Checkbox
                  className='h-6 w-6'
                  checked={field.value}
                  onCheckedChange={(e) => {
                    if (!e) {
                      return
                    }
                    setValue('subsidyValueTemp.hasOneValue', !e)
                    setValue(
                      'subsidyValueTemp.derivedSubsidyValue',
                      !!getValues('subsidyValueConventional') &&
                        !!getValues('subsidyValueOrganic')
                        ? getValues('subsidyValueConventional')!
                        : (undefined as unknown as number),
                    )
                    return field.onChange(e)
                  }}
                />
              </FormControl>
            )}
          />
          <Typography
            type='small'
            className='flex items-center text-[18px] font-normal'
          >
            {t('Measure.Label.MeasureMultipleValues')}
          </Typography>
        </div>
        <FormField
          control={control}
          name={`subsidyValue`}
          render={({ field }) => (
            <div
              className={cn('space-y-4', {
                hidden: !hasOneValue,
              })}
            >
              <Typography type='p' className=' text-[18px] font-bold'>
                {t('Measure.Label.SubsidyAmount')}
              </Typography>
              <div className='flex items-center'>
                <div className='w-[160px]'>
                  <Input
                    className='h-[42px]'
                    placeholder={t('Measure.Placeholder.EnterAmount')}
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      if (isNaN(value)) {
                        return
                      }

                      field.onChange(value)
                      setValue('subsidyValueTemp.derivedSubsidyValue', value)
                    }}
                  />
                </div>
                <span className='ml-2 text-[18px] text-[#3C3C3C]'>/ ha</span>
              </div>
            </div>
          )}
        />

        <div
          className={cn('space-y-4', {
            hidden: !hasOneValue,
          })}
        >
          <div className='flex items-center gap-2.5 text-[20px]'>
            <FormField
              control={control}
              name={`subsidyValueTemp.addConventionalSurcharges`}
              render={({ field }) => (
                <FormControl>
                  <Checkbox
                    className='h-6 w-6'
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              )}
            />{' '}
            <label htmlFor={'tests'} className='text-[18px]'>
              {t('Measure.Label.AddSurcharges')}
            </label>
          </div>

          <div
            className={cn({
              hidden: !addConventionalSurcharges,
            })}
          >
            <ul className='list-[upper-alpha] space-y-4 pl-5'>
              {conventionalFields.map((field, index) => (
                <li key={field.id} className=''>
                  <div className='grid grid-cols-[1px_160px_320px_220px_84px_1fr] gap-4'>
                    <div className='flex h-[42px] items-center text-transparent'>
                      .
                    </div>
                    <FormField
                      control={control}
                      name={`subsidyValueTemp.surchargesConventional.${index}.name`}
                      render={({ field }) => (
                        <Input
                          className='h-[42px]'
                          placeholder={t('Measure.Placeholder.EnterTitle')}
                          {...field}
                        />
                      )}
                    />
                    <FormField
                      control={control}
                      name={`subsidyValueTemp.surchargesConventional.${index}.description`}
                      render={({ field }) => (
                        <Input
                          className='h-[42px]'
                          placeholder={t(
                            'Measure.Placeholder.EnterDescription',
                          )}
                          {...field}
                        />
                      )}
                    />
                    <FormField
                      control={control}
                      name={`subsidyValueTemp.surchargesConventional.${index}.value`}
                      render={({ field }) => (
                        <div className='flex items-center'>
                          <Input
                            className='h-[42px] w-[160px]'
                            placeholder={t('Measure.Placeholder.EnterAmount')}
                            {...field}
                          />
                          <span className='ml-2 text-[18px] text-[#3C3C3C]'>
                            / ha
                          </span>
                        </div>
                      )}
                    />
                    {index > 0 && (
                      <Button
                        type='button'
                        onClick={() => conventionalRemove(index)}
                        className=''
                      >
                        {t('Measure.Button.Remove')}
                      </Button>
                    )}
                  </div>
                  {errors.subsidyValueTemp?.surchargesConventional?.[index]
                    ?.value ? (
                    <FormMessage>
                      {
                        errors.subsidyValueTemp.surchargesConventional[index]
                          .value.message
                      }
                    </FormMessage>
                  ) : null}
                </li>
              ))}
            </ul>
            <Button
              type='button'
              variant='ghost'
              onClick={() =>
                conventionalAppend({ description: '', value: '', name: '' })
              }
              className='-ml-4 mt-4 flex items-center space-x-2'
            >
              <Image
                src={'/images/icons/Plus.svg'}
                alt={t('Measure.Button.AddSurcharge')}
                height={24}
                width={24}
              />
              <span className='italic text-[#9C9C9C]'>
                {t('Measure.Button.AddSurcharge')}
              </span>
            </Button>
          </div>
        </div>

        <div
          className={cn('space-y-4', {
            hidden: !multipleValues,
          })}
        >
          <FormField
            control={control}
            name={`subsidyValueConventional`}
            render={({ field }) => (
              <FormItem>
                <Typography type='p' className=' text-[18px] font-bold'>
                  {t('Measure.Label.ConventionalSubsidyAmount')}
                </Typography>
                <div className='flex items-center'>
                  <div className='w-[160px]'>
                    <Input
                      className='h-[42px]'
                      placeholder={t('Measure.Placeholder.EnterAmount')}
                      {...field}
                      value={field.value ?? ''}
                      onChange={(e) => {
                        const value = Number(e.target.value)
                        if (isNaN(value)) {
                          return
                        }

                        field.onChange(value)
                        setValue('subsidyValueTemp.derivedSubsidyValue', value)
                      }}
                    />
                  </div>
                  <span className='ml-2 text-[18px] text-[#3C3C3C]'>
                    / {t('Measure.Label.Hectare')}
                  </span>
                </div>
                {errors.subsidyValueConventional ? (
                  <FormMessage>
                    {errors.subsidyValueConventional.message}
                  </FormMessage>
                ) : null}
              </FormItem>
            )}
          />
          <div className='flex items-center gap-2.5 text-[20px]'>
            <FormField
              control={control}
              name={`subsidyValueTemp.addConventionalSurcharges`}
              render={({ field }) => (
                <FormControl>
                  <Checkbox
                    className='h-6 w-6'
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              )}
            />{' '}
            <label htmlFor={'tests'} className='text-[18px]'>
              {t('Measure.Label.AddSurcharges')}
            </label>
          </div>

          <div
            className={cn({
              hidden: !addConventionalSurcharges,
            })}
          >
            <ul className='list-[upper-alpha] space-y-4 pl-5'>
              {conventionalFields.map((field, index) => (
                <li key={field.id} className=''>
                  <div className='grid grid-cols-[1px_160px_320px_220px_84px_1fr] gap-4'>
                    <div className='flex h-[42px] items-center text-transparent'>
                      .
                    </div>
                    <FormField
                      control={control}
                      name={`subsidyValueTemp.surchargesConventional.${index}.name`}
                      render={({ field }) => (
                        <Input
                          className='h-[42px]'
                          placeholder={t('Measure.Placeholder.EnterTitle')}
                          {...field}
                        />
                      )}
                    />
                    <FormField
                      control={control}
                      name={`subsidyValueTemp.surchargesConventional.${index}.description`}
                      render={({ field }) => (
                        <Input
                          className='h-[42px]'
                          placeholder={t(
                            'Measure.Placeholder.EnterDescription',
                          )}
                          {...field}
                        />
                      )}
                    />
                    <FormField
                      control={control}
                      name={`subsidyValueTemp.surchargesConventional.${index}.value`}
                      render={({ field }) => (
                        <div className='flex items-center'>
                          <Input
                            className='h-[42px] w-[160px]'
                            placeholder={t('Measure.Placeholder.EnterAmount')}
                            {...field}
                          />
                          <span className='ml-2 text-[18px] text-[#3C3C3C]'>
                            / ha
                          </span>
                        </div>
                      )}
                    />
                    {index > 0 && (
                      <Button
                        type='button'
                        onClick={() => conventionalRemove(index)}
                        className=''
                      >
                        {t('Measure.Button.Remove')}
                      </Button>
                    )}
                  </div>
                  {errors.subsidyValueTemp?.surchargesConventional?.[index]
                    ?.value ? (
                    <FormMessage>
                      {
                        errors.subsidyValueTemp.surchargesConventional[index]
                          .value.message
                      }
                    </FormMessage>
                  ) : null}
                </li>
              ))}
            </ul>
            <Button
              type='button'
              variant='ghost'
              onClick={() =>
                conventionalAppend({ description: '', value: '', name: '' })
              }
              className='-ml-4 mt-4 flex items-center space-x-2'
            >
              <Image
                src={'/images/icons/Plus.svg'}
                alt={t('Measure.Button.AddSurcharge')}
                height={24}
                width={24}
              />
              <span className='italic text-[#9C9C9C]'>
                {t('Measure.Button.AddSurcharge')}
              </span>
            </Button>
          </div>
          <FormField
            control={control}
            name={`subsidyValueOrganic`}
            render={({ field }) => (
              <FormItem>
                <Typography type='p' className=' text-[18px] font-bold'>
                  {t('Measure.Label.OrganicSubsidyAmount')}
                </Typography>
                <div className='flex items-center'>
                  <div className='w-[160px]'>
                    <Input
                      className='h-[42px]'
                      placeholder={t('Measure.Placeholder.EnterAmount')}
                      {...field}
                      value={field.value ?? ''}
                      onChange={(e) => {
                        const value = Number(e.target.value)
                        if (isNaN(value)) {
                          return
                        }

                        field.onChange(value)
                        setValue('subsidyValueTemp.derivedSubsidyValue', value)
                      }}
                    />
                  </div>
                  <span className='ml-2 text-[18px] text-[#3C3C3C]'>/ ha</span>
                </div>
                {errors.subsidyValueOrganic ? (
                  <FormMessage>
                    {errors.subsidyValueOrganic.message}
                  </FormMessage>
                ) : null}
              </FormItem>
            )}
          />
          <div className='flex items-center gap-2.5 text-[20px]'>
            <FormField
              control={control}
              name={`subsidyValueTemp.addOrganicSurcharges`}
              render={({ field }) => (
                <FormControl>
                  <Checkbox
                    className='h-6 w-6'
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              )}
            />{' '}
            <label htmlFor={'tests'} className='text-[18px]'>
              {t('Measure.Label.AddSurcharges')}
            </label>
          </div>

          <div
            className={cn({
              hidden: !addOrganicSurcharges,
            })}
          >
            <ul className='list-[upper-alpha] space-y-4 pl-5'>
              {organicFields.map((field, index) => (
                <li key={field.id} className=''>
                  <div className='grid grid-cols-[1px_160px_320px_220px_84px_1fr] gap-4'>
                    <div className='flex h-[42px] items-center text-transparent'>
                      .
                    </div>
                    <FormField
                      control={control}
                      name={`subsidyValueTemp.surchargesOrganic.${index}.name`}
                      render={({ field }) => (
                        <Input
                          className='h-[42px]'
                          placeholder={t('Measure.Placeholder.EnterTitle')}
                          {...field}
                        />
                      )}
                    />
                    <FormField
                      control={control}
                      name={`subsidyValueTemp.surchargesOrganic.${index}.description`}
                      render={({ field }) => (
                        <Input
                          className='h-[42px]'
                          placeholder={t('Measure.Placeholder.EnterTitle')}
                          {...field}
                        />
                      )}
                    />
                    <FormField
                      control={control}
                      name={`subsidyValueTemp.surchargesOrganic.${index}.value`}
                      render={({ field }) => (
                        <div className='flex items-center'>
                          <Input
                            className='h-[42px] w-[160px]'
                            placeholder={t('Measure.Placeholder.EnterAmount')}
                            {...field}
                          />
                          <span className='ml-2 text-[18px] text-[#3C3C3C]'>
                            / ha
                          </span>
                        </div>
                      )}
                    />
                    <Button
                      type='button'
                      onClick={() => organicRemove(index)}
                      className={cn({
                        hidden: index <= 0,
                      })}
                    >
                      {t('Measure.Button.Remove')}
                    </Button>
                  </div>
                  {errors.subsidyValueTemp?.surchargesOrganic?.[index]
                    ?.value ? (
                    <FormMessage>
                      {
                        errors.subsidyValueTemp.surchargesOrganic[index].value
                          .message
                      }
                    </FormMessage>
                  ) : null}
                </li>
              ))}
            </ul>
            <Button
              type='button'
              variant='ghost'
              onClick={() =>
                organicAppend({ description: '', value: '', name: '' })
              }
              className='-ml-4 mt-4 flex items-center space-x-2'
            >
              <Image
                src={'/images/icons/Plus.svg'}
                alt={t('Measure.Button.AddSurcharge')}
                height={24}
                width={24}
              />
              <span className='italic text-[#9C9C9C]'>
                {t('Measure.Button.AddSurcharge')}
              </span>
            </Button>
          </div>
        </div>

        <FormField
          control={control}
          name={`includeWarning`}
          render={({ field }) => (
            <>
              <div className='flex items-center gap-2.5'>
                <Checkbox
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                  className='h-6 w-6'
                />
                <Typography
                  type='small'
                  className='flex items-center text-[18px] font-normal'
                >
                  {t('Measure.Label.IncludeWarningMessage')}
                </Typography>
              </div>
              <FormMessage />
            </>
          )}
        />
        <Typography type='p' className='ml-[34px] text-[14px] text-[#646464]'>
          {t('Measure.Label.CombinationSurcharges')}{' '}
          <Link href='#' className='underline'>
            {t('Measure.Label.ReadMore')}
          </Link>
        </Typography>
      </div>
    </div>
  )
}

export default SubsidyValue
