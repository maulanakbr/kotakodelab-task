import { type RoleValues, ROLES } from '@kotakodelab/lib'

import AdminLayout from '@/layouts/AdminLayout'
import StaffLayout from '@/layouts/StaffLayout'
import SuperAdminLayout from '@/layouts/SuperAdminLayout'

interface ShellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  companyId: string
  userRole: RoleValues
  username: string
  staffId: string
}

type LayoutValues = typeof SuperAdminLayout | typeof AdminLayout | typeof StaffLayout

const layoutOptions: Record<RoleValues, LayoutValues> = {
  [ROLES['SUPERADMIN']]: SuperAdminLayout,
  [ROLES['ADMIN']]: AdminLayout,
  [ROLES['STAFF']]: StaffLayout,
}

export default function Shell({ children, companyId, userRole, username, staffId, ...props }: ShellProps) {
  const Layout = layoutOptions[userRole] || StaffLayout

  return (
    <Layout
      userRole={userRole}
      companyId={companyId}
      username={username}
      staffId={staffId}
      {...props}
    >
      {children}
    </Layout>
  )
}
