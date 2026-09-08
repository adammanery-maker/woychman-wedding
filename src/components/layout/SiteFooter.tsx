import Link from 'next/link'

export function SiteFooter({ names, location }: { names: string; location: string }) {
  return <footer className="site-footer"><div><strong>{names}</strong><span>{location}</span></div><nav aria-label="Footer navigation"><Link href="/weekend">Weekend</Link><Link href="/travel">Travel</Link><Link href="/faq">FAQ</Link><Link href="/rsvp">RSVP</Link></nav></footer>
}
