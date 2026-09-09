import type { Metadata } from 'next'
import { Beth_Ellen } from 'next/font/google'
import type { ReactNode } from 'react'
import { getWeddingSettings } from '@/lib/content/getWeddingSettings'
import { getAnnouncement } from '@/lib/content/getAnnouncement'
import { getStoryPage } from '@/lib/content/getStoryPage'
import { getRegistryPage } from '@/lib/content/getRegistryPage'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { AnnouncementBanner } from '@/components/layout/AnnouncementBanner'
import '@/styles/globals.css'

const bethEllen = Beth_Ellen({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-beth-ellen',
  weight: '400',
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getWeddingSettings()
  return { description: `Wedding details for ${settings.coupleDisplayName}.`, title: settings.coupleDisplayName }
}

export const dynamic = 'force-dynamic'

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const [settings, announcement, story, registry] = await Promise.all([getWeddingSettings(), getAnnouncement(), getStoryPage(), getRegistryPage()])

  return (
    <html lang="en">
      <body className={bethEllen.variable} suppressHydrationWarning>
        <div className="site-shell">
          <SiteHeader names={settings.coupleDisplayName} eventMeta={`${settings.locationDisplayName} · ${settings.weddingDateDisplay}`} rsvpEnabled={settings.rsvp.enabled} showStory={story.enabled === true} showRegistry={registry.enabled === true} />
          <AnnouncementBanner announcement={announcement} />
          {children}
          <SiteFooter names={settings.coupleDisplayName} location={settings.locationDisplayName} />
        </div>
      </body>
    </html>
  )
}
