import { configureStore } from '@reduxjs/toolkit'

import { menuSlice } from './slices/menu-slice'
import { booksApi } from './books-api'

export const store = configureStore({
  reducer: {
    menu: menuSlice.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch