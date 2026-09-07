import 'server-only'
import { getPayloadClient } from '@/lib/payload'

export async function getRegistryPage() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'registry-page', overrideAccess: false })
}
