import { WeddingIdentity } from '@/components/home/WeddingIdentity'
import { Hero } from '@/components/home/Hero'
import { HomeIntroduction } from '@/components/home/HomeIntroduction'
import { HomeGuestLinks } from '@/components/home/HomeGuestLinks'
import { getHomepage } from '@/lib/content/getHomepage'
import { getWeddingSettings } from '@/lib/content/getWeddingSettings'

export default async function HomePage() {
  const [settings, homepage] = await Promise.all([getWeddingSettings(), getHomepage()])

  return (
    <main className="page-main">
      <Hero image={homepage.heroImage} video={homepage.heroVideo} action={homepage.action} heading={homepage.welcomeHeading || settings.coupleDisplayName} />
      <WeddingIdentity
        coupleDisplayName={settings.coupleDisplayName}
        locationDisplayName={settings.locationDisplayName}
        weddingDateDisplay={settings.weddingDateDisplay}
      />
      <HomeIntroduction eyebrow={homepage.eyebrow} heading={homepage.welcomeHeading} introduction={homepage.introduction} />
      <HomeGuestLinks />
    </main>
  )
}
