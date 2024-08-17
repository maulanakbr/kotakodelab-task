import type { BaseResponse } from './common'
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

export type CompanyResponse = BaseResponse<Company>
