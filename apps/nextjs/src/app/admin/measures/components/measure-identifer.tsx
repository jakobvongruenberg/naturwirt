'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { useWatch } from 'react-hook-form'

import { t } from '@farmers/language/i18next'
import { makeStringGermanUrlSafe } from '@farmers/shared/app/functions'
import { Button } from '@farmers/ui/button'
import { toast } from '@farmers/ui/toast'

import Typography from '~/app/_components/typography'
import { useMeasureCreateFormContext } from '~/store/useFormState'

const MeasureIdentifer = () => {
  const { setValue, control } = useMeasureCreateFormContext()
  const programTitle = useWatch({ name: 'programTitle', control })
  const measureTitleShort = useWatch({ name: 'measureTitleShort', control })
  const value = makeStringGermanUrlSafe(
    `${programTitle ?? ''} ${measureTitleShort ?? ''} ${new Date().getFullYear()}`,
  )

  useEffect(() => {
    setValue('measureIdentifier', value)
  }, [value, setValue])

  return (
    <div className='py-8'>
      <Typography type='large'>
        {t('Measure.Label.MeasureIdentifier')}
      </Typography>
      <Typography type='small' className='mt-2 flex items-center text-[18px]'>
        <span className='mr-4'>
          {programTitle && measureTitleShort ? value : ''}
        </span>
        <Button
          variant='outline'
          type='button'
          disabled={!programTitle && !measureTitleShort}
          onClick={() => {
            void navigator.clipboard
              .writeText(value)
              .then(() => {
                toast.message(t('Navbar.Buttons.Copied'))
              })
              .catch(() => {
                toast.message(t('UI.Toast.Error'))
              })
          }}
        >
          <Image
            src={'/images/icons/link.svg'}
            alt={t('Measure.Button.Copy')}
            width={24}
            height={24}
            className='mr-1'
          />
          {t('Measure.Button.CopyIdToClipBoard')}
        </Button>
      </Typography>
    </div>
  )
}

export default MeasureIdentifer
