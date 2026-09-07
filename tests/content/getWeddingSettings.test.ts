import { describe, expect, it } from 'vitest'

import { toWeddingSettingsViewModel } from '@/lib/content/weddingSettingsViewModel'

describe('Wedding Settings view model', () => {
  it('derives the public identity from canonical settings fields', () => {
    const result = toWeddingSettingsViewModel({
      allowSearchIndexing: false,
      contactEmail: 'hello@example.com',
      contactName: 'Alex Example',
      contactPhone: null,
      country: 'Canada',
      endDate: '2027-07-18T12:00:00.000Z',
      personOneDisplayName: 'Alex',
      personTwoDisplayName: 'Jamie',
      provinceRegion: 'Alberta',
      rsvpButtonLabel: 'RSVP',
      rsvpDeadline: '2027-06-15T00:00:00.000Z',
      rsvpEnabled: true,
      startDate: '2027-07-16T12:00:00.000Z',
      timezone: 'America/Edmonton',
      city: 'Canmore',
    })

    expect(result.coupleDisplayName).toBe('Alex & Jamie')
    expect(result.locationDisplayName).toBe('Canmore, Alberta, Canada')
    expect(result.weddingDateDisplay).toBe('July 16–18, 2027')
    expect(result.rsvp.enabled).toBe(true)
    expect(result.indexingAllowed).toBe(false)
  })
})
