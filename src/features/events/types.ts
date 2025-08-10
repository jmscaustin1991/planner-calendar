
export type EventStatus = 'backlog'|'planned'|'done'

export type Event = {
  id: string
  calendarId: string
  title: string
  description?: string
  location?: string
  tags?: string[]
  color?: string
  start: string // ISO
  end: string   // ISO
  allDay?: boolean
  recurrence?: string // RRULE
  exceptions?: string[] // ISO dates excluded
  status?: EventStatus
  createdAt: string
  updatedAt: string
}
