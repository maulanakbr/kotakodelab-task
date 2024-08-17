import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import type { AttendanceClockInRequest, AttendanceClockOutRequest, AttendanceResponse } from '@/types/attendance'
import { apiBaseQuery } from '@/utils/api'

const attendanceApi = createApi({
  reducerPath: 'attendanceApi',
  baseQuery: apiBaseQuery,
  tagTypes: ['Attendance'],
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 259200,
  endpoints: (builder) => ({
    getAttendanceByStaff: builder.query<AttendanceResponse, { staffId: string }>({
      query: ({ staffId }) => ({
        url: `/attendance/${staffId}`,
        method: 'GET',
      }),
    }),
    postClockIn: builder.mutation<AttendanceResponse, AttendanceClockInRequest>({
      query: (data) => ({
        url: '/attendance',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Attendance'],
    }),
    putClockOut: builder.mutation<AttendanceResponse, AttendanceClockOutRequest>({
      query: (data) => ({
        url: '/attendance',
        method: 'PUT',
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
export const { useGetAttendanceByStaffQuery, usePostClockInMutation, usePutClockOutMutation } = attendanceApi

export default attendanceApi
