import attendance from '@/services/attendance'
import auth from '@/services/auth'
import company from '@/services/company'
import staff from '@/services/staffs'

const rootServices = {
  reducers: {
    [auth.reducerPath]: auth.reducer,
    [staff.reducerPath]: staff.reducer,
    [company.reducerPath]: company.reducer,
    [attendance.reducerPath]: attendance.reducer,
  },
  middlewares: [auth.middleware, staff.middleware, company.middleware, attendance.middleware],
}

export default rootServices
