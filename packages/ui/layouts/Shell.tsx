import { ROLES, type RoleValues } from '@kotakodelab/lib';
import AdminLayout from './AdminLayout';
import StaffLayout from './StaffLayout';
import SuperAdminLayout from './SuperAdminLayout';

interface ShellProps {
  children: React.ReactNode;
  role: RoleValues;
}

type LayoutValues = typeof SuperAdminLayout | typeof AdminLayout | typeof StaffLayout;

const layoutOptions: Record<RoleValues, LayoutValues> = {
  [ROLES['SUPERADMIN']]: SuperAdminLayout,
  [ROLES['ADMIN']]: AdminLayout,
  [ROLES['STAFF']]: StaffLayout,
};

export default function Shell({ children, role }: ShellProps) {
  const Layout = layoutOptions[role] || StaffLayout;

  return <Layout>{children}</Layout>;
}
