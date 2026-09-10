'use client'

import type { ChangeEvent } from 'react'
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

import { t } from '@farmers/language/i18next'
import { Input } from '@farmers/ui/input'

import { AUTH, ModalStore } from '~/store/modal'
import { api } from '~/trpc/react'

interface AddPrivateNoteParams {
  measureId: number
}

// Debounce function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debounce = <F extends (...args: any[]) => void>(
  func: F,
  wait: number,
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<F>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

const AddPrivateNote: React.FC<AddPrivateNoteParams> = ({ measureId }) => {
  const { data: session } = useSession()
  const { data: userMeasuresData } = api.user.getUserMeasures.useQuery()
  const privateNotes = userMeasuresData?.userMeasures?.find(
    (m) => m.id === measureId,
  )?.privateNotes
  const utils = api.useUtils()
  const [note, setNote] = useState<string | undefined | null>(undefined)
  const { mutateAsync: upsertUserMeasure } =
    api.user.upsertUserMeasure.useMutation()

  useEffect(() => {
    setNote(privateNotes)
  }, [privateNotes])

  // Debounced update function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdate = useCallback(
    debounce((debouncedNote: string | null) => {
      console.log('Updating private note...')
      void upsertUserMeasure({ measureId, privateNotes: debouncedNote }).then(
        () => {
          void utils.user.getUserMeasures.invalidate()
        },
      )
    }, 500),
    [],
  )

  // Effect to trigger the debounced update
  useEffect(() => {
    if (note !== undefined) {
      debouncedUpdate(note)
    }
  }, [note, debouncedUpdate])

  // Handle input change
  const handleUpdateNote = (e: ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value)
  }

  return (
    <div className='relative'>
      <Input
        className='h-[60px] p-3 pl-14 text-base lg:h-[72px] lg:p-4 lg:pl-16 lg:text-[20px]'
        placeholder={t('Browse.Label.PrivateNote')}
        value={note ?? ''}
        onChange={handleUpdateNote}
        onFocus={() => {
          if (!session?.user) {
            ModalStore.update({
              type: AUTH,
              open: true,
            })
          }
        }}
      />
      <div className='absolute left-0 top-0 flex h-[60px] items-center pl-3 lg:h-[72px] lg:pl-4'>
        <Image
          src={'/images/icons/note.svg'}
          alt='note'
          width={32}
          height={32}
          className='lg:h-10 lg:w-10'
        />
      </div>
    </div>
  )
}

export default AddPrivateNote
