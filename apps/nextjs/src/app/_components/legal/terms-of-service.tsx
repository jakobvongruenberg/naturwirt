import React from 'react'

import Typography from '~/app/_components/typography'

const TermsOfService: React.FC = () => {
  return (
    // TODO: Add real terms of service content
    <div className='container mx-auto max-w-3xl px-4 pb-24 pt-8'>
      <Typography type='h1' className='mb-6'>
        Terms of Service
      </Typography>
      <div className='text-2xl text-red-600'>
        This is generic terms of service written by ChatGPT, needs to be updated
      </div>
      <p className='mb-4'>Last updated: [Current Date]</p>

      <h2 className='mb-4 mt-6 text-2xl font-semibold'>
        1. Acceptance of Terms
      </h2>
      <p className='mb-4'>
        By accessing and using this website (our "Service"), you agree to be
        bound by these Terms of Service ("Terms"). If you disagree with any part
        of the terms, you may not access the Service.
      </p>

      <h2 className='mb-4 mt-6 text-2xl font-semibold'>2. Changes to Terms</h2>
      <p className='mb-4'>
        We reserve the right to modify or replace these Terms at any time. If a
        revision is material, we will try to provide at least 30 days' notice
        prior to any new terms taking effect.
      </p>

      <h2 className='mb-4 mt-6 text-2xl font-semibold'>
        3. Access to the Service
      </h2>
      <p className='mb-4'>
        We reserve the right to withdraw or amend our Service, and any service
        or material we provide via the Service, in our sole discretion without
        notice. We will not be liable if, for any reason, all or any part of the
        Service is unavailable at any time or for any period.
      </p>

      <h2 className='mb-4 mt-6 text-2xl font-semibold'>4. User Accounts</h2>
      <p className='mb-4'>
        When you create an account with us, you must provide information that is
        accurate, complete, and current at all times. Failure to do so
        constitutes a breach of the Terms, which may result in immediate
        termination of your account on our Service.
      </p>

      {/* Add more sections here */}

      <h2 className='mb-4 mt-6 text-2xl font-semibold'>10. Contact Us</h2>
      <p className='mb-4'>
        If you have any questions about these Terms, please contact us at [Your
        Contact Information].
      </p>
    </div>
  )
}

export default TermsOfService
