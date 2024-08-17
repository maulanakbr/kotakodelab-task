import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { apiBaseQuery } from '@/utils/api'
import type { AttendanceRequest, AttendanceResponse } from '@/types/attendance'

const attendanceApi = createApi({
  reducerPath: 'attendanceApi',
  baseQuery: apiBaseQuery,
  tagTypes: ['Attendance'],
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 259200, // 3 days
  endpoints: (builder) => ({
    getAttendanceByStaff: builder.query<AttendanceResponse, { staffId: string }>({
      query: ({ staffId }) => ({
        url: `/attendance/${staffId}`,
        method: 'GET',
      }),
    }),
    postClockIn: builder.mutation<AttendanceResponse, AttendanceRequest>({
      query: (data) => ({
        url: '/attendance',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Attendance'],
    }),
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
})

// Export hooks for usage in functional components
export const { useGetAttendanceByStaffQuery, usePostClockInMutation } = attendanceApi

export default attendanceApi
