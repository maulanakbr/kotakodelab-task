import { getDate, getDateTime } from '@kotakodelab/lib'
import { useEffect, useState } from 'react'

import clsxm from '@/utils/clsxm'

interface ClockProps {
  className?: string
}

export default function Clock({ className }: ClockProps) {
  const [clock, setClock] = useState<string | null>(null)

  useEffect(() => {
    const updateClock = () => {
      setClock(getDateTime(new Date()))
    }

    updateClock()

    const intervalId = setInterval(updateClock, 1000)
    return () => clearInterval(intervalId)
  }, [new Date()])

  return (
    <div className={clsxm('h-full min-w-[20rem] text-left', className)}>
      <p className='text-[42px] font-medium leading-[3.5rem] text-subtle'>{clock}</p>
      <p className='text-[14px]'>{getDate(new Date())}</p>
    </div>
  )
}
