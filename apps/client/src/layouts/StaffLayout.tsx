import type { RoleValues } from '@kotakodelab/lib'

import Clock from '@/components/Clock'
import CompanyFeature from '@/components/shared/CompanyFeature'
import MutualStaff from '@/components/shared/MutualStaff'
import WelcomeBoard from '@/components/shared/WelcomeBoard'

export interface StaffLayoutProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  companyId: string
  userRole: RoleValues
  username: string
  staffId: string
}

export default function StaffLayout({ children, companyId, userRole, username, staffId, ...props }: StaffLayoutProps) {
  return (
    <section
      className='flex max-h-screen w-full flex-col gap-12'
      {...props}
    >
      <div className='grid grid-flow-col-dense grid-rows-4 gap-4 lg:grid-rows-8'>
        <CompanyFeature
          className='col-span-2 row-span-2 content-start lg:col-span-4 lg:row-span-4'
          companyId={companyId}
        />
        <Clock className='col-span-2 row-span-2 content-end lg:col-span-4 lg:row-span-4' />
        <WelcomeBoard
          className='col-span-4 row-span-4 lg:col-span-8 lg:row-span-8'
          userRole={userRole}
          username={username}
        />
      </div>
      <div className='min-h-72 grow'>{children}</div>
      <MutualStaff
        companyId={companyId}
        staffId={staffId}
      />
    </section>
  )
}
