
import { SelectHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn('w-full rounded-2xl border px-3 py-2 text-sm bg-white dark:bg-slate-900', className)} {...props} />
}
