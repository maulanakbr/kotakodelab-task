import { useForm } from 'react-hook-form'

import type { Staff, StaffUpdateForm } from '@/types/staff'

import { Input } from '../ui/Input'
import { Label } from '../ui/Label'

interface StaffFormProps {
  data?: Pick<Staff, 'username'>
  onSubmit: (form: StaffUpdateForm) => void
  formId?: string
}

export default function StaffForm({ data, onSubmit, formId }: StaffFormProps) {
  const { register, handleSubmit } = useForm<StaffUpdateForm>({
    mode: 'onChange',
    defaultValues: {
      username: data && data.username,
    },
  })

  return (
    <form
      id={formId}
      className='w-full'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex flex-col space-y-2'>
        <Label>Username</Label>
        <Input
          {...register('username', { required: 'Username is required!' })}
          id='username'
          type='text'
        />
      </div>
    </form>
  )
}
