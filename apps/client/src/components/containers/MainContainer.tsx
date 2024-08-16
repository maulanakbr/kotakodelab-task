import clsxm from '@/utils/clsxm'

import Footer from '../Footer'
import Header from '../header/Header'

interface MainContainerProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
  children: React.ReactNode
}

export default function MainContainer({ className, children, ...props }: MainContainerProps) {
  return (
    <main
      className={clsxm(
        'flex min-h-screen w-full flex-col bg px-[4rem] py-[2rem] text-[12px] text md:px-[14rem]',
        className
      )}
      {...props}
    >
      <Header />
      {children}
      <Footer />
    </main>
  )
}
