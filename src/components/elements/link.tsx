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
        'inline-flex items-center gap-2 text-sm/7 font-medium',
        color === 'neutral' && 'text-olive-950 dark:text-white',
        color === 'brand' && 'text-orca-orange hover:text-orca-orange-hover',
        className,
      )}
      {...props}
    />
  )
}
