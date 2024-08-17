import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'

import clsxm from '@/utils/clsxm'

const buttonVariants = cva(
  'inline-flex min-w-24 cursor-pointer justify-center text-center text-[14px] font-semibold transition disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'bg-inverted text-white hover:bg-emphasis hover:text disabled:bg-muted',
        alternative: 'border-2 border-inverted bg-emphasis text hover:bg-inverted hover:text-white disabled:bg-muted',
      },
      size: {
        default: 'rounded-md px-3 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, onClick, variant, size, ...props }, ref) => {
    return (
      <button
        className={clsxm(buttonVariants({ variant, size, className }))}
        onClick={onClick}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export { Button, buttonVariants }
