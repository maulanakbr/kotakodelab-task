import { useGetCompanyQuery } from '@/services/company'
import clsxm from '@/utils/clsxm'
import { titleCase } from '@kotakodelab/lib'

interface CompanyFeatureProps {
  className?: string
  companyId: string
}

export default function CompanyFeature({ className, companyId }: CompanyFeatureProps) {
  const { data: companyData } = useGetCompanyQuery({ companyId })

  return (
    <div className={clsxm('h-full max-w-full', className)}>
      <h3 className='text-left font-poppins text-[42px] font-bold leading-[3.5rem] text-emphasis'>
        {companyData?.data[0].attributes.name ?? ''}
      </h3>
      <p className='text-[14px] leading-[1.25rem] tracking-normal'>
        {titleCase(companyData?.data[0].attributes.description ?? '')}
      </p>
    </div>
  )
}
