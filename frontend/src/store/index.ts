import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './features/userSlice'

export const store = configureStore({
  reducer: {
    user: persistReducer({ key: 'user', storage }, userReducer)
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
