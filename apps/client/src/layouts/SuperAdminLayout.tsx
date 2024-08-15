import { ReactNode } from 'react'

interface SuperAdminLayoutProps {
  children: ReactNode
}

export default function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  return (
    <div>
      <h1>This Is Super Admin Layout</h1>
      {children}
    </div>
  )
}
