import { t } from '@farmers/language/i18next'

import Search from '~/app/_components/Browse/Search'
import PopularMeasures from '~/app/_components/home-page/popular-measures'

export default function HomePage() {
  return (
    <>
      <Search />
      <section className='w-full px-4 lg:px-0'>
        <div className='mx-auto flex w-full max-w-[1040px] flex-col items-center justify-center'>
          <h2 className='w-full py-[20px] text-left text-[24px] leading-[28px] lg:py-[40px] lg:text-[32px] lg:leading-[36px]'>
            {t('HomePage.PopularMeasures')}
          </h2>
          <PopularMeasures />
        </div>
      </section>
    </>
  )
}
