import { type RoleValues, ROLES } from '@kotakodelab/lib'

import AdminLayout from '@/layouts/AdminLayout'
import StaffLayout from '@/layouts/StaffLayout'
import SuperAdminLayout from '@/layouts/SuperAdminLayout'

import WelcomeBoard from '../shared/WelcomeBoard'

interface ShellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  userRole: RoleValues
  companyId: string
  username: string
}

type LayoutValues = typeof SuperAdminLayout | typeof AdminLayout | typeof StaffLayout

const layoutOptions: Record<RoleValues, LayoutValues> = {
  [ROLES['SUPERADMIN']]: SuperAdminLayout,
  [ROLES['ADMIN']]: AdminLayout,
  [ROLES['STAFF']]: StaffLayout,
}

export default function Shell({ children, userRole, companyId, username, ...props }: ShellProps) {
  const Layout = layoutOptions[userRole] || StaffLayout

  return (
    <Layout companyId={companyId}>
      <WelcomeBoard
        userRole={userRole}
        username={username}
      />
      {children}
    </Layout>
  )
}
