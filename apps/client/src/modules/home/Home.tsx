import { AdminLayout } from '@kotakodelab/ui'
import * as React from 'react'

import StaffLayout from '@/layouts/StaffLayout'
import SuperAdminLayout from '@/layouts/SuperAdminLayout'
import { ROLES } from '@/utils/constants'
import { useAppSelector } from '@/utils/hooks'

const layouts = {
  [ROLES.SUPERADMIN]: SuperAdminLayout,
  // [ROLES.ADMIN]: AdminLayout,
  [ROLES.STAFF]: StaffLayout,
}

export default function Home() {
  const { role } = useAppSelector((state) => state.auth)

  if (ROLES['SUPERADMIN'] === role) {
    return (
      <SuperAdminLayout>
        <div>Children</div>
      </SuperAdminLayout>
    )
  }

  if (ROLES['ADMIN'] === role) {
    return (
      <AdminLayout>
        <div>Children</div>
      </AdminLayout>
    )
  }

  return (
    <StaffLayout>
      <div>Children</div>
    </StaffLayout>
  )
}
