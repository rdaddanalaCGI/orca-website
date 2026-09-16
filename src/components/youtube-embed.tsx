import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

type YouTubeEmbedProps = {
  videoId: string
  title?: string
} & Omit<ComponentProps<'div'>, 'title'>

export function YouTubeEmbed({ videoId, title = 'Embedded YouTube video', className, ...props }: YouTubeEmbedProps) {
  return (
    <div
      className={clsx('relative aspect-video w-full overflow-hidden rounded-xl bg-olive-950/5', className)}
      {...props}
    >
      <iframe
        className="absolute inset-0 h-full w-full border-0"
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading="lazy"
      />
    </div>
  )
}
