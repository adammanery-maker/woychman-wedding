import 'server-only'
import { getPayloadClient } from '@/lib/payload'
import { getContentQueryOptions } from './queryOptions'

export async function getRegistries() {
  const [payload, queryOptions] = await Promise.all([getPayloadClient(), getContentQueryOptions()])
  const result = await payload.find({ collection: 'registries', limit: 100, depth: 1, ...queryOptions, sort: 'sortOrder' })
  return result.docs.filter((registry) => registry.active)
}
