
import { DndContext, DragEndEvent, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import { addDays, endOfDay, format, setHours, setMinutes, startOfDay, startOfWeek } from 'date-fns'
import { useMemo } from 'react'
import { useEventStore } from '../features/events/store'
import { EventChip } from '../components/events/EventChip'
import { EventEditorDrawer } from '../components/events/EventEditorDrawer'

export function WeekView({ date }: { date: Date }) {
  const events = useEventStore(s=>s.events)
  const startDrag = useEventStore(s=>s.startDrag)
  const endDrag = useEventStore(s=>s.endDrag)
  const moveDrag = useEventStore(s=>s.moveDrag)

  const weekStart = useMemo(() => startOfWeek(date, { weekStartsOn: 1 }), [date])
  const days = [...Array(7)].map((_, i) => addDays(weekStart, i))

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  )

  function handleDragEnd(_event: DragEndEvent) {
    endDrag()
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-[60px,repeat(7,1fr)] gap-2 h-full">
        <div />
        {days.map(d => (
          <div key={d.toISOString()} className="text-center text-sm font-medium">{format(d,'EEE d')}</div>
        ))}
        {[...Array(24)].map((_, hour) => (
          <>
            <div key={`lh-${hour}`} className="text-xs opacity-60">{hour}:00</div>
            {days.map(d => {
              const slotStart = setMinutes(setHours(d, hour), 0)
              const slotEnd = setMinutes(setHours(d, hour+1), 0)
              const inThisHour = events.filter(ev => {
                const s = new Date(ev.start); const e = new Date(ev.end)
                return s < slotEnd && e > slotStart
              })
              return (
                <div
                  key={`${d.toISOString()}-${hour}`}
                  className="relative border rounded-xl min-h-[56px] bg-white/60 dark:bg-slate-800/40"
                  onDoubleClick={()=>useEventStore.getState().openNewEvent(slotStart)}
                >
                  <div className="absolute inset-1 flex flex-col gap-1">
                    {inThisHour.map(ev => (
                      <EventChip key={ev.id} id={ev.id} title={ev.title} start={new Date(ev.start)} end={new Date(ev.end)} color={ev.color} />
                    ))}
                  </div>
                </div>
              )
            })}
          </>
        ))}
      </div>
      <EventEditorDrawer />
    </DndContext>
  )
}
