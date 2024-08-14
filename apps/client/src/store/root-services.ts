import auth from '@/services/auth'
import staff from '@/services/staffs'

const rootServices = {
  reducers: {
    // staff
    [staff.reducerPath]: staff.reducer,
    [auth.reducerPath]: auth.reducer,
  },
  middlewares: [
    // staff
    staff.middleware,
    auth.middleware,
  ],
}

export default rootServices
