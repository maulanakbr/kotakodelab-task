import { usePutStaffMutation } from '@/services/staffs'
import type { Staff, StaffUpdateForm, StaffUpdateRequest } from '@/types/staff'

import StaffForm from '../forms/StaffForm'
import Modal, { type ModalProps } from '../ui/Modal'

interface StaffModalProps extends Omit<ModalProps, 'children' | 'okTitle' | 'onOk'> {
  data?: Pick<Staff, 'username'>
}

export default function StaffModal({ title, visible, onClose, data }: StaffModalProps) {
  const [doUpdateStaff, { isSuccess: successUpdateStaff }] = usePutStaffMutation()

  const onSubmit = async (staffForm: StaffUpdateForm) => {
    const payload: StaffUpdateRequest = {
      data: {
        attributes: { ...staffForm },
      },
    }

    try {
      await doUpdateStaff(payload)
      if (typeof successUpdateStaff !== 'undefined') {
        onClose()
      }
    } catch (error) {
      throw new Error('Failed to update staff')
    }
  }

  return (
    <Modal
      title={title}
      visible={visible}
      onClose={onClose}
      okButtonProps={{ type: 'submit', form: 'staff-form' }}
    >
      <StaffForm
        onSubmit={onSubmit}
        formId='staff-form'
        data={{ username: data?.username as string }}
      />
    </Modal>
  )
}
