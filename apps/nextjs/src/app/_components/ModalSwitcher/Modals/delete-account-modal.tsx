import React, { useState } from 'react'

import { t } from '@farmers/language/i18next'
import { z } from '@farmers/shared/common/zod'
import { Button } from '@farmers/ui/button'
import { Dialog, DialogContent } from '@farmers/ui/dialog'
import { Form, useForm } from '@farmers/ui/form'
import { Input } from '@farmers/ui/input'
import { toast } from '@farmers/ui/toast'

import signOut from '~/app/_actions/signout_server_action'
import Typography from '~/app/_components/typography'
import { ModalStore } from '~/store/modal'
import { api } from '~/trpc/react'

interface DeleteAccountModalProps {
  open: boolean
}

const DeleteAccountForm = z.object({
  email: z.string().refine((email) => email.includes('@')),
})

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  open: defaultOpen,
}) => {
  const { data: user } = api.user.getSelf.useQuery()
  const { mutateAsync: deleteSelf } = api.user.deleteSelf.useMutation()
  const [emailConfirmation, setEmailConfirmation] = useState<string>('')

  const deleteForm = useForm({
    schema: DeleteAccountForm,
    defaultValues: {
      email: '',
    },
  })

  const handleOnOpenChange = (isOpen: boolean) => {
    setEmailConfirmation('')
    ModalStore.set('open', isOpen)
  }

  const handleDelete = () => {
    if (emailConfirmation !== user?.email) {
      deleteForm.setError('email', {
        type: 'manual',
        message: t('DeleteAccountModal.Label.EmailConfirmationDoesNotMatch'),
      })
      return
    } else {
      void deleteSelf().then(() => {
        void signOut()
        window.location.reload()
      })
      console.log('Deleting account...')
      ModalStore.set('open', false)
    }
  }

  return (
    <Dialog open={defaultOpen} onOpenChange={handleOnOpenChange}>
      <DialogContent className='max-w-[95vw] p-4 lg:max-w-[556px] lg:p-6'>
        <Form {...deleteForm}>
          <form
            onSubmit={deleteForm.handleSubmit(handleDelete, (err) => {
              console.error(err)
              toast.error(
                t('DeleteAccountModal.Label.AnErrorOccurredPleaseTryAgain'),
              )
            })}
            className='space-y-4 lg:space-y-6'
          >
            <Typography type='h4' className='text-xl font-bold lg:text-2xl'>
              {t(
                'DeleteAccountModal.Label.AreYouSureYouWantToDeleteYourAccount',
              )}
            </Typography>
            <Typography
              type='small'
              className='text-sm text-gray-600 lg:text-base'
            >
              {t('DeleteAccountModal.Label.ThisActionCannotBeUndone')}.
            </Typography>
            <div>
              <Typography
                type='small'
                className='mb-2 text-sm font-semibold lg:text-base'
              >
                {t('DeleteAccountModal.Label.TypeInYourEmail')} ({user?.email}){' '}
                {t('DeleteAccountModal.Label.ToConfirm')}.
              </Typography>
              <Input
                type='email'
                value={emailConfirmation}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmailConfirmation(e.target.value)
                }
                placeholder={t('DeleteAccountModal.Label.EnterEmail')}
                className='mt-2 w-full px-3 py-2 text-sm lg:text-base'
              />
            </div>
            <div className='w-full text-center text-sm font-thin text-red-500 lg:text-base'>
              {deleteForm.formState.errors.email?.message}
            </div>
            <div className='space-y-2 lg:space-y-3'>
              <Button
                type='button'
                onClick={() => ModalStore.set('open', false)}
                className='w-full bg-gray-200 py-2 text-sm text-black hover:bg-gray-300 lg:py-3 lg:text-base'
              >
                <Typography type='small'>
                  {t('DeleteAccountModal.Button.Cancel')}
                </Typography>
              </Button>
              <Button
                onClick={handleDelete}
                className='w-full bg-red-500 py-2 text-sm text-white hover:bg-red-600 lg:py-3 lg:text-base'
              >
                <Typography type='small'>
                  {t('DeleteAccountModal.Button.PermanentlyDeleteAccount')}
                </Typography>
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteAccountModal
