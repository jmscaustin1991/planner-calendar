
import { useEffect, useMemo, useState } from 'react'
import { addDays, format, startOfWeek } from 'date-fns'
import { CalendarHeader } from './components/header/CalendarHeader'
import { LeftRail } from './components/left-rail/LeftRail'
import { DayView } from './views/DayView'
import { WeekView } from './views/WeekView'
import { MonthView } from './views/MonthView'
import { AgendaView } from './views/AgendaView'
import { PlannerView } from './views/PlannerView'
import { useSettingsStore } from './features/settings/store'
import { cn } from './lib/cn'

type View = 'day' | 'week' | 'month' | 'agenda' | 'planner'

export default function App() {
  const [view, setView] = useState<View>('week')
  const [current, setCurrent] = useState(new Date())
  const tz = useSettingsStore(s => s.timezone)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', useSettingsStore.getState().theme === 'dark')
  }, [])

  const weekStart = useMemo(() => startOfWeek(current, { weekStartsOn: 1 }), [current])
  const rangeLabel = useMemo(() => {
    if (view === 'day') return format(current, 'EEE, MMM d')
    if (view === 'week') return `${format(weekStart, 'MMM d')} – ${format(addDays(weekStart, 6), 'MMM d, yyyy')}`
    if (view === 'month') return format(current, 'MMMM yyyy')
    return format(current, 'MMM d, yyyy')
  }, [view, current, weekStart])

  return (
    <div className={cn('h-full grid grid-rows-[auto,1fr]')}>
      <CalendarHeader
        view={view}
        onViewChange={setView}
        current={current}
        onNavigate={setCurrent}
        rangeLabel={rangeLabel}
      />
      <div className="grid grid-cols-[260px,1fr] h-full">
        <LeftRail onJumpToDate={setCurrent} />
        <main className="p-4 overflow-hidden">
          {view === 'day' && <DayView date={current} />}
          {view === 'week' && <WeekView date={current} />}
          {view === 'month' && <MonthView date={current} />}
          {view === 'agenda' && <AgendaView date={current} />}
          {view === 'planner' && <PlannerView />}
        </main>
      </div>
    </div>
  )
}
