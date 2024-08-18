import * as React from 'react'

import clsxm from '@/utils/clsxm'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ children, className, ...props }, ref) => {
  return (
    <label
      className={clsxm('text-sm font-semibold', className)}
      ref={ref}
      {...props}
    >
      {children}
    </label>
  )
})

Label.displayName = 'Label'
export { Label }
