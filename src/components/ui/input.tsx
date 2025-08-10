
import { InputHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn('w-full rounded-2xl border px-3 py-2 text-sm bg-white dark:bg-slate-900', className)} {...props} />
}
