import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import {
  StaffBrowseRequest,
  StaffBrowseResponse,
  StaffCreateRequest,
  StaffDetailResponse,
  StaffUpdateRequest,
} from '@/types/staff'
import { apiBaseQuery } from '@/utils/api'

const staffApi = createApi({
  reducerPath: 'staff',
  baseQuery: apiBaseQuery,
  tagTypes: ['Staff'],
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 259200, // 3 days
  endpoints: (builder) => ({
    getListStaffs: builder.query<StaffBrowseResponse, StaffBrowseRequest>({
      query: (params) => ({
        params,
        url: '/staffs',
        providesTags: ['Staff'],
      }),
    }),
    getDetailStaff: builder.query<StaffDetailResponse, string>({
      query: (id) => ({
        url: `/staffs/${id}`,
      }),
      providesTags: ['Staff'],
    }),
    postStaff: builder.mutation<StaffBrowseResponse, StaffCreateRequest>({
      query: (data) => ({
        url: '/staffs',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Staff'],
    }),
    putStaff: builder.mutation<StaffBrowseResponse, StaffUpdateRequest>({
      query: (data) => ({
        url: '/staffs',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Staff'],
    }),
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
})

// Export hooks for usage in functional components
export const {
  useGetListStaffsQuery,
  useGetDetailStaffQuery,
  usePostStaffMutation,
  usePutStaffMutation,
  util: exampleUtil,
} = staffApi

export default staffApi
