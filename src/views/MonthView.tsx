
import { addDays, endOfMonth, format, startOfMonth } from 'date-fns'

export function MonthView({ date }: { date: Date }) {
  const start = startOfMonth(date)
  const end = endOfMonth(date)
  const days = []
  for (let d = start; d <= end; d = addDays(d,1)) days.push(new Date(d))
  return (
    <div className="grid grid-cols-7 gap-2">
      {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => <div key={d} className="text-center text-xs font-semibold">{d}</div>)}
      {days.map(d => (
        <div key={d.toISOString()} className="border rounded-xl p-2 min-h-[80px]">
          <div className="text-xs opacity-70">{format(d,'d')}</div>
        </div>
      ))}
    </div>
  )
}
