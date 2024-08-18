import { type LucideProps, CheckCheck, Pencil, X } from 'lucide-react'

export const Icons = {
  Close: (props: LucideProps) => <X {...props} />,
  Check: (props: LucideProps) => <CheckCheck {...props} />,
  Pencil: (props: LucideProps) => <Pencil {...props} />,
}
