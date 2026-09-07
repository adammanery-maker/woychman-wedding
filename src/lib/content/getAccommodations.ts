import 'server-only'
import { getPayloadClient } from '@/lib/payload'

export async function getAccommodations() {
  const payload = await getPayloadClient()
  const result = await payload.find({ collection: 'accommodations', limit: 100, overrideAccess: false, sort: 'sortOrder' })
  return result.docs.filter((accommodation) => accommodation.active)
}
