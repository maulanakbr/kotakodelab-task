import { type RoleValues, ROLES, titleCase } from '@kotakodelab/lib'
import { Fragment, useState } from 'react'

import clsxm from '@/utils/clsxm'

import { Icons } from '../Icons'
import StaffFormModal from '../modals/StaffFormModal'

interface WelcomeBoardProps {
  className?: string
  username: string
  userRole: RoleValues
}

export default function WelcomeBoard({ className, username, userRole }: WelcomeBoardProps) {
  const [showUpdateStaffModal, setShowUpdateStaffModal] = useState<boolean>(false)

  const currentRole = Object.keys(ROLES)[userRole] || ''

  const handleShowUpdateStaffModal = () => {
    setShowUpdateStaffModal(!showUpdateStaffModal)
  }

  return (
    <Fragment>
      <div
        className={clsxm(
          'relative flex h-full max-w-full flex-col items-center justify-center overflow-hidden rounded-[18px] bg-info shadow-md',
          className
        )}
      >
        <div className='absolute right-8 top-5 cursor-pointer p-2 text-subtle hover:rounded-full hover:border-2 hover:border-inverted'>
          <Icons.Pencil
            size={20}
            onClick={handleShowUpdateStaffModal}
          />
        </div>
        <h3 className='font-poppins text-[42px] font-bold leading-[3rem] text-emphasis'>Hi, {username}</h3>
        <p className='text-[14px]'>{titleCase(currentRole?.toLowerCase())}</p>
      </div>
      <StaffFormModal
        title='Edit Staff'
        visible={showUpdateStaffModal}
        onClose={handleShowUpdateStaffModal}
        data={{ username }}
      />
    </Fragment>
  )
}
