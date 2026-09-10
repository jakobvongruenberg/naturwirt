'use client'

import Image from 'next/image'

import { Button } from '@farmers/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@farmers/ui/popover'

const InfoPopover = ({ description }: { description?: string | null }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost' className='ml-1 h-5 w-5 rounded-full p-0'>
          <Image
            alt='Information'
            src={'/images/icons/info-outlined.svg'}
            width={24}
            height={24}
          />{' '}
        </Button>
      </PopoverTrigger>
      <PopoverContent className=''>{description}</PopoverContent>
    </Popover>
  )
}

export default InfoPopover
