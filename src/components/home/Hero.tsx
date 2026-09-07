import Image from 'next/image'
import Link from 'next/link'
import type { Media } from '@/payload-types'
import type { HomepageAction } from '@/lib/content/homepageAction'

export function Hero({ image, action, heading }: { image?: number | Media | null; action: HomepageAction; heading?: string | null }) {
  const media = typeof image === 'object' && image ? image : null
  return <section className="hero" aria-labelledby={heading ? 'hero-heading' : undefined}>{media?.url ? <div className="hero-image"><Image src={media.url} alt={media.alt || ''} fill priority sizes="(max-width: 42rem) 100vw, 70vw" /></div> : <div className="hero-placeholder" aria-hidden="true" />}{<div className="hero-copy">{heading ? <h1 id="hero-heading">{heading}</h1> : null}<Link className="rsvp-link" href={action.href}>{action.label}</Link></div>}</section>
}
