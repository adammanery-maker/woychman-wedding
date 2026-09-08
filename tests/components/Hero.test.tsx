import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Hero } from '@/components/home/Hero'

vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}))

vi.mock('next/link', () => ({
  default: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props}>{children}</a>,
}))

const action = { kind: 'weekend' as const, label: 'Weekend details', href: '/weekend' }

describe('Hero', () => {
  it('renders an uploaded hero video with an accessible pause control', () => {
    render(
      <Hero
        image={{ url: '/proposal-poster.jpg', alt: 'Jacey and Adam' } as never}
        video={{ url: '/proposal.mp4', mimeType: 'video/mp4' } as never}
        action={action}
        heading="Jacey & Adam"
      />,
    )

    const video = screen.getByTestId('hero-video') as HTMLVideoElement
    expect(video.querySelector('source')?.getAttribute('src')).toBe('/proposal.mp4')
    expect(video.getAttribute('poster')).toBe('/proposal-poster.jpg')
    expect(video.autoplay).toBe(true)
    expect(video.muted).toBe(true)
    expect(video.loop).toBe(true)
    expect(screen.getByRole('button', { name: 'Play hero video' })).toBeTruthy()

    fireEvent(video, new Event('play'))
    expect(screen.getByRole('button', { name: 'Pause hero video' })).toBeTruthy()
  })
})
