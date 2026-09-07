import { notFound } from 'next/navigation'
import { StoryContent } from '@/components/story/StoryContent'
import { getStoryPage } from '@/lib/content/getStoryPage'

export default async function StoryPage() { const story = await getStoryPage(); if (!story.enabled) notFound(); return <main className="page-main"><p className="eyebrow">Our Story</p><h1>{story.title || 'Our story'}</h1><StoryContent story={story} /></main> }
