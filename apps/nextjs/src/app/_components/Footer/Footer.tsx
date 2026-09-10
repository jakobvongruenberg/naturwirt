/* eslint-disable @next/next/no-img-element */
import { t } from '@farmers/language/i18next'
import { routes } from '@farmers/shared/app/constants'

export const Footer = () => {
  return (
    <div className='absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center gap-6 bg-[#1B3765] px-4 py-8 text-white lg:px-0 lg:py-16'>
      <div className='text-center text-2xl'>
        {t('Footer.Label.ThankYouPartners')}
      </div>
      <div className='flex items-center justify-center gap-12'>
        <img
          src={'/images/footer/footer-1.svg'}
          alt='UDF'
          className='h-auto w-[128px]'
        />
        <img
          src={'/images/footer/project-together-logo.png'}
          alt='project together'
          className='h-auto w-[128px]'
        />
        <img
          src={'/images/footer/footer-2.svg'}
          alt='Farmers Insurance'
          className='h-auto w-[132px]'
        />
      </div>
      <div className='text-center text-2xl'>{t('Footer.Label.PoweredBy')}</div>
      <div className='flex items-center justify-center gap-12'>
        <img
          src={'/images/footer/glwi.png'}
          alt='UDF'
          className='h-auto w-[128px]'
        />
      </div>
      <div className='flex flex-col items-center text-xs lg:flex-row'>
        <a href={routes.main.terms} className='mb-2 hover:underline lg:mb-0'>
          {t('Footer.Label.TermsOfService')}
        </a>
        <span className='mx-2 hidden lg:inline'>•</span>
        <a href={routes.main.privacy} className='hover:underline'>
          {t('Footer.Label.PrivacyPolicy')}
        </a>
      </div>
    </div>
  )
}
