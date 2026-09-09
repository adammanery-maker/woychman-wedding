import 'server-only'

import { getPayloadClient } from '@/lib/payload'
import { getContentQueryOptions } from './queryOptions'

export async function getFAQPage() {
  const [payload, queryOptions] = await Promise.all([getPayloadClient(), getContentQueryOptions()])
  return payload.findGlobal({ slug: 'faq-page', ...queryOptions })
}
