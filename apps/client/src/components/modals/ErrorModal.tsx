import React from 'react'

import type { ErrorResponse } from '@/types/common'

import { Icons } from '../Icons'
import Modal, { type ModalProps } from '../ui/Modal'

interface ErrorModalProps extends Omit<ModalProps, 'children' | 'okTitle'> {
  errorMsg?: ErrorResponse
}

export default function ErrorModal({ visible, onClose, onOk, errorMsg }: ErrorModalProps) {
  return (
    <Modal
      visible={visible}
      onOk={onOk}
      onClose={onClose}
      okTitle='Back'
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <div className='flex flex-col items-center justify-center gap-4 p-12'>
        <Icons.Close
          size={120}
          className='rounded-full bg-error p-2 text-dark-error'
        />
        <h3 className='text-left font-poppins text-[42px] font-bold leading-[3.5rem] text-emphasis'>Ooops</h3>
        <p className='text-center text-[16px] leading-5 tracking-normal'>{errorMsg?.data.message}</p>
      </div>
    </Modal>
  )
}
