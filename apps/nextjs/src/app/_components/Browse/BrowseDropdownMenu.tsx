import { ChevronDownIcon } from '@radix-ui/react-icons'
import { ArrowDownUp } from 'lucide-react'

import { t } from '@farmers/language/i18next'
import { Button } from '@farmers/ui/button'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu as DropdownMenuSCN,
  DropdownMenuTrigger,
} from '@farmers/ui/dropdown-menu'

const items = [
  t('Browse.Button.Newest'),
  t('Browse.Button.Oldest'),
  t('Browse.Button.HighestValue'),
  t('Browse.Button.LowestValue'),
  t('Browse.Button.HighestEffort'),
  t('Browse.Button.LowestEffort'),
  t('Browse.Button.ShortestDuration'),
  t('Browse.Button.LongestDuration'),
]

export type SortCriterion = (typeof items)[number]

interface BrowseDropdownMenuProps {
  selectedItem: SortCriterion
  onSelect: (item: SortCriterion) => void
}

export function BrowseDropdownMenu({
  selectedItem,
  onSelect,
}: BrowseDropdownMenuProps) {
  return (
    <DropdownMenuSCN>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='group bg-transparent text-sm text-black hover:bg-black/10'
        >
          {/* Show "Sort by" text on larger screens */}
          <span className='hidden lg:inline-block'>
            {t('Browse.Label.SortBy')}:{' '}
            <span className='ml-1 font-semibold'>{selectedItem}</span>{' '}
            <ChevronDownIcon className='ml-1 inline-block transform duration-200 group-data-[state=open]:rotate-180' />
          </span>

          {/* Show arrow icon on smaller screens */}
          <ArrowDownUp className='lg:hidden' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='border-black/10 bg-white p-0 text-black'
      >
        {items.map((item) => (
          <DropdownMenuItem
            key={item}
            className='h-[50px] rounded-none px-4 text-lg font-semibold hover:cursor-pointer hover:bg-black/10'
            onClick={() => onSelect(item)}
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenuSCN>
  )
}
