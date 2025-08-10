
import { isSameDay, format } from 'date-fns'
import { useEventStore } from '../features/events/store'

export function AgendaView({ date }: { date: Date }) {
  const events = useEventStore(s=>s.events)
  const today = events.filter(e => isSameDay(new Date(e.start), date))
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">{format(date,'EEEE, MMM d')}</h3>
      {today.length===0 && <div className="opacity-70 text-sm">No events.</div>}
      <ul className="space-y-2">
        {today.map(e => (
          <li key={e.id} className="rounded-xl border p-3">
            <div className="font-medium">{e.title}</div>
            <div className="text-sm opacity-70">{format(new Date(e.start),'p')} – {format(new Date(e.end),'p')}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
