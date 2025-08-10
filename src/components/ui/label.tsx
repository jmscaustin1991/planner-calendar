
import { LabelHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn('text-sm font-medium', className)} {...props} />
}
