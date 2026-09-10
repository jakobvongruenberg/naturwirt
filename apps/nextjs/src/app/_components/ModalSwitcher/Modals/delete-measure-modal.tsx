import React from 'react'
import isNumber from 'lodash/isNumber'

import { t } from '@farmers/language/i18next'
import { Button } from '@farmers/ui/button'
import { Dialog, DialogContent } from '@farmers/ui/dialog'
import { toast } from '@farmers/ui/toast'

import Typography from '~/app/_components/typography'
import { ModalStore } from '~/store/modal'
import { api } from '~/trpc/react'

interface DeleteMeasureModalProps {
  open: boolean
  options: {
    deleteMeasureId?: number
  }
}

const DeleteMeasureModal: React.FC<DeleteMeasureModalProps> = ({
  open: defaultOpen,
  options: { deleteMeasureId },
}) => {
  const { mutateAsync: deleteMeasure } = api.measure.delete.useMutation()
  const utils = api.useUtils()

  const handleOnOpenChange = (isOpen: boolean) => {
    ModalStore.set('open', isOpen)
  }

  const handleDelete = () => {
    const parsedDeleteMeasureId = deleteMeasureId
    if (isNumber(parsedDeleteMeasureId)) {
      void deleteMeasure({ id: parsedDeleteMeasureId }).then(() => {
        ModalStore.set('open', false)
        toast.success(t('DeleteMeasureModal.Label.MeasureDeletedSuccessfully'))
        void utils.measure.invalidate()
      })
    } else {
      console.error('Invalid measure ID')
      toast.error(t('DeleteMeasureModal.Label.AnErrorOccuredPleaseTryAgain'))
    }
  }

  return (
    <Dialog open={defaultOpen} onOpenChange={handleOnOpenChange}>
      <DialogContent className='max-w-[95vw] p-4 lg:max-w-[556px] lg:p-6'>
        <div className='space-y-4 lg:space-y-6'>
          <Typography type='h4' className='text-xl font-bold lg:text-2xl'>
            {t('DeleteMeasureModal.Label.AreYouSureYouWantToDeleteThisMeasure')}
          </Typography>
          <Typography
            type='small'
            className='text-sm text-gray-600 lg:text-base'
          >
            {t('DeleteMeasureModal.Label.ThisActionCannotBeUndone')}
          </Typography>
          <div className='space-y-2 pt-2 lg:space-y-3 lg:pt-4'>
            <Button
              onClick={() => ModalStore.set('open', false)}
              className='w-full bg-gray-200 py-2 text-sm text-black hover:bg-gray-300 lg:py-3 lg:text-base'
            >
              {t('DeleteMeasureModal.Button.Cancel')}
            </Button>
            <Button
              onClick={handleDelete}
              className='w-full bg-red-500 py-2 text-sm text-white hover:bg-red-600 lg:py-3 lg:text-base'
            >
              {t('DeleteMeasureModal.Button.PermanentlyDeleteMeasure')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteMeasureModal
