import React from 'react'
import Image from 'next/image'

import Typography from './typography'

interface CombinationCardProps {
  label: string
  title: string
  price: number
  status: string
}
const CombinationCard: React.FC<CombinationCardProps> = ({
  label,
  title,
  price,
  status,
}) => {
  const available = status === 'available'
  return (
    <div className='flex flex-col rounded-lg border border-gray-300 bg-white p-4'>
      <div className='flex items-start justify-between border-b border-[#DCDCDC]'>
        <div className=''>
          <Typography
            type='p'
            className='border-gray-250 inline-flex h-[32px] items-center rounded-full border border-solid px-2 py-3 text-[12px] font-semibold'
          >
            {label}
          </Typography>
          <Typography type='large' className='mb-4 mt-2 text-[20px]'>
            {title}
          </Typography>
        </div>
        <div className='broder-[#D9D9D9] flex h-12 w-12 items-center justify-center rounded-sm border-2'>
          <Image
            src={'/images/icons/plus-unfilled.svg'}
            alt='+'
            width={24}
            height={24}
          />
        </div>
      </div>
      <Typography type='large' className='mt-4 text-[20px]'>
        {`${available ? '+' : '-'}${price}€/ha`}
      </Typography>
    </div>
  )
}

export default CombinationCard
