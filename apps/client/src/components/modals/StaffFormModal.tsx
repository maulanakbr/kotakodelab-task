import { Fragment, useState } from 'react'

import { usePostStaffMutation, usePutStaffMutation } from '@/services/staffs'
import type { ErrorResponse } from '@/types/common'
import type {
  Staff,
  StaffCreateRequest,
  StaffForm as StaffFormType,
  StaffUpdateForm,
  StaffUpdateRequest,
} from '@/types/staff'

import ErrorModal from './ErrorModal'
import SuccessModal from './SuccessModal'
import CreateStaffForm from '../forms/CreateStaffForm'
import StaffForm from '../forms/StaffForm'
import Modal, { type ModalProps } from '../ui/Modal'

interface StaffFormModalProps extends Omit<ModalProps, 'children' | 'okTitle' | 'onOk'> {
  data?: Pick<Staff, 'username'>
  type?: 'create' | 'update'
}

export default function StaffFormModal({ title, visible, onClose, data, type = 'update' }: StaffFormModalProps) {
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)

  const [doCreateStaff, { isSuccess: successCreateStaff, error: errorCreateStaff }] = usePostStaffMutation()
  const [doUpdateStaff, { isSuccess: successUpdateStaff }] = usePutStaffMutation()

  const onSubmitCreate = async (staffForm: StaffFormType) => {
    const payload: StaffCreateRequest = {
      data: {
        attributes: { ...staffForm },
      },
    }

    try {
      await doCreateStaff(payload)
      if (typeof errorCreateStaff !== 'undefined') {
        handleShowErrorModal()
      }

      if (typeof successCreateStaff !== 'undefined') {
        handleShowSuccessModal()
      }
    } catch (error) {
      throw new Error('Failed to create staff')
    }
  }

  const onSubmitUpdate = async (staffForm: StaffUpdateForm) => {
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

  const handleShowErrorModal = () => {
    onClose()
    setShowErrorModal(!showErrorModal)
  }

  const handleShowSuccessModal = () => {
    onClose()
    setShowSuccessModal(!showSuccessModal)
  }

  return (
    <Fragment>
      <Modal
        title={title}
        visible={visible}
        onClose={onClose}
        okButtonProps={
          type === 'update' ? { type: 'submit', form: 'update-form' } : { type: 'submit', form: 'create-form' }
        }
      >
        {type !== 'update' ? (
          <CreateStaffForm
            onSubmit={onSubmitCreate}
            formId='create-form'
          />
        ) : (
          <StaffForm
            onSubmit={onSubmitUpdate}
            formId='update-form'
            data={{ username: data?.username as string }}
          />
        )}
      </Modal>
      <ErrorModal
        visible={showErrorModal}
        onClose={handleShowErrorModal}
        onOk={handleShowErrorModal}
        errorMsg={errorCreateStaff as ErrorResponse}
      />
      <SuccessModal
        visible={showSuccessModal}
        onClose={handleShowSuccessModal}
        onOk={handleShowSuccessModal}
        successMsg='Create Company Successfully'
      />
    </Fragment>
  )
}
