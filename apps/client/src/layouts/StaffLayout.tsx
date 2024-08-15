import { ReactNode } from 'react'

interface AdminLayoutProps {
  children: ReactNode
}

export default function StaffLayout({ children }: AdminLayoutProps) {
  return (
    <div>
      <h1>This Is Staff Layout</h1>
      {children}
    </div>
  )
}
