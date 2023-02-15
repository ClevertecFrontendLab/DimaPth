import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IBooks } from '../types/books'

export const booksApi = createApi({
    reducerPath: 'books',
    baseQuery: fetchBaseQuery({baseUrl: 'https://strapi.cleverland.by/api'}),
    endpoints: (build) => ({
        fetchAllBooks: build.query<IBooks[], void>({
            query: () => ({
                url: '/books'
            })
        })
    })
})

export const {useFetchAllBooksQuery} = booksApi