
import { create } from 'zustand'
import type { Calendar } from './types'

type CalState = {
  calendars: Calendar[]
  toggleVisible: (id: string) => void
}

const initial: Calendar[] = [
  { id: 'c1', name: 'Personal', color: '#5B8DEF', isDefault: true, visible: true },
  { id: 'c2', name: 'Work', color: '#22c55e', visible: true }
]

export const useCalendarStore = create<CalState>((set) => ({
  calendars: initial,
  toggleVisible: (id) => set(s => ({
    calendars: s.calendars.map(c => c.id === id ? { ...c, visible: !c.visible } : c)
  }))
}))
