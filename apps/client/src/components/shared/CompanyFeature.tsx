import { useGetCompanyQuery } from '@/services/company'

interface CompanyFeatureProps {
  companyId: string
}

export default function CompanyFeature({ companyId }: CompanyFeatureProps) {
  const { data: companyData } = useGetCompanyQuery({ companyId })
  return (
    <div className='mb-8 flex h-60 w-full flex-col justify-center rounded-[18px] bg-emphasis px-8'>
      <h3 className='text-[42px] font-bold leading-none text-emphasis'>{companyData?.data[0].attributes.name}</h3>
      {/* <p className='text-[24px]'>{titleCase(currentRole?.toLowerCase())}</p> */}
    </div>
  )
}
