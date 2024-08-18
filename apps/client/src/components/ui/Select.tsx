import * as React from 'react'

import clsxm from '@/utils/clsxm'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children?: React.ReactNode
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ children, className, ...props }, ref) => {
  return (
    <select
      className={clsxm(
        'rounded border border-solid border-subtle px-2.5 py-3 focus:border-subtle focus:ring-transparent',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  )
})

Select.displayName = 'Select'
export { Select }
