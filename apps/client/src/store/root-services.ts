import auth from '@/services/auth'
import company from '@/services/company'
import staff from '@/services/staffs'

const rootServices = {
  reducers: {
    // staff
    [auth.reducerPath]: auth.reducer,
    [staff.reducerPath]: staff.reducer,
    [company.reducerPath]: company.reducer,
  },
  middlewares: [
    // staff
    staff.middleware,
    auth.middleware,
    company.middleware,
  ],
}

export default rootServices
