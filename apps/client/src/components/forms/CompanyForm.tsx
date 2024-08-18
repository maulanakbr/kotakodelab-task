import { useForm } from 'react-hook-form'

import type { Company, CompanyForm } from '@/types/company'

import { Input } from '../ui/Input'
import { Label } from '../ui/Label'

interface CompanyFormProps {
  data?: Company
  onSubmit: (form: CompanyForm) => void
  formId?: string
}

export default function CompanyForm({ data, onSubmit, formId }: CompanyFormProps) {
  const { register, handleSubmit } = useForm<CompanyForm>({
    mode: 'onChange',
    defaultValues: {
      name: (data && data.name) || '',
      description: (data && data.description) || '',
      address: (data && data.address) || '',
      city: (data && data.city) || '',
    },
  })

  return (
    <form
      id={formId}
      className='flex w-full flex-col space-y-5'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex flex-col space-y-2'>
        <Label>Name</Label>
        <Input
          {...register('name', { required: 'Name is required!' })}
          id='name'
          type='text'
        />
      </div>
      <div className='flex flex-col space-y-2'>
        <Label>Description</Label>
        <Input
          {...register('description')}
          id='description'
          type='text'
        />
      </div>
      <div className='flex flex-col space-y-2'>
        <Label>Address</Label>
        <Input
          {...register('address', { required: 'Address is required!' })}
          id='address'
          type='text'
        />
      </div>
      <div className='flex flex-col space-y-2'>
        <Label>City</Label>
        <Input
          {...register('city', { required: 'City is required!' })}
          id='city'
          type='text'
        />
      </div>
    </form>
  )
}
