import { formatTime } from '@kotakodelab/lib/intls'
import { Fragment, useState } from 'react'

import { useGetAttendanceByStaffQuery, usePostClockInMutation } from '@/services/attendance'
import type { AttendanceRequest } from '@/types/attendance'
import type { ErrorResponse } from '@/types/common'
import { useGeoLocation } from '@/utils/hooks'

import AttendanceModal from '../modals/AttendanceModal'
import ErrorModal from '../modals/ErrorModal'
import SuccessModal from '../modals/SuccessModal'
import { Button } from '../ui/Button'

interface AttendanceProps {
  staffId: string
}

export default function Attendance({ staffId }: AttendanceProps) {
  const [showClockInModal, setClockOutModal] = useState<boolean>(false)
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)

  const { currentGeoLocation } = useGeoLocation()
  const { data: staffAttendanceData, refetch: refetchStaffAttendanceData } = useGetAttendanceByStaffQuery({ staffId })

  const [doClockIn, { error: clockInError, isSuccess: clockInSuccess }] = usePostClockInMutation()

  const onSubmit = async () => {
    const { data }: AttendanceRequest = {
      data: {
        attributes: {
          clockIn: formatTime(),
          latitude: currentGeoLocation?.lat || '',
          longitude: currentGeoLocation?.long || '',
        },
      },
    }

    try {
      await doClockIn({ data })

      if (typeof clockInError !== 'undefined') {
        handleShowErrorModal()
      }

      if (typeof clockInSuccess !== 'undefined') {
        handleShowSuccessModal()
        refetchStaffAttendanceData()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleShowClockInModal = () => {
    setClockOutModal(!showClockInModal)
  }

  const handleShowErrorModal = () => {
    setClockOutModal(false)
    setShowErrorModal(!showErrorModal)
  }

  const handleShowSuccessModal = () => {
    setClockOutModal(false)
    setShowSuccessModal(!showSuccessModal)
  }

  console.log(clockInSuccess)

  const checkDataAvailability = staffAttendanceData?.data.filter(
    (item) => item.attributes && 'createdAt' in item.attributes
  )

  return (
    <Fragment>
      <div className='h-full max-w-full'>
        <h3 className='text-[18px] font-bold'>Attendance List</h3>
        <div className='mt-4 flex gap-3'>
          {checkDataAvailability && checkDataAvailability.length === 0 ? (
            <Button
              className='p-[0.8rem]'
              onClick={handleShowClockInModal}
            >
              Clock In
            </Button>
          ) : null}
        </div>
      </div>
      <AttendanceModal
        visible={showClockInModal}
        onClose={handleShowClockInModal}
        onOk={onSubmit}
        isError={clockInError}
      />
      <ErrorModal
        visible={showErrorModal}
        onClose={handleShowErrorModal}
        onOk={handleShowErrorModal}
        errorMsg={clockInError as ErrorResponse}
      />
      <SuccessModal
        visible={showSuccessModal}
        onClose={handleShowSuccessModal}
        onOk={handleShowSuccessModal}
        successMsg='Clock In Successful'
      />
    </Fragment>
  )
}
