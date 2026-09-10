import { useState } from 'react'
import { ChevronDownIcon } from '@radix-ui/react-icons'

import type { LandSettings } from '@farmers/validators'
import { settingEnum } from '@farmers/db/schema/measure'
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

import { store } from '~/store/zustand'

type LandSettingKey = (typeof settingEnum.enumValues)[number]
type PartialLandSettingKey = Exclude<LandSettingKey, 'permanent grassland'>

const LandSettingMap: Record<PartialLandSettingKey, string> = {
  'arable land': t('FiltersBar.Buttons.ArableLand'),
  grassland: t('FiltersBar.Buttons.Grassland'),
  bog: t('FiltersBar.Buttons.Bog'),
  woodland: t('FiltersBar.Buttons.Woodland'),
  special: t('FiltersBar.Buttons.Special'),
  other: t('FiltersBar.Buttons.Other'),
}

const generateLandSettingText = (
  selectedSettings: PartialLandSettingKey[],
): string => {
  if (
    selectedSettings.length === 0 ||
    selectedSettings.length === settingEnum.enumValues.length
  ) {
    return t('FiltersBar.Buttons.LandSetting')
  }

  if (selectedSettings.length === 1) {
    const setting = selectedSettings[0]
    return setting
      ? `${LandSettingMap[setting]} ${t('FiltersBar.Labels.Only')}`
      : t('FiltersBar.Buttons.LandSetting')
  }

  return `${t('FiltersBar.Buttons.LandSetting')} (${selectedSettings.length})`
}

export function LandSettingDropdownMenu() {
  const landSetting = store.use((s) => s.appliedFilter.landSettings)
  const eLandSetting = store.use((s) => s.editingFilter.landSettings)
  const [isOpen, setIsOpen] = useState(false)
  const atLeastOneSelected = Object.values(landSetting).some((value) => !!value)
  const text = generateLandSettingText(
    settingEnum.enumValues.filter(
      (key): key is PartialLandSettingKey => !!landSetting[key],
    ),
  )

  const handleCheckedChange = (label: PartialLandSettingKey) => {
    store.update({
      editingFilter: {
        landSettings: {
          ...eLandSetting,
          [label]: !eLandSetting[label],
        },
      },
    })
  }

  const handleDeselectAll = () => {
    store.update({
      editingFilter: {
        landSettings: settingEnum.enumValues.reduce<Partial<LandSettings>>(
          (acc, value) => ({ ...acc, [value]: false }),
          {},
        ),
      },
    })
  }

  const handleSelectAll = () => {
    store.update({
      editingFilter: {
        landSettings: settingEnum.enumValues.reduce<Partial<LandSettings>>(
          (acc, value) => ({ ...acc, [value]: true }),
          {},
        ),
      },
    })
  }

  const handleApplyFilters = () => {
    setIsOpen(false)
    store.update({
      appliedFilter: {
        landSettings: eLandSetting,
      },
    })
  }

  return (
    <DropdownMenuSCN open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'group h-[48px] rounded-full pr-3 text-base font-semibold',
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
          <div className='flex justify-between'>
            <Button
              variant='ghost'
              className='py-2 pl-2 pr-0 text-lg hover:bg-white hover:underline'
              onClick={handleSelectAll}
            >
              {t('FiltersBar.Buttons.SelectAll')}
            </Button>
            <Button
              variant='ghost'
              className='py-2 pl-2 pr-0 text-lg hover:bg-white hover:underline'
              onClick={handleDeselectAll}
            >
              {t('FiltersBar.Buttons.DeselectAll')}
            </Button>
          </div>

          {settingEnum.enumValues.map((option) => (
            <DropdownMenuCheckboxItem
              key={option}
              checked={!!eLandSetting[option]}
              onClick={(e) => {
                e.preventDefault()
                handleCheckedChange(option as PartialLandSettingKey)
              }}
              className={cn(
                'h-[56px] pl-9 text-lg capitalize hover:cursor-pointer [&>span:first-child]:h-5 [&>span:first-child]:w-5 [&>span:first-child]:rounded-sm [&>span:first-child]:border [&>span:first-child]:border-black [&_path]:fill-white',
                {
                  '[&>span:first-child]:bg-black': eLandSetting[option],
                },
              )}
            >
              {LandSettingMap[option as PartialLandSettingKey]}{' '}
              <DropdownMenuShortcut className='opacity-1'>
                {''}
              </DropdownMenuShortcut>
            </DropdownMenuCheckboxItem>
          ))}

          <Button
            variant='primary'
            className='mt-4 h-[48px] w-full text-xl font-semibold text-white hover:bg-black/70'
            onClick={handleApplyFilters}
          >
            {t('FiltersBar.Buttons.Apply')}
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenuSCN>
  )
}
