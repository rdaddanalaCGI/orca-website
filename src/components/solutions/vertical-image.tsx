import Image from 'next/image'

export const VERTICAL_FALLBACK_IMAGE = '/img/verticals/background-image.jpg'

/**
 * Vertical thumbnail shared by the AI Solutions menu, the home-page
 * applications section and the /solutions industry explorer. Verticals
 * without their own image fall back to the shared background with the
 * vertical name overlaid, so a missing image never breaks the layout.
 * Must be rendered inside a `relative` container.
 */
export function VerticalImage({
  image,
  name,
  sizes,
  className,
  alt = '',
}: {
  image?: string
  name: string
  sizes: string
  className?: string
  alt?: string
}) {
  return (
    <>
      <Image src={image ?? VERTICAL_FALLBACK_IMAGE} alt={alt} fill sizes={sizes} className={className} />
      {!image && (
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center p-6 text-center font-display text-2xl/8 font-semibold text-balance text-olive-950"
        >
          {name}
        </span>
      )}
    </>
  )
}
