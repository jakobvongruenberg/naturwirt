'use client'

import AuthModal from '~/app/_components/ModalSwitcher/Modals/AuthModal'
import DeleteAccountModal from '~/app/_components/ModalSwitcher/Modals/delete-account-modal'
import { ACCOUNT_DELETE, AUTH, MEASURE_DELETE, ModalStore } from '~/store/modal'
import DeleteMeasureModal from './Modals/delete-measure-modal'

export default function ModalSwitcher() {
  const open = ModalStore.use((s) => s.open)
  const type = ModalStore.use((s) => s.type)
  const options = ModalStore.use((s) => s.options)

  switch (type) {
    case AUTH:
      return <AuthModal open={open} options={options} />
    case ACCOUNT_DELETE:
      return <DeleteAccountModal open={open} />
    case MEASURE_DELETE:
      return <DeleteMeasureModal open={open} options={options} />
    default:
      return null
  }
}
