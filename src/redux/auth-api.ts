import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ISignIn, ISignUp, IUser } from '../types/user';

export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({baseUrl: 'https://strapi.cleverland.by/api/auth/'}),
    endpoints: (build) => ({
        signUp: build.mutation<IUser, ISignUp>({
            query: (body) => ({
                url: 'local/register',
                method: 'POST',
                body,
            })
        }),
        signIn: build.mutation<IUser, ISignIn>({
            query: (body) => ({
                url: '/local',
                method: 'POST',
                body
            })
        })
    })
})

export const {useSignUpMutation, useSignInMutation} = authApi;