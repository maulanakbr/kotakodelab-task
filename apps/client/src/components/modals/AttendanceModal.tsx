import React from 'react'

import Modal, { type ModalProps } from '../ui/Modal'

interface AttendanceModalProps extends Omit<ModalProps, 'children' | 'okTitle' | 'onOk'> {
  type: 'clockIn' | 'clockOut'
  handleSubmit: (type: 'clockIn' | 'clockOut') => void
}

export default function AttendanceModal({ visible, onClose, type, handleSubmit }: AttendanceModalProps) {
  return (
    <Modal
      visible={visible}
      onClose={onClose}
      onOk={() => handleSubmit(type)}
    >
      <p>{type === 'clockIn' ? 'Are you sure to clock in?' : 'Are you sure to clock out?'}</p>
    </Modal>
  )
}
