
import { useEventStore } from '../features/events/store'
import { useMemo } from 'react'
import { capitalize } from '../lib/text'

const columns = ['backlog','planned','done'] as const

export function PlannerView() {
  const events = useEventStore(s=>s.events)
  const grouped = useMemo(()=>{
    return columns.map(col => ({ col, items: events.filter(e => (e.status||'planned')===col) }))
  }, [events])
  return (
    <div className="grid grid-cols-3 gap-3 h-full">
      {grouped.map(g => (
        <div key={g.col} className="rounded-2xl border p-3 bg-slate-50/50 dark:bg-slate-900/30 overflow-auto">
         <div className="font-semibold mb-2">{capitalize(g.col)}</div>
          <div className="space-y-2">
            {g.items.map(e => (
              <div key={e.id} className="rounded-xl border p-2 bg-white dark:bg-slate-800">
                <div className="font-medium">{e.title}</div>
                <div className="text-xs opacity-70">{new Date(e.start).toLocaleString()} – {new Date(e.end).toLocaleTimeString()}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
