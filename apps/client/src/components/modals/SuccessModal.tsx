import React from 'react'

import { Icons } from '../Icons'
import Modal, { type ModalProps } from '../ui/Modal'

interface SuccessModalProps extends Omit<ModalProps, 'children' | 'okTitle'> {
  successMsg?: string
  refetch?: () => void
}

export default function SuccessModal({ visible, onClose, onOk, successMsg, refetch }: SuccessModalProps) {
  const handleClose = () => {
    if (refetch) {
      refetch()
    }

    onClose()
  }

  return (
    <Modal
      visible={visible}
      onOk={onOk}
      onClose={handleClose}
      okTitle='Back'
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <div className='flex flex-col items-center justify-center gap-4 p-12'>
        <Icons.Check
          size={120}
          className='rounded-full bg-success p-2 text-success'
        />
        <h3 className='text-left font-poppins text-[42px] font-bold leading-[3.5rem] text-emphasis'>Success</h3>
        <p className='text-center text-[16px] leading-5 tracking-normal'>{successMsg}</p>
      </div>
    </Modal>
  )
}
