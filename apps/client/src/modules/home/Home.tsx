import type { RoleValues } from '@kotakodelab/lib'
import { Shell } from '@kotakodelab/ui'
import * as React from 'react'

import { useAppSelector } from '@/utils/hooks'

export default function Home() {
  const { role } = useAppSelector((state) => state.auth)

  return (
    <Shell role={role as RoleValues}>
      <div>Children</div>
    </Shell>
  )
}
