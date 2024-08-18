import { Fragment, useState } from 'react'

import { usePostCompanyMutation } from '@/services/company'
import type { ErrorResponse } from '@/types/common'
import type { CompanyForm, CompanyRequest } from '@/types/company'
import clsxm from '@/utils/clsxm'
import { useGeoLocation } from '@/utils/hooks'

import { Icons } from '../Icons'
import CompanyFormModal from '../modals/CompanyFormModal'
import ErrorModal from '../modals/ErrorModal'
import StaffFormModal from '../modals/StaffFormModal'
import SuccessModal from '../modals/SuccessModal'
import { Button } from '../ui/Button'

interface UnderDevelopmentProps {
  className?: string
}

export default function UnderDevelopment({ className }: UnderDevelopmentProps) {
  const [showCompanyFormModal, setShowCompanyFormModal] = useState<boolean>(false)
  const [showStaffFormModal, setShowStaffFormModal] = useState<boolean>(false)

  const [showErrorModal, setShowErrorModal] = useState<boolean>(false)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)

  const { currentGeoLocation } = useGeoLocation()
  const [doCreateCompany, { isSuccess: successCreateCompany, error: errorCreateCompany }] = usePostCompanyMutation()

  const onSubmit = async (companyForm: CompanyForm) => {
    const payload: CompanyRequest = {
      data: {
        attributes: {
          ...companyForm,
          latitude: currentGeoLocation?.lat || '',
          longitude: currentGeoLocation?.long || '',
        },
      },
    }

    try {
      await doCreateCompany(payload)
      if (typeof errorCreateCompany !== 'undefined') {
        handleShowErrorModal()
      }

      if (typeof successCreateCompany !== 'undefined') {
        handleShowSuccessModal()
      }
    } catch (error) {
      throw new Error('Failed to create company')
    }
  }

  const handleShowCompanyFormModal = () => {
    setShowCompanyFormModal(!showCompanyFormModal)
  }

  const handleShowStaffFormModal = () => {
    setShowStaffFormModal(!showStaffFormModal)
  }

  const handleShowErrorModal = () => {
    setShowCompanyFormModal(false)
    setShowErrorModal(!showErrorModal)
  }

  const handleShowSuccessModal = () => {
    setShowCompanyFormModal(false)
    setShowSuccessModal(!showSuccessModal)
  }

  return (
    <Fragment>
      <div className={clsxm('flex w-full flex-col items-center justify-center space-y-10', className)}>
        <Icons.SearchX
          size={60}
          className='rounded-full bg-error p-3 text-dark-error'
        />
        <h3 className='text-[18px] font-semibold leading-5 tracking-normal'>Page is still under development</h3>
        <div className='flex w-[28rem] gap-8'>
          <Button
            className='w-full p-[0.8rem]'
            onClick={handleShowStaffFormModal}
          >
            Create Staff
          </Button>
          <Button
            className='w-full p-[0.8rem]'
            onClick={handleShowCompanyFormModal}
          >
            Create Company
          </Button>
        </div>
      </div>
      <CompanyFormModal
        title='Create Company'
        visible={showCompanyFormModal}
        onClose={handleShowCompanyFormModal}
        onSubmit={onSubmit}
      />
      <StaffFormModal
        title='Create Staff'
        visible={showStaffFormModal}
        onClose={() => setShowStaffFormModal(false)}
        type='create'
      />
      <ErrorModal
        visible={showErrorModal}
        onClose={handleShowErrorModal}
        onOk={handleShowErrorModal}
        errorMsg={errorCreateCompany as ErrorResponse}
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
