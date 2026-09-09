import type { Metadata } from 'next'

type SiteMetadataSettings = {
  coupleDisplayName: string
  indexingAllowed: boolean
  locationDisplayName: string
  weddingDateDisplay: string
}

export function createSiteMetadata(settings: SiteMetadataSettings): Metadata {
  const description = `${settings.coupleDisplayName}'s wedding in ${settings.locationDisplayName} on ${settings.weddingDateDisplay}.`

  return {
    description,
    openGraph: {
      description,
      title: settings.coupleDisplayName,
      type: 'website',
    },
    robots: {
      follow: settings.indexingAllowed,
      index: settings.indexingAllowed,
    },
    title: settings.coupleDisplayName,
  }
}
