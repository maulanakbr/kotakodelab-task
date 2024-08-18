import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { Auth, AuthRequest, AuthResponse, LogoutRequest } from '@/types/auth'
import { apiBaseQuery } from '@/utils/api'

const initialState: Record<keyof Auth['ownerUser'], Auth['ownerUser'][keyof Auth['ownerUser']] | undefined> = {
  id: undefined,
  email: undefined,
  firstName: undefined,
  lastName: undefined,
  role: undefined,
  username: undefined,
  companyId: undefined,
}

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: apiBaseQuery,
  tagTypes: ['Auth'],
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 259200, // 3 days
  endpoints: (builder) => ({
    postLogin: builder.mutation<AuthResponse, AuthRequest>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),
    postLogout: builder.mutation<AuthResponse, LogoutRequest>({
      query: (data) => ({
        url: '/auth/logout',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
})

const slice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(authApi.endpoints.postLogin.matchFulfilled), (state, { payload }) => {
      const { attributes } = payload.data[0]

      state.id = attributes.ownerUser.id
      state.email = attributes.ownerUser.email
      state.firstName = attributes.ownerUser.firstName
      state.lastName = attributes.ownerUser.lastName
      state.role = attributes.ownerUser.role
      state.username = attributes.ownerUser.username
      state.companyId = attributes.ownerUser.companyId
    })
  },
})

// Export slice
export const authSlice = slice

// Export hooks for usage in functional components
export const { usePostLoginMutation, usePostLogoutMutation } = authApi

export default authApi
