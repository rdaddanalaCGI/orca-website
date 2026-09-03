import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

const html = String.raw

const noisePattern = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  html`
    <svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 100 100">
      <filter id="n">
        <feTurbulence type="turbulence" baseFrequency="1.4" numOctaves="1" seed="2" stitchTiles="stitch" result="n" />
        <feComponentTransfer result="g">
          <feFuncR type="linear" slope="4" intercept="1" />
          <feFuncG type="linear" slope="4" intercept="1" />
          <feFuncB type="linear" slope="4" intercept="1" />
        </feComponentTransfer>
        <feColorMatrix type="saturate" values="0" in="g" />
      </filter>
      <rect width="100%" height="100%" filter="url(#n)" />
    </svg>
  `.replace(/\s+/g, ' '),
)}")`

export function Wallpaper({
  children,
  color,
  className,
  ...props
}: { color: 'green' | 'blue' | 'purple' | 'brown' | 'mist' | 'teal' } & ComponentProps<'div'>) {
  return (
    <div
      data-color={color}
      className={clsx(
        'relative overflow-hidden bg-linear-to-b data-[color=blue]:from-(--color-wallpaper-blue-from) data-[color=blue]:to-(--color-wallpaper-blue-to) data-[color=brown]:from-(--color-wallpaper-brown-from) data-[color=brown]:to-(--color-wallpaper-brown-to) data-[color=green]:from-(--color-wallpaper-green-from) data-[color=green]:to-(--color-wallpaper-green-to) data-[color=mist]:bg-orca-mist data-[color=purple]:from-(--color-wallpaper-purple-from) data-[color=purple]:to-(--color-wallpaper-purple-to) data-[color=teal]:bg-orca-teal-dark dark:data-[color=blue]:from-(--color-wallpaper-blue-from-dark) dark:data-[color=blue]:to-(--color-wallpaper-blue-to-dark) dark:data-[color=brown]:from-(--color-wallpaper-brown-from-dark) dark:data-[color=brown]:to-(--color-wallpaper-brown-to-dark) dark:data-[color=green]:from-(--color-wallpaper-green-from-dark) dark:data-[color=green]:to-(--color-wallpaper-green-to-dark) dark:data-[color=mist]:bg-[color-mix(in_oklab,var(--color-orca-teal-dark)_20%,var(--color-olive-950))] dark:data-[color=purple]:from-(--color-wallpaper-purple-from-dark) dark:data-[color=purple]:to-(--color-wallpaper-purple-to-dark)',
        className,
      )}
      {...props}
    >
      {color !== 'mist' && color !== 'teal' && (
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay dark:opacity-25"
          style={{
            backgroundPosition: 'center',
            backgroundImage: noisePattern,
          }}
        />
      )}
      <div className="relative">{children}</div>
    </div>
  )
}
