import 'server-only'
import { getPayloadClient } from '@/lib/payload'
import { getContentQueryOptions } from './queryOptions'

export async function getFAQs() {
  const [payload, queryOptions] = await Promise.all([getPayloadClient(), getContentQueryOptions()])
  const result = await payload.find({ collection: 'faqs', limit: 100, ...queryOptions, sort: 'sortOrder' })
  return result.docs
}
