import NextLink from 'next/link'

import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Link({
  href,
  color = 'neutral',
  className,
  ...props
}: {
  href: string
  color?: 'neutral' | 'brand'
} & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <NextLink
      href={href}
      className={clsx(
        'inline-flex items-center gap-2 text-sm/7 font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-orca-orange focus-visible:ring-offset-2 focus-visible:outline-none',
        color === 'neutral' && 'text-olive-950 dark:text-white',
        color === 'brand' && 'text-orca-link hover:underline dark:text-orca-orange',
        className,
      )}
      {...props}
    />
  )
}
