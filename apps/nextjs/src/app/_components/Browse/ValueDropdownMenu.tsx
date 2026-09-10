import { useEffect, useState } from 'react'
import { ChevronDownIcon } from '@radix-ui/react-icons'

import { t } from '@farmers/language/i18next'
import { safeParseInt } from '@farmers/shared/common/functions'
import { cn } from '@farmers/ui'
import { Button } from '@farmers/ui/button'
import {
  DropdownMenuContent,
  DropdownMenu as DropdownMenuSCN,
  DropdownMenuTrigger,
} from '@farmers/ui/dropdown-menu'
import { Input } from '@farmers/ui/input'

import { store } from '~/store/zustand'

const generateValueRangeText = (valueRange: { min: number; max: number }) => {
  const { min, max } = valueRange

  if (min !== 0 && max !== 0) {
    if (min === max) {
      return `Exact value: ${min}`
    }
    return `${min} - ${max}`
  }

  if (min !== 0 && max === 0) {
    return `Greater than ${min}`
  }

  if (min === 0 && max !== 0) {
    return `Less than ${max}`
  }

  return t('FiltersBar.Labels.Value')
}
export function ValueDropdownMenu() {
  const { min: initialMin, max: initialMax } = store.use(
    (s) => s.appliedFilter.valueRange,
  )
  const [minText, setMinText] = useState(initialMin.toString())
  const [maxText, setMaxText] = useState(initialMax.toString())
  const [isOpen, setIsOpen] = useState(false)

  const { min, max } = store.use((s) => s.editingFilter.valueRange)

  useEffect(() => {
    setMinText(min.toString())
    setMaxText(max.toString())
  }, [min, max])

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

  const text = generateValueRangeText({ min: initialMin, max: initialMax })

  const handleApplyFilters = () => {
    // close dropdown
    setIsOpen(false)

    setMinText(min.toString())
    setMaxText(max.toString())

    store.update({
      appliedFilter: {
        valueRange: {
          min: min,
          max: max,
        },
      },
    })
  }

  const handleClear = () => {
    setMinText('')
    setMaxText('')
    setMin(0)
    setMax(0)
  }

  return (
    <DropdownMenuSCN open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            ' group h-[48px] rounded-full pr-3 text-base font-semibold',
            {
              'border-2 border-black bg-[#e5e5e5]': initialMin || initialMax,
              'text-muted-foreground': !initialMin && !initialMax,
            },
          )}
        >
          {text}
          <ChevronDownIcon className='ml-1 h-[24px] w-[24px] transform duration-200 group-data-[state=open]:rotate-180' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='start'
        className='w-[400px] space-y-4 border-black/10 bg-white p-4 font-normal text-black'
      >
        <p className='text-md'>{t('FiltersBar.Labels.ValueDescription')}</p>
        <div className='grid grid-cols-[1fr_20px_1fr] gap-4'>
          <div className='relative'>
            <div className='absolute top-0 h-4 px-4 pt-4 text-[14px] font-semibold text-[#646464]'>
              {t('FiltersBar.Labels.MinimumValue')}
            </div>
            <Input
              className='h-full rounded-lg border border-[#D9D9D9] px-4 pt-7 text-[16px] font-semibold'
              value={minText}
              onChange={(e) => setMinText(e.target.value)}
            />
          </div>
          <div className='h-[72px]'>
            <div className='h-1/2 w-full border-b border-[#D9D9D9]'></div>
          </div>
          <div className='relative'>
            <div className='absolute top-0 h-4 px-4 pt-4 text-[14px] font-semibold text-[#646464]'>
              {t('FiltersBar.Labels.MaximumValue')}
            </div>
            <Input
              className='h-full rounded-lg border border-[#D9D9D9] px-4 pt-7 text-[16px] font-semibold'
              value={maxText}
              onChange={(e) => setMaxText(e.target.value)}
            />
          </div>
        </div>
        <div className='flex gap-2'>
          <Button
            variant='outline'
            className='h-[48px] w-1/2 text-xl font-semibold'
            onClick={handleClear}
            type='button'
          >
            {t('FiltersBar.Buttons.Clear')}
          </Button>
          <Button
            variant='primary'
            className='h-[48px] w-1/2 text-xl font-semibold text-white hover:bg-black/70'
            onClick={handleApplyFilters}
            type='button'
          >
            {t('FiltersBar.Buttons.Apply')}
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenuSCN>
  )
}
