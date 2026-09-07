import Image from 'next/image'
import type { Media } from '@/payload-types'

export function EditorialImage({ image }: { image: number | Media }) {
  if (typeof image === 'number' || !image.url) return null
  return <figure className="editorial-image"><Image src={image.url} alt={image.alt || ''} width={image.width || 1200} height={image.height || 900} sizes="(max-width: 42rem) 100vw, 60vw" /><figcaption>{image.caption || null}</figcaption></figure>
}
