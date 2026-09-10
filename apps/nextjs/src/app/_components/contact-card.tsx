import React from 'react'
import Image from 'next/image'

import Typography from './typography'

interface Contact {
  name: string
  email: string
  phone: string
}

const ContactCard: React.FC<Contact> = ({ name, email, phone }) => {
  return (
    <div className='space-y-2 lg:space-y-3'>
      <Typography type='large' className='text-lg font-semibold lg:text-2xl'>
        {name}
      </Typography>
      <div className='flex items-center'>
        <div className='relative mr-2 h-6 w-6 lg:mr-2.5 lg:h-8 lg:w-8'>
          <Image src='/images/icons/email.svg' alt='' layout='fill' />
        </div>
        <a
          href={`mailto:${email}`}
          className='text-base font-semibold underline underline-offset-2 lg:text-[22px] lg:underline-offset-[4.5px]'
        >
          {email}
        </a>
      </div>
      <div className='flex items-center'>
        <div className='relative mr-2 h-6 w-6 lg:mr-2.5 lg:h-8 lg:w-8'>
          <Image src='/images/icons/phone.svg' alt='' layout='fill' />
        </div>
        <a
          href={`tel:${phone}`}
          className='text-base font-semibold underline underline-offset-2 lg:text-[22px] lg:underline-offset-[4.5px]'
        >
          {phone}
        </a>
      </div>
    </div>
  )
}

export default ContactCard
