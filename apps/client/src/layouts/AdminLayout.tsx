export interface AdminLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export default function AdminLayout({ children, ...props }: AdminLayoutProps) {
  return (
    <div {...props}>
      <h1>This Is Admin Layout From UI</h1>
      {children}
    </div>
  )
}
