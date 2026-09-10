'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'
import { RefreshCcw } from 'lucide-react'
import { useSession } from 'next-auth/react'

import type { MeasureSelectSchemaType, Status } from '@farmers/validators'
import { t } from '@farmers/language/i18next'
import { languageStore } from '@farmers/language/store'
import { routes } from '@farmers/shared/app/constants'
import { cn } from '@farmers/ui'
import { Badge } from '@farmers/ui/badge'

import { api } from '~/trpc/react'
import {
  getLandSettingTranslation,
  getSituationTranslation,
} from '~/utils/translations'
import Typography from '../typography'
import { Shortlisted } from './shortlisted'
import { StatusCombobox } from './status-combobox'

import 'dayjs/locale/de'

export interface MeasureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  measure: MeasureSelectSchemaType
  // measureId: number
  // code: string
  // title: string
  // priceRange?: string
  // organicPrice?: string
  // conventionalPrice?: string
  // dueDate: Date
  // lowEffortText: string
  // durationText: string
  // locationText: string
  // rotationText: string
  // noteText?: string
}

const MeasureCard: React.FC<MeasureCardProps> = ({
  measure,
  className,
  ...params
}) => {
  const { data: session } = useSession()

  dayjs.locale(languageStore.get('language'))

  const isLoggedIn = !!session?.user
  const measureId = measure.id
  const programTitle = measure.programTitle
  const title = measure.measureTitleShort
  const organicPrice = measure.subsidyValueOrganic
    ? `${measure.subsidyValueOrganic}€/ha`
    : undefined
  const overallPrice = measure.subsidyValue
    ? `${measure.subsidyValue}€/ha`
    : undefined
  const conventionalPrice = measure.subsidyValueConventional
    ? `${measure.subsidyValueConventional}€/ha`
    : undefined
  const dueDate = new Date(measure.applicationDate)
  const lowEffortText = measure.effort
  const durationText = t('Measure.Card.DurationDescription.Year', {
    count: measure.duration,
  })
  const applicableLands = measure.applicableLand?.split(',') ?? []
  const applicableKreis = measure.applicableKreis?.split(',') ?? []

  const applicableAreas = [...applicableLands, ...applicableKreis].filter(
    (a) => a !== '',
  )

  // Gray chip of +1 etc
  const applicableAreasMore =
    applicableAreas.length > 1 ? (
      <div>
        <Badge variant='chip' className='ml-1'>
          +{applicableAreas.length - 1}
        </Badge>
      </div>
    ) : null
  const locationText = `${getLandSettingTranslation(measure.setting)} in ${applicableAreas[0]}`
  const rotationText = `${getSituationTranslation(measure.situation)}`

  const { data } = api.user.getUserMeasures.useQuery(undefined, {
    enabled: isLoggedIn,
  })

  const userMeasureDetails = data?.userMeasures.find(
    (um) => um.id === measure.id,
  )
  const initialStatus = userMeasureDetails?.status ?? null
  const [status, setStatus] = React.useState<Status | '' | null>(
    initialStatus as Status | '' | null,
  )
  React.useEffect(() => {
    setStatus(initialStatus)
  }, [initialStatus])
  const noteText = userMeasureDetails?.privateNotes ?? null
  const dateStarted = userMeasureDetails?.dateStartedYYYY_MM_DD ?? null

  const formattedDate = dayjs(dueDate).format('DD MMM YYYY')
  const isActive = status === 'active'

  const effortRatingTranslations: Partial<
    Record<MeasureSelectSchemaType['effort'], string>
  > = {
    low: t('Browse.EffortRating.Low'),
    medium: t('Browse.EffortRating.Medium'),
    high: t('Browse.EffortRating.High'),
  }

  const href = routes.main.browseIdentifier(measure.measureIdentifier)

  return (
    <div
      className={cn(
        'inline-flex h-full w-full max-w-[330px] flex-shrink-0 flex-col overflow-hidden rounded-xl border border-[#DCDCDC] bg-white shadow-md',
        className,
      )}
      {...params}
    >
      <div
        className={cn(
          'flex w-full flex-row justify-between bg-[#1B3765] px-[15px] py-4',
          {
            'bg-[#1B3765]': status !== 'archived',
            'bg-[#646464]': status === 'archived',
          },
        )}
      >
        <StatusCombobox
          measureId={measureId}
          status={status}
          setStatus={setStatus}
        />
        {status !== 'active' ? (
          <Shortlisted
            measureId={measureId}
            status={status}
            setStatus={setStatus}
          />
        ) : null}
      </div>
      <Link href={href} passHref>
        <div className='px-[15px] py-4 pb-4'>
          <div className='grid grid-cols-[1fr_48px] gap-4'>
            <div className='space-y-2 overflow-auto'>
              <div className='flex items-center gap-2'>
                <Typography
                  type='p'
                  className='border-gray-250 inline-flex h-8 flex-none items-center rounded-full border border-solid px-4 text-base font-semibold uppercase'
                >
                  {programTitle}
                </Typography>
              </div>
              <Typography
                type='large'
                className='font-inter line-clamp-2 h-[56px] overflow-hidden text-ellipsis text-xl font-semibold text-black'
              >
                {title}
              </Typography>
            </div>
          </div>
          {!conventionalPrice && !organicPrice ? (
            <Typography
              type='large'
              className='font-inter overflow-hidden text-ellipsis border-t border-gray-200 pt-4 text-xl font-semibold text-black'
            >
              {overallPrice}
            </Typography>
          ) : (
            <div className='grid grid-cols-2 border-t border-gray-200 pt-4 '>
              {conventionalPrice ? (
                <div>
                  <Typography
                    type='small'
                    className='font-inter text-sm font-medium text-gray-700'
                  >
                    {t('Measure.Label.Conventional')}
                  </Typography>
                  <Typography
                    type='large'
                    className='font-inter overflow-hidden text-ellipsis text-xl font-semibold text-black'
                  >
                    {conventionalPrice}
                  </Typography>
                </div>
              ) : null}
              {organicPrice ? (
                <div>
                  <Typography
                    type='small'
                    className='font-inter text-sm font-medium text-gray-700'
                  >
                    {t('Measure.Label.Organic')}
                  </Typography>
                  <Typography
                    type='large'
                    className='font-inter overflow-hidden text-ellipsis text-xl font-semibold text-black'
                  >
                    {organicPrice}
                  </Typography>
                </div>
              ) : null}
            </div>
          )}
          <div className='my-2 flex flex-grow flex-col space-y-2'>
            <div className='flex flex-row items-center'>
              <Image
                src={'/images/icons/calendar-tearoff.svg'}
                height={24}
                width={24}
                alt='Due Date'
                className='mr-1 inline-flex'
              />
              <Typography
                type='small'
                className='font-inter text-sm font-normal text-gray-700'
              >
                {t('Measure.Label.DueBy')}{' '}
                <span className='font-semibold text-black'>
                  {formattedDate}
                </span>
              </Typography>
            </div>
            <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
              <Typography
                type='small'
                className='font-inter flex text-sm font-semibold capitalize text-black'
              >
                <Image
                  src={`/images/icons/bar-effort${lowEffortText === 'medium' ? '-med' : lowEffortText === 'high' ? '-high' : ''}.svg`}
                  height={24}
                  width={24}
                  alt='Effort'
                  className='mr-[5px]'
                />
                {effortRatingTranslations[lowEffortText]}
              </Typography>
              <Typography
                type='small'
                className='font-inter flex text-sm font-semibold text-black'
              >
                <Image
                  src='/images/icons/calendar-span.svg'
                  height={24}
                  width={24}
                  alt='Duration'
                  className='mr-[5px]'
                />
                {durationText}
              </Typography>
              <Typography
                type='small'
                className='font-inter col-span-2 flex text-sm font-semibold text-black'
              >
                <Image
                  src='/images/icons/location.svg'
                  height={24}
                  width={24}
                  alt='Location'
                  className='mr-[5px]'
                />
                {locationText}
                {applicableAreasMore}
              </Typography>
              <Typography
                type='small'
                className='font-inter flex text-sm font-semibold capitalize text-black'
              >
                <Image
                  src='/images/icons/address.svg'
                  height={24}
                  width={24}
                  alt='Rotation'
                  className='mr-[5px]'
                />
                {rotationText}
              </Typography>
            </div>
          </div>
          {noteText && (
            <div className='grid grid-cols-[24px_1fr] gap-2.5 rounded-lg  bg-[#F5F5F5] px-2.5 py-3'>
              <div>
                <Image
                  src='/images/icons/note.svg'
                  height={24}
                  width={24}
                  alt='Note'
                />
              </div>
              <Typography
                type='small'
                className='font-inter line-clamp-2 overflow-hidden text-ellipsis text-base font-normal leading-5 text-black'
              >
                {noteText}
              </Typography>
            </div>
          )}
          {isActive && dateStarted ? (
            <div className='mt-2 flex flex-grow gap-1'>
              <Typography
                type='small'
                className='font-inter mb-1 text-sm font-normal text-gray-700'
              >
                <Image
                  src={'/images/icons/calendar-tearoff.svg'}
                  height={24}
                  width={24}
                  alt='Implementation start'
                  className='mr-1 inline-flex'
                />
                <span className='font-medium text-[#646464]'>
                  {t('Measure.Label.ImplementationStart')}:{' '}
                </span>

                <span className='font-semibold text-black'>
                  {dayjs(dateStarted).format('YYYY')}
                </span>
              </Typography>
            </div>
          ) : null}
          {measure.renewable ? (
            <Typography
              type='small'
              className='border-gray-250 inline-flex h-8 items-center rounded-full text-base font-semibold'
            >
              <span className='flex items-center gap-2'>
                <RefreshCcw className='h-5 w-5' />
                <span className='text-sm'>{t('Measure.Label.Renewable')}</span>
              </span>
            </Typography>
          ) : null}
        </div>
      </Link>
    </div>
  )
}

export default MeasureCard

// )}
// <div className='mt-4'>
//   <Typography
//     type='small'
//     className='font-inter mb-2 text-sm font-semibold'
//   >
//     Status: {status}
//   </Typography>
//   <div className='flex space-x-2'>
//     <button
//       className={`rounded px-2 py-1 ${status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
//       onClick={() => onStatusChange('active')}
//     >
//       Active
//     </button>
//     <button
//       className={`rounded px-2 py-1 ${status === 'shortlisted' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
//       onClick={() => onStatusChange('shortlisted')}
//     >
//       Shortlist
//     </button>
//     <button
//       className={`rounded px-2 py-1 ${status === 'archived' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
//       onClick={() => onStatusChange('archived')}
//     >
//       Archive
//     </button>
//     {status !== null && (
//       <button
//         className='rounded bg-gray-500 px-2 py-1 text-white'
//         onClick={onRemove}
//       >
//         Remove
//       </button>
//     )}
//   </div>
