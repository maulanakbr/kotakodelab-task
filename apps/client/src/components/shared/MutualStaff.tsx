import { Fragment, useState } from 'react'

import { useGetCompanyQuery } from '@/services/company'
import type { Staff } from '@/types/staff'

import MutualStaffModal from '../modals/MutualStaffModal'

interface MutualStaffProps {
  companyId: string
  staffId: string
}

export default function MutualStaff({ companyId, staffId }: MutualStaffProps) {
  const [showMutualStaffModal, setShowMutualStaffModal] = useState<{ visible: boolean; data: Staff | undefined }>({
    visible: false,
    data: undefined,
  })

  const { data: companyData } = useGetCompanyQuery({ companyId })

  const handleShowMutualStaffModal = (staffData: Staff | undefined) => {
    setShowMutualStaffModal({
      visible: !showMutualStaffModal.visible,
      data: staffData,
    })
  }

  return (
    <Fragment>
      <div className='max-w-full'>
        <h3 className='text-[18px] font-bold'>Mutual Staff</h3>
        <div className='mt-4 flex gap-3'>
          {companyData?.data[0]?.attributes?.staffs
            ?.filter((staff) => staff.id !== staffId)
            .map((staff) => (
              <span
                key={staff.id}
                className='flex size-12 cursor-pointer items-center justify-center rounded-full bg-inverted text-center font-semibold text-white shadow-md'
                onClick={() => handleShowMutualStaffModal(staff)}
              >
                <p>{`${staff.firstName[0]}${staff.lastName[0]}`}</p>
              </span>
            ))}
        </div>
      </div>
      <MutualStaffModal
        visible={showMutualStaffModal.visible}
        onClose={() => handleShowMutualStaffModal(undefined)}
        data={showMutualStaffModal.data}
      />
    </Fragment>
  )
}
