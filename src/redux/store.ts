import { configureStore } from '@reduxjs/toolkit'
import { booksApi } from './books-api'
import { menuSlice } from './slices/menu-slice'

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