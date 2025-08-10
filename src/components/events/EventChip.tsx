
import { CSSProperties, useCallback, useRef } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { useEventStore } from '../../features/events/store'
import { format } from 'date-fns'
import { Pencil, X } from 'lucide-react'

export function EventChip({ id, title, start, end, color }: { id: string, title: string, start: Date, end: Date, color?: string }) {
  const open = useEventStore(s=>s.openNewEvent)
  const remove = useEventStore(s=>s.remove)
  const startDrag = useEventStore(s=>s.startDrag)
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id })
  const style: CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    borderLeft: `4px solid ${color || '#5B8DEF'}`
  }

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      startDrag(id)
      e.preventDefault()
    }
  }, [id])

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      tabIndex={0}
      onKeyDown={onKeyDown}
      role="button"
      aria-label={`${title} ${format(start,'p')} to ${format(end,'p')}`}
      className="group relative rounded-2xl bg-slate-100 dark:bg-slate-700 px-2 py-1 text-xs shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand/50"
      style={style}
    >
      <div className="font-medium truncate">{title}</div>
      <div className="opacity-70">{format(start,'p')} – {format(end,'p')}</div>
      <div className="absolute right-1 top-1 hidden gap-1 group-hover:flex">
        <button className="p-1" aria-label="Edit"><Pencil size={14} /></button>
        <button className="p-1" aria-label="Delete" onClick={()=>remove(id)}><X size={14} /></button>
      </div>
    </div>
  )
}
