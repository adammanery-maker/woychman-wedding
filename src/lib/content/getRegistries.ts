import 'server-only'
import { getPayloadClient } from '@/lib/payload'

export async function getRegistries() {
  const payload = await getPayloadClient()
  const result = await payload.find({ collection: 'registries', limit: 100, depth: 1, overrideAccess: false, sort: 'sortOrder' })
  return result.docs.filter((registry) => registry.active)
}
