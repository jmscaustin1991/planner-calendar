
import { create } from 'zustand'
import type { Event } from './types'
import { snapToIncrement, moveBy } from '../../lib/date'
import { nanoid } from '../util/nanoid'

type State = {
  events: Event[]
  draggingId?: string
  editing?: Event | null
  openNewEvent: (start: Date) => void
  save: (e: Partial<Event>) => void
  remove: (id: string) => void
  startDrag: (id: string) => void
  moveDrag: (minutes: number) => void
  endDrag: () => void
}

function nowISO() { return new Date().toISOString() }

const initial: Event[] = []

export const useEventStore = create<State>((set, get) => ({
  events: initial,
  editing: null,
  openNewEvent: (start: Date) => {
    const s = snapToIncrement(start)
    const e = moveBy(new Date(s), 60)
    set({ editing: {
      id: nanoid(), calendarId: 'c1', title: 'New event',
      start: s.toISOString(), end: e.toISOString(),
      status: 'planned', createdAt: nowISO(), updatedAt: nowISO()
    } as Event })
  },
  save: (e) => {
    const current = get().events
    const exists = current.find(x => x.id === e.id)
    if (exists) {
      const updated = { ...exists, ...e, updatedAt: nowISO() } as Event
      set({ events: current.map(x => x.id===updated.id? updated : x), editing: null })
    } else {
      const toAdd = {
        id: e.id || nanoid(),
        calendarId: e.calendarId || 'c1',
        title: e.title || 'Untitled',
        start: e.start!, end: e.end!,
        allDay: e.allDay || false,
        status: e.status || 'planned',
        createdAt: nowISO(), updatedAt: nowISO()
      } as Event
      set({ events: [...current, toAdd], editing: null })
    }
  },
  remove: (id) => set({ events: get().events.filter(e => e.id !== id) }),
  draggingId: undefined,
  startDrag: (id) => set({ draggingId: id }),
  moveDrag: (minutes) => {
    const { draggingId, events } = get()
    if (!draggingId) return
    set({
      events: events.map(ev => ev.id === draggingId ? ({
        ...ev,
        start: new Date(new Date(ev.start).getTime() + minutes*60_000).toISOString(),
        end: new Date(new Date(ev.end).getTime() + minutes*60_000).toISOString(),
        updatedAt: nowISO()
      }) : ev)
    })
  },
  endDrag: () => set({ draggingId: undefined })
}))
