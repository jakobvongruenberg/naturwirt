'use client'

import { Fragment, useState } from 'react'
import Image from 'next/image'
import { Cross1Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { t } from 'i18next'
import { useWatch } from 'react-hook-form'

import { cn } from '@farmers/ui'
import { Button } from '@farmers/ui/button'
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@farmers/ui/command'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useForm,
} from '@farmers/ui/form'
import { Input } from '@farmers/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@farmers/ui/popover'
import { SearchSelectSchema } from '@farmers/validators'

interface SearchBarProps {
  size?: 'default' | 'small'
  defaultValue?: string
  onSearchSubmit?: (value: string) => void
  locations: string[] //
  placeholder: string
}

export function SearchBarControlled({
  size = 'default',
  defaultValue,
  onSearchSubmit,
  locations,
  placeholder,
}: SearchBarProps) {
  const form = useForm({
    schema: SearchSelectSchema,
    defaultValues: {
      search: defaultValue,
    },
  })

  const [inputWidth, setInputWidth] = useState(0)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const searchValue = useWatch({ name: 'search', control: form.control })

  const inputClasses = cn({
    'h-[48px] rounded-full bg-white px-[20px] py-[15px] text-[16px] font-medium leading-[20px] shadow-none':
      size === 'small',
    'h-[72px] rounded-full bg-white px-[30px] py-[23px] text-[20px] font-medium leading-[24px] shadow-none':
      size === 'default',
    'pr-[88px]': size === 'small' && searchValue !== '',
    'pr-[129px]': size !== 'small' && searchValue !== '',
  })

  const actionButtonClasses =
    size === 'small'
      ? 'absolute right-[8px] top-[6px] h-[36px] w-[36px] rounded-full !p-0 hover:bg-black'
      : 'absolute right-[10px] top-[10px] h-[52px] w-[52px] rounded-full !p-0 hover:bg-black'

  const iconClasses =
    size === 'small' ? 'h-[20px] w-[20px]' : 'h-[28px] w-[28px]'

  const clearButtonClasses = cn({
    'absolute right-[49px] top-[6px] h-[36px] w-[36px] rounded-full !p-0':
      size === 'small',
    'absolute right-[72px] top-[10px] h-[52px] w-[52px] rounded-full !p-0':
      size === 'default',
    hidden: searchValue === '',
  })

  const locationItemClasses = cn('cursor-pointer', {
    'h-[64px] p-5 text-[20px]': size === 'default',
    'h-[48px] p-4 text-[16px]': size === 'small',
  })

  const imageSize = size === 'default' ? 24 : 20

  const handleLocationSelect = (location: string) => {
    form.setValue('search', location)
    setIsPopoverOpen(false)
  }

  return (
    <Form {...form}>
      <form
        className='flex w-full max-w-2xl flex-col gap-4'
        onSubmit={form.handleSubmit(async (data) => {
          onSearchSubmit?.(data.search ?? '')
          console.log(data)
        }, console.error)}
      >
        <Fragment>
          <FormField
            control={form.control}
            name='search'
            render={({ field }) => (
              <Popover open={true}>
                <PopoverTrigger>
                  <FormItem
                    ref={(element) => setInputWidth(element?.offsetWidth ?? 0)}
                  >
                    <FormControl>
                      <div className='relative'>
                        <Input
                          {...field}
                          className={inputClasses}
                          placeholder={placeholder}
                          onFocus={() => setIsPopoverOpen(true)}
                        />
                        <Button
                          type='button'
                          variant='ghost'
                          className={clearButtonClasses}
                          onClick={(e) => {
                            e.preventDefault()
                            field.onChange('')
                            form.setValue('search', '')
                            form.setFocus('search')
                          }}
                        >
                          <Cross1Icon color='black' className={iconClasses} />
                        </Button>
                        <Button
                          type='submit'
                          className={actionButtonClasses}
                          onClick={() => setIsPopoverOpen(false)}
                        >
                          <MagnifyingGlassIcon
                            color='white'
                            className={iconClasses}
                          />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </PopoverTrigger>
                <PopoverContent
                  className={cn('w-full p-0', { hidden: !isPopoverOpen })}
                  style={{ width: inputWidth }}
                >
                  <Command>
                    <div className='hidden'>
                      <CommandInput value={field.value} />
                    </div>
                    {/**
                     * TODO: Use current location feature
                     */}
                    <button
                      className={cn(
                        locationItemClasses,
                        'flex items-center gap-2 font-semibold',
                      )}
                      onClick={() => console.log('Using current location')}
                    >
                      <Image
                        src='/images/icons/my-location.svg'
                        alt='Use current location'
                        width={imageSize}
                        height={imageSize}
                      />
                      <div>Use current location</div>
                    </button>
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      {locations?.map((location) => (
                        <CommandItem
                          className={cn(
                            locationItemClasses,
                            'rounded-none border-t border-[#DCDCDC] font-normal',
                          )}
                          key={location}
                          value={location}
                          onSelect={() => handleLocationSelect(location)}
                        >
                          {location}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                  <div className='flex justify-end border-t-2 border-[#DCDCDC] p-4'>
                    <Button onClick={() => setIsPopoverOpen(false)}>
                      {t('FiltersBar.Buttons.Close')}
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          />
        </Fragment>
      </form>
    </Form>
  )
}
