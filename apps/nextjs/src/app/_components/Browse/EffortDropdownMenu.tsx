import { useState } from 'react'
import Image from 'next/image'
import { ChevronDownIcon } from '@radix-ui/react-icons'

import { t } from '@farmers/language/i18next'
import { cn } from '@farmers/ui'
import { Button } from '@farmers/ui/button'
import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenu as DropdownMenuSCN,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@farmers/ui/dropdown-menu'

import {
  store,
  updateAppliedFilters,
  updateEditingFilters,
} from '~/store/zustand'

const generateEffortText = (effortLevel: {
  low: boolean
  medium: boolean
  high: boolean
}) => {
  const { low, medium, high } = effortLevel

  const selectedEfforts = []
  if (low) selectedEfforts.push(t('FiltersBar.Buttons.Low'))
  if (medium) selectedEfforts.push(t('FiltersBar.Buttons.Medium'))
  if (high) selectedEfforts.push(t('FiltersBar.Buttons.High'))

  if (selectedEfforts.length === 0 || selectedEfforts.length === 3) {
    return t('FiltersBar.Buttons.Effort')
  }

  if (selectedEfforts.length === 1) {
    return `${selectedEfforts[0]} ${t('FiltersBar.Labels.Effort')}`
  }

  if (selectedEfforts.length === 2) {
    return `${selectedEfforts[0]} ${t('FiltersBar.Labels.And')} ${selectedEfforts[1]} ${t('FiltersBar.Labels.Effort')}`
  }

  return t('FiltersBar.Buttons.Effort')
}
const options = [
  {
    label: `${t('FiltersBar.Buttons.Low')}` as const,
    key: 'low' as const,
    shortcut: (
      <Image
        src='/images/icons/bar-effort.svg'
        height={40}
        width={40}
        alt=''
        className=''
      />
    ),
  },
  {
    label: `${t('FiltersBar.Buttons.Medium')}` as const,
    key: 'medium' as const,
    shortcut: (
      <Image
        src='/images/icons/bar-effort-med.svg'
        height={40}
        width={40}
        alt=''
        className=''
      />
    ),
  },
  {
    label: `${t('FiltersBar.Buttons.High')}` as const,
    key: 'high' as const,
    shortcut: (
      <Image
        src='/images/icons/bar-effort-high.svg'
        height={40}
        width={40}
        alt=''
        className=''
      />
    ),
  },
]

export function EffortDropdownMenu() {
  const appliedEffortLevel = store.use((s) => s.appliedFilter.effortLevel)
  const { low, medium, high } = appliedEffortLevel
  const editingEfforLevel = store.use((s) => s.editingFilter.effortLevel)
  const [isOpen, setIsOpen] = useState(false)
  const atLeastOneSelected = low || medium || high

  const text = generateEffortText(appliedEffortLevel)

  const handleCheckedChange = (key: 'low') => {
    updateEditingFilters({
      effortLevel: { ...editingEfforLevel, [key]: !editingEfforLevel[key] },
    })
  }

  const handleDeselectAll = () => {
    updateEditingFilters({
      effortLevel: { low: false, medium: false, high: false },
    })
  }

  return (
    <DropdownMenuSCN open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            ' group h-[48px] rounded-full pr-3 text-base font-semibold',
            {
              'border-2 border-black bg-[#e5e5e5]': atLeastOneSelected,
              'text-muted-foreground': !atLeastOneSelected,
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
        <div>
          <Button
            variant='ghost'
            className='py-2 pl-2 pr-0 text-lg hover:bg-white hover:underline'
            onClick={handleDeselectAll}
          >
            {t('FiltersBar.Buttons.DeselectAll')}
          </Button>

          {options.map((option) => (
            <DropdownMenuCheckboxItem
              key={option.label}
              checked={editingEfforLevel[option.key]}
              onClick={(e) => {
                e.preventDefault()
                handleCheckedChange(option.key as 'low')
              }}
              className={cn(
                'h-[56px] pl-9 text-lg hover:cursor-pointer [&>span:first-child]:h-5 [&>span:first-child]:w-5 [&>span:first-child]:rounded-sm [&>span:first-child]:border [&>span:first-child]:border-black [&_path]:fill-white',
                {
                  '[&>span:first-child]:bg-black':
                    editingEfforLevel[option.key],
                },
              )}
            >
              {option.label}{' '}
              <DropdownMenuShortcut className='opacity-1'>
                {option.shortcut}
              </DropdownMenuShortcut>
            </DropdownMenuCheckboxItem>
          ))}

          <Button
            variant='primary'
            className='mt-4 h-[48px] w-full text-xl font-semibold text-white hover:bg-black/70'
            onClick={() => {
              setIsOpen(false)
              updateAppliedFilters({ effortLevel: editingEfforLevel })
            }}
          >
            {t('FiltersBar.Buttons.Apply')}
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenuSCN>
  )
}
