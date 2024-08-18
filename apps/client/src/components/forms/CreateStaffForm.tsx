import { ROLES } from '@kotakodelab/lib'
import { useForm } from 'react-hook-form'

import type { StaffForm } from '@/types/staff' // Assuming StaffForm is `Omit<Staff, 'id'>`

import { Input } from '../ui/Input'
import { Label } from '../ui/Label'

interface StaffFormProps {
  onSubmit: (form: StaffForm) => void
  formId?: string
}

export default function CreateStaffForm({ onSubmit, formId }: StaffFormProps) {
  const { register, handleSubmit } = useForm<StaffForm>({
    mode: 'onChange',
  })

  return (
    <form
      id={formId}
      className='w-full space-y-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex gap-4'>
        <div className='flex flex-col space-y-2'>
          <Label>First Name</Label>
          <Input
            {...register('firstName', { required: 'First name is required!' })}
            id='firstName'
            type='text'
          />
        </div>
        <div className='flex flex-col space-y-2'>
          <Label>Last Name</Label>
          <Input
            {...register('lastName', { required: 'Last name is required!' })}
            id='lastName'
            type='text'
          />
        </div>
      </div>
      <div className='flex gap-4'>
        <div className='flex flex-col space-y-2'>
          <Label>Username</Label>
          <Input
            {...register('username', { required: 'Username is required!' })}
            id='username'
            type='text'
          />
        </div>
        <div className='flex flex-col space-y-2'>
          <Label>Email</Label>
          <Input
            {...register('email', { required: 'Email is required!' })}
            id='email'
            type='email'
          />
        </div>
      </div>
      <div className='flex flex-col space-y-2'>
        <Label>Password</Label>
        <Input
          {...register('password', { required: 'Password is required!' })}
          id='password'
          type='password'
        />
      </div>
      <div className='flex flex-col space-y-2'>
        <Label>Company ID</Label>
        <Input
          {...register('companyId', { required: 'Company ID is required!' })}
          id='companyId'
          type='text'
        />
      </div>
      <div className='flex flex-col space-y-2'>
        <Label>Role</Label>
        <select
          {...register('role', { required: 'Role is required!', valueAsNumber: true })}
          id='role'
          className='rounded border border-solid border-subtle px-2.5 py-3 focus:border-subtle focus:ring-transparent'
        >
          {Object.entries(ROLES).map(([key, value]) => (
            <option
              key={key}
              value={value}
            >
              {key}
            </option>
          ))}
        </select>
      </div>
    </form>
  )
}
