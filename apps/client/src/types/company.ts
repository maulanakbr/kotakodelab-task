import { BaseResponse } from './common'

export interface Company {
  id: string
  name: string
  description: string
  address: string
  city: string
  latitude: string
  longtitude: string
}

export type CompanyResponse = BaseResponse<Company>
