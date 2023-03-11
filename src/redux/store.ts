import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, 
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { menuSlice } from './slices/menu-slice'
import { booksApi } from './books-api'
import { authApi } from './auth-api'
import { userSlice } from './slices/user-slice'

const rootReducer = combineReducers({
  menu: menuSlice.reducer,
  user: userSlice.reducer,
  [booksApi.reducerPath]: booksApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [booksApi.reducerPath, authApi.reducerPath]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(booksApi.middleware, authApi.middleware),
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch