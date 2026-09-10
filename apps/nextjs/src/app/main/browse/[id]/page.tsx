import Image from 'next/image'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { t } from 'i18next'
import { Map, RefreshCcw } from 'lucide-react'

import { languageStore } from '@farmers/language/store'
import {
  MEASURE_ID_PREFIX,
  SUPPLEMENTS_HEADER_ID,
} from '@farmers/shared/app/constants'
import { Badge } from '@farmers/ui/badge'

import ContactCard from '~/app/_components/contact-card'
import ListComponent from '~/app/_components/list-component'
import Typography from '~/app/_components/typography'
import ValueInfo from '~/app/_components/value-info'
import { api } from '~/trpc/server'
import AddPrivateNote from './components/add-private-note'
import EffortRatingCard, { EffortRating } from './components/effort-rating'
import { MeasureHeader } from './components/header'
import InfoPopover from './components/info-popover'
import SuggestUpdateButton from './components/suggest-updates'

import 'dayjs/locale/de'

import MeasureCard from '~/app/_components/measure-card'

dayjs.extend(relativeTime)

type Data = NonNullable<
  Awaited<ReturnType<typeof api.measure.byMeasureIdentifier>>
>

const decodeAndRemovePrefix = (id: string) => {
  return decodeURIComponent(id).replace(MEASURE_ID_PREFIX, '')
}

const Measure = async ({ params: { id } }: { params: { id: string } }) => {
  const data = await api.measure.byMeasureIdentifier({
    id: decodeAndRemovePrefix(id),
  })
  const combinations = await api.measure.byMeasureIdentifierList({
    ids: data?.availableCombination?.split(', ') ?? [],
  })

  dayjs.locale(languageStore.get('language'))

  const areaDetermination = data?.areaOptimization

  const noItemsTranslation = t('NotFound.Label.NoItems')

  const isValidKeydates =
    // Is array
    Array.isArray(data?.keyDates) &&
    // Is not empty
    data.keyDates.length > 0 &&
    // At least one description and keydate is not empty
    !data.keyDates.every(({ description, keydate }) => !description && !keydate)

  const settingOptionTranslations: Partial<Record<Data['setting'], string>> = {
    'arable land': t('Measure.Options.Setting.ArableLand'),
    grassland: t('Measure.Options.Setting.Grassland'),
    bog: t('Measure.Options.Setting.Bog'),
    woodland: t('Measure.Options.Setting.Woodland'),
    special: t('Measure.Options.Setting.Special'),
    other: t('Measure.Options.Setting.Other'),
  }

  const situationOptionTranslations: Partial<
    Record<Data['situation'], string>
  > = {
    rotating: t('Measure.Options.Situation.Rotating'),
    'whole farm': t('Measure.Options.Situation.WholeFarm'),
    fixed: t('Measure.Options.Situation.Fixed'),
  }

  const dateFormat = t('Measure.Label.KeyDatesFormat')

  const dateCreated = dayjs(data?.dateCreated).isValid()
    ? dayjs(data?.dateCreated).format(dateFormat)
    : null
  const dateUpdated = dayjs(data?.dateUpdated).isValid()
    ? dayjs(data?.dateUpdated).format(dateFormat)
    : null

  const createdUpdatedString = [
    dateCreated && t('Browse.Label.Created', { dateCreated }),
    dateUpdated && t('Browse.Label.LastUpdated', { dateUpdated }),
  ]
    .filter(Boolean)
    .join('. ')

  const regularSurcharges = data?.surcharges?.filter(
    (s) => s.type === 'conventional',
  )
  const organicSurcharges = data?.surcharges?.filter(
    (s) => s.type === 'organic',
  )

  const applicableAreas = [
    ...(data?.applicableLand?.split(',') ?? []),
    ...(data?.applicableKreis?.split(',') ?? []),
  ].filter((a) => a !== '')

  return !data ? (
    <div>
      {t('Browse.Label.ErrorLoadingMeasures', { uri: decodeURIComponent(id) })}
    </div>
  ) : (
    <>
      <MeasureHeader />
      <div className='container max-w-screen-lg space-y-8 rounded-2xl bg-white p-4 py-2 font-normal lg:space-y-12 lg:px-6 lg:py-8'>
        <div className='space-y-4'>
          <Typography
            type='p'
            className='border-gray-250 inline-flex h-auto items-center rounded-full border border-solid px-4 py-3 text-base font-semibold uppercase lg:h-[48px] lg:text-lg'
          >
            {data?.programTitle}
          </Typography>
          <Typography type='h1' className='text-2xl lg:text-3xl'>
            {data?.measureTitleLong}
          </Typography>
          <div className='flex flex-col items-start gap-4 lg:flex-row lg:items-center'>
            <Typography
              type='p'
              className='text-sm font-normal italic text-[#646464] lg:text-base'
            >
              {createdUpdatedString}
            </Typography>
            <SuggestUpdateButton measureTitle={data?.measureTitleLong} />
          </div>
          <div className=''>
            <div>
              <div className='float-right w-full max-w-[420px] space-y-8 pb-12 lg:space-y-10'>
                <ValueInfo data={data} />
                <div className='mt-8 lg:mt-10'>
                  <AddPrivateNote measureId={data.id} />
                </div>
              </div>
              <div className='grid grid-cols-1 gap-y-6 px-3 lg:grid-cols-2 lg:gap-x-5'>
                <EffortRating
                  effortLevel={data?.effort}
                  measureTitle={data?.measureTitleLong}
                  className=''
                  tooltip={data?.effortToolTip ?? data?.effort}
                />
                <div className='grid grid-cols-[40px_1fr] gap-[10px]'>
                  <div className='relative h-10 w-10'>
                    <Image
                      src={'/images/icons/calendar-span.svg'}
                      alt='duration'
                      layout='fill'
                    />
                  </div>
                  <div>
                    <Typography type='small' className='text-[#646464]'>
                      {t('Browse.Label.Duration')}
                    </Typography>
                    <div className='flex items-center gap-1'>
                      <Typography type='large' className=''>
                        {t('Measure.Card.DurationDescription.Year', {
                          count: data.duration,
                        })}
                        <InfoPopover description={data?.durationToolTip} />
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className='grid grid-cols-[40px_1fr] gap-[10px]'>
                  <div className='relative h-10 w-10'>
                    <Image
                      src={'/images/icons/location.svg'}
                      alt='location'
                      layout='fill'
                    />
                  </div>
                  <div className=''>
                    <Typography type='small' className='text-[#646464]'>
                      {t('Browse.Label.Setting')}
                    </Typography>
                    <div className='flex items-center gap-1'>
                      <Typography type='large' className=''>
                        {settingOptionTranslations[data.setting]}
                        <InfoPopover description={data?.settingToolTip} />
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className='grid grid-cols-[40px_1fr] gap-[10px]'>
                  <div className='relative h-10 w-10'>
                    <Image
                      src={'/images/icons/address.svg'}
                      alt='situation'
                      layout='fill'
                    />
                  </div>
                  <div className=''>
                    <Typography type='small' className='text-[#646464]'>
                      {t('Browse.Label.Situation')}
                    </Typography>
                    <div className='flex items-center'>
                      <Typography type='large' className='capitalize'>
                        {situationOptionTranslations[data.situation]}
                        <InfoPopover description={data?.situationToolTip} />
                      </Typography>
                    </div>
                  </div>
                </div>
                {data.renewable && (
                  <div className='flex items-start gap-2'>
                    <div className='relative h-10 w-10'>
                      <RefreshCcw size={26} />
                    </div>
                    <div className='flex items-center'>
                      <Typography
                        type='small'
                        className='text-xl font-semibold capitalize'
                      >
                        {t('Browse.Label.Renewable')}
                        {data?.renewableToolTip?.length && (
                          <InfoPopover description={data.renewableToolTip} />
                        )}
                      </Typography>
                    </div>
                  </div>
                )}
                <div className='col-span-2 grid grid-cols-[40px_1fr] gap-[10px]'>
                  <div className='relative h-10 w-10'>
                    <Map size={36} />
                  </div>
                  <div className=''>
                    <Typography type='small' className='text-[#646464]'>
                      {t('Browse.Label.ApplicableArea')}
                    </Typography>
                    <div className='mt-1 flex flex-row flex-wrap items-center gap-2'>
                      {applicableAreas.map((area) => (
                        <Badge
                          key={area}
                          variant='outline'
                          className='text-base'
                        >
                          {area.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-8 lg:mt-10'>
                <Typography type='h2' className='text-xl lg:text-2xl'>
                  {t('Browse.Label.WhatsInvolved')}
                </Typography>
                <Typography type='p' className=''>
                  {data?.whatsInvolved}
                </Typography>
              </div>
              <div className='mt-10 space-y-10'>
                <ListComponent
                  icon={'/images/icons/pitchfork.svg'}
                  title={t('Measure.Label.CultivationConditions')}
                  items={data?.cultivationConditions ?? []}
                />
                <ListComponent
                  icon={'/images/icons/plant.svg'}
                  title={t('Measure.Label.PlantProtectionMeasures')}
                  items={data?.plantProtectionMeasures ?? []}
                />
                <ListComponent
                  icon={'/images/icons/liquid-fertilizer.svg'}
                  title={t('Measure.Label.Fertilizer')}
                  items={data?.fertilizer ?? []}
                />
                <ListComponent
                  icon={'/images/icons/expand.svg'}
                  title={t('Measure.Label.AreaDetermination')}
                >
                  <div className='space-y-6'>
                    <div>
                      <Typography type='large'>
                        {t('Browse.Label.MaximumOperation')}
                      </Typography>
                      <Typography type='p' className='text-[#3C3C3C]'>
                        {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
                        {areaDetermination?.maximumOperation ||
                          noItemsTranslation}
                      </Typography>
                    </div>
                    <div>
                      <Typography type='large'>
                        {t('Browse.Label.MaximumArea')}
                      </Typography>
                      <Typography type='p' className='text-[#3C3C3C]'>
                        {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
                        {areaDetermination?.maximumArea || noItemsTranslation}
                      </Typography>
                    </div>
                    <div>
                      <Typography type='large'>
                        {t('Browse.Label.MinimumArea')}
                      </Typography>
                      <Typography type='p' className='text-[#3C3C3C]'>
                        {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
                        {areaDetermination?.minimumArea || noItemsTranslation}
                      </Typography>
                    </div>
                    <div>
                      <Typography type='large'>
                        {t('Browse.Label.Form')}
                      </Typography>
                      <Typography type='p' className='text-[#3C3C3C]'>
                        {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
                        {areaDetermination?.form || noItemsTranslation}
                      </Typography>
                    </div>
                  </div>
                </ListComponent>
              </div>
              <div className='mt-16'>
                <EffortRatingCard
                  effortLevel={data?.effort}
                  measureTitle={data?.measureTitleLong}
                />
              </div>
              <div className='mt-16'>
                <ListComponent
                  title={t('Browse.Label.KeyBenefits')}
                  checkmark
                  items={data?.keyBenefits ?? []}
                />
              </div>
              <div className='mt-16'>
                <Typography type='h2' className='mb-6'>
                  {t('Browse.Label.KeyDatesActivities')}
                </Typography>
                <div className='space-y-10'>
                  {!isValidKeydates ? (
                    <Typography type='p' className='text-[#3C3C3C]'>
                      {t('NotFound.Label.NoKeyDates')}
                    </Typography>
                  ) : (
                    data.keyDates!.map(({ topField, bottomField }, count) => (
                      <div key={count} className='flex items-start gap-5'>
                        <div className='flex h-[60px] w-[60px] flex-shrink-0 items-center justify-center rounded-full bg-[#DCDCDC] text-[32px] font-semibold'>
                          {count + 1}
                        </div>
                        <div>
                          <Typography type='p' className='mb-3 text-[#3C3C3C]'>
                            {topField}
                          </Typography>
                          <div>
                            {bottomField?.split(',').length > 1 ? (
                              <ul className='space-y-2'>
                                {bottomField.split(',').map((s, i) => (
                                  <li key={i} className='flex text-3xl'>
                                    <Image
                                      src={'/images/icons/list-bullet.svg'}
                                      alt='bullet'
                                      width={32}
                                      height={32}
                                    />{' '}
                                    <span>{s}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <span className='text-3xl'>{bottomField}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              {regularSurcharges && regularSurcharges.length > 0 && (
                <div className='mt-16' id={SUPPLEMENTS_HEADER_ID}>
                  <Typography type='h2' className='mb-4'>
                    {t('Measure.Label.ConventionalSupplement')}
                  </Typography>
                  <ul className='list-inside list-[upper-alpha] space-y-8'>
                    {regularSurcharges.map(
                      ({ value: price, description, name }) => (
                        <Typography type='li' key={id} className=''>
                          <span className='font-medium'>{name}</span>
                          <span className='ml-5 font-semibold'>{`+€${price}`}</span>
                          <span className='ml-2 text-[#646464]'>/ ha</span>
                          <div className='mt-2 font-normal text-[#3C3C3C]'>
                            {description}
                          </div>
                        </Typography>
                      ),
                    )}
                  </ul>
                </div>
              )}
              {organicSurcharges && organicSurcharges.length > 0 && (
                <div className='mt-16' id={SUPPLEMENTS_HEADER_ID}>
                  <Typography type='h2' className='mb-4'>
                    {t('Measure.Label.OrganicSupplement')}
                  </Typography>
                  <ul className='list-inside list-[upper-alpha] space-y-8'>
                    {organicSurcharges.map(
                      ({ value: price, description, name }) => (
                        <Typography type='li' key={id} className=''>
                          <span className='font-medium'>{name}</span>
                          <span className='ml-5 font-semibold'>{`+€${price}`}</span>
                          <span className='ml-2 text-[#646464]'>/ ha</span>
                          <div className='mt-2 font-normal text-[#3C3C3C]'>
                            {description}
                          </div>
                        </Typography>
                      ),
                    )}
                  </ul>
                </div>
              )}
              {combinations.length > 0 && (
                <div>
                  <Typography type='h2' className='mb-6'>
                    {t('Measure.Label.Combination')}
                  </Typography>
                  <div className='flex flex-wrap gap-4'>
                    {combinations.map((m) => (
                      <MeasureCard
                        key={m.id}
                        measure={m}
                        className='h-[420px]'
                      />
                    ))}
                  </div>
                </div>
              )}
              <div className='mb-4 mt-16'>
                <Typography type='h2' className='mb-6'>
                  {t('Browse.Label.Contact')}
                </Typography>
                <div className='space-y-10'>
                  {Array.isArray(data.contacts) && data.contacts.length > 0 ? (
                    data?.contacts?.map(({ name, email, phone }) => (
                      <ContactCard
                        key={name}
                        name={name}
                        email={email}
                        phone={phone}
                      />
                    ))
                  ) : (
                    <Typography type='p' className='text-[#3C3C3C]'>
                      {t('NotFound.Label.NoContactInformation')}
                    </Typography>
                  )}
                </div>
              </div>
              {data.publicationSource && (
                <div className='mb-4 mt-16 lg:mb-14'>
                  <Typography type='h2' className='mb-6'>
                    {t('Measure.Label.PublicationSource')}
                  </Typography>
                  <div className='flex items-center gap-2'>
                    <div className='relative mr-2 h-6 w-6 lg:mr-2.5 lg:h-8 lg:w-8'>
                      <Image
                        src='/images/icons/link.svg'
                        alt=''
                        layout='fill'
                      />
                    </div>
                    <a
                      href={data?.publicationSource}
                      target='_blank'
                      rel='noreferrer'
                      className='text-base font-semibold underline underline-offset-2 lg:text-[22px] lg:underline-offset-[4.5px]'
                    >
                      {data?.publicationSourceLabel ?? data?.publicationSource}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Measure
