import type { Company, CompanyForm as CompanyFormType } from '@/types/company'

import CompanyForm from '../forms/CompanyForm'
import Modal, { type ModalProps } from '../ui/Modal'

interface CompanyFormModalProps extends Omit<ModalProps, 'children' | 'okTitle' | 'onOk'> {
  data?: Company
  onSubmit: (form: CompanyFormType) => void
}

export default function CompanyFormModal({ title, visible, onClose, data, onSubmit }: CompanyFormModalProps) {
  return (
    <Modal
      title={title}
      visible={visible}
      onClose={onClose}
      okButtonProps={{ type: 'submit', form: 'company-form' }}
    >
      <CompanyForm
        formId='company-form'
        onSubmit={onSubmit}
        data={data}
      />
    </Modal>
  )
}
