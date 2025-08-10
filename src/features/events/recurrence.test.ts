
import { describe, it, expect } from 'vitest'
import { expandRecurrence } from './recurrence'

describe('expandRecurrence', () => {
  it('handles COUNT and FREQ=DAILY', () => {
    const start = '2025-01-01T09:00:00.000Z'
    const out = expandRecurrence(start, 'FREQ=DAILY;COUNT=3')
    expect(out.length).toBe(3)
  })
})
