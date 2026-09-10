import Image from 'next/image'
import { useSession } from 'next-auth/react'

import type { MeasureSelectSchemaType, Status } from '@farmers/validators'
import { t } from '@farmers/language/i18next'
import { cn } from '@farmers/ui'
import { Button } from '@farmers/ui/button'

import { AUTH, ModalStore } from '~/store/modal'
import { api } from '~/trpc/react'

export const ActivityButton = ({
  status,
  id,
}: Pick<MeasureSelectSchemaType, 'id'> & { status: Status }) => {
  const { data: session } = useSession()
  const utils = api.useUtils()
  const { mutateAsync: updateMeasure } =
    api.user.upsertUserMeasure.useMutation()

  const isActive = status === 'active'

  const handleSetMeasure = () => {
    if (!session) {
      ModalStore.update({ open: true, type: AUTH, options: { type: 'login' } })
      return
    }

    void updateMeasure({
      measureId: id,
      status: 'active',
    }).then(() => {
      void utils.user.getUserMeasures.invalidate()
    })
  }

  return isActive ? null : (
    <Button
      variant='primary'
      className={cn('flex h-[57px] w-full gap-2.5 border-[1px] py-3')}
      onClick={handleSetMeasure}
    >
      <span className={cn('text-[22px] font-semibold')}>
        {t('Measure.Label.MoveToActive')}
      </span>
      <Image
        src={'/images/icons/circled-right.svg'}
        alt={t('Measure.Label.MoveToActive')}
        width={32}
        height={32}
      />
    </Button>
  )
}
