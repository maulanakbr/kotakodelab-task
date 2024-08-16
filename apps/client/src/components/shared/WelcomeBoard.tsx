import { ROLES, RoleValues, titleCase } from '@kotakodelab/lib'

interface WelcomeBoardProps {
  username: string
  userRole: RoleValues
}

export default function WelcomeBoard({ username, userRole }: WelcomeBoardProps) {
  const currentRole = Object.keys(ROLES)[userRole] || ''

  return (
    <div className='mb-8 flex h-60 w-full flex-col justify-center rounded-[18px] bg-emphasis px-8'>
      <h3 className='text-[42px] font-bold leading-none text-emphasis'>Hi, {username}</h3>
      <p className='text-[24px]'>{titleCase(currentRole?.toLowerCase())}</p>
    </div>
  )
}
