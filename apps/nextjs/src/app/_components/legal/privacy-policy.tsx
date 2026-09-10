import React from 'react'

import Typography from '~/app/_components/typography'

const PrivacyPolicy: React.FC = () => {
  return (
    // TODO: Add real privacy policy content
    <div className='container mx-auto max-w-3xl px-4 pb-24 pt-8'>
      <Typography type='h1' className='mb-6'>
        Privacy Policy
      </Typography>
      <div className='text-2xl text-red-600'>
        This is generic privacy policy written by ChatGPT
      </div>
      <p className='mb-4'>Last updated: [Current Date]</p>

      <h2 className='mb-4 mt-6 text-2xl font-semibold'>1. Introduction</h2>
      <p className='mb-4'>
        [Your Company Name] ("us", "we", or "our") operates [Your Website URL]
        (the "Service"). This page informs you of our policies regarding the
        collection, use, and disclosure of personal data when you use our
        Service and the choices you have associated with that data.
      </p>

      <h2 className='mb-4 mt-6 text-2xl font-semibold'>
        2. Information Collection and Use
      </h2>
      <p className='mb-4'>
        We collect several different types of information for various purposes
        to provide and improve our Service to you.
      </p>

      <h3 className='mb-2 mt-4 text-xl font-semibold'>
        Types of Data Collected
      </h3>
      <ul className='mb-4 list-disc pl-6'>
        <li>
          <strong>Personal Data:</strong> While using our Service, we may ask
          you to provide us with certain personally identifiable information
          that can be used to contact or identify you ("Personal Data").
          Personally identifiable information may include, but is not limited
          to:
          <ul className='mt-2 list-disc pl-6'>
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Phone number</li>
            <li>Address, State, Province, ZIP/Postal code, City</li>
          </ul>
        </li>
        <li>
          <strong>Usage Data:</strong> We may also collect information on how
          the Service is accessed and used ("Usage Data"). This Usage Data may
          include information such as your computer's Internet Protocol address
          (e.g. IP address), browser type, browser version, the pages of our
          Service that you visit, the time and date of your visit, the time
          spent on those pages, unique device identifiers and other diagnostic
          data.
        </li>
      </ul>

      <h2 className='mb-4 mt-6 text-2xl font-semibold'>9. Contact Us</h2>
      <p className='mb-4'>
        If you have any questions about this Privacy Policy, please contact us:
      </p>
      <ul className='mb-4 list-disc pl-6'>
        <li>By email: [Your Contact Email]</li>
        <li>By visiting this page on our website: [Your Contact Page URL]</li>
      </ul>
    </div>
  )
}

export default PrivacyPolicy
