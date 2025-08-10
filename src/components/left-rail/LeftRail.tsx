
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { useCalendarStore } from '../../features/calendars/store'
import { useEventStore } from '../../features/events/store'
import { format } from 'date-fns'

export function LeftRail({ onJumpToDate }: { onJumpToDate: (d: Date)=>void }) {
  const cals = useCalendarStore(s=>s.calendars)
  const toggle = useCalendarStore(s=>s.toggleVisible)
  const create = useEventStore(s=>s.openNewEvent)
  return (
    <aside className="h-full border-r bg-slate-50/60 dark:bg-slate-950/40 p-3 overflow-auto">
      <Card className="mb-3">
        <div className="text-sm font-semibold mb-2">Calendars</div>
        <ul className="space-y-1">
          {cals.map(c => (
            <li key={c.id} className="flex items-center gap-2">
              <input type="checkbox" checked={c.visible!==false} onChange={()=>toggle(c.id)} aria-label={`Toggle ${c.name}`} />
              <span className="inline-flex items-center gap-2">
                <span className="w-3 h-3 rounded" style={{ backgroundColor: c.color }} />
                {c.name}
              </span>
            </li>
          ))}
        </ul>
      </Card>
      <Card>
        <div className="text-sm font-semibold mb-2">Quick actions</div>
        <div className="flex gap-2">
          <Button onClick={()=>create(new Date())}>New event</Button>
          <Button onClick={()=>onJumpToDate(new Date())}>Jump to Today</Button>
        </div>
        <div className="text-xs mt-2 opacity-70">Local time: {format(new Date(),'p')}</div>
      </Card>
    </aside>
  )
}
