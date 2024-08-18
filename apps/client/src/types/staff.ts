import type { RoleValues } from '@kotakodelab/lib'

import type { BaseRequest, BaseResponse } from '@/types/common'

// same with the attribute on responses
export interface Staff {
  id: string
  firstName: string
  lastName: string
  username: string
  email: string
  companyId: string
  role: RoleValues
}

export type StaffBrowseRequest = {
  page: number
  pageSize: number
}

export type StaffUpdateForm = {
  username: string
}

export type StaffBrowseResponse = BaseResponse<Staff>
export type StaffDetailResponse = BaseResponse<Staff>
export type StaffUpdateRequest = BaseRequest<StaffUpdateForm>
