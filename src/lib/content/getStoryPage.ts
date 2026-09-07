import 'server-only'
import { getPayloadClient } from '@/lib/payload'

export async function getStoryPage() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'story-page', depth: 2, overrideAccess: false })
}
