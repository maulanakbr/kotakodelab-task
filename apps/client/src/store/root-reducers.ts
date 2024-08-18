import { authSlice } from '@/services/auth'

const rootReducers = {
  [authSlice.name]: authSlice.reducer,
}

export default rootReducers
