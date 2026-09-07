import 'server-only'
import { getPayloadClient } from '@/lib/payload'

export async function getAnnouncement() {
  const payload = await getPayloadClient()
  const announcement = await payload.findGlobal({ slug: 'announcement', overrideAccess: false })
  if (!announcement.enabled || !announcement.message) return null
  return { message: announcement.message, tone: announcement.tone, linkLabel: announcement.linkLabel, linkURL: announcement.linkURL }
}
