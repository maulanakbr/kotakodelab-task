import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import type { Persistor } from 'redux-persist/es/types'
import storage from 'redux-persist/lib/storage'

import { isProduction } from '@/config/env'

import rootReducers from './root-reducers'
import rootServices from './root-services'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authSlice'],
}

const combinedReducers = combineReducers({
  ...rootReducers,
  ...rootServices.reducers,
})

const persistedReducers = persistReducer(persistConfig, combinedReducers)

export const makeStore = () =>
  configureStore({
    reducer: persistedReducers,
    devTools: !isProduction,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(rootServices.middlewares),
  })

const store = makeStore()
export const persistor: Persistor = persistStore(store)

export type Store = typeof store
export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch
export type Thunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export const wrapper = createWrapper<Store>(makeStore)
