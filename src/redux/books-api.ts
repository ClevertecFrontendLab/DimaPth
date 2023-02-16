import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IBook } from '../types/book-id'
import { IBooks } from '../types/books'

export const booksApi = createApi({
    reducerPath: 'books',
    baseQuery: fetchBaseQuery({baseUrl: 'https://strapi.cleverland.by/api'}),
    endpoints: (build) => ({
        fetchAllBooks: build.query<IBooks[], void>({
            query: () => ({
                url: '/books'
            })
        }),
        fetchBookByID: build.query<IBook, string | undefined>({
            query: (id) => ({
                url: `/books/${id}`,
            })
        })
    })
})

export const {useFetchAllBooksQuery, useFetchBookByIDQuery} = booksApi