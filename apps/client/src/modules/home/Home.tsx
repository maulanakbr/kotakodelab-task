import { type RoleValues, ROLES } from '@kotakodelab/lib'
import * as React from 'react'

import Shell from '@/components/containers/Shell'
import Attendance from '@/components/shared/Attendance'
import { useAppSelector } from '@/utils/hooks'

export default function Home() {
  const { id, role, username, companyId } = useAppSelector((state) => state.auth)

  return (
    <Shell
      companyId={companyId as string}
      userRole={role as RoleValues}
      username={username as string}
      staffId={id as string}
    >
      {ROLES['SUPERADMIN'] !== role && <Attendance staffId={id as string} />}
    </Shell>
  )
}
