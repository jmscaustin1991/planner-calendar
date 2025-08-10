
import { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-2xl border border-transparent bg-brand px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand/50 disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}
