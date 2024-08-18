import * as React from 'react'

import clsxm from '@/utils/clsxm'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  required?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      className={clsxm(
        'placeholder:text-placeholder w-full rounded border border-solid border-subtle px-2.5 py-3 placeholder:font-bold focus:border-subtle focus:ring-transparent',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = 'Input'
export { Input }
