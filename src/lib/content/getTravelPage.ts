import 'server-only'
import { getPayloadClient } from '@/lib/payload'

export async function getTravelPage() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'travel-page', overrideAccess: false })
}
