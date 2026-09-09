import 'server-only'
import { getPayloadClient } from '@/lib/payload'
import { resolveHomepageAction, resolveSecondaryHomepageAction } from './homepageAction'
import { getWeddingSettings } from './getWeddingSettings'
import { getContentQueryOptions } from './queryOptions'

export async function getHomepage() {
  const [payload, settings, queryOptions] = await Promise.all([getPayloadClient(), getWeddingSettings(), getContentQueryOptions()])
  const homepage = await payload.findGlobal({ slug: 'homepage', depth: 1, ...queryOptions })
  return { ...homepage, action: resolveHomepageAction({ primaryAction: homepage.primaryAction, customActionLabel: homepage.customActionLabel, customActionURL: homepage.customActionURL, rsvpEnabled: settings.rsvp.enabled }), secondaryActionResolved: resolveSecondaryHomepageAction(homepage.secondaryAction), settings }
}
