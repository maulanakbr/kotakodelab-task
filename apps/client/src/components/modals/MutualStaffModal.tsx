import { ROLES } from '@kotakodelab/lib'

import { Staff } from '@/types/staff'

import Modal, { type ModalProps } from '../ui/Modal'

interface MutualStaffModalProps extends Omit<ModalProps, 'children' | 'okTitle' | 'onOk'> {
  data?: Staff
}

export default function MutualStaffModal({ visible, onClose, data }: MutualStaffModalProps) {
  const joinFullName = data && data?.firstName.concat(` ${data?.lastName}`)

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      onOk={onClose}
      okTitle='Done'
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <div>
        <h3 className='text-[24px] font-bold'>{`@${data?.username}`}</h3>
        <div className='flex w-full items-center justify-between'>
          <p className='font-semibold text-subtle'>Fullname</p>
          <p>{joinFullName}</p>
        </div>
        <div className='flex w-full items-center justify-between'>
          <p className='font-semibold text-subtle'>Email</p>
          <p>{data?.email}</p>
        </div>
        <div className='flex w-full items-center justify-between'>
          <p className='font-semibold text-subtle'>Role</p>
          <p>{Object.keys(ROLES)[data?.role as number]}</p>
        </div>
      </div>
    </Modal>
  )
}
