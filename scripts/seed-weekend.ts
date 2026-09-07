import { getPayload } from 'payload'
import config from '../src/payload.config'

async function seedWeekend() {
  const payload = await getPayload({ config })
  const existingVenue = await payload.find({ collection: 'venues', limit: 1, overrideAccess: true })
  const venue = existingVenue.docs[0] ?? await payload.create({ collection: 'venues', overrideAccess: true, draft: false, data: { name: 'Canmore Creekside Hall & Garden', addressLine1: '600 9 St', city: 'Canmore', provinceRegion: 'AB', postalCode: 'T1W 3L9', country: 'Canada', _status: 'published' } })
  if (venue._status !== 'published') await payload.update({ collection: 'venues', id: venue.id, overrideAccess: true, draft: false, data: { _status: 'published' } })
  const existingEvents = await payload.find({ collection: 'events', limit: 100, overrideAccess: true })
  if (existingEvents.docs.length === 0) {
    const entries = [
      ['Ceremony', '2027-07-03T19:00:00.000Z'],
      ['Cocktails and snacks', '2027-07-03T21:00:00.000Z'],
      ['Dinner', '2027-07-04T00:00:00.000Z'],
      ['Dance', '2027-07-04T02:00:00.000Z'],
    ] as const
    for (const [title, startAt] of entries) await payload.create({ collection: 'events', overrideAccess: true, draft: false, data: { title, startAt, venue: venue.id, _status: 'published' } })
  } else for (const event of existingEvents.docs) if (event._status !== 'published') await payload.update({ collection: 'events', id: event.id, overrideAccess: true, draft: false, data: { _status: 'published' } })
  await payload.destroy()
}
void seedWeekend()
