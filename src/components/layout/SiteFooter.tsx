import Link from 'next/link'

export function SiteFooter({ location }: { location: string }) {
  return <footer className="site-footer"><span>{location} · 2027</span><nav aria-label="Footer navigation"><Link href="/weekend">Weekend</Link><Link href="/travel">Travel</Link><Link href="/faq">FAQ</Link><Link href="/rsvp">RSVP</Link></nav></footer>
}
