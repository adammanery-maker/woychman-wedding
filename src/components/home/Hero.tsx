'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { Media } from '@/payload-types'
import type { HomepageAction } from '@/lib/content/homepageAction'

type HeroProps = {
  image?: number | Media | null
  video?: number | Media | null
  action: HomepageAction
  heading?: string | null
}

export function Hero({ image, video, action, heading }: HeroProps) {
  const media = typeof image === 'object' && image ? image : null
  const videoMedia = typeof video === 'object' && video && video.mimeType?.startsWith('video/') ? video : null
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (!window.matchMedia) return
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)
    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)
    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      videoRef.current?.pause()
      setIsPlaying(false)
      setIsMuted(true)
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement || prefersReducedMotion) return

    videoElement.muted = true
    setIsMuted(true)
    try {
      const playback = videoElement.play()
      playback?.catch(() => setIsPlaying(false))
    } catch {
      setIsPlaying(false)
    }
  }, [prefersReducedMotion, videoMedia?.url])

  const toggleVideo = () => {
    const videoElement = videoRef.current
    if (!videoElement) return

    if (isPlaying) {
      videoElement.pause()
      return
    }

    try {
      const playback = videoElement.play()
      playback?.catch(() => setIsPlaying(false))
    } catch {
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const nextMuted = !isMuted
    videoElement.muted = nextMuted
    setIsMuted(nextMuted)

    if (!nextMuted && videoElement.paused) {
      try {
        const playback = videoElement.play()
        playback?.catch(() => setIsPlaying(false))
      } catch {
        setIsPlaying(false)
      }
    }
  }

  return <section className="hero" aria-labelledby={heading ? 'hero-heading' : undefined}>
    {videoMedia?.url ? <div className="hero-video-wrap">
      <video ref={videoRef} className="hero-video" data-testid="hero-video" autoPlay={!prefersReducedMotion} muted={isMuted} loop playsInline preload="auto" poster={media?.url || undefined} aria-hidden="true" onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)}>
        <source src={videoMedia.url} type={videoMedia.mimeType || 'video/mp4'} />
      </video>
      <div className="hero-video-controls">
        <button className="hero-video-control" type="button" onClick={toggleVideo} aria-label={isPlaying ? 'Pause hero video' : 'Play hero video'}>
          {isPlaying ? 'Pause video' : 'Play video'}
        </button>
        <button className="hero-video-control" type="button" onClick={toggleMute} aria-label={isMuted ? 'Turn on hero video sound' : 'Mute hero video'}>
          {isMuted ? 'Enable sound' : 'Mute sound'}
        </button>
      </div>
    </div> : media?.url ? <div className="hero-image"><Image src={media.url} alt={media.alt || ''} fill priority sizes="(max-width: 42rem) 100vw, 70vw" /></div> : <div className="hero-placeholder" aria-hidden="true" />}
    <div className="hero-copy">{heading ? <h1 id="hero-heading">{heading}</h1> : null}<Link className="rsvp-link" href={action.href}>{action.label}</Link></div>
  </section>
}
