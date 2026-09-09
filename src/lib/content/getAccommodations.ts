import 'server-only'
import { getPayloadClient } from '@/lib/payload'
import { getContentQueryOptions } from './queryOptions'

export async function getAccommodations() {
  const [payload, queryOptions] = await Promise.all([getPayloadClient(), getContentQueryOptions()])
  const result = await payload.find({ collection: 'accommodations', limit: 100, ...queryOptions, sort: 'sortOrder' })
  return result.docs.filter((accommodation) => accommodation.active)
}
