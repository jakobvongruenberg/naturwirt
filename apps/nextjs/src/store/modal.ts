import type { FC } from 'react'

import { ZustandStore } from '@farmers/shared/common/classes'

export const AUTH = 'AUTH'
export const ACCOUNT_DELETE = 'ACCOUNT_DELETE'
export const MEASURE_DELETE = 'MEASURE_DELETE'
const ModalTypes = [AUTH, ACCOUNT_DELETE, MEASURE_DELETE]

export type ModalType = (typeof ModalTypes)[number]

export interface Options {
  deleteMeasureId?: number
  type?: 'login' | 'signup'
}

export const ModalStore = new ZustandStore({
  initialState: {
    open: false as boolean,
    type: '' as ModalType,
    content: '' as unknown as FC,
    options: {} as Options,
  },
  persistOptions: {
    name: 'farmers-modal',
    persistedKeys: [],
    version: 1,
    getStorage: () => localStorage,
  },
})
