import { useGetCompanyQuery } from '@/services/company'

interface MutualStaffProps {
  companyId: string
}

export default function MutualStaff({ companyId }: MutualStaffProps) {
  const { data: companyData } = useGetCompanyQuery({ companyId })

  return (
    <div className='mb-8 h-full max-w-full'>
      <h3 className='text-[24px] font-bold leading-[3rem]'>Mutual Staff</h3>
      <div className='flex gap-3'>
        {companyData?.data[0]?.attributes?.staffs?.map((staff) => (
          <span
            key={staff.id}
            className='w-[6rem] max-w-[10rem] rounded-[18px] bg-inverted p-3 text-center text-white shadow-md'
          >
            <p>{`${staff.firstName[0]} ${staff.lastName[0]}`}</p>
          </span>
        ))}
      </div>
    </div>
  )
}
