import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { USER_ACCESS_TOKEN } from '@/config/token'
import MobileLayout from '@/layouts/MobileLayout'
import { usePostLoginMutation } from '@/services/auth'
import { AuthForm } from '@/types/auth'

const Login = () => {
  const router = useRouter()

  const { register, handleSubmit } = useForm<AuthForm>({
    mode: 'onChange',
  })

  const [doLogin, { isSuccess, data: authData }] = usePostLoginMutation()

  const onSubmit = async (authForm: AuthForm) => {
    const payload = {
      data: {
        attributes: { ...authForm },
      },
    }

    await doLogin(payload)
  }

  useEffect(() => {
    if (isSuccess && authData) {
      if (authData.data.length > 0) {
        const {
          attributes: { accessToken },
        } = authData.data[0]

        setCookie(USER_ACCESS_TOKEN, accessToken)
      }

      router.push('/')
    }
  }, [isSuccess, authData])

  return (
    <MobileLayout title='Login'>
      <div className='min-w-screen flex min-h-screen grow flex-col items-center justify-center space-y-10 px-10'>
        <h1 className='text-[24px]'>Welcome to HR System</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex w-full flex-col space-y-5'
        >
          <div className='flex flex-col space-y-2'>
            <Label
              htmlFor='username'
              className='text-sm font-semibold text-black'
            >
              Username
            </Label>

            <Input
              {...register('username', { required: 'Username is required!' })}
              id='username'
              type='text'
              className='placeholder:text-placeholder w-full rounded border border-solid border-[#EAEAEA] px-2.5 py-3 text-sm font-semibold text-black placeholder:font-bold focus:border-[#EAEAEA] focus:ring-transparent'
            />
          </div>

          <div className='flex flex-col space-y-2'>
            <Label
              htmlFor='password'
              className='text-sm font-semibold text-black'
            >
              Password
            </Label>

            <Input
              {...register('password', { required: 'Password is required!' })}
              id='password'
              type='password'
              className='placeholder:text-placeholder w-full rounded border border-solid border-[#EAEAEA] px-2.5 py-3 text-sm font-semibold text-black placeholder:font-bold focus:border-[#EAEAEA] focus:ring-transparent'
            />
          </div>

          <Button>Login</Button>
        </form>
      </div>
    </MobileLayout>
  )
}

export default Login
