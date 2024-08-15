export interface SuperAdminLayoutProps {
  children: React.ReactNode;
}

export default function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  return (
    <div>
      <h1>This Is SuperAdmin Layout From UI</h1>
      {children}
    </div>
  );
}
