import CompanyFeature from '@/components/shared/CompanyFeature'

export interface StaffLayoutProps extends React.HTMLAttributes<HTMLElement> {
  companyId: string
  children: React.ReactNode
}

export default function StaffLayout({ children, companyId, ...props }: StaffLayoutProps) {
  return (
    <section
      className='max-h-screen'
      {...props}
    >
      <CompanyFeature companyId={companyId} />
      {children}
    </section>
  )
}
