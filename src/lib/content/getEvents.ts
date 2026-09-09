import 'server-only'
import { getPayloadClient } from '@/lib/payload'
import { getContentQueryOptions } from './queryOptions'
export { sortEventsChronologically, type EventSortItem } from './eventSorting'

export async function getEvents() {
  const [payload, queryOptions] = await Promise.all([getPayloadClient(), getContentQueryOptions()])
  const result = await payload.find({ collection: 'events', depth: 1, limit: 100, ...queryOptions, sort: 'startAt' })
  return result.docs
}
