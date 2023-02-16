import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IBook } from '../types/book-id'
import { IBooks } from '../types/books'
import { ICategories } from '../types/categories'

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
        }),
        fetchCategories: build.query<ICategories[], void>({
            query: () => ({
                url: '/categories'
            })
        }),
    })
})

export const {useFetchAllBooksQuery, useFetchBookByIDQuery, useFetchCategoriesQuery} = booksApi