import 'server-only'
import { getPayloadClient } from '@/lib/payload'
export { sortEventsChronologically, type EventSortItem } from './eventSorting'

export async function getEvents() {
  const payload = await getPayloadClient()
  const result = await payload.find({ collection: 'events', depth: 1, limit: 100, overrideAccess: false, sort: 'startAt' })
  return result.docs
}
