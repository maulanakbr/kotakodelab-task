import { titleCase } from '@kotakodelab/lib'
import { formatTime } from '@kotakodelab/lib/intls'
import { Fragment, useState } from 'react'

import { useGetAttendanceByStaffQuery, usePostClockInMutation, usePutClockOutMutation } from '@/services/attendance'
import type { AttendanceClockInRequest, AttendanceClockOutRequest } from '@/types/attendance'
import type { ErrorResponse } from '@/types/common'
import { useGeoLocation } from '@/utils/hooks'

import AttendanceInfo from './AttendanceInfo'
import AttendanceModal from '../modals/AttendanceModal'
import ErrorModal from '../modals/ErrorModal'
import SuccessModal from '../modals/SuccessModal'

interface AttendanceProps {
  staffId: string
}

export default function Attendance({ staffId }: AttendanceProps) {
  const [showAttendanceModal, setShowAttendanceModal] = useState<boolean>(false)
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)

  const { currentGeoLocation } = useGeoLocation()
  const { data: staffAttendanceData, refetch: refetchStaffAttendanceData } = useGetAttendanceByStaffQuery({ staffId })
  const [doClockIn, { error: clockInError, isSuccess: clockInSuccess }] = usePostClockInMutation()
  const [doClockOut, { error: clockOutError, isSuccess: clockOutSuccess }] = usePutClockOutMutation()

  const onSubmit = async (type?: 'clockIn' | 'clockOut') => {
    const { data: clockInData }: AttendanceClockInRequest = {
      data: {
        attributes: {
          clockIn: formatTime(),
          latitude: currentGeoLocation?.lat || '',
          longitude: currentGeoLocation?.long || '',
        },
      },
    }

    const { data: clockOutData }: AttendanceClockOutRequest = {
      data: {
        attributes: {
          clockOut: formatTime(),
          latitude: currentGeoLocation?.lat || '',
          longitude: currentGeoLocation?.long || '',
        },
      },
    }

    try {
      switch (type) {
        case 'clockIn':
          await doClockIn({ data: clockInData })
          if (typeof clockInError !== 'undefined') {
            handleShowErrorModal()
          }

          if (typeof clockInSuccess !== 'undefined') {
            handleShowSuccessModal()
            refetchStaffAttendanceData()
          }
          break
        case 'clockOut':
          await doClockOut({ data: clockOutData })
          if (typeof clockOutError !== 'undefined') {
            handleShowErrorModal()
          }

          if (typeof clockOutSuccess !== 'undefined') {
            handleShowSuccessModal()
            refetchStaffAttendanceData()
          }
          break
        default:
          break
      }
    } catch (error) {
      console.log(error)
    }
  }

  const checkDataAvailability = staffAttendanceData?.data.filter(
    (item) => item.attributes && 'createdAt' in item.attributes
  )

  const handleShowAttendanceModal = () => {
    setShowAttendanceModal(!showAttendanceModal)
  }

  const handleShowErrorModal = () => {
    setShowAttendanceModal(false)
    setShowErrorModal(!showErrorModal)
  }

  const handleShowSuccessModal = () => {
    setShowAttendanceModal(false)
    setShowSuccessModal(!showSuccessModal)
  }

  return (
    <Fragment>
      <AttendanceInfo
        attendanceData={staffAttendanceData}
        handleShowAttendanceModal={handleShowAttendanceModal}
      />
      <AttendanceModal
        visible={showAttendanceModal}
        onClose={handleShowAttendanceModal}
        type={checkDataAvailability && checkDataAvailability?.length === 0 ? 'clockIn' : 'clockOut'}
        handleSubmit={onSubmit}
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
        successMsg={
          checkDataAvailability && !checkDataAvailability[0]?.attributes.clockOut
            ? titleCase('clock in succesful', true)
            : titleCase('clock out successful', true)
        }
      />
    </Fragment>
  )
}
