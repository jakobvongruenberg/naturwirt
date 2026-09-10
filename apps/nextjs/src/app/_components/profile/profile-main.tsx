'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Bell, PlusCircle, User } from 'lucide-react'

import { t } from '@farmers/language/i18next'
import { routes } from '@farmers/shared/app/constants'

import Typography from '~/app/_components/typography'
import { ACCOUNT_DELETE, ModalStore } from '~/store/modal'
import { api } from '~/trpc/react'

const Profile: React.FC = () => {
  const { data: user } = api.user.getSelf.useQuery()

  const handleDeleteAccount = () => {
    ModalStore.update({ open: true, type: ACCOUNT_DELETE })
  }

  return (
    <div className='mx-auto w-full max-w-2xl p-4'>
      <section className='mb-8'>
        <Typography type='h3' className='mb-4'>
          {t('Profile.Details.Label.MyAccount')}
        </Typography>
        <div className='space-y-2'>
          <Link
            className='flex w-full items-center justify-between rounded-lg bg-white p-3 hover:bg-gray-100'
            href={routes.main.profile.details}
          >
            <div className='flex items-center'>
              <User size={40} className='mr-3' />
              <div>
                <Typography type='p' className='text-left font-semibold'>
                  {t('Profile.Details.Label.MyProfile')}
                </Typography>
                <Typography type='small' className='text-gray-500'>
                  {t('Profile.Details.Label.PersonalDetails')}
                </Typography>
              </div>
            </div>
            <ArrowRight size={30} />
          </Link>
          <Link
            className='flex w-full items-center justify-between rounded-lg bg-white p-3 hover:bg-gray-100'
            href={routes.main.profile.notifications}
          >
            <div className='flex items-center'>
              <Bell size={40} className='mr-3' />
              <div>
                <Typography type='p' className='text-left font-semibold'>
                  {t('Profile.Notification.Label.Notifications')}
                </Typography>
                <Typography type='small' className='text-gray-500'>
                  {t('Profile.Details.Label.Notifications')}
                </Typography>
              </div>
            </div>
            <ArrowRight size={30} />
          </Link>
        </div>
      </section>

      {/* My farms section */}
      <section>
        <Typography type='h3' className='mb-4'>
          {t('Profile.Details.Label.MyFarms')}
        </Typography>
        <div className='mb-4 flex flex-col gap-2'>
          {user?.farms.map((farm) => (
            <Link
              key={farm.id}
              className='flex items-center justify-between rounded-lg bg-white p-3 hover:bg-gray-100'
              href={routes.main.profile.farm(farm.id)}
            >
              <div>
                <Typography type='p' className='font-semibold'>
                  {farm.name}
                </Typography>
                <Typography type='small' className='text-gray-500'>
                  {farm.location}
                </Typography>
              </div>
              <button>
                <ArrowRight size={30} />
              </button>
            </Link>
          ))}
          {user?.farms.length ? null : (
            <Link
              className='flex items-center justify-between rounded-lg bg-white p-3 hover:bg-gray-100'
              href={routes.main.onboarding}
            >
              <div className='flex flex-row items-center gap-3'>
                <PlusCircle size={40} />
                <div>
                  <Typography type='p' className='text-left font-semibold'>
                    {user?.farms.length
                      ? t('Profile.Farm.Label.AddAnotherFarm')
                      : t('Profile.Farm.Label.CreateFarm')}
                  </Typography>
                  {user?.farms.length ? null : (
                    <Typography type='small' className='text-gray-500'>
                      {t('Profile.Details.Label.YouDontHaveAnyFarms')}
                    </Typography>
                  )}
                </div>
              </div>
              <button>
                <ArrowRight size={30} />
              </button>
            </Link>
          )}
        </div>
      </section>

      {/* Delete account link */}
      <div className='mt-8 pb-16'>
        <button onClick={handleDeleteAccount} className='text-red-500'>
          <Typography type='small' className='text-red-600 underline'>
            {t('Profile.Details.Label.DeleteAccount')}
          </Typography>
        </button>
      </div>
    </div>
  )
}

export default Profile
