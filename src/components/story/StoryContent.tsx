import { RichText } from '@/components/ui/RichText'
import { EditorialImage } from './EditorialImage'
import type { Media, StoryPage as StoryPageType } from '@/payload-types'

export function StoryContent({ story }: { story: StoryPageType }) {
  const images = (story.images || []).filter((image): image is Media => typeof image === 'object' && image !== null)
  return <article className={`story-content story-${story.layout || 'standard'}`}>{story.introduction ? <p className="story-introduction">{story.introduction}</p> : null}<RichText value={story.body} />{images.map((image) => <EditorialImage image={image} key={image.id} />)}</article>
}
