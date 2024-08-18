import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { USER_ACCESS_TOKEN } from '@/config/token'
import { usePostLogoutMutation } from '@/services/auth'
import type { LogoutRequest } from '@/types/auth'
import { useAppSelector } from '@/utils/hooks'

import { Button } from '../ui/Button'

export default function Header() {
  const router = useRouter()
  const { id } = useAppSelector((state) => state.auth)

  const [doLogout, { isSuccess: logoutSuccess }] = usePostLogoutMutation()

  const onSubmit = async () => {
    const { data }: LogoutRequest = {
      data: {
        attributes: {
          id: id as string,
        },
      },
    }

    try {
      await doLogout({ data })
    } catch (error) {
      throw new Error('Something happen')
    }
  }

  useEffect(() => {
    if (logoutSuccess) {
      deleteCookie(USER_ACCESS_TOKEN)
      router.push('/login')
    }
  }, [logoutSuccess])

  return (
    <header className='mb-4 inline-flex h-12 w-full items-center text-[16px]'>
      <nav className='w-full'>
        <ul className='w-full text-right font-bold'>
          <li>
            <Button onClick={onSubmit}>Logout</Button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
