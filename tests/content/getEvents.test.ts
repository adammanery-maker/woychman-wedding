import { describe, expect, it } from 'vitest'

import { sortEventsChronologically } from '@/lib/content/eventSorting'

describe('event ordering', () => {
  it('orders events by their canonical start time', () => {
    expect(
      sortEventsChronologically([
        { id: 2, startAt: '2027-07-03T22:00:00.000Z' },
        { id: 1, startAt: '2027-07-03T20:00:00.000Z' },
      ]),
    ).toEqual([
      { id: 1, startAt: '2027-07-03T20:00:00.000Z' },
      { id: 2, startAt: '2027-07-03T22:00:00.000Z' },
    ])
  })
})
