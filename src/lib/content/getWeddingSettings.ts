import 'server-only'

import { getPayloadClient } from '@/lib/payload'
import { toWeddingSettingsViewModel, type WeddingSettingsViewModel } from './weddingSettingsViewModel'

export type { WeddingSettingsViewModel } from './weddingSettingsViewModel'

export async function getWeddingSettings(): Promise<WeddingSettingsViewModel> {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'wedding-settings', overrideAccess: false })

  return toWeddingSettingsViewModel(settings)
}
