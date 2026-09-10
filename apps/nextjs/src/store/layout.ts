import { ZustandStore } from '@farmers/shared/common/classes'

export const uiStore = new ZustandStore({
  initialState: {
    footerHeight: 0,
    headerHeight: 0,
  },
  persistOptions: {
    name: 'farmers-layout',
    persistedKeys: [],
    version: 1,
    getStorage: () => localStorage,
  },
})
