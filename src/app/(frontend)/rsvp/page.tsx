import { RSVPFlow } from '@/components/rsvp/RSVPFlow'
import { getWeddingSettings } from '@/lib/content/getWeddingSettings'

export default async function RSVPPage({ searchParams }: { searchParams: Promise<{ invite?: string }> }) {
  const settings = await getWeddingSettings()
  const { invite } = await searchParams
  return <main className="page-main"><header className="page-intro"><p className="eyebrow">{settings.coupleDisplayName}</p><h1>RSVP</h1><p>Please reply for everyone listed on your invitation. Your answers can be updated later if plans change.</p></header><RSVPFlow initialCode={invite} /></main>
}
