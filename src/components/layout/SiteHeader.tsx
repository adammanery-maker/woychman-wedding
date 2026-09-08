import Link from 'next/link'

export function SiteHeader({ names, eventMeta, rsvpEnabled, showStory, showRegistry }: { names: string; eventMeta: string; rsvpEnabled: boolean; showStory: boolean; showRegistry: boolean }) {
  const links = <><Link href="/weekend">Weekend</Link><Link href="/travel">Travel &amp; Stay</Link><Link href="/faq">FAQ</Link>{showStory ? <Link href="/story">Our Story</Link> : null}{showRegistry ? <Link href="/registry">Registry</Link> : null}</>
  return <header className="site-header"><Link className="site-name" href="/">{names}<small>{eventMeta}</small></Link><nav className="site-nav" aria-label="Main navigation">{links}</nav><details className="mobile-nav"><summary>Menu</summary><nav aria-label="Mobile navigation">{links}</nav></details>{rsvpEnabled ? <Link className="rsvp-link" href="/rsvp">RSVP</Link> : null}</header>
}
