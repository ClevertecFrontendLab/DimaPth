import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const booksApi = createApi({
    reducerPath: 'books',
    baseQuery: fetchBaseQuery({baseUrl: 'https://strapi.cleverland.by/api'}),
    endpoints: (build) => ({
        fetchBooks: build.query({
            query: () => ({
                url: '/books'
            })
        })
    })
})