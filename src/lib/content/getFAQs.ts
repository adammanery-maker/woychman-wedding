import 'server-only'
import { getPayloadClient } from '@/lib/payload'

export async function getFAQs() {
  const payload = await getPayloadClient()
  const result = await payload.find({ collection: 'faqs', limit: 100, overrideAccess: false, sort: 'sortOrder' })
  return result.docs
}
