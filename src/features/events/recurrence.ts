
import { addDays, addWeeks, addMonths, isBefore, isEqual, startOfDay } from 'date-fns'

/** Very small RRULE subset: FREQ=DAILY|WEEKLY|MONTHLY;COUNT=n */
export function expandRecurrence(startISO: string, rrule?: string, untilISO?: string): string[] {
  if (!rrule) return [startISO]
  const start = new Date(startISO)
  const until = untilISO ? new Date(untilISO) : addMonths(start, 6)
  const out: string[] = [start.toISOString()]
  const parts = Object.fromEntries(rrule.split(';').map(p => p.split('=')))
  const freq = (parts['FREQ'] || 'DAILY').toUpperCase()
  const count = parts['COUNT'] ? parseInt(parts['COUNT']) : 50

  let cur = start
  for (let i = 1; i < count; i++) {
    if (freq === 'DAILY') cur = addDays(cur, 1)
    else if (freq === 'WEEKLY') cur = addWeeks(cur, 1)
    else cur = addMonths(cur, 1)
    if (isBefore(cur, until) || isEqual(startOfDay(cur), startOfDay(until))) {
      out.push(cur.toISOString())
    } else break
  }
  return out
}
