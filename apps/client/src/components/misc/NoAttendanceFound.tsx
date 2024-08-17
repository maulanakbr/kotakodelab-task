import { Button } from '../ui/Button'

interface NoAttendanceProps {
  handleShowClockInModal: () => void
}

export default function NoAttendanceFound({ handleShowClockInModal }: NoAttendanceProps) {
  return (
    <div className='flex min-w-full flex-col items-center justify-center gap-4 rounded-[10px]'>
      <p className='text-[14px] leading-5 tracking-normal'>No attendance record found</p>
      <Button
        className='w-4 p-[0.8rem]'
        onClick={handleShowClockInModal}
      >
        Clock In
      </Button>
    </div>
  )
}
