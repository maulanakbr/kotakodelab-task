import type { RoleValues } from '@kotakodelab/lib'
import * as React from 'react'

import Shell from '@/components/containers/Shell'
import { useAppSelector } from '@/utils/hooks'

export default function Home() {
  const { role, username, companyId } = useAppSelector((state) => state.auth)

  return (
    <Shell
      companyId={companyId as string}
      userRole={role as RoleValues}
      username={username as string}
    ></Shell>
  )
}
