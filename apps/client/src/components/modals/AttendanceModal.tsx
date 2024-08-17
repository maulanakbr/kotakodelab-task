import type { SerializedError } from '@reduxjs/toolkit'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import React from 'react'

import Modal, { type ModalProps } from '../ui/Modal'

interface AttendanceModalProps extends Omit<ModalProps, 'children' | 'okTitle'> {
  isError?: FetchBaseQueryError | SerializedError
}

export default function AttendanceModal({ visible, onClose, onOk }: AttendanceModalProps) {
  return (
    <Modal
      visible={visible}
      onClose={onClose}
      onOk={onOk}
    >
      <p>Are you sure to clock in?</p>
    </Modal>
  )
}
