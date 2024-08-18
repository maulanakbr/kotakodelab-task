import UnderDevelopment from '@/components/misc/UnderDevelopment'

export interface SuperAdminLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export default function SuperAdminLayout({ children, ...props }: SuperAdminLayoutProps) {
  return (
    <section
      className='flex max-h-screen w-full flex-col'
      {...props}
    >
      <UnderDevelopment className='m-auto h-[40rem]' />
      <div className='grow'>{children}</div>
    </section>
  )
}
