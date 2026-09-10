'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import isNumber from 'lodash/isNumber'

import { t } from '@farmers/language/i18next'
import { routes } from '@farmers/shared/app/constants'
import { Button } from '@farmers/ui/button'

import MeasureCard from '~/app/_components/measure-card'
import { api } from '~/trpc/react'

const TAB_IDS = {
  SHORTLIST: 'SHORTLIST',
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED',
}

const MyMeasuresPage = () => {
  const [activeTab, setActiveTab] = useState(TAB_IDS.SHORTLIST)
  const router = useRouter()
  const { data, isLoading: isLoadingUserMeasures } =
    api.user.getUserMeasures.useQuery()
  //TODO: Refactor everything to remove the difference between Shortlist and shortlisted
  const filteredMeasures = useMemo(() => {
    return (
      data?.userMeasures.filter((measure) => {
        switch (activeTab) {
          case TAB_IDS.SHORTLIST:
            return measure.status === 'shortlisted'
          case TAB_IDS.ACTIVE:
            return measure.status === 'active'
          case TAB_IDS.ARCHIVED:
            return measure.status === 'archived'
          default:
            return false
        }
      }) ?? []
    )
  }, [activeTab, data?.userMeasures])

  const tabs = useMemo(() => {
    return [
      {
        id: TAB_IDS.SHORTLIST,
        name: t('Measure.Tab.Shortlist'),
        count: data?.userMeasures.filter((m) => m.status === 'shortlisted')
          .length,
      },
      {
        id: TAB_IDS.ACTIVE,
        name: t('Measure.Tab.Active'),
        count: data?.userMeasures.filter((m) => m.status === 'active').length,
      },
      {
        id: TAB_IDS.ARCHIVED,
        name: t('Measure.Tab.Archived'),
        count: data?.userMeasures.filter((m) => m.status === 'archived').length,
      },
    ]
  }, [data?.userMeasures])

  const renderZeroState = () => {
    let message = ''
    let actionMessage = ''
    let onActionClick = () => {
      console.log('clicked')
    }

    switch (activeTab) {
      case TAB_IDS.SHORTLIST:
        message = t('Measure.Tab.Message.AddShortlist')
        actionMessage = t('Measure.Tab.Action.VisitBrowse')
        onActionClick = () => router.push(routes.main.browse)
        break
      case TAB_IDS.ACTIVE:
        message = t('Measure.Tab.Message.NoActiveMeasures')
        actionMessage = t('Measure.Tab.Action.AddFromShortlist')
        onActionClick = () => setActiveTab(TAB_IDS.SHORTLIST)
        break
      case TAB_IDS.ARCHIVED:
        message = t('Measure.Tab.Message.NoArchivedMeasures')
        actionMessage = t('Measure.Tab.Action.ViewActiveMeasures')
        onActionClick = () => setActiveTab(TAB_IDS.ACTIVE)
        break
    }

    return (
      <div className='flex flex-col items-center justify-center p-4 text-center lg:p-8'>
        <p className='mb-4 text-gray-600'>{message}</p>
        <Button variant='outline' onClick={onActionClick}>
          {actionMessage}
        </Button>
      </div>
    )
  }

  return (
    <div className='container mx-auto mb-12 px-4 py-4 lg:py-8'>
      <h1 className='mb-4 text-2xl font-bold lg:mb-6 lg:text-[60px]'>
        {t('HomePage.MyMeasures')}
      </h1>
      <div className='mb-4 flex flex-nowrap overflow-x-auto lg:mb-6 lg:flex-wrap lg:space-x-4'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`mb-2 mr-2 whitespace-nowrap px-3 py-2 text-sm lg:mb-0 lg:mr-0 lg:px-4 lg:text-base ${
              activeTab === tab.id
                ? 'border-b-2 border-gray-800 font-semibold'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {`${tab.name} ${isNumber(tab.count) ? `(${tab.count})` : ''}`}
          </button>
        ))}
      </div>
      {isLoadingUserMeasures ? (
        <p className='text-center'>{t('HomePage.Loading')}</p>
      ) : filteredMeasures.length > 0 ? (
        <div className='flex flex-row flex-wrap justify-center gap-4'>
          {[...filteredMeasures].map((measure) => (
            <MeasureCard key={measure.id} measure={measure} />
          ))}
        </div>
      ) : (
        renderZeroState()
      )}
    </div>
  )
}

export default MyMeasuresPage
