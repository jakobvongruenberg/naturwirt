import type { StoreApi, UseBoundStore } from 'zustand'
import type { PersistOptions, StateStorage } from 'zustand/middleware'
import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'
import pick from 'lodash/pick'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type {
  DeepPartial,
  FlattenObjectKeys,
  GetFieldType,
} from '@farmers/shared/common/types'
import { getValue, setValue } from '@farmers/shared/common/functions'

const APP_STATE_NAME = 'farmers_store'

type Write<T, U> = Omit<T, keyof U> & U
type PersistListener<S> = (state: S) => void

interface StorePersist<S, Ps> {
  persist: {
    setOptions: (options: Partial<PersistOptions<S, Ps>>) => void
    clearStorage: () => void
    rehydrate: () => Promise<void> | void
    hasHydrated: () => boolean
    onHydrate: (fn: PersistListener<S>) => () => void
    onFinishHydration: (fn: PersistListener<S>) => () => void
    getOptions: () => Partial<PersistOptions<S, Ps>>
  }
}

export class ZustandStore<T extends Record<string, unknown>> {
  useBoundStore: UseBoundStore<Write<StoreApi<T>, StorePersist<T, T>>>
  constructor(props: {
    initialState: T
    persistOptions: {
      name: string
      persistedKeys?: (keyof T)[]
      version: number
      getStorage: () => StateStorage
    }
  }) {
    this.useBoundStore = create<T>()(
      persist(() => props.initialState, {
        name: props.persistOptions.name,
        storage: createJSONStorage<T>(props.persistOptions.getStorage),
        version: props.persistOptions.version ?? 1,
        migrate: (state) => {
          console.log('migrating state', state)
          return Promise.resolve(props.initialState)
        },
        partialize: (state) =>
          pick(state, props.persistOptions.persistedKeys ?? []) as T,
        // This will hold the app at the splash screen until the hydration is done.
        onRehydrateStorage: (state) => {
          console.log(`${APP_STATE_NAME} store hydration starts`, state)
          return (hydratedState, error) => {
            if (error) {
              console.log(`${APP_STATE_NAME} store hydration error`, error)
            } else {
              const hydratedStateString = JSON.stringify(hydratedState)
              console.log(
                `${APP_STATE_NAME} store hydration finished`,
                hydratedStateString.length > 40
                  ? hydratedStateString.slice(0, 40)
                  : hydratedStateString,
              )
            }
          }
        },
      }),
    )
  }

  get<U extends FlattenObjectKeys<T>>(key: U): GetFieldType<T, U> {
    return getValue(this.useBoundStore.getState(), key)
  }

  update(partial: DeepPartial<T>) {
    this.useBoundStore.setState((state) => {
      return cloneDeep(merge(state, partial))
    })
  }

  set<U extends FlattenObjectKeys<T>, V extends GetFieldType<T, U>>(
    key: U,
    value: V,
  ) {
    this.useBoundStore.setState((state) => {
      const newState = setValue(state, key, value)
      return cloneDeep(newState)
    })
  }

  use<U>(selector: (state: T) => U) {
    return this.useBoundStore(selector)
  }
  setField<K extends keyof T>(key: K, value: T[K]) {
    this.useBoundStore.setState((state) => ({
      ...state,
      [key]: value,
    }))
  }
}
