
import { addMinutes, differenceInMinutes, set } from 'date-fns'

export const SNAP_MIN = 15

export function snapToIncrement(date: Date, increment = SNAP_MIN) {
  const minutes = date.getMinutes()
  const snapped = Math.round(minutes / increment) * increment
  return set(date, { minutes: snapped, seconds: 0, milliseconds: 0 })
}

export function moveBy(date: Date, minutes: number) {
  return addMinutes(date, minutes)
}

export function durationMinutes(start: Date, end: Date) {
  return Math.max(0, differenceInMinutes(end, start))
}
