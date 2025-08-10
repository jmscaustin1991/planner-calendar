
import { addDays, addMonths, subDays, subMonths } from 'date-fns'
import { Button } from '../ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSettingsStore } from '../../features/settings/store'
import { capitalize } from '../../lib/text'

export function CalendarHeader({
  view, onViewChange, current, onNavigate, rangeLabel
}: {
  view: 'day'|'week'|'month'|'agenda'|'planner'
  onViewChange: (v: any) => void
  current: Date
  onNavigate: (d: Date) => void
  rangeLabel: string
}) {
  const { theme, setTheme, timezone } = useSettingsStore()
  return (
    <header className="flex items-center gap-2 px-4 py-3 border-b bg-white/60 dark:bg-slate-900/60 backdrop-blur supports-[backdrop-filter]:bg-white/40">
      <div className="flex items-center gap-1">
        <Button aria-label="Previous" onClick={() => onNavigate(view==='month'? subMonths(current,1): subDays(current, view==='week'?7:1))}><ChevronLeft size={16} /></Button>
        <Button aria-label="Next" onClick={() => onNavigate(view==='month'? addMonths(current,1): addDays(current, view==='week'?7:1))}><ChevronRight size={16} /></Button>
        <Button onClick={() => onNavigate(new Date())}>Today</Button>
      </div>
      <div className="text-xl font-semibold ml-2">{rangeLabel}</div>
      <nav className="ml-4 flex gap-1" aria-label="Views">
       {(['day','week','month','agenda','planner'] as const).map(v => (
  <Button key={v} aria-pressed={view===v} onClick={() => onViewChange(v)}>
    {capitalize(v)}
  </Button>
))}
      </nav>
      <div className="ml-auto flex items-center gap-2">
        <select aria-label="Theme" className="rounded-2xl border px-2 py-1 text-sm" value={theme} onChange={e=>setTheme(e.target.value as any)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
        <div aria-label="Timezone" className="text-sm opacity-80">{timezone}</div>
      </div>
    </header>
  )
}
