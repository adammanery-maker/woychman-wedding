import Link from 'next/link'

export function AnnouncementBanner({ announcement }: { announcement: { message: string; tone?: string | null; linkLabel?: string | null; linkURL?: string | null } | null }) {
  if (!announcement) return null
  return <aside className="announcement" data-tone={announcement.tone || 'information'} role="status">{announcement.message}{announcement.linkLabel && announcement.linkURL ? <> {' '}<Link href={announcement.linkURL}>{announcement.linkLabel}</Link></> : null}</aside>
}
