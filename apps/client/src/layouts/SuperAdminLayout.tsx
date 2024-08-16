export interface SuperAdminLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export default function SuperAdminLayout({ children, ...props }: SuperAdminLayoutProps) {
  return (
    <div {...props}>
      <h1>This Is SuperAdmin Layout From UI</h1>
      {children}
    </div>
  )
}
