'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'
import { t } from 'i18next'

import type { Surcharge } from '@farmers/db/schema/measure'
import type { MeasureSelectSchemaType } from '@farmers/validators'
import { SUPPLEMENTS_HEADER_ID } from '@farmers/shared/app/constants'
import { cn } from '@farmers/ui'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@farmers/ui/accordion'
import { Button } from '@farmers/ui/button'
import { Checkbox } from '@farmers/ui/checkbox'
import { ToggleGroup, ToggleGroupItem } from '@farmers/ui/toggle-group'

import { api } from '~/trpc/react'
import { ActionButton } from './action-button'
import { ActivityButton } from './activity-button'
import { DropdownMenu } from './DropdownMenu'
import Typography from './typography'

interface ValueInfoProps {
  data: MeasureSelectSchemaType
}

export interface SurchargeOption {
  name: string
  description: string
  value: number
  type: 'organic' | 'conventional'
}

// Until we know the logic
const SHOW_COMPLETE = false

const ValueInfo: React.FC<ValueInfoProps> = ({ data }) => {
  const { data: userMeasureData } = api.user.getUserMeasures.useQuery()
  const status =
    userMeasureData?.userMeasures?.find((m) => m.id === data.id)?.status ?? null
  const conventionalPrice = data?.subsidyValueConventional ?? 0
  const organicPrice = data?.subsidyValueOrganic ?? 0
  const complex = !!conventionalPrice && !!organicPrice
  const applicationStepsCount = data?.applicationSteps?.length ?? 0
  const isArchived = status === 'archived'
  const isActive = status === 'active'
  const applyBy = data?.applicationDate

  const utils = api.useUtils()
  const { mutateAsync: updateMeasure } =
    api.user.upsertUserMeasure.useMutation()

  const [priceType, setPriceType] = useState<'conventional' | 'organic'>(
    data?.typeOfFarming ?? 'conventional',
  )

  const [options, setOptions] = useState<Surcharge[]>([])

  const [price, setPrice] = useState<{
    conventional: number
    organic: number
  }>({
    conventional: conventionalPrice,
    organic: organicPrice,
  })

  const [selectedOption, setSelectedOption] = useState<{
    conventional: SurchargeOption[]
    organic: SurchargeOption[]
  }>({
    conventional: [],
    organic: [],
  })

  useEffect(() => {
    setOptions(
      data?.surcharges?.filter(
        ({ type, name, value }) => type === priceType && name && value,
      ) ?? [],
    )
  }, [data?.surcharges, priceType])

  const header = (
    <div className='relative'>
      {isArchived && (
        <div className='mb-2 flex items-center gap-2 lg:mb-4 lg:h-10'>
          <Image
            src='/images/icons/archive-empty-box-filled.svg'
            alt=''
            width={24}
            height={24}
            className='lg:h-8 lg:w-8'
          />
          <Typography type='h4' className='text-sm lg:text-base'>
            {t('Browse.Label.Archived')}
          </Typography>
        </div>
      )}
      <div className='flex items-center gap-2 lg:h-10 lg:gap-[5px]'>
        <Image
          src='/images/icons/calendar-tearoff.svg'
          alt=''
          width={24}
          height={24}
          className='lg:h-8 lg:w-8'
        />
        <Typography type='h4' className='text-sm lg:text-base'>
          <span className='font-medium text-[#646464]'>
            {isArchived || isActive
              ? t('Measure.Label.ImplementationStart')
              : t('Browse.Label.ApplyBy')}
            :{' '}
          </span>
          {dayjs(applyBy).format(
            isArchived || isActive ? 'YYYY' : 'DD MMM YYYY',
          )}
        </Typography>
      </div>
      {SHOW_COMPLETE && (isArchived || isActive) && (
        <div className='mt-2 lg:mt-4'>
          <div className='relative mb-1 h-2 w-full rounded-full bg-[#F5F5F5] lg:mb-2 lg:h-2.5'>
            <div className='absolute h-2 w-2/5 rounded-full bg-black lg:h-2.5' />
          </div>
          <Typography
            type='small'
            className='text-xs font-semibold text-[#3C3C3C] lg:text-sm'
          >
            40% {t('Measure.Label.Complete')}
          </Typography>
        </div>
      )}
      {isArchived && (
        <div className='absolute right-0 top-0'>
          <DropdownMenu
            trigger={
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <Image
                  src='/images/icons/menu-vertical.svg'
                  alt=''
                  width={24}
                  height={24}
                  className='lg:h-8 lg:w-8'
                />
              </Button>
            }
            menus={[
              {
                type: 'item' as const,
                label: t('Browse.Label.Unarchive'),
                shortcut: '',
                onClick: () => {
                  void updateMeasure({
                    measureId: data.id,
                    status: null,
                  }).then(() => void utils.user.getUserMeasures.invalidate())
                },
              },
            ]}
          />
        </div>
      )}
    </div>
  )

  return (
    <div className='w-full space-y-3 rounded-lg border border-gray-200 p-3 shadow-md lg:space-y-4 lg:px-5 lg:py-6'>
      {header}
      <div className='h-[1px] border-t border-[#D9D9D9]' />
      {complex && (
        <div className='flex items-center justify-between'>
          <Typography type='large' className='text-sm lg:text-base'>
            {t('Browse.Label.TotalAmount')}
          </Typography>
          <div className='text-xl font-semibold lg:text-3xl'>
            €{price[priceType].toLocaleString()}
            <span className='text-sm font-normal text-[#646464] lg:text-base'>
              {' '}
              / ha
            </span>
          </div>
        </div>
      )}
      {conventionalPrice && organicPrice ? (
        <ToggleGroup
          defaultValue={priceType}
          type='single'
          className='grid grid-cols-2 gap-0'
        >
          <ToggleGroupItem
            onClick={() => {
              if (priceType !== 'organic') return
              setPriceType('conventional')
            }}
            value='conventional'
            className='h-20 flex-col items-start rounded-l-2xl rounded-r-none border px-2 text-sm data-[state=on]:border-2 data-[state=on]:border-black lg:h-[91px] lg:px-4 lg:text-base'
          >
            <div className='font-semibold lg:text-lg'>
              {t('Measure.Label.Conventional')}
            </div>
            <div className='mt-1 text-lg lg:text-2xl'>
              €{conventionalPrice}
              <span className='text-xs text-[#646464] lg:text-base'> / ha</span>
            </div>
          </ToggleGroupItem>
          <ToggleGroupItem
            onClick={() => {
              if (priceType !== 'conventional') return
              setPriceType('organic')
            }}
            value='organic'
            className='h-20 flex-col items-start rounded-l-none rounded-r-2xl border px-2 text-sm data-[state=on]:border-2 data-[state=on]:border-black lg:h-[91px] lg:px-4 lg:text-base'
          >
            <div className='font-semibold lg:text-lg'>
              {t('Measure.Label.Organic')}
            </div>
            <div className='mt-1 text-lg lg:text-2xl'>
              €{organicPrice}
              <span className='text-xs text-[#646464] lg:text-base'>
                / {t('Measure.Label.Hectare')}
              </span>
            </div>
          </ToggleGroupItem>
        </ToggleGroup>
      ) : data?.typeOfFarming ? (
        <div className='space-y-1 lg:space-y-2'>
          <Typography type='p' className='text-sm text-[#646464] lg:text-lg'>
            {t(
              `Measure.Label.${data.typeOfFarming === 'conventional' ? 'Conventional' : 'Organic'}`,
            )}
          </Typography>
          <Typography type='p' className='text-xl text-[#646464] lg:text-3xl'>
            <span className='font-semibold text-black'>
              €{(data?.subsidyValue ?? 0) + price[priceType]}
            </span>{' '}
            / {t('Measure.Label.Hectare')}
          </Typography>
        </div>
      ) : null}
      {options.length > 0 && (
        <>
          <div className='space-y-2'>
            {options?.map((option) => (
              <div
                key={option.name}
                className='flex h-8 items-center justify-between lg:h-10'
              >
                <div className='flex items-center gap-2 text-sm lg:gap-2.5 lg:text-base'>
                  <Checkbox
                    onCheckedChange={(checked) => {
                      setPrice((p) => {
                        let newValue = p[priceType]
                        // If option was previously selected, remove its value
                        if (
                          selectedOption[priceType].some(
                            (o) => o.name === option.name,
                          )
                        ) {
                          newValue -= option.value
                        }
                        // If now checked, add its value
                        if (checked) {
                          newValue += option.value
                        }
                        return {
                          ...p,
                          [priceType]: newValue,
                        }
                      })
                      setSelectedOption((p) => {
                        return {
                          ...p,
                          [priceType]: checked
                            ? [...p[priceType], option]
                            : p[priceType].filter(
                                (o) => o.name !== option.name,
                              ),
                        }
                      })
                    }}
                    checked={selectedOption[priceType].some(
                      (o) => o.name === option.name,
                    )}
                    id={option.name}
                    className='h-4 w-4 lg:h-6 lg:w-6'
                  />
                  <label htmlFor={option.name} className='font-medium'>
                    {option.name}
                  </label>
                </div>
                <div className='text-nowrap text-sm font-semibold lg:text-xl'>
                  +€{option.value}
                  <span className='text-xs font-normal text-[#646464] lg:text-base'>
                    /{t('Measure.Label.Hectare')}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className='flex gap-2'>
            <Image
              src='/images/icons/info-outlined.svg'
              alt=''
              width={20}
              height={20}
              className='lg:h-6 lg:w-6'
            />
            <Typography
              type='small'
              className='text-xs font-medium text-[#646464] lg:text-sm'
            >
              {t('Measure.Label.CombinationSurcharges')}{' '}
              <Link
                href={`#${SUPPLEMENTS_HEADER_ID}`}
                className='font-semibold underline underline-offset-2'
              >
                {t('Measure.Label.ReadMore')}
              </Link>
            </Typography>
          </div>
        </>
      )}
      {!isArchived && !isActive && (
        <div>
          <Accordion
            type='single'
            collapsible
            className='w-full rounded-md border'
          >
            <AccordionItem value='item-1' className='border-b-0 bg-[#F5F5F5]'>
              <AccordionTrigger className='px-3 text-base hover:no-underline lg:px-4 lg:text-xl'>
                <div>
                  <span className='mr-2 font-semibold lg:mr-4'>
                    {t('Browse.Label.Apply')}
                  </span>{' '}
                  <span className='text-sm text-[#3C3C3C] lg:text-base'>
                    {t('Browse.Label.Step.Count', {
                      count: applicationStepsCount,
                    })}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className='px-3 lg:px-4'>
                <Typography
                  type='small'
                  className='mb-3 text-xs text-[#646464] lg:mb-4 lg:text-sm'
                >
                  {data?.applicationDescription}
                </Typography>
                {data?.applicationSteps?.map(
                  ({ stepNumber, description, url }) => (
                    <Link
                      key={`${description}-${stepNumber}`}
                      href={url ?? '#'}
                      className='block'
                    >
                      <Button
                        variant='outline'
                        className={cn(
                          'mt-3 flex h-full min-h-[40px] w-full items-start justify-between gap-2 border-2 bg-white px-2 py-2 lg:mt-4 lg:min-h-[48px] lg:gap-2.5 lg:px-2.5 lg:py-3',
                        )}
                      >
                        <div className='flex items-start gap-2 lg:gap-2.5'>
                          {applicationStepsCount > 1 && (
                            <div className='flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-black text-xs text-white lg:h-6 lg:w-6 lg:text-sm'>
                              {stepNumber}
                            </div>
                          )}
                          <div className='text-wrap text-left text-sm font-semibold lg:text-base'>
                            {description}
                          </div>
                        </div>
                        <Image
                          src='/images/icons/external-link.svg'
                          alt=''
                          width={20}
                          height={20}
                          className='lg:h-6 lg:w-6'
                        />
                      </Button>
                    </Link>
                  ),
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
      <ActionButton id={data.id} status={status} />
      <ActivityButton id={data.id} status={status} />
    </div>
  )
}

export default ValueInfo
