import 'server-only'

import { draftMode } from 'next/headers'

/**
 * Public content is published-only by default. Payload's preview route enables
 * Next draft mode for authenticated administrators, which opts these queries
 * into the latest draft while preserving normal access control everywhere else.
 */
export async function getContentQueryOptions() {
  const { isEnabled } = await draftMode()

  return {
    draft: isEnabled,
    overrideAccess: isEnabled,
  } as const
}
