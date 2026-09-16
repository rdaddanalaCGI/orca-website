import Link from 'next/link'

import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

const sizes = {
  md: 'px-3 py-1',
  lg: 'px-4 py-2',
}

export function Button({
  size = 'md',
  type = 'button',
  color = 'dark/light',
  className,
  ...props
}: {
  size?: keyof typeof sizes
  color?: 'dark/light' | 'light'
} & ComponentProps<'button'>) {
  return (
    <button
      type={type}
      className={clsx(
        'inline-flex shrink-0 items-center justify-center gap-1 rounded-full text-sm/7 font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-orca-orange focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
        color === 'dark/light' &&
          'bg-olive-950 text-white hover:bg-olive-800 active:bg-olive-900 dark:bg-orca-frost dark:text-olive-950 dark:hover:bg-orca-frost-hover dark:active:bg-orca-frost-active',
        color === 'light' &&
          'bg-white text-olive-950 hover:bg-orca-mist active:bg-orca-mist dark:bg-orca-frost dark:text-olive-950 dark:hover:bg-orca-frost-hover dark:active:bg-orca-frost-active',
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}

export function ButtonLink({
  size = 'md',
  color = 'dark/light',
  className,
  href,
  ...props
}: {
  href: string
  size?: keyof typeof sizes
  color?: 'dark/light' | 'light'
} & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <Link
      href={href}
      className={clsx(
        'inline-flex shrink-0 items-center justify-center gap-1 rounded-full text-sm/7 font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-orca-orange focus-visible:ring-offset-2 focus-visible:outline-none',
        color === 'dark/light' &&
          'bg-olive-950 text-white hover:bg-olive-800 active:bg-olive-900 dark:bg-orca-frost dark:text-olive-950 dark:hover:bg-orca-frost-hover dark:active:bg-orca-frost-active',
        color === 'light' &&
          'bg-white text-olive-950 hover:bg-orca-mist active:bg-orca-mist dark:bg-orca-frost dark:text-olive-950 dark:hover:bg-orca-frost-hover dark:active:bg-orca-frost-active',
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}

export function SoftButton({
  size = 'md',
  type = 'button',
  className,
  ...props
}: {
  size?: keyof typeof sizes
} & ComponentProps<'button'>) {
  return (
    <button
      type={type}
      className={clsx(
        'inline-flex shrink-0 items-center justify-center gap-1 rounded-full bg-olive-950/10 text-sm/7 font-medium text-olive-950 transition-colors duration-150 hover:bg-olive-950/15 focus-visible:ring-2 focus-visible:ring-orca-orange focus-visible:ring-offset-2 focus-visible:outline-none active:bg-olive-950/20 disabled:pointer-events-none disabled:opacity-50 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/25',
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}

export function SoftButtonLink({
  size = 'md',
  href,
  className,
  ...props
}: {
  href: string
  size?: keyof typeof sizes
} & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <Link
      href={href}
      className={clsx(
        'inline-flex shrink-0 items-center justify-center gap-1 rounded-full bg-olive-950/10 text-sm/7 font-medium text-olive-950 transition-colors duration-150 hover:bg-olive-950/15 focus-visible:ring-2 focus-visible:ring-orca-orange focus-visible:ring-offset-2 focus-visible:outline-none active:bg-olive-950/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/25',
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}

export function PlainButton({
  size = 'md',
  color = 'dark/light',
  type = 'button',
  className,
  ...props
}: {
  size?: keyof typeof sizes
  color?: 'dark/light' | 'light' | 'brand'
} & ComponentProps<'button'>) {
  return (
    <button
      type={type}
      className={clsx(
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm/7 font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-orca-orange focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
        color === 'dark/light' && 'text-olive-950 hover:bg-olive-950/10 dark:text-white dark:hover:bg-white/10',
        color === 'light' && 'text-white hover:bg-white/15 dark:hover:bg-white/10',
        color === 'brand' && 'text-orca-link hover:bg-orca-orange/10 dark:text-orca-orange',
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}

export function PlainButtonLink({
  size = 'md',
  color = 'dark/light',
  href,
  className,
  ...props
}: {
  href: string
  size?: keyof typeof sizes
  color?: 'dark/light' | 'light' | 'brand'
} & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <Link
      href={href}
      className={clsx(
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm/7 font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-orca-orange focus-visible:ring-offset-2 focus-visible:outline-none',
        color === 'dark/light' && 'text-olive-950 hover:bg-olive-950/10 dark:text-white dark:hover:bg-white/10',
        color === 'light' && 'text-white hover:bg-white/15 dark:hover:bg-white/10',
        color === 'brand' && 'text-orca-link hover:bg-orca-orange/10 dark:text-orca-orange',
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}
