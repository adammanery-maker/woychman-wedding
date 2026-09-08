import 'server-only'
import { getPayloadClient } from '@/lib/payload'
import { resolveHomepageAction, resolveSecondaryHomepageAction } from './homepageAction'
import { getWeddingSettings } from './getWeddingSettings'

export async function getHomepage() {
  const [payload, settings] = await Promise.all([getPayloadClient(), getWeddingSettings()])
  const homepage = await payload.findGlobal({ slug: 'homepage', depth: 1, overrideAccess: false })
  return { ...homepage, action: resolveHomepageAction({ primaryAction: homepage.primaryAction, customActionLabel: homepage.customActionLabel, customActionURL: homepage.customActionURL, rsvpEnabled: settings.rsvp.enabled }), secondaryActionResolved: resolveSecondaryHomepageAction(homepage.secondaryAction), settings }
}
