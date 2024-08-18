import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import type { CompanyRequest, CompanyResponse } from '@/types/company'
import { apiBaseQuery } from '@/utils/api'

const companyApi = createApi({
  reducerPath: 'companyApi',
  baseQuery: apiBaseQuery,
  tagTypes: ['Company'],
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 259200, // 3 days
  endpoints: (builder) => ({
    getCompany: builder.query<CompanyResponse, { companyId: string }>({
      query: ({ companyId }) => ({
        url: `/companies/${companyId}`,
        method: 'GET',
      }),
    }),
    postCompany: builder.mutation<CompanyResponse, CompanyRequest>({
      query: (data) => ({
        url: '/companies',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Company'],
    }),
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
})

// Export hooks for usage in functional components
export const { useGetCompanyQuery, usePostCompanyMutation } = companyApi

export default companyApi
