import type { BaseRequest, BaseResponse } from './common'

export interface Attendance {
  id: string
  staffId: string
  clockIn: string
  clockOut: string | null
  duration: number | null
  latitude: string
  longtitude: string
  createdAt: string
  updatedAt: string | null
}

export interface AttendanceForm {
  clockIn: string
  latitude: string
  longitude: string
}

export type AttendanceResponse = BaseResponse<Attendance>
export type AttendanceRequest = BaseRequest<AttendanceForm>
