'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { t } from '@farmers/language/i18next'
import { land } from '@farmers/shared/app/constants'
import { cn } from '@farmers/ui'
import { Button } from '@farmers/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@farmers/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@farmers/ui/popover'

interface LocationSelectorProps {
  value: string[]
  onValueChange: (value: string[]) => void
  options?: string[]
}
const initValue: string[] = []
function LocationSelector({
  value: initialValue = initValue,
  onValueChange,
  options = land,
}: LocationSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<string[]>(
    options.filter((country) => initialValue.includes(country)),
    // .map((country) => `${country}${country.label}`),
  )

  const toggleValue = (selectedValue: string) => {
    setValue((prev) => {
      const newValue = prev.includes(selectedValue)
        ? prev.filter((v) => v !== selectedValue)
        : [...prev, selectedValue]

      const newLabels = newValue
        .map((val) => options.find((country) => country === val))
        .filter((label): label is string => label !== undefined)

      onValueChange?.(newLabels)
      return newValue
    })
  }

  React.useEffect(() => {
    setValue(options.filter((country) => initialValue.includes(country)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[340px] justify-between'
        >
          <p className='overflow-hidden text-ellipsis'>
            {value.length > 0
              ? value
                  .map((val) => options.find((country) => country === val))
                  .filter((label): label is string => label !== undefined)
                  .join(', ')
              : t('Measure.Placeholder.AvailableArea')}
          </p>
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[340px] p-0'>
        <Command>
          <CommandInput placeholder={t('Search.Placeholder')} />
          <CommandEmpty>{t('Search.NoneFound')}</CommandEmpty>
          <CommandGroup className='max-h-[300px] overflow-auto'>
            {options.map((country) => (
              <CommandItem
                key={country}
                value={country}
                onSelect={() => {
                  toggleValue(country)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value.includes(country) ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {country}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default LocationSelector
