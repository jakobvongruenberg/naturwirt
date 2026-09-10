'use client'

import { useEffect, useRef, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Check, Search, X } from 'lucide-react'

import { useIntlContext } from '@farmers/language/intl-provider'
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

const MIN_WIDTH = 300

interface Option {
  value: string
  label: string
}

interface VirtualizedCommandProps {
  options: Option[]
  placeholder: string
  selectedOption: string
  onSelectOption?: (option: string) => void
}

const VirtualizedCommand = ({
  options,
  placeholder,
  selectedOption,
  onSelectOption,
}: VirtualizedCommandProps) => {
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options)
  const parentRef = useRef(null)

  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 5,
  })

  const virtualOptions = virtualizer.getVirtualItems()

  const handleSearch = (search: string) => {
    setFilteredOptions(
      options.filter((option) =>
        option.value.toLowerCase().includes(search.toLowerCase() ?? []),
      ),
    )
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
    }
  }

  return (
    <Command shouldFilter={false} onKeyDown={handleKeyDown}>
      <CommandInput onValueChange={handleSearch} placeholder={placeholder} />
      <CommandEmpty>No item found.</CommandEmpty>
      <CommandGroup
        ref={parentRef}
        style={{
          height: 300,
          width: '100%',
          overflow: 'auto',
        }}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualOptions.map((virtualOption) => (
            <CommandItem
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualOption.size}px`,
                transform: `translateY(${virtualOption.start}px)`,
              }}
              key={filteredOptions[virtualOption.index]?.value}
              value={filteredOptions[virtualOption.index]?.value}
              onSelect={(selectedItem) => {
                const item = filteredOptions[virtualOption.index]?.value
                onSelectOption?.(item ?? selectedItem)
              }}
            >
              <Check
                className={cn(
                  'mr-2 h-4 w-4',
                  selectedOption === filteredOptions[virtualOption.index]?.value
                    ? 'opacity-100'
                    : 'opacity-0',
                )}
              />
              <div className='line-clamp-1 flex items-center justify-between'>
                <div>{filteredOptions[virtualOption.index]?.label}</div>
              </div>
            </CommandItem>
          ))}
        </div>
      </CommandGroup>
    </Command>
  )
}

interface VirtualizedComboboxProps {
  value?: string
  options: string[]
  searchPlaceholder?: string
  onSelect?: (item: string) => void
}

export function VirtualizedCombobox({
  value,
  options,
  searchPlaceholder: searchPlaceholderRaw,
  onSelect,
}: VirtualizedComboboxProps) {
  const { t } = useIntlContext()
  const searchPlaceholder = searchPlaceholderRaw ?? t('Search.Placeholder')
  const [open, setOpen] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<string>(value ?? '')
  const [buttonWidth, setButtonWidth] = useState(0)

  useEffect(() => {
    setSelectedOption(value ?? '')
  }, [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='text-md flex w-full flex-grow-0 flex-row justify-between rounded-full py-6 pl-2 pr-2 font-semibold'
          ref={(element) => setButtonWidth(element?.offsetWidth ?? 0)}
        >
          {selectedOption ? null : (
            <div className='flex size-8 items-center justify-center rounded-full bg-[#1B3765] p-1'>
              <Search className='size-4 shrink-0 text-white' />
            </div>
          )}
          <div
            className={cn('ml-2 line-clamp-1 flex-1 text-left', {
              'text-muted-foreground': !selectedOption,
            })}
          >
            {selectedOption
              ? (options.find((option) => option === selectedOption) ??
                selectedOption)
              : searchPlaceholder}
          </div>
          {selectedOption ? (
            <Button
              type='button'
              variant='ghost'
              className='h-min rounded-full bg-black/10 p-2 hover:bg-black/10'
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setSelectedOption('')
                onSelect?.('')
                setOpen(false)
              }}
            >
              <X className='size-4' />
            </Button>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        // To prevent the change to the top of the search
        // https://www.radix-ui.com/primitives/docs/components/popover#content
        avoidCollisions={false}
        side='bottom'
        className={cn('p-0')}
        style={{ width: buttonWidth, minWidth: MIN_WIDTH }}
        align={buttonWidth < MIN_WIDTH ? 'start' : 'center'}
      >
        <VirtualizedCommand
          options={options.map((option) => ({ value: option, label: option }))}
          placeholder={searchPlaceholder}
          selectedOption={selectedOption}
          onSelectOption={(currentValue) => {
            setSelectedOption(
              currentValue === selectedOption ? '' : currentValue,
            )
            onSelect?.(currentValue)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
