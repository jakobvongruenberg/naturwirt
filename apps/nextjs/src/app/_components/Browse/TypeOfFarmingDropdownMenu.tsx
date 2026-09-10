import React, { useState } from 'react'
import { ChevronDownIcon } from '@radix-ui/react-icons'

import { t } from '@farmers/language/i18next'
import { cn } from '@farmers/ui'
import { Button } from '@farmers/ui/button'
import {
  DropdownMenuContent,
  DropdownMenu as DropdownMenuSCN,
  DropdownMenuTrigger,
} from '@farmers/ui/dropdown-menu'
import { Toggle } from '@farmers/ui/toggle'

import { store, updateEditingFilters } from '~/store/zustand'

const generateTypeOfFarmingText = (typeOfFarming: string | null) => {
  if (typeOfFarming === 'conventional') {
    return t('FiltersBar.Buttons.Conventional')
  }
  if (typeOfFarming === 'organic') {
    return t('FiltersBar.Buttons.Organic')
  }
  return t('FiltersBar.Buttons.TypeOfFarming')
}

export function TypeOfFarmingDropdownMenu() {
  const typeOfFarming = store.use((s) => s.appliedFilter.typeOfFarming)
  const selectedTypeOfFarming = store.use((s) => s.editingFilter.typeOfFarming)
  const [isOpen, setIsOpen] = useState(false)

  const text = generateTypeOfFarmingText(typeOfFarming)

  const atLeastOneSelected = typeOfFarming !== null

  const handleOnClick = (type: typeof typeOfFarming) => {
    updateEditingFilters({
      typeOfFarming: type,
    })
  }

  const handleApplyFilters = () => {
    setIsOpen(false)
    store.update({
      appliedFilter: {
        typeOfFarming: selectedTypeOfFarming,
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
        className='w-[528px] space-y-4 border-black/10 bg-white p-4 font-normal text-black'
      >
        <div className='grid grid-cols-2'>
          <Toggle
            variant='outline'
            className='h-[62px] rounded-l-xl rounded-r-none text-lg font-semibold data-[state=on]:border-2 data-[state=on]:border-black data-[state=on]:bg-black/10'
            onPressedChange={(v) => handleOnClick(v ? 'any' : null)}
            pressed={selectedTypeOfFarming === 'any'}
          >
            {t('FiltersBar.Buttons.Conventional')}
          </Toggle>
          <Toggle
            variant='outline'
            className='h-[62px] rounded-l-none rounded-r-xl text-lg font-semibold data-[state=on]:border-2 data-[state=on]:border-black data-[state=on]:bg-black/10'
            onPressedChange={(v) => handleOnClick(v ? 'organic' : null)}
            pressed={selectedTypeOfFarming === 'organic'}
          >
            {t('FiltersBar.Buttons.Organic')}
          </Toggle>
        </div>
        <Button
          variant='primary'
          className='h-[48px] w-full text-xl font-semibold  text-white hover:bg-black/70'
          onClick={handleApplyFilters}
        >
          {t('FiltersBar.Buttons.Apply')}
        </Button>
      </DropdownMenuContent>
    </DropdownMenuSCN>
  )
}
