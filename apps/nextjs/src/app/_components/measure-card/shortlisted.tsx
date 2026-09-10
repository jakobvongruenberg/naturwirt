import { useMemo } from 'react'
import Image from 'next/image'
import { debounce } from 'lodash'
import { useSession } from 'next-auth/react'

import type { Status } from '@farmers/validators'
import { cn } from '@farmers/ui'

import { AUTH, ModalStore } from '~/store/modal'
import { api } from '~/trpc/react'

interface ShortlistedProps {
  status: Status | '' | null
  setStatus: (status: Status | '' | null) => void
  measureId: number
}

export const Shortlisted = ({
  status,
  setStatus,
  measureId,
}: ShortlistedProps) => {
  const { data: session } = useSession()
  const { mutateAsync: upsertUserMeasure } =
    api.user.upsertUserMeasure.useMutation()
  const utils = api.useUtils()

  const debouncedUpsert = useMemo(
    () =>
      debounce((measureId: number, status: 'shortlisted' | null) => {
        void upsertUserMeasure({
          measureId,
          status,
        }).then(() => {
          void utils.user.getUserMeasures.invalidate()
        })
      }, 1000),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- this is working without dependencies
    [],
  )

  const shortlistedStatus = status === 'shortlisted'

  return (
    <button
      key={session?.user?.id}
      onClick={(e) => {
        e.preventDefault()
        if (!session?.user) {
          ModalStore.update({ open: true, type: AUTH })
        } else {
          const newStatus = shortlistedStatus ? null : 'shortlisted'
          setStatus(newStatus)
          debouncedUpsert(measureId, newStatus)
        }
      }}
      className={cn(
        'flex size-[38px] flex-shrink-0 items-center justify-center rounded-md border-2 bg-white hover:bg-accent',
        {
          'border-[#718bb5]': shortlistedStatus,
          'border-[#9d9d9d]': !shortlistedStatus,
        },
      )}
    >
      {shortlistedStatus ? (
        <Image
          src={'/images/icons/shortlisted-filled.svg'}
          height={28}
          width={28}
          alt='Shortlisted'
        />
      ) : (
        <Image
          src={'/images/icons/shortlisted-unfilled.svg'}
          height={28}
          width={28}
          alt='Default'
        />
      )}
    </button>
  )
}
