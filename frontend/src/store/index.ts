import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist/es/constants'
import storage from 'redux-persist/lib/storage'

import { apiSlice } from '@/store/services/api'

import uiReducer from './features/uiSlice'
import userReducer from './features/userSlice'

const persistConfig = {
  key: 'user',
  storage
}

const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    ui: uiReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(apiSlice.middleware)
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
