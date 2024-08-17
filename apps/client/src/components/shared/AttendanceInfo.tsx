import { Fragment } from 'react'

import { AttendanceResponse } from '@/types/attendance'
import clsxm from '@/utils/clsxm'

import NoAttendanceFound from '../misc/NoAttendanceFound'
import { Button } from '../ui/Button'

interface AttendaneInfoProps {
  attendanceData: AttendanceResponse | undefined
  handleShowAttendanceModal: () => void
}

export default function AttendanceInfo({ attendanceData, handleShowAttendanceModal }: AttendaneInfoProps) {
  const checkDataAvailability = attendanceData?.data.filter((item) => item.attributes && 'createdAt' in item.attributes)

  return (
    <div className='h-full max-w-full'>
      <h3 className='text-[18px] font-bold'>Attendance Info</h3>
      <div className='mt-4 flex h-[30vh] flex-col items-center justify-center gap-4 rounded-[10px] border'>
        {checkDataAvailability && checkDataAvailability.length === 0 ? (
          <NoAttendanceFound handleShowClockInModal={handleShowAttendanceModal} />
        ) : (
          <Fragment>
            <div className='flex w-[30rem] items-center justify-between'>
              <p className='font-semibold text-subtle'>Clock In</p>
              <p>{checkDataAvailability && checkDataAvailability[0]?.attributes.clockIn}</p>
            </div>
            <div className='flex w-[30rem] items-center justify-between'>
              <p className='font-semibold text-subtle'>Clock Out</p>
              <p>{(checkDataAvailability && checkDataAvailability[0]?.attributes.clockOut) ?? '-'}</p>
            </div>
            <div className='flex w-[30rem] items-center justify-between'>
              <p className='font-semibold text-subtle'>Duration</p>
              <p>{(checkDataAvailability && checkDataAvailability[0]?.attributes.duration) ?? '-'}</p>
            </div>
            <Button
              className={clsxm(
                checkDataAvailability && !checkDataAvailability[0]?.attributes.clockOut ? 'w-4 p-[0.8rem]' : 'hidden'
              )}
              onClick={handleShowAttendanceModal}
            >
              Clock Out
            </Button>
          </Fragment>
        )}
      </div>
    </div>
  )
}
