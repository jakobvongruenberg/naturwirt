'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useSession } from 'next-auth/react'

import type { Status } from '@farmers/validators'
import { useIntlContext } from '@farmers/language/intl-provider'
import { cn } from '@farmers/ui'
import { Button } from '@farmers/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@farmers/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@farmers/ui/popover'

import { AUTH, ModalStore } from '~/store/modal'
import { api } from '~/trpc/react'

interface StatusComboboxProps {
  status: Status | '' | null
  setStatus: (status: Status | '' | null) => void
  measureId: number
}

export function StatusCombobox(props: StatusComboboxProps) {
  const { measureId, status, setStatus } = props
  const { data: session } = useSession()
  const [open, setOpen] = React.useState(false)

  const { mutateAsync: upsertUserMeasure } =
    api.user.upsertUserMeasure.useMutation()
  const utils = api.useUtils()
  const { t } = useIntlContext()

  const statusOptions = [
    {
      value: '',
      label: t('Measure.Card.Dropdown.None'),
    },
    {
      value: 'shortlisted',
      label: t('Measure.Card.Dropdown.Shortlisted'),
    },
    {
      value: 'active',
      label: t('Measure.Card.Dropdown.Active'),
    },
    {
      value: 'archived',
      label: t('Measure.Card.Dropdown.Archived'),
    },
  ] as const

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='flex w-[160px] flex-row justify-between overflow-hidden bg-transparent text-white hover:bg-accent/10 hover:text-white'
        >
          {status
            ? statusOptions.find((s) => s.value === status)?.label
            : t('Measure.Button.AddTo')}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[160px] p-0'>
        <Command>
          <CommandItem />
          <CommandList>
            <CommandEmpty>No statuses</CommandEmpty>
            <CommandGroup>
              {statusOptions.map((statusOption) => (
                <CommandItem
                  key={statusOption.value}
                  value={statusOption.value}
                  onSelect={(currentValue) => {
                    if (!session?.user) {
                      ModalStore.update({ open: true, type: AUTH })
                    } else {
                      setOpen(false)
                      const newStatus = !currentValue
                        ? ''
                        : currentValue === status
                          ? ''
                          : (currentValue as Status)
                      setStatus(newStatus)
                      void upsertUserMeasure({
                        measureId,
                        status: !currentValue
                          ? null
                          : currentValue === status
                            ? null
                            : (currentValue as Status),
                      }).then(() => {
                        void utils.user.getUserMeasures.invalidate()
                      })
                    }
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      status === statusOption.value
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                  {statusOption.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
