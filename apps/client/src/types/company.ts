import type { BaseRequest, BaseResponse } from './common'
import type { Staff } from './staff'

export interface Company {
  id: string
  name: string
  description: string
  address: string
  city: string
  latitude: string
  longtitude: string
  staffs: Staff[]
}

export type CompanyForm = {
  name: string
  description?: string
  address: string
  city: string
  longitude: string
  latitude: string
}

export type CompanyRequest = BaseRequest<CompanyForm>
export type CompanyResponse = BaseResponse<Company>
