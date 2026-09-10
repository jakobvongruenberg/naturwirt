import Image from 'next/image'
import { useSession } from 'next-auth/react'

import type { MeasureSelectSchemaType, Status } from '@farmers/validators'
import { t } from '@farmers/language/i18next'
import { Button } from '@farmers/ui/button'

import { AUTH, ModalStore } from '~/store/modal'
import { api } from '~/trpc/react'

export const ActionButton = ({
  status,
  id,
}: Pick<MeasureSelectSchemaType, 'id'> & { status: Status }) => {
  const { data: session } = useSession()
  const utils = api.useUtils()
  const { mutateAsync: updateMeasure } =
    api.user.upsertUserMeasure.useMutation()
  const isActive = status === 'active'
  const isArchived = status === 'archived'
  const isAddedToShortlist = status === 'shortlisted'

  const setMeasure = (status: Status) => () => {
    if (!session) {
      ModalStore.update({ open: true, type: AUTH, options: { type: 'login' } })
      return
    }

    void updateMeasure({
      measureId: id,
      status,
    }).then(() => {
      void utils.user.getUserMeasures.invalidate()
    })
  }

  return isArchived ? null : isActive ? (
    <Button
      variant='outline'
      className='flex h-[57px] w-full gap-2.5 border-black py-3'
      onClick={setMeasure('archived')}
    >
      <Image
        src={'/images/icons/archive-empty-box.svg'}
        alt={t('Measure.Button.Archive')}
        width={32}
        height={32}
      />
      <span className='text-[22px] font-semibold'>
        {t('Measure.Button.Archive')}
      </span>
    </Button>
  ) : isAddedToShortlist ? (
    <Button
      variant='outline'
      className='flex h-[57px] w-full gap-2.5 border-black py-3'
      onClick={setMeasure(null)}
    >
      <Image
        src={'/images/icons/plus-filled.svg'}
        alt={t('Measure.Button.AddedToShortlist')}
        width={32}
        height={32}
      />
      <span className='text-[22px] font-semibold'>
        {t('Measure.Button.AddedToShortlist')}
      </span>
    </Button>
  ) : (
    <Button
      variant='outline'
      className='flex h-[57px] w-full gap-2.5 border-black py-3'
      onClick={setMeasure('shortlisted')}
    >
      <Image
        src={'/images/icons/plus-unfilled.svg'}
        alt={t('Measure.Button.AddToShortlist')}
        width={32}
        height={32}
      />
      <span className='text-[22px] font-semibold'>
        {t('Measure.Button.AddToShortlist')}
      </span>
    </Button>
  )
}
