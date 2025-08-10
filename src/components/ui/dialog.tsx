
import { ReactNode } from 'react'

export function Dialog({ open, onClose, children }: { open: boolean, onClose: () => void, children: ReactNode }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div role="dialog" aria-modal="true" className="relative z-10 w-full max-w-lg rounded-2xl bg-white dark:bg-slate-800 p-4 shadow-lg">
        {children}
      </div>
    </div>
  )
}
