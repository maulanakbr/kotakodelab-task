import clsxm from '@/utils/clsxm'
import { useRouter } from 'next/router'

import Footer from '../Footer'
import Header from '../header/Header'

interface MainContainerProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
  children: React.ReactNode
}

export default function MainContainer({ className, children, ...props }: MainContainerProps) {
  const { pathname } = useRouter()

  return (
    <main
      className={clsxm(
        'flex min-h-screen w-full flex-col bg px-[4rem] py-[2rem] font-inter text-[12.5px] leading-none tracking-tight text md:px-[14rem]',
        className
      )}
      {...props}
    >
      {pathname !== '/login' && <Header />}
      {children}
      {pathname !== '/login' && <Footer />}
    </main>
  )
}
