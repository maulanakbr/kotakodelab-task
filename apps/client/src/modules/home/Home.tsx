import type { RoleValues } from '@kotakodelab/lib'
import * as React from 'react'

import MainContainer from '@/components/containers/MainContainer'
import Shell from '@/components/containers/Shell'
import { useAppSelector } from '@/utils/hooks'

export default function Home() {
  const { role, username, companyId } = useAppSelector((state) => state.auth)

  return (
    <MainContainer>
      <Shell
        userRole={role as RoleValues}
        companyId={companyId as string}
        username={username as string}
      >
        <div>Children</div>
      </Shell>
    </MainContainer>
  )
}
