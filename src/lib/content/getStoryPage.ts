import 'server-only'
import { getPayloadClient } from '@/lib/payload'
import { getContentQueryOptions } from './queryOptions'

export async function getStoryPage() {
  const [payload, queryOptions] = await Promise.all([getPayloadClient(), getContentQueryOptions()])
  return payload.findGlobal({ slug: 'story-page', depth: 2, ...queryOptions })
}
