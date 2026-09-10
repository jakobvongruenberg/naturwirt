import { useEffect, useState } from 'react'
import Image from 'next/image'

import type { LandSituation, SubsidyProvider } from '@farmers/validators'
import { situationEnum, subsidyProviderEnum } from '@farmers/db/schema/measure'
import { t } from '@farmers/language/i18next'
import { safeParseInt } from '@farmers/shared/common/functions'
import { cn } from '@farmers/ui'
import { Button } from '@farmers/ui/button'
import { Checkbox } from '@farmers/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@farmers/ui/dialog'

import type { Filter } from '~/store/types'
import { resetAllFilters, store } from '~/store/zustand'
import { getSituationTranslation } from '~/utils/translations'

const countTrueValues = (obj: Record<string, boolean | undefined>): number => {
  return Object.values(obj).filter((value) => value === true).length
}

const generateMoreFilterText = (filter: Filter): string => {
  const { subsidyProvider, landSituation } = filter // TODO: Include animals to the countings
  const totalMoreFilterChanges =
    countTrueValues(subsidyProvider) + countTrueValues(landSituation)
  return totalMoreFilterChanges > 0 ? `${totalMoreFilterChanges}` : ''
}

const MoreFilters = () => {
  const [open, setOpen] = useState(false)
  const filter = store.use((s) => s.appliedFilter)
  const efilter = store.use((s) => s.editingFilter)
  const [minText, setMinText] = useState(efilter.valueRange.min.toString())
  const [maxText, setMaxText] = useState(efilter.valueRange.max.toString())
  const text = generateMoreFilterText(filter)

  useEffect(() => {
    setMinText(efilter.valueRange.min.toString())
    setMaxText(efilter.valueRange.max.toString())
  }, [efilter.valueRange.min, efilter.valueRange.max])

  // value range
  const setMin = (valueMin: number) => {
    store.update({
      editingFilter: {
        valueRange: {
          min: valueMin,
        },
      },
    })
  }

  const setMax = (valueMax: number) => {
    store.update({
      editingFilter: {
        valueRange: {
          max: valueMax,
        },
      },
    })
  }

  useEffect(() => {
    setMin(safeParseInt(minText) ?? 0)
    setMax(safeParseInt(maxText) ?? 0)
  }, [minText, maxText])

  const handleSubsidyProviderCheckedChange = (label: keyof SubsidyProvider) => {
    store.update({
      editingFilter: {
        subsidyProvider: {
          ...efilter.subsidyProvider,
          [label]: !efilter.subsidyProvider[label],
        },
      },
    })
  }

  // land situation options
  const handleLandSituationCheckedChange = (label: keyof LandSituation) => {
    store.update({
      editingFilter: {
        landSituation: {
          ...efilter.landSituation,
          [label]: !efilter.landSituation[label],
        },
      },
    })
  }
  const handleSituationDeselectAll = () => {
    store.update({
      editingFilter: {
        landSituation: situationEnum.enumValues.reduce(
          (acc, value) => ({ ...acc, [value]: false }),
          {},
        ),
      },
    })
  }

  // animal options
  // const [selectedAnimalOptions, setSelectedAnimalOptions] = useState(
  //   animalOptions.reduce(
  //     (acc, option) => {
  //       acc[option.label] = true
  //       return acc
  //     },
  //     {} as Record<string, boolean>,
  //   ),
  // )

  // subsidy provider options

  const handleSubsidyDeselectAll = () => {
    store.update({
      editingFilter: {
        subsidyProvider: subsidyProviderEnum.enumValues.reduce(
          (acc, value) => ({ ...acc, [value]: false }),
          {},
        ),
      },
    })
  }
  // ALL FILTERS

  const handleApplyFilters = () => {
    store.update({
      appliedFilter: structuredClone(efilter),
    })
    setOpen(false)
  }

  const handleResetAllFilters = () => {
    resetAllFilters()
  }

  const getSubsidyProviderTranslation = (label: keyof SubsidyProvider) => {
    return t(`FiltersBar.Buttons.${label}`)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'group relative h-[48px] rounded-full text-base font-semibold',
            {
              'border-2 border-black bg-[#e5e5e5]': !!text,
              'text-muted-foreground': !text,
            },
          )}
        >
          <Image
            src='/images/icons/slider.svg'
            height={24}
            width={24}
            alt=''
            className={cn('mr-2', { 'opacity-50': !text })}
          />
          {t('FiltersBar.Buttons.MoreFilters')}
          {text ? (
            <div className='absolute -right-2 -top-2 flex h-7 min-w-7 items-center justify-center rounded-full border-2 border-white bg-destructive px-1 text-[11px] font-semibold text-white'>
              {text}
            </div>
          ) : null}
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-[95vw] gap-0 px-0 lg:max-w-[734px] [&>button>svg]:h-6 [&>button>svg]:w-6 [&>button]:right-4 [&>button]:top-4 lg:[&>button]:right-8 lg:[&>button]:top-8'>
        <DialogHeader className='border-b border-[#D9D9D9] p-4 lg:p-6'>
          <DialogTitle className='text-center text-xl lg:text-2xl'>
            {t('FiltersBar.Labels.AllFilters')}
          </DialogTitle>
        </DialogHeader>
        <div className='grid h-[70vh] divide-y divide-[#D9D9D9] overflow-y-auto px-4 py-4 lg:h-[490px] lg:px-7 lg:py-4'>
          <div className='pb-6 pt-4'>
            <div className='mb-2 text-2xl'>
              {t('FiltersBar.Labels.LandSituation')}
            </div>
            <div>
              <Button
                variant='ghost'
                className='py-2 pl-0 pr-0 text-lg hover:bg-white hover:underline'
                onClick={handleSituationDeselectAll}
              >
                {t('FiltersBar.Buttons.DeselectAll')}
              </Button>

              <div className='grid grid-cols-2 gap-x-5 gap-y-2'>
                {situationEnum.enumValues.map((option) => (
                  <button
                    key={option}
                    onClick={(e) => {
                      e.preventDefault()
                      handleLandSituationCheckedChange(option)
                    }}
                    className={cn(
                      'flex h-[40px] items-center pl-0 text-lg capitalize hover:cursor-pointer',
                      {
                        '[&>span:first-child]:bg-black':
                          efilter.landSituation[option],
                      },
                    )}
                  >
                    <Checkbox
                      checked={!!efilter.landSituation[option]}
                      className='mr-2 h-5 w-5'
                    />
                    {getSituationTranslation(option) || option}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* <div className='pb-6 pt-4'>
            <div className='mb-2 text-2xl'>Animals</div>
            <div>
              <Button
                variant='ghost'
                className='py-2 pl-0 pr-0 text-lg hover:bg-white hover:underline'
                onClick={handleAnimalDeselectAll}
              >
                Deselect All
              </Button>
              <div className='flex items-center space-x-4'>
                <Label
                  htmlFor='i-have-animals'
                  className='text-lg font-semibold'
                >
                  I have animals
                </Label>
                <div className='relative my-4'>
                  <Switch
                    id='i-have-animals'
                    className='peer h-10 w-[70px] [&>span]:h-[30px] [&>span]:w-[30px] [&>span]:data-[state=checked]:translate-x-[33px] [&>span]:data-[state=unchecked]:translate-x-1'
                    onCheckedChange={(v) => console.log(v)}
                  />
                  <span className='pointer-events-none absolute left-[2px] top-[5px] flex h-[30px] w-[30px] translate-x-0 items-center justify-center rounded-full opacity-0 transition-all peer-data-[state=checked]:mr-[1px]  peer-data-[state=checked]:translate-x-[32px] peer-data-[state=checked]:opacity-100'>
                    <CheckIcon className='h-6 w-6' />
                  </span>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-x-5 gap-y-2'>
                {settingEnum.enumValues.map((option) => (
                  <button
                    key={option}
                    onClick={(e) => {
                      e.preventDefault()
                      handleSettingCheckedChange(option)
                    }}
                    className={cn(
                      'flex h-[40px] items-center  pl-0 text-lg capitalize  hover:cursor-pointer',
                      {
                        '[&>span:first-child]:bg-black':
                          efilter.landSettings[option],
                      },
                    )}
                  >
                    <Checkbox
                      checked={!!efilter.landSettings[option]}
                      className='mr-2 h-5 w-5'
                    />
                    {option}{' '}
                  </button>
                ))}
              </div>
            </div>
          </div> */}
          <div className='pb-6 pt-4'>
            <div className='mb-2 text-2xl'>
              {t('FiltersBar.Labels.SubsidyProvider')}
            </div>
            <div>
              <Button
                variant='ghost'
                className='py-2 pl-0 pr-0 text-lg hover:bg-white hover:underline'
                onClick={handleSubsidyDeselectAll}
              >
                {t('FiltersBar.Buttons.DeselectAll')}
              </Button>
              <div className='grid grid-cols-2 gap-x-5 gap-y-2'>
                {subsidyProviderEnum.enumValues.map((option) => (
                  <button
                    key={option}
                    onClick={(e) => {
                      e.preventDefault()
                      handleSubsidyProviderCheckedChange(option)
                    }}
                    className={cn(
                      'flex h-[40px] items-center  pl-0 text-lg capitalize  hover:cursor-pointer',
                      {
                        '[&>span:first-child]:bg-black':
                          efilter.subsidyProvider[option],
                      },
                    )}
                  >
                    <Checkbox
                      checked={!!efilter.subsidyProvider[option]}
                      className='mr-2 h-5 w-5'
                    />
                    {getSubsidyProviderTranslation(option)}{' '}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className='border-t border-[#D9D9D9] p-4 lg:pl-2 lg:pr-6 lg:pt-6'>
          <div className='flex w-full flex-col justify-between gap-3 lg:flex-row lg:gap-0'>
            <Button
              variant='ghost'
              type='button'
              className='h-[48px] px-4 text-lg font-semibold lg:h-[53px] lg:px-5 lg:text-xl'
              onClick={handleResetAllFilters}
            >
              {t('FiltersBar.Buttons.Reset')}
            </Button>
            <Button
              variant='primary'
              type='button'
              className='h-[48px] px-4 text-lg font-semibold text-white hover:bg-black/70 lg:h-[53px] lg:px-5 lg:text-xl'
              onClick={handleApplyFilters}
            >
              {t('FiltersBar.Buttons.ApplyFilters')}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default MoreFilters
