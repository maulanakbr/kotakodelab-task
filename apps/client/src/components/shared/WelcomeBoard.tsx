import clsxm from '@/utils/clsxm'
import { ROLES, type RoleValues, titleCase } from '@kotakodelab/lib'

interface WelcomeBoardProps {
  className?: string
  username: string
  userRole: RoleValues
}

export default function WelcomeBoard({ className, username, userRole }: WelcomeBoardProps) {
  const currentRole = Object.keys(ROLES)[userRole] || ''

  return (
    <div
      className={clsxm(
        'flex h-full max-w-full flex-col items-center justify-center rounded-[18px] bg-emphasis px-8 shadow-md',
        className
      )}
    >
      <h3 className='font-poppins text-[42px] font-bold leading-[3rem] text-emphasis'>Hi, {username}</h3>
      <p className='text-[14px]'>{titleCase(currentRole?.toLowerCase())}</p>
    </div>
  )
}
