import { RoleValues } from '@kotakodelab/lib'

import { BaseRequest, BaseResponse } from './common'

export interface Auth {
  ownerUser: {
    id: string
    firstName: string
    lastName: string
    email: string
    username: string
    role: RoleValues
    companyId: string
  }
  expiredIn: number
  accessToken: string
  lastLoggedInAt: string
  type: string
}

export interface AuthForm {
  username: string
  password: string
}

export interface LogoutForm {
  id: string
}

export type AuthResponse = BaseResponse<Auth>
export type AuthRequest = BaseRequest<AuthForm>
export type LogoutRequest = BaseRequest<LogoutForm>
