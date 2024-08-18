import { useRouter } from 'next/router'

import clsxm from '@/utils/clsxm'

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
        pathname !== '/login'
          ? 'min-h-screen w-full bg px-[4rem] py-[2rem] font-inter text-[14px] leading-none tracking-tight text md:px-[14rem]'
          : 'px-0 py-0',
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
