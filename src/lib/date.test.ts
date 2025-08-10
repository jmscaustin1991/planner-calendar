
import { describe, it, expect } from 'vitest'
import { snapToIncrement, moveBy } from './date'

describe('time math', () => {
  it('snaps to 15 min', () => {
    const d = new Date('2025-01-01T09:07:00.000Z')
    const s = snapToIncrement(d, 15)
    expect(s.getMinutes() % 15).toBe(0)
  })

  it('moveBy minutes', () => {
    const d = new Date('2025-01-01T09:00:00.000Z')
    const m = moveBy(d, 30)
    expect(m.getMinutes()).toBe(30)
  })
})
