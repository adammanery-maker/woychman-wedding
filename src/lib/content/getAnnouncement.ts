import 'server-only'
import { getPayloadClient } from '@/lib/payload'
import { getContentQueryOptions } from './queryOptions'

export async function getAnnouncement() {
  const [payload, queryOptions] = await Promise.all([getPayloadClient(), getContentQueryOptions()])
  const announcement = await payload.findGlobal({ slug: 'announcement', ...queryOptions })
  if (!announcement.enabled || !announcement.message) return null
  return { message: announcement.message, tone: announcement.tone, linkLabel: announcement.linkLabel, linkURL: announcement.linkURL }
}
