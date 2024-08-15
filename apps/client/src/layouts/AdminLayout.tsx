import { ReactNode } from 'react'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div>
      <h1>This Is Admin Layout</h1>
      {children}
    </div>
  )
}
