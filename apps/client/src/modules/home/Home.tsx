import type { RoleValues } from '@kotakodelab/lib'
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
    >
      <Attendance staffId={id as string} />
    </Shell>
  )
}
