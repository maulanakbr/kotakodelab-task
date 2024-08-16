import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { apiBaseQuery } from '@/utils/api'
import type { CompanyResponse } from '@/types/company'

const companyApi = createApi({
  reducerPath: 'companyApi',
  baseQuery: apiBaseQuery,
  tagTypes: ['Company'],
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 259200, // 3 days
  endpoints: (builder) => ({
    getCompany: builder.query<CompanyResponse, { companyId: string }>({
      query: (companyId) => ({
        url: `/companies/${companyId}`,
        method: 'GET',
      }),
    }),
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
})

// Export hooks for usage in functional components
export const { useGetCompanyQuery } = companyApi

export default companyApi
