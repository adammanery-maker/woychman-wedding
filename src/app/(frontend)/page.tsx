import { WeddingIdentity } from '@/components/home/WeddingIdentity'
import { Hero } from '@/components/home/Hero'
import { HomeIntroduction } from '@/components/home/HomeIntroduction'
import { HomeGuestLinks } from '@/components/home/HomeGuestLinks'
import { RibbonDivider } from '@/components/ui/RibbonDivider'
import { getHomepage } from '@/lib/content/getHomepage'
import { getWeddingSettings } from '@/lib/content/getWeddingSettings'

export default async function HomePage() {
  const [settings, homepage] = await Promise.all([getWeddingSettings(), getHomepage()])

  return (
    <main className="page-main home-page">
      <Hero image={homepage.heroImage} video={homepage.heroVideo} action={homepage.action} secondaryAction={homepage.secondaryActionResolved} heading={homepage.welcomeHeading || settings.coupleDisplayName} />
      <WeddingIdentity
        coupleDisplayName={settings.coupleDisplayName}
        locationDisplayName={settings.locationDisplayName}
        weddingDateDisplay={settings.weddingDateDisplay}
      />
      <RibbonDivider />
      <HomeIntroduction eyebrow={homepage.eyebrow} heading={homepage.welcomeHeading} introduction={homepage.introduction} />
      <HomeGuestLinks />
    </main>
  )
}
