import 'server-only'

import { getPayloadClient } from '@/lib/payload'
import { toWeddingSettingsViewModel, type WeddingSettingsViewModel } from './weddingSettingsViewModel'
import { getContentQueryOptions } from './queryOptions'

export type { WeddingSettingsViewModel } from './weddingSettingsViewModel'

export async function getWeddingSettings(): Promise<WeddingSettingsViewModel> {
  const [payload, queryOptions] = await Promise.all([getPayloadClient(), getContentQueryOptions()])
  const settings = await payload.findGlobal({ slug: 'wedding-settings', ...queryOptions })

  return toWeddingSettingsViewModel(settings)
}
