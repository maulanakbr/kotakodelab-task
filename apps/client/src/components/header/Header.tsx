import { deleteCookie } from 'cookies-next'
import Image from 'next/image'
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

  const [doLogout, { isSuccess: logoutSuccess, isLoading: isLoggingOut, isError: logoutError }] =
    usePostLogoutMutation()

  const onSubmit = async () => {
    if (!id) return

    const payload: LogoutRequest = {
      data: {
        attributes: {
          id: id as string,
        },
      },
    }

    try {
      await doLogout(payload).unwrap()
    } catch (error) {
      throw new Error('Logout failed:')
    }
  }

  useEffect(() => {
    if (logoutSuccess) {
      deleteCookie(USER_ACCESS_TOKEN)
      router.push('/login')
    }
  }, [logoutSuccess, router])

  return (
    <header className='mb-4 flex h-16 w-full'>
      <nav className='container mx-auto flex items-center justify-between'>
        <div>
          <Image
            src='/logo.png'
            alt='Company Logo'
            width={100}
            height={100}
            priority
          />
        </div>

        <div>
          <Button
            onClick={onSubmit}
            disabled={isLoggingOut}
            className='text-sm font-semibold'
          >
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </Button>
        </div>
      </nav>
      {logoutError && <p className='mt-2 text-center text-red-500'>Something went wrong. Please try again.</p>}
    </header>
  )
}
