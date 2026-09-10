'use client'

import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Filter as FilterIcon } from 'lucide-react'

import type {
  LandSettings,
  LandSituation,
  MeasureSelectSchemaType,
  SubsidyProvider,
} from '@farmers/validators'
import { useIntlContext } from '@farmers/language/intl-provider'
import {
  kreis_to_land,
  location_to_kreis,
  location_to_land,
  routes,
  SEARCH_QUERY_PARAM,
} from '@farmers/shared/app/constants'
import { dayjs } from '@farmers/shared/common/dayjs/index'
import { cn } from '@farmers/ui'
import { Button } from '@farmers/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@farmers/ui/popover'

import type { SortCriterion } from '~/app/_components/Browse/BrowseDropdownMenu'
import type { Animals, Effort, Filter } from '~/store/types'
import { BrowseDropdownMenu } from '~/app/_components/Browse/BrowseDropdownMenu'
import { EffortDropdownMenu } from '~/app/_components/Browse/EffortDropdownMenu'
import { LandSettingDropdownMenu } from '~/app/_components/Browse/LandSettingDropdownMenu'
import MoreFilters from '~/app/_components/Browse/MoreFilters'
import { TypeOfFarmingDropdownMenu } from '~/app/_components/Browse/TypeOfFarmingDropdownMenu'
import { ValueDropdownMenu } from '~/app/_components/Browse/ValueDropdownMenu'
import { useLocations } from '~/hooks/use-locations'
import {
  initialFilterValues,
  isReset,
  resetAllFilters,
  store,
  updateAppliedFilters,
  updateEditingFilters,
} from '~/store/zustand'
import { api } from '~/trpc/react'
import MeasureCard from '../measure-card'
import MeasureSkeleton from '../measure-card/skeleton'
import { VirtualizedCombobox } from '../searchbar'
import Typography from '../typography'

export function getActiveCategories(
  filter: Filter,
  t: ReturnType<typeof useIntlContext>['t'],
): { category: string; label: string }[] {
  const activeCategories: { category: string; label: string }[] = []

  // Helper function to determine the label
  const generateLabel = (
    categoryName: string,
    activeItems: string[],
  ): string => {
    if (activeItems.length !== 1) {
      return t('FiltersBar.Buttons.RemoveFilter', {
        filter: categoryName,
      })
    }
    return t('FiltersBar.Buttons.RemoveFilter', {
      filter: `"${activeItems[0]}"`,
    })
  }

  // Check valueRange
  if (filter.valueRange.min !== 0 || filter.valueRange.max !== 0) {
    activeCategories.push({
      category: 'value range',
      label: generateLabel(t('FiltersBar.Buttons.ValueRange'), []),
    })
  }

  const effortLevelsTranslationsMapping: Record<keyof Effort, string> = {
    low: t('FiltersBar.Buttons.Low'),
    medium: t('FiltersBar.Buttons.Medium'),
    high: t('FiltersBar.Buttons.High'),
  }

  // Check effortLevel
  const activeEffortLevels = (
    Object.keys(filter.effortLevel) as (keyof Effort)[]
  )
    .filter((key) => filter.effortLevel[key])
    .map((key) => effortLevelsTranslationsMapping[key])

  if (activeEffortLevels.length > 0) {
    activeCategories.push({
      category: 'effort level',
      label: generateLabel(t('FiltersBar.Buttons.Effort'), activeEffortLevels),
    })
  }

  const typeOfFarmingTranslationsMapping: Record<
    NonNullable<Filter['typeOfFarming']>,
    string
  > = {
    any: t('FiltersBar.Buttons.Any'),
    conventional: t('FiltersBar.Buttons.ConventionalFarming'),
    organic: t('FiltersBar.Buttons.OrganicFarming'),
  }

  // Check typeOfFarming
  if (filter.typeOfFarming && filter.typeOfFarming !== 'any') {
    activeCategories.push({
      category: 'type of farming',
      label: generateLabel(
        typeOfFarmingTranslationsMapping[filter.typeOfFarming],
        [],
      ),
    })
  }

  const landSettingsTranslationsMapping: Record<
    keyof NonNullable<Filter['landSettings']>,
    string
  > = {
    'arable land': t('FiltersBar.Buttons.ArableLand'),
    grassland: t('FiltersBar.Buttons.Grassland'),
    bog: t('FiltersBar.Buttons.Bog'),
    woodland: t('FiltersBar.Buttons.Woodland'),
    special: t('FiltersBar.Buttons.Special'),
    other: t('FiltersBar.Buttons.Other'),
  }

  // Check landSettings
  const activeLandSettings = (
    Object.keys(filter.landSettings || {}) as (keyof LandSettings)[]
  )
    .filter((key) => filter.landSettings[key])
    .map((key) => landSettingsTranslationsMapping[key])

  if (activeLandSettings.length > 0) {
    activeCategories.push({
      category: 'land settings',
      label: generateLabel(
        t('FiltersBar.Buttons.LandSetting'),
        activeLandSettings,
      ),
    })
  }

  // Check landSituation
  const landSituationTranslationsMapping: Record<
    keyof NonNullable<Filter['landSituation']>,
    string
  > = {
    rotating: t('FiltersBar.Buttons.Rotating'),
    'whole farm': t('FiltersBar.Buttons.WholeFarm'),
    fixed: t('FiltersBar.Buttons.Fixed'),
  }
  const activeLandSituations = (
    Object.keys(filter.landSituation || {}) as (keyof LandSituation)[]
  )
    .filter((key) => filter.landSituation[key])
    .map((key) => landSituationTranslationsMapping[key])

  if (activeLandSituations.length > 0) {
    activeCategories.push({
      category: 'land situation',
      label: generateLabel(
        t('FiltersBar.Labels.LandSituation'),
        activeLandSituations,
      ),
    })
  }

  // Check animals
  const activeAnimals = Object.keys(filter.animals).filter(
    (key) => filter.animals[key as keyof Animals] && key !== 'hasAnimals',
  )
  if (activeAnimals.length > 0) {
    activeCategories.push({
      category: 'animals',
      label: generateLabel('animals', activeAnimals),
    })
  }

  // Check subsidyProvider
  const activeSubsidyProviders = Object.keys(
    filter.subsidyProvider || {},
  ).filter((key) => filter.subsidyProvider[key as keyof SubsidyProvider])

  if (activeSubsidyProviders.length > 0) {
    activeCategories.push({
      category: 'subsidy provider',
      label: generateLabel(
        t('FiltersBar.Labels.SubsidyProvider'),
        activeSubsidyProviders,
      ),
    })
  }

  return activeCategories.slice(0, 3) // Limit to 3 active categories
}

export function resetCategory(filter: Filter, category: string): Filter {
  const newFilter = structuredClone(filter)

  switch (category) {
    case 'value range':
      newFilter.valueRange = structuredClone(initialFilterValues.valueRange)
      break
    case 'effort level':
      newFilter.effortLevel = structuredClone(initialFilterValues.effortLevel)
      break
    case 'type of farming':
      newFilter.typeOfFarming = structuredClone(
        initialFilterValues.typeOfFarming,
      )
      break
    case 'land settings':
      newFilter.landSettings = structuredClone(initialFilterValues.landSettings)
      break
    case 'land situation':
      newFilter.landSituation = structuredClone(
        initialFilterValues.landSituation,
      )
      break
    case 'animals':
      newFilter.animals = structuredClone(initialFilterValues.animals)
      break
    case 'subsidy provider':
      newFilter.subsidyProvider = structuredClone(
        initialFilterValues.subsidyProvider,
      )
      break
  }

  return newFilter
}

function filterMeasures(
  measures: MeasureSelectSchemaType[],
  filter: Filter,
): MeasureSelectSchemaType[] {
  const { min, max } = filter.valueRange

  // Determine allowed effort levels
  const allowedEffortLevels = new Set()
  if (filter.effortLevel.low) allowedEffortLevels.add('low')
  if (filter.effortLevel.medium) allowedEffortLevels.add('medium')
  if (filter.effortLevel.high) allowedEffortLevels.add('high')

  return measures.filter((measure) => {
    const {
      subsidyValue: subsidyValueRaw,
      subsidyValueConventional: subsidyValueConventionalRaw,
      subsidyValueOrganic: subsidyValueOrganicRaw,
      effort,
      typeOfFarming,
      setting,
      situation,
      programTitle,
      applicableLand,
      applicableKreis,
    } = measure

    const hasBoth = !!subsidyValueConventionalRaw && !!subsidyValueOrganicRaw
    const subsidyValueMinimum = hasBoth
      ? Math.min(subsidyValueConventionalRaw ?? 0, subsidyValueOrganicRaw ?? 0)
      : (subsidyValueRaw ?? 0)
    const subsidyValueMaximum = hasBoth
      ? Math.max(subsidyValueConventionalRaw ?? 0, subsidyValueOrganicRaw ?? 0)
      : (subsidyValueRaw ?? 0)

    // Check value range
    if (min !== 0 || max !== 0) {
      const isSubsidyInRange = (value: number) => {
        if (min !== 0 && max === 0) {
          return value >= min
        }
        if (min === 0 && max !== 0) {
          return value <= max
        }
        if (min !== 0 && max !== 0) {
          return value >= min && value <= max
        }
        return true // Shouldn't reach here since we check (min !== 0 || max !== 0) initially
      }

      if (
        !(
          isSubsidyInRange(subsidyValueMinimum ?? 0) ||
          isSubsidyInRange(subsidyValueMaximum ?? 0)
        )
      ) {
        return false
      }
    }

    // Check effort level
    if (allowedEffortLevels.size > 0 && !allowedEffortLevels.has(effort)) {
      return false
    }

    // Check type of farming
    if (
      filter.typeOfFarming &&
      filter.typeOfFarming !== 'any' &&
      filter.typeOfFarming !== typeOfFarming
    ) {
      return false
    }

    // Check land settings
    const landSettingsKeys = Object.keys(filter.landSettings).filter(
      (key) => filter.landSettings[key as keyof LandSettings] === true,
    )
    if (landSettingsKeys.length > 0 && !landSettingsKeys.includes(setting)) {
      return false
    }

    // Check land situation
    const landSituationKeys = Object.keys(filter.landSituation).filter(
      (key) => filter.landSituation[key as keyof LandSituation] === true,
    )
    if (
      landSituationKeys.length > 0 &&
      !landSituationKeys.includes(situation)
    ) {
      return false
    }

    // // Check animals
    // const animalsKeys = Object.keys(filter.animals)
    // if (
    //   animalsKeys.some((key) => filter.animals[key] && !animals.includes(key))
    // ) {
    //   return false
    // }

    // Check subsidy provider
    const subsidyProviderKeys = Object.keys(filter.subsidyProvider).filter(
      (key) => filter.subsidyProvider[key as keyof SubsidyProvider] === true,
    )

    if (
      subsidyProviderKeys.length > 0 &&
      // look for any of the subsidy provider keys in the program title
      !subsidyProviderKeys.some((key) => {
        // Handle special case for Private/PRI
        if (key === 'Private' && programTitle.includes('PRI')) {
          return true
        }
        return programTitle.includes(key)
      })
    ) {
      return false
    }

    if (filter.location) {
      const kreis = location_to_kreis(filter.location)
      const land = location_to_land(filter.location)

      let pass = false

      if (kreis && applicableKreis?.length && applicableKreis.includes(kreis)) {
        pass = true
      }

      if (land && applicableLand?.length && applicableLand.includes(land)) {
        pass = true
      }

      const kreises = applicableKreis?.split(',') ?? []

      // if searching for land but no kreis, check if the kreis is in the land being searched for
      if (land && !kreis && kreises?.length) {
        const lands = kreises.map((kreis) => kreis_to_land[kreis])
        if (lands.includes(land)) {
          pass = true
        }
      }

      if (!pass) {
        return false
      }
    }

    return true
  })
}

function effortToNumber(effort: keyof Effort): number {
  const effortMap = {
    low: 1,
    medium: 2,
    high: 3,
  }
  return effortMap[effort] || 0
}

const BrowsePage = () => {
  const searchParams = useSearchParams()
  const searchQuery = searchParams?.get(SEARCH_QUERY_PARAM)
  const { allLocations: measureLocations } = useLocations()
  const { t } = useIntlContext()

  const { data, isLoading: measuresLoading } =
    api.measure.publishedView.useQuery()

  const filters = store.use((s) => s.appliedFilter)
  const [selectedSort, setSelectedSort] = useState<SortCriterion>(
    t('Browse.Button.Newest'),
  )
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const router = useRouter()

  // Define sortMeasures inside the component where t is available
  //
  // We use useCallback here for three important reasons:
  // 1. Performance optimization - prevents unnecessary re-creation of this function on each render
  // 2. Access to the t function - placing it inside the component gives access to the translation context
  // 3. Dependency tracking - ensures the function updates when translations change
  //
  // The previous implementation had two key issues:
  // 1. String comparison mismatch - It used hardcoded strings like 'Highest value' instead of the
  //    actual translated values from t('Browse.Button.HighestValue')
  // 2. Hook usage outside components - The t function is a hook and can't be used outside component scope
  const sortMeasures = useCallback(
    (measures: MeasureSelectSchemaType[], criterion: SortCriterion) => {
      // Create a copy of the array to avoid mutating the original
      return [...measures].sort((a, b) => {
        // Using switch instead of if/else for better readability and performance
        // with multiple conditions. This also makes it easier to match the exact
        // translated string values coming from the dropdown component.
        switch (criterion) {
          case t('Browse.Button.Newest'):
            return (
              dayjs(b.publicationDate).unix() - dayjs(a.publicationDate).unix()
            )
          case t('Browse.Button.Oldest'):
            return (
              dayjs(a.publicationDate).unix() - dayjs(b.publicationDate).unix()
            )
          case t('Browse.Button.HighestValue'):
            return (
              (b.subsidyValue ?? 0) +
              (b.subsidyValueConventional ?? 0) +
              (b.subsidyValueOrganic ?? 0) -
              ((a.subsidyValue ?? 0) +
                (a.subsidyValueConventional ?? 0) +
                (a.subsidyValueOrganic ?? 0))
            )
          case t('Browse.Button.LowestValue'):
            return (
              (a.subsidyValue ?? 0) +
              (a.subsidyValueConventional ?? 0) +
              (a.subsidyValueOrganic ?? 0) -
              ((b.subsidyValue ?? 0) +
                (b.subsidyValueConventional ?? 0) +
                (b.subsidyValueOrganic ?? 0))
            )
          case t('Browse.Button.HighestEffort'):
            return effortToNumber(b.effort) - effortToNumber(a.effort)
          case t('Browse.Button.LowestEffort'):
            return effortToNumber(a.effort) - effortToNumber(b.effort)
          case t('Browse.Button.ShortestDuration'):
            return a.duration - b.duration
          case t('Browse.Button.LongestDuration'):
            return b.duration - a.duration
          default:
            return 0
        }
      })
    },
    [t],
  )

  const filteredData = useMemo(
    () =>
      filterMeasures(data ?? [], {
        ...filters,
        location: filters.location,
      }),
    [data, filters],
  )

  // Sort the filtered data based on the selected sort criterion
  const sortedData = useMemo(
    () => sortMeasures(filteredData, selectedSort),
    [filteredData, selectedSort, sortMeasures],
  )
  const resultsCount = filteredData?.length ?? 0
  const showResetButton = isReset()
  const activeFilterCategories = useMemo(
    () => getActiveCategories(filters, t),
    [filters, t],
  )

  const resetFilter = (category: string) => {
    const newFilter = resetCategory(filters, category)
    updateAppliedFilters(newFilter)
    updateEditingFilters(newFilter)
  }

  useEffect(() => {
    updateAppliedFilters({ location: searchQuery ?? undefined })
    updateEditingFilters({ location: searchQuery ?? undefined })
  }, [searchQuery])

  return (
    <Fragment>
      <div className='z-10 bg-white px-4 py-2 lg:px-5 lg:py-0'>
        {/* Mobile View */}
        <div className='flex w-full items-center justify-between space-x-2.5 lg:hidden'>
          <div className='flex-1 flex-shrink-0'>
            <VirtualizedCombobox
              key={filters.location}
              options={measureLocations}
              value={filters.location}
              onSelect={(item) => {
                updateAppliedFilters({ ...filters, location: item })
                updateEditingFilters({ ...filters, location: item })

                router.push(
                  `${routes.main.browse}?${SEARCH_QUERY_PARAM}=${encodeURIComponent(item ?? '')}`,
                )
              }}
              searchPlaceholder={t('Browse.Label.Location')}
            />
          </div>
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className='p-2'
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <FilterIcon className='h-5 w-5' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-80 p-4'>
              <div className='space-y-4'>
                <ValueDropdownMenu />
                <EffortDropdownMenu />
                <TypeOfFarmingDropdownMenu />
                <LandSettingDropdownMenu />
                <MoreFilters />
                {showResetButton && (
                  <Button
                    type='button'
                    variant='ghost'
                    className='w-full text-[16px] font-semibold'
                    onClick={resetAllFilters}
                  >
                    {t('Browse.Button.ResetFilters')}
                  </Button>
                )}
              </div>
            </PopoverContent>
          </Popover>
          <div className='ml-2'>
            <BrowseDropdownMenu
              selectedItem={selectedSort}
              onSelect={setSelectedSort}
            />
          </div>
        </div>

        {/* Desktop View */}
        <div className='hidden lg:block'>
          <div className='flex w-full items-center justify-between'>
            <div className='flex flex-wrap items-center gap-x-2 gap-y-1 py-2'>
              <div className='w-[350px]'>
                <VirtualizedCombobox
                  options={measureLocations}
                  value={filters.location}
                  onSelect={(item) => {
                    updateAppliedFilters({ ...filters, location: item })
                    updateEditingFilters({ ...filters, location: item })

                    router.push(
                      `${routes.main.browse}?${SEARCH_QUERY_PARAM}=${encodeURIComponent(item ?? '')}`,
                    )
                  }}
                  searchPlaceholder={t('Browse.Label.Location')}
                />
              </div>
              <ValueDropdownMenu />
              <EffortDropdownMenu />
              <TypeOfFarmingDropdownMenu />
              <LandSettingDropdownMenu />
              <MoreFilters />
            </div>
            {showResetButton && (
              <Button
                type='button'
                variant='ghost'
                className='text-[20px] font-semibold'
                onClick={resetAllFilters}
              >
                {t('Browse.Button.ResetFilters')}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* No results sections */}
      <div
        className={cn(
          'flex flex-col items-center gap-6 py-[32px] lg:py-[64px]',
          {
            hidden: measuresLoading || resultsCount > 0,
          },
        )}
      >
        <div
          className={cn(
            'flex flex-col items-center gap-6 py-[32px] lg:py-[64px]',
            {
              hidden: activeFilterCategories.length === 0,
            },
          )}
        >
          <Image
            src='/images/icons/scarecrow.svg'
            width={80}
            height={80}
            alt=''
            className='lg:h-[100px] lg:w-[100px]'
          />
          <Typography
            type='h2'
            className='text-center text-[24px] lg:text-[32px]'
          >
            {t('Browse.Label.NoExactMatches')}
          </Typography>
          <Typography
            type='p'
            className='text-center text-[16px] lg:text-[20px]'
          >
            {t('Browse.Label.TryChangingOrRemovingSomeOfYourFilters')}
          </Typography>
          <div className='flex flex-wrap justify-center gap-2 lg:gap-4'>
            {activeFilterCategories.map(({ category, label }) => (
              <Button
                key={category}
                variant='outline'
                onClick={() => resetFilter(category)}
                className='text-[14px] lg:text-[16px]'
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
        <div
          className={cn(
            'flex flex-col items-center gap-6 py-[32px] lg:py-[64px]',
            {
              hidden: activeFilterCategories.length > 0,
            },
          )}
        >
          <Image
            src='/images/icons/scarecrow.svg'
            width={80}
            height={80}
            alt='Scarecrow icon'
            className='lg:h-[100px] lg:w-[100px]'
          />
          <Typography
            type='h2'
            className='text-center text-[24px] lg:text-[32px]'
          >
            {t('Browse.Label.NoResultsInYourArea')}
          </Typography>
          <Typography
            type='p'
            className='w-full px-4 text-center text-[16px] lg:w-[688px] lg:text-[20px]'
          >
            {t('Browse.Label.NoMeasuresAvailableOnThePlatformYet')}
          </Typography>
        </div>
      </div>

      <div
        className={cn('mx-auto px-4 py-8', {
          hidden: !measuresLoading && resultsCount === 0,
        })}
      >
        <div className='mb-4 flex flex-col items-center lg:flex-row lg:justify-between'>
          <div>
            <Typography
              key={`count-${resultsCount}`}
              type='h2'
              className='text-2xl font-medium lg:text-3xl'
            >
              {t('Browse.Label.AvailableMeasures')}{' '}
              {measuresLoading ? '' : `(${resultsCount})`}
            </Typography>
            {measuresLoading ? (
              <div className='font-inter text-lg font-normal leading-normal lg:text-xl'>
                {t('Browse.Label.Loading')}
              </div>
            ) : null}
          </div>
          <div className='hidden lg:block'>
            <BrowseDropdownMenu
              selectedItem={selectedSort}
              onSelect={setSelectedSort}
            />
          </div>
        </div>

        <div className='grid grid-cols-1 justify-items-center gap-4 pb-10 sm:grid-cols-2 lg:grid-cols-3'>
          {measuresLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <MeasureSkeleton key={index} className='mx-auto w-full' />
              ))
            : sortedData?.map((d) => (
                <MeasureCard
                  key={d.id}
                  measure={d}
                  className='mx-auto w-full'
                />
              ))}
        </div>
      </div>
    </Fragment>
  )
}

export default BrowsePage
