import React from 'react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api/'}),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => 'Authentication', 
            providesTags: ['User'],
        }),

        getUserById: builder.query({
            query: (id) => `Authentication/${id}`,  
        }),

        registerUser: builder.mutation({
            query: (newUser) => ({
                url: 'Authentication/Register',
                method: 'POST',
                body: newUser,
            }),
            invalidatesTags: ['User'],
        }),

        loginUser: builder.mutation({
            query: (user) =>({
                url: "Authentication/Login",
                method: "POST",
                body: user,
            }),
        }),

        updateUser: builder.mutation({
            query: (userUpdated) =>({
                url: 'Authentication',
                method: 'PUT',
                body: userUpdated,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
} = usersApi;
   