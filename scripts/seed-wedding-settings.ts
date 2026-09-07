import { getPayload } from 'payload'

import config from '../src/payload.config'

async function seedWeddingSettings() {
  const payload = await getPayload({ config })

  await payload.updateGlobal({
    slug: 'wedding-settings',
    draft: false,
    data: {
      allowSearchIndexing: false,
      city: 'Canmore',
      contactEmail: 'hello@example.com',
      contactName: 'Alex Example',
      country: 'Canada',
      endDate: '2027-07-03T12:00:00.000Z',
      personOneDisplayName: 'Jacey',
      personTwoDisplayName: 'Adam',
      provinceRegion: 'Alberta',
      rsvpButtonLabel: 'RSVP',
      rsvpEnabled: false,
      startDate: '2027-07-03T12:00:00.000Z',
      timezone: 'America/Edmonton',
      _status: 'published',
    },
  })

  await payload.destroy()
}

void seedWeddingSettings()
